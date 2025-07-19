const http = require("http");
const { MongoClient } = require("mongodb");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");

require("dotenv").config();
const fetch = require("node-fetch");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let waitingUser = null;
let waitingRes = null;
const matches = new Map();

async function getGeminiResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + apiKey;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  console.log("Gemini raw response:", data);
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve static files
  const staticFolder = path.resolve(__dirname, "..");
  if (req.method === "GET" && /\.(html|css|js|png|jpg|jpeg|gif|svg)$/.test(pathname)) {
    const filePath = path.join(staticFolder, pathname.replace(/^\/+/g, ""));
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml"
      };
      res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
      return;
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
      return;
    }
  }

  if (req.method === "GET" && pathname === "/get-elo") {
    await client.connect();
    const db = client.db("bojonDB");
    const collection = db.collection("users");
    const queryUsername = parsedUrl.query.username;
    if (!queryUsername) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing username" }));
      return;
    }
    const user = await collection.findOne({ username: queryUsername });
    if (user && user.elo !== undefined) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ elo: user.elo }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ elo: null }));
    }
    return;
  }

  if (req.method === "POST" && pathname === "/login") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", async () => {
      await client.connect();
      const db = client.db("bojonDB");
      const collection = db.collection("users");
      const data = JSON.parse(body);
      const user = data.user;
      const username = user.nickname || user.name || user.email;
      const newElo = data.elo;

      let updateDoc = { $set: { username: username } };
      if (newElo !== undefined && newElo !== null) {
        updateDoc.$set.elo = newElo;
      }
      if (updateDoc.$set.elo === undefined) {
        updateDoc.$setOnInsert = { elo: 500 };
      }

      const result = await collection.findOneAndUpdate(
        { username: username },
        updateDoc,
        { upsert: true, returnDocument: "after" }
      );

      let userDoc = result.value || await collection.findOne({ username });
      const elo = (userDoc && userDoc.elo !== undefined && userDoc.elo !== null) ? userDoc.elo : 500;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ elo }));
    });
    return;
  }

  if (req.method === "GET" && pathname === "/auto-match") {
    const username = parsedUrl.query.username;
    if (!username) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing username" }));
      return;
    }

    if (waitingUser && waitingRes) {
      const pair = [waitingUser, username].sort();
      const matchKey = pair.join(":");
      matches.set(matchKey, { users: pair, question: null });
      waitingRes.writeHead(200, { "Content-Type": "application/json" });
      waitingRes.end(JSON.stringify({ opponent: username }));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ opponent: waitingUser }));
      waitingUser = null;
      waitingRes = null;
    } else {
      waitingUser = username;
      waitingRes = res;
      setTimeout(() => {
        if (waitingRes === res) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ opponent: null, message: "No match found, try again." }));
          waitingUser = null;
          waitingRes = null;
        }
      }, 30000);
    }
    return;
  }

  if (req.method === "GET" && pathname === "/get-interview-question") {
    const username = parsedUrl.query.username;
    if (!username) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing username" }));
      return;
    }

    let matchEntry;
    for (const [key, match] of matches.entries()) {
      if (match.users.includes(username)) {
        matchEntry = match;
        break;
      }
    }

    if (!matchEntry) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not authorized or no match in progress" }));
      return;
    }

    if (matchEntry.question) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ question: matchEntry.question }));
      return;
    }

    if (matchEntry.generating) {
      matchEntry.pending = matchEntry.pending || [];
      matchEntry.pending.push(res);
      return;
    }

    matchEntry.generating = true;
    matchEntry.pending = matchEntry.pending || [];
    matchEntry.pending.push(res);

    const prompt = "Generate a very very short (solvable in a 10 second response) example technical interview question for a software engineering candidate. Make it a theory based question that can be answered only with words, no code. Only generate the question, and no other information about it.";

    try {
      const question = await getGeminiResponse(prompt);
      matchEntry.question = question;
      matchEntry.generating = false;
      for (const pendingRes of matchEntry.pending) {
        pendingRes.writeHead(200, { "Content-Type": "application/json" });
        pendingRes.end(JSON.stringify({ question }));
      }
      matchEntry.pending = [];
    } catch (err) {
      matchEntry.generating = false;
      for (const pendingRes of matchEntry.pending) {
        pendingRes.writeHead(500, { "Content-Type": "application/json" });
        pendingRes.end(JSON.stringify({ error: "Failed to generate question" }));
      }
      matchEntry.pending = [];
    }
    return;
  }

  if (req.method === "POST" && pathname === "/evaluate-video") {
    const username = parsedUrl.query.username;
    if (!username) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing username" }));
      return;
    }
    const mp4Filename = `video_${username}.mp4`;
    try {
      const runTwelveLabs = (await import("./twelvelabs.js")).default;
      const score = await runTwelveLabs(mp4Filename);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ username, score }));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(8080, () => {
  console.log("server running successfully");
});
