// Full patched index.js
const http = require("http");
const { MongoClient } = require("mongodb");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const fetch = require("node-fetch");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Ribbon ping
async function testRibbon() {
  try {
    const ribbonZogq = await import("@api/ribbon-zogq");
    ribbonZogq.default.auth(process.env.RIBBON_API_KEY);
    const ping = await ribbonZogq.default.getV1Ping();
    console.log("Ribbon ping:", ping);
  } catch (err) {
    console.error("Ribbon error:", err);
  }
}
testRibbon();

let twelveLabsIndexId = null;
const TWELVELABS_INDEX_NAME = "interview-clip-index";

async function ensureTwelveLabsIndex() {
  const { TwelveLabs } = await import("twelvelabs-js");
  const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });
  let indexes;
  try {
    indexes = await client.index.list();
  } catch (err) {
    console.error("Error calling Twelve Labs index.list():", err);
    throw new Error("Failed to list indexes from Twelve Labs API");
  }
  if (!Array.isArray(indexes)) {
    console.error("Unexpected response from Twelve Labs index.list():", indexes);
    throw new Error("Twelve Labs API did not return a valid index list");
  }
  const found = indexes.find((idx) => idx.name === TWELVELABS_INDEX_NAME);
  if (found) {
    twelveLabsIndexId = found.id;
    return twelveLabsIndexId;
  }
  const index = await client.index.create({
    name: TWELVELABS_INDEX_NAME,
    models: [
      { name: "marengo2.7", options: ["visual", "audio"] },
      { name: "pegasus1.2", options: ["visual", "audio"] }
    ]
  });
  twelveLabsIndexId = index.id;
  return twelveLabsIndexId;
}

async function getGeminiResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" +
    apiKey;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

const matches = new Map();
let waitingUser = null;
let waitingRes = null;

async function handleRequest(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const staticFolder = path.resolve(__dirname, "..");
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  if (pathname === "/" || pathname === "/index.html") pathname = "/index.html";

  if (/\.(html|css|js|png|jpg|jpeg|gif|svg)$/.test(pathname)) {
    const filePath = path.join(staticFolder, pathname.replace(/^\/+/g, ""));
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      const mime = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml"
      };
      res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
      return;
    } else {
      res.writeHead(404);
      res.end("File not found");
      return;
    }
  }

  if (req.method === "POST" && pathname === "/upload-and-analyze") {
    const username = new URL(req.url, `http://${req.headers.host}`).searchParams.get("username") || "unknown";
    const safeUsername = username.replace(/[^a-zA-Z0-9_-]/g, "_");
    const webm = `video_${safeUsername}.webm`;
    const mp4 = `video_${safeUsername}.mp4`;
    const webmPath = path.join(__dirname, "video", webm);
    const mp4Path = path.join(__dirname, "video", mp4);
    const writeStream = fs.createWriteStream(webmPath);
    req.pipe(writeStream);

    req.on("end", async () => {
      const { exec } = require("child_process");
      exec(`ffmpeg -y -i "${webmPath}" -c:v libx264 -c:a aac -preset fast "${mp4Path}"`, async (err) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: "ffmpeg failed" }));
          return;
        }
        try {
          const { TwelveLabs } = await import("twelvelabs-js");
          const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });
          const indexId = twelveLabsIndexId || await ensureTwelveLabsIndex();
          const task = await client.task.create({ indexId, file: fs.createReadStream(mp4Path) });
          await task.waitForDone(60, (t) => console.log(`Status=${t.status}`));
          if (task.status !== "ready") throw new Error(`Failed: ${task.status}`);

          const prompt = "Rate this interview clip out of 100 based on clarity, topic knowledge, relevant language, delivery, and posture — weigh clarity and knowledge most; return only an integer score.";
          const result = await client.analyze(task.videoId, prompt);
          const scoreText = result?.data?.trim();
          const score = scoreText?.match(/\b\d{1,3}\b/)?.[0];

          if (!score) throw new Error("Invalid score returned");
          res.writeHead(200);
          res.end(JSON.stringify({ score: parseInt(score) }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
}

const server = http.createServer(handleRequest);
server.listen(8080, () => {
  console.log("server running successfully");
});
