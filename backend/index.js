// Expressified Bojon Server
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
const PORT = 8080;
const matches = new Map();
let waitingUser = null;
let waitingRes = null;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..")));

// Ribbon Ping Test
(async () => {
  try {
    const ribbonZogq = await import('@api/ribbon-zogq');
    ribbonZogq.default.auth(process.env.RIBBON_API_KEY);
    const ping = await ribbonZogq.default.getV1Ping();
    console.log("Ribbon ping:", ping);
  } catch (err) {
    console.error("Ribbon error:", err);
  }
})();

// Helper for Gemini
async function getGeminiResponse(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

// Leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("bojonDB");
    const collection = db.collection("users");
    const topUsers = await collection.find({}).sort({ elo: -1 }).toArray();
    const leaderboard = topUsers.map(user => ({
      name: user.username ? user.username.slice(0, 5) : 'Guest',
      elo: user.elo != null ? user.elo : 500
    }));
    res.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("bojonDB");
    const collection = db.collection("users");
    const data = req.body;
    const username = data.user?.nickname || data.user?.name || data.user?.email;
    const newElo = data.elo;
    let updateDoc = { $set: { username } };
    if (newElo != null) updateDoc.$set.elo = newElo;
    else updateDoc.$setOnInsert = { elo: 500 };
    const result = await collection.findOneAndUpdate(
      { username },
      updateDoc,
      { upsert: true, returnDocument: "after" }
    );
    const userDoc = result.value || await collection.findOne({ username });
    const elo = userDoc?.elo ?? 500;
    res.json({ elo });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get Elo
app.get("/get-elo", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username" });
  await client.connect();
  const db = client.db("bojonDB");
  const user = await db.collection("users").findOne({ username });
  res.json({ elo: user?.elo ?? null });
});

// Auto-match
app.get("/auto-match", (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username" });
  if (waitingUser && waitingRes) {
    const pair = [waitingUser, username].sort();
    matches.set(pair.join(":"), { users: pair, question: null, scores: {}, eloCache: {} });
    waitingRes.json({ opponent: username });
    res.json({ opponent: waitingUser });
    waitingUser = null;
    waitingRes = null;
  } else {
    waitingUser = username;
    waitingRes = res;
    setTimeout(() => {
      if (waitingRes === res) {
        res.json({ opponent: null, message: "No match found, try again." });
        waitingUser = null;
        waitingRes = null;
      }
    }, 30000);
  }
});

// Get Interview Question
app.get("/get-interview-question", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(403).json({ error: "Missing username" });
  let matchEntry;
  for (const match of matches.values()) {
    if (match.users.includes(username)) {
      matchEntry = match;
      break;
    }
  }
  if (!matchEntry) return res.status(403).json({ error: "No match found" });
  if (matchEntry.question) return res.json({ question: matchEntry.question });
  if (matchEntry.generating) {
    matchEntry.pending = matchEntry.pending || [];
    matchEntry.pending.push(res);
    return;
  }
  matchEntry.generating = true;
  matchEntry.pending = matchEntry.pending || [];
  matchEntry.pending.push(res);
  try {
    const question = await getGeminiResponse("Generate a very very short (solvable in a 10 second response) example technical interview question for a software engineering candidate. Make it a theory based question that can be answered only with words, no code. Only generate the question, and no other information about it.");
    matchEntry.question = question;
    matchEntry.generating = false;
    for (const r of matchEntry.pending) r.json({ question });
    matchEntry.pending = [];
  } catch (err) {
    matchEntry.generating = false;
    for (const r of matchEntry.pending) r.status(500).json({ error: "Failed to generate question" });
    matchEntry.pending = [];
  }
});

// Get Results
app.get("/get-results", (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username" });
  let matchEntry = null;
  let opponent = null;
  for (const match of matches.values()) {
    if (match.users.includes(username)) {
      matchEntry = match;
      opponent = match.users.find(u => u !== username);
      break;
    }
  }
  if (!matchEntry || !matchEntry.scores) return res.status(404).json({ error: "No match or scores found" });
  const result = {
    yourScore: matchEntry.scores[username] ?? null,
    opponentScore: matchEntry.scores[opponent] ?? null,
    yourElo: matchEntry.eloCache?.[username] ?? null,
    opponentElo: matchEntry.eloCache?.[opponent] ?? null,
  };
  res.json(result);
});

// Post Score from 12Labs
app.post("/post-score", (req, res) => {
  const { username, score } = req.body;
  if (!username || typeof score !== "number") return res.status(400).json({ error: "Missing username or score" });

  let matchEntry = null;
  let opponent = null;
  for (const match of matches.values()) {
    if (match.users.includes(username)) {
      matchEntry = match;
      opponent = match.users.find(u => u !== username);
      break;
    }
  }

  if (!matchEntry) return res.status(404).json({ error: "Match not found" });
  matchEntry.scores[username] = score;

  res.json({ message: "Score saved" });
});

// Default 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
