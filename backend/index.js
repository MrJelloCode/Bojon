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

// Sucessful Ribbon API call https://docs.ribbon.ai/reference/get_v1-ping-1
async function testRibbon() {
  try {
    const ribbonZogq = await import('@api/ribbon-zogq');

    ribbonZogq.default.auth(process.env.RIBBON_API_KEY); // Your exposed token
    const ping = await ribbonZogq.default.getV1Ping();
    console.log("Ribbon ping:", ping);
  } catch (err) {
    console.error("Ribbon error:", err);
  }
}
testRibbon();
//End Ribbon API call

// Twelve Labs index management
let twelveLabsIndexId = null;
const TWELVELABS_INDEX_NAME = "interview-clip-index";

async function ensureTwelveLabsIndex() {
  const { TwelveLabs } = await import("twelvelabs-js");
  const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });
  // Try to find existing index
  let indexes;
  try {
    indexes = await client.index.list();
  } catch (err) {
    console.error("Error calling Twelve Labs index.list():", err);
    throw new Error("Failed to list indexes from Twelve Labs API");
  }
  if (!indexes || !Array.isArray(indexes.data)) {
    console.error("Unexpected response from Twelve Labs index.list():", indexes);
    throw new Error("Twelve Labs API did not return a valid index list");
  }
  const found = indexes.data.find(idx => idx.name === TWELVELABS_INDEX_NAME);
  if (found) {
    twelveLabsIndexId = found.id;
    return twelveLabsIndexId;
  }
  // Create new index if not found
  let index;
  try {
    index = await client.index.create({
      name: TWELVELABS_INDEX_NAME,
      models: [
        { name: "marengo2.7", options: ["visual", "audio"] }
      ]
    });
  } catch (err) {
    console.error("Error creating Twelve Labs index:", err);
    throw new Error("Failed to create index in Twelve Labs API");
  }
  twelveLabsIndexId = index.id;
  return twelveLabsIndexId;
}

// Ensure index is created on server startup
ensureTwelveLabsIndex().then(id => {
  console.log("Twelve Labs index ready, id:", id);
}).catch(err => {
  console.error("Failed to create/find Twelve Labs index:", err);
});
async function getGeminiResponse(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + apiKey;

    const body = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("Gemini raw response:", data);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

async function handleRequest(req, res) {
    // Add CORS headers for all responses
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    try {
        // Serve static files from parent folder (Bojon)
        const staticFolder = path.resolve(__dirname, "..");
        const parsedUrl = url.parse(req.url, true);
        let pathname = parsedUrl.pathname;

        console.log("Incoming request:", req.method, pathname);

        // Default to index.html if root
        if (pathname === "/" || pathname === "/index.html") {
            pathname = "/index.html";
        }

        // Serve .html, .css, .js, and image files
        if (/\.(html|css|js|png|jpg|jpeg|gif|svg)$/.test(pathname)) {
            const filePath = path.join(staticFolder, pathname.replace(/^\/+/, ""));
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

        // GET /get-elo?username=...
        if (req.method === "GET" && pathname === "/get-elo") {
            await client.connect();
            const db = client.db("bojonDB");
            const collection = db.collection("users"); // use your actual collection name

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

        // POST /login
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

                // Build update doc
                let updateDoc = { $set: { username: username } };
                if (newElo !== undefined && newElo !== null) {
                    updateDoc.$set.elo = newElo;
                }
                if (updateDoc.$set.elo === undefined) {
                    updateDoc.$setOnInsert = { elo: 500 }; // Only set default if not updating elo
                }

                const result = await collection.findOneAndUpdate(
                    { username: username },
                    updateDoc,
                    { upsert: true, returnDocument: "after" }
                );

                // If result.value is null (new user), fetch the user
                let userDoc = result.value;
                if (!userDoc) {
                    userDoc = await collection.findOne({ username: username });
                }

                const elo = (userDoc && userDoc.elo !== undefined && userDoc.elo !== null)
                    ? userDoc.elo
                    : 500;

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ elo: elo }));
            });
            return;
        }

        // GET /auto-match?username=...
        if (req.method === "GET" && pathname.startsWith("/auto-match")) {
            const username = parsedUrl.query.username;
            if (!username) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing username" }));
                return;
            }

            // If someone is already waiting, pair them
            if (waitingUser && waitingRes) {
                // Always store usernames in sorted order for consistency
                const pair = [waitingUser, username].sort();
                const matchKey = pair.join(":");
                matches.set(matchKey, { users: pair, question: null });

                // Respond to the waiting user
                waitingRes.writeHead(200, { "Content-Type": "application/json" });
                waitingRes.end(JSON.stringify({ opponent: username }));

                // Respond to the current user
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ opponent: waitingUser }));

                // Clear waiting state
                waitingUser = null;
                waitingRes = null;
            } else {
                // No one waiting, store this user and response
                waitingUser = username;
                waitingRes = res;

                // Optionally, set a timeout so the user isn't left hanging forever
                setTimeout(() => {
                    if (waitingRes === res) {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ opponent: null, message: "No match found, try again." }));
                        waitingUser = null;
                        waitingRes = null;
                    }
                }, 30000); // 30 seconds
                // Do not respond yet; wait for another user
            }
            return;
        }

        // GET /get-interview-question?username=...
        if (req.method === "GET" && pathname === "/get-interview-question") {
            const username = parsedUrl.query.username;
            if (!username) {
                res.writeHead(403, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing username" }));
                return;
            }

            // Find the match this user is in
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

            // If question already generated, serve it
            if (matchEntry.question) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ question: matchEntry.question }));
                return;
            }

            // If question is being generated, queue this response
            if (matchEntry.generating) {
                matchEntry.pending = matchEntry.pending || [];
                matchEntry.pending.push(res);
                return;
            }

            // Otherwise, generate and cache the question, and mark as generating
            matchEntry.generating = true;
            matchEntry.pending = matchEntry.pending || [];
            matchEntry.pending.push(res);

            const prompt = "Generate a very very short (solvable in a 10 second response) example technical interview question for a software engineering candidate. Make it a theory based question that can be answered only with words, no code. Only generate the question, and no other information about it.";
            
            try {
                const question = await getGeminiResponse(prompt);
                matchEntry.question = question;
                matchEntry.generating = false;

                // Respond to all waiting clients
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

        // POST /upload-and-analyze
        if (req.method === "POST" && pathname === "/upload-and-analyze") {
            // Save incoming WebM to disk
            const username = new URL(req.url, `http://${req.headers.host}`).searchParams.get("username") || "unknown";
            const safeUsername = username.replace(/[^a-zA-Z0-9_-]/g, "_"); // sanitize to prevent directory traversal or illegal characters

            const webmFilename = `video_${safeUsername}.webm`;
            const mp4Filename = `video_${safeUsername}.mp4`;
            const webmPath = path.join(__dirname, "video", webmFilename);
            const mp4Path = path.join(__dirname, "video", mp4Filename);

            const writeStream = fs.createWriteStream(webmPath);
            req.pipe(writeStream);

            req.on("end", async () => {
                // Convert WebM to MP4 using ffmpeg
                const { exec } = require("child_process");
                exec(`ffmpeg -y -i "${webmPath}" -c:v libx264 -c:a aac -preset fast -pix_fmt yuv420p -movflags +faststart "${mp4Path}"`, async (err, stdout, stderr) => {
                    if (err) {
                        if (!res.headersSent) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "ffmpeg conversion failed", details: stderr }));
                        }
                        return;
                    }

                    // Send MP4 to Twelve Labs API
                    try {
                        const { TwelveLabs } = await import("twelvelabs-js");
                        const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });

                        // Ensure index exists and get its ID
                        let indexId = twelveLabsIndexId;
                        if (!indexId) {
                          indexId = await ensureTwelveLabsIndex();
                        }

                        // Upload the MP4 file
                        const task = await client.task.create({
                            indexId,
                            file: fs.createReadStream(mp4Path)
                        });

                        await task.waitForDone(5000, (task) => {
                            console.log(`  Status=${task.status}`);
                        });

                        if (task.status !== "ready") {
                          throw new Error(`Indexing failed with status ${task.status}`);
                        }

                        // Example search prompt
                        const searchResults = await client.search.query({
                            indexId,
                            queryText: "You are an interviewer and I need you to rate the following 20 second clip based off the clarity, posture and how well built out answer given by the user. You should only return to me a single integer between 0-100 based off the performance of the user.",
                            options: ["visual", "audio"]
                        });

                        try {
                          const { getInterviewScore } = await import('./twelvelabs.js');
                          const score = await getInterviewScore(mp4Path);
                          res.writeHead(200, { "Content-Type": "application/json" });
                          res.end(JSON.stringify({ message: "Video processed and analyzed", score }));
                        } catch (apiErr) {
                          res.writeHead(500, { "Content-Type": "application/json" });
                          res.end(JSON.stringify({ error: "Twelve Labs API error", details: apiErr.message }));
                        }
                    } catch (apiErr) {
                        if (!res.headersSent) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Twelve Labs API error", details: apiErr.message }));
                        }
                    }
                });
            });

            req.on("error", (err) => {
                if (!res.headersSent) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: err.message }));
                }
            });

            return;
        }

        // Default response for other routes
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

let waitingUser = null;
let waitingRes = null;
const matches = new Map(); // key: sorted usernames joined, value: { users: [...], question: ... }

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(8080, () => {
    console.log("server running successfully");
});
