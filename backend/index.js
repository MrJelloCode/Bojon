// Fully patched index.js with all routes and logic preserved and fixed

const http = require("http");
const { MongoClient } = require("mongodb");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const fetch = require("node-fetch");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const { TwelveLabs } = require("twelvelabs-js");
const ribbonZogqPromise = import('@api/ribbon-zogq');

let waitingUser = null;
let waitingRes = null;
const matches = new Map(); // key: sorted usernames joined, value: { users: [...], question, generating, pending[] }
let twelveLabsIndexId = null;
const TWELVELABS_INDEX_NAME = "interview-clip-index";

// Setup Ribbon ping
ribbonZogqPromise.then(ribbonZogq => {
  ribbonZogq.default.auth(process.env.RIBBON_API_KEY);
  ribbonZogq.default.getV1Ping().then(ping => {
    console.log("Ribbon ping:", ping);
  }).catch(err => console.error("Ribbon error:", err));
});

async function ensureTwelveLabsIndex() {
  const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });
  const indexes = await client.index.list();
  if (!indexes || !Array.isArray(indexes)) throw new Error("Unexpected index list format");

  const found = indexes.find(i => i.name === TWELVELABS_INDEX_NAME);
  if (found) return (twelveLabsIndexId = found.id);

  const index = await client.index.create({
    name: TWELVELABS_INDEX_NAME,
    models: [ { name: "marengo2.7", options: ["visual", "audio"] } ]
  });
  return (twelveLabsIndexId = index.id);
}

function getMatchKey(u1, u2) {
  return [u1, u2].sort().join(":");
}

async function getGeminiResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

async function handleRequest(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.end();

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname.match(/\.(html|css|js|png|jpg|jpeg|gif|svg)$/)) {
    const filePath = path.join(__dirname, "..", pathname);
    if (!fs.existsSync(filePath)) return res.end("Not found");
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // LOGIN & ELO INIT
  if (pathname === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", async () => {
      const data = JSON.parse(body);
      const username = data.user.nickname || data.user.name || data.user.email;
      await client.connect();
      const db = client.db("bojonDB");
      const col = db.collection("users");

      const result = await col.findOneAndUpdate(
        { username },
        { $setOnInsert: { elo: 500 } },
        { upsert: true, returnDocument: "after" }
      );

      const doc = result.value || await col.findOne({ username });
      res.end(JSON.stringify({ elo: doc.elo ?? 500 }));
    });
    return;
  }

  if (pathname === "/get-elo" && req.method === "GET") {
    await client.connect();
    const db = client.db("bojonDB");
    const col = db.collection("users");
    const { username } = parsedUrl.query;
    const doc = await col.findOne({ username });
    res.end(JSON.stringify({ elo: doc?.elo ?? 500 }));
    return;
  }

  if (pathname === "/auto-match" && req.method === "GET") {
    const { username } = parsedUrl.query;
    if (!username) return res.end(JSON.stringify({ error: "Missing username" }));

    if (waitingUser && waitingRes) {
      const pair = [waitingUser, username].sort();
      matches.set(getMatchKey(...pair), { users: pair, question: null });
      waitingRes.end(JSON.stringify({ opponent: username }));
      res.end(JSON.stringify({ opponent: waitingUser }));
      waitingUser = waitingRes = null;
    } else {
      waitingUser = username;
      waitingRes = res;
      setTimeout(() => {
        if (waitingRes === res) {
          res.end(JSON.stringify({ opponent: null, message: "Match Cancelled: Both Users did not Join" }));
          waitingUser = waitingRes = null;
        }
      }, 10000);
    }
    return;
  }

  if (pathname === "/get-interview-question" && req.method === "GET") {
    const { username } = parsedUrl.query;
    const matchEntry = [...matches.values()].find(m => m.users.includes(username));
    if (!matchEntry) return res.end(JSON.stringify({ error: "No match" }));
    if (matchEntry.question) return res.end(JSON.stringify({ question: matchEntry.question }));

    if (matchEntry.generating) {
      matchEntry.pending = matchEntry.pending || [];
      matchEntry.pending.push(res);
      return;
    }

    matchEntry.generating = true;
    const prompt = "Generate a very short theory-based interview question for a SWE. No code.";
    const q = await getGeminiResponse(prompt);
    matchEntry.question = q;
    (matchEntry.pending || []).forEach(r => r.end(JSON.stringify({ question: q })));
    res.end(JSON.stringify({ question: q }));
    return;
  }

  if (pathname === "/upload-and-analyze" && req.method === "POST") {
    const username = parsedUrl.query.username || "anon";
    const safe = username.replace(/[^\w-]/g, "_");
    const webmPath = path.join(__dirname, "video", `video_${safe}.webm`);
    const mp4Path = path.join(__dirname, "video", `video_${safe}.mp4`);
    const ws = fs.createWriteStream(webmPath);
    req.pipe(ws);
    req.on("end", () => {
      require("child_process").exec(`ffmpeg -y -i "${webmPath}" -c:v libx264 -c:a aac "${mp4Path}"`, async err => {
        if (err) return res.end(JSON.stringify({ error: "Conversion failed" }));

        const indexId = await ensureTwelveLabsIndex();
        const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });
        const task = await client.task.create({ indexId, file: fs.createReadStream(mp4Path) });
        await task.waitForDone(60);

        const prompt = "Rate this interview clip out of 100 based on clarity, topic knowledge, relevant language, delivery, and posture — weigh clarity and knowledge most; return only an integer score.";
        const result = await client.analyze(task.videoId, prompt);
        const score = parseInt(result?.data?.match(/\d+/)?.[0]);
        res.end(JSON.stringify({ score: isNaN(score) ? null : score }));
      });
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
}

http.createServer(handleRequest).listen(8080, () => {
  console.log("server running successfully");
});
