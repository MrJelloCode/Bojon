let interviewStatus = "pending"; // for polling to work

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

//Twelvelabs API 
async function testTwelveLabs() {
  try {
    const { TwelveLabs } = await import("twelvelabs-js");

    const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });

    const index = await client.index.create({
      name: `index-${uuidv4()}`,
      models: [
        { name: "marengo2.7", options: ["visual", "audio"] }
      ]
    });
    console.log(`Created index: id=${index.id} name=${index.name}`);

    const task = await client.task.create({
      indexId: index.id,
      url: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" // replace with your video URL
    });
    console.log(`Created task: id=${task.id}`);

    await task.waitForDone(5000, (task) => {
      console.log(`  Status=${task.status}`);
    });

    if (task.status !== "ready") {
      throw new Error(`Indexing failed with status ${task.status}`);
    }

    console.log(`Upload complete. The unique identifier of your video is ${task.videoId}`);

    const searchResults = await client.search.query({
      indexId: index.id,
      queryText: "YOUR_QUERY",
      options: ["visual", "audio"]
    });

    for (const clip of searchResults.data) {
      console.log(`video_id=${clip.videoId} score=${clip.score} start=${clip.start} end=${clip.end} confidence=${clip.confidence}`);
    }

  } catch (err) {
    console.error("Twelvelabs error:", err);
  }
}

// testTwelveLabs();
//Twelvelabs API  
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
        if (req.method === "GET" && pathname.startsWith("/get-elo")) {
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

        
        if (req.method === "GET" && pathname === "/leaderboard") {
  try {
    await client.connect();
    const db = client.db("bojonDB");
    const collection = db.collection("users");

    // Fetch all users, sorted by elo descending
    const topUsers = await collection
      .find({})
      .sort({ elo: -1 })
      .toArray();

    // Keep first 5 characters of each username
    const leaderboard = topUsers.map(user => ({
      name: user.username ? user.username.slice(0, 5) : 'Guest',
      elo: user.elo != null ? user.elo : 500
    }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(leaderboard));
  } catch (error) {
    console.error("Leaderboard error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch leaderboard" }));
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
        if (req.method === "GET" && pathname.startsWith("/get-interview-question")) {
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

                    let score = null;
                    let scoreError = null;a
                    try {
                        const { TwelveLabs } = await import("twelvelabs-js");
                        const client = new TwelveLabs({ apiKey: process.env.TWELVELABS_API_KEY });

                        // Create index (or use an existing one)
                        const index = await client.index.create({
                            name: `index-${uuidv4()}`,
                            models: [
                                { name: "marengo2.7", options: ["visual", "audio"] }
                            ]
                        });

                        // Upload the MP4 file
                        const task = await client.task.create({
                            indexId: index.id,
                            file: fs.createReadStream(mp4Path)
                        });

                        await task.waitForDone(5000, (task) => {
                            console.log(`  Status=${task.status}`);
                        });

                        if (task.status !== "ready") {
                            throw new Error(`Indexing failed with status ${task.status}`);
                        }

                        // Example search prompt
                        await client.search.query({
                            indexId: index.id,
                            queryText: "You are an interviewer and I need you to rate the following 20 second clip based off the clarity, posture and how well built out answer given by the user. You should only return to me a single integer between 0-100 based off the performance of the user.",
                            options: ["visual", "audio"]
                        });

                        // Always try to get the score, even if searchResults is not used
                        try {
                            const { getInterviewScore } = await import('./twelvelabs.js');
                            score = await getInterviewScore(mp4Path, safeUsername);
                            console.log("Interview score:", score);
                        } catch (apiErr) {
                            scoreError = apiErr;
                            console.error("getInterviewScore error:", apiErr);
                        }
                    } catch (apiErr) {
                        if (!res.headersSent) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Twelve Labs API error", details: apiErr.message }));
                        }
                        return;
                    }

                    // Respond with score if available, otherwise error
                    if (!res.headersSent) {
                        if (score !== null && score !== undefined) {
                            // Find the match for this user
                            let matchEntry = null;
                            let opponent = null;
                            for (const [key, match] of matches.entries()) {
                                if (match.users && match.users.includes(username)) {
                                    matchEntry = match;
                                    opponent = match.users.find(u => u !== username);
                                    break;
                                }
                            }
                            // Store this user's score in the match entry
                            if (matchEntry) {
                                if (!matchEntry.scores) matchEntry.scores = {};
                                matchEntry.scores[username] = score;
                            }
                            // Get opponent's score if available
                            let opponentScore = null;
                            if (matchEntry && opponent) {
                                opponentScore = matchEntry.scores ? matchEntry.scores[opponent] : null;
                            }
                            // Get user and opponent elo from DB
                            let userElo = null;
                            let opponentElo = null;
                            try {
                                await client.connect();
                                const db = client.db("bojonDB");
                                const collection = db.collection("users");
                                const userDoc = await collection.findOne({ username });
                                if (userDoc && userDoc.elo !== undefined) userElo = userDoc.elo;
                                if (opponent) {
                                    const oppDoc = await collection.findOne({ username: opponent });
                                    if (oppDoc && oppDoc.elo !== undefined) opponentElo = oppDoc.elo;
                                }
                            } catch (e) {
                                console.error("ELO fetch error:", e);
                            }
                            if (!matchEntry.eloCache) matchEntry.eloCache = {};
                            matchEntry.eloCache[username] = userElo;
                            if (opponent) matchEntry.eloCache[opponent] = opponentElo;

                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({
                                message: "Video processed and analyzed",
                                score,
                                opponentScore,
                                userElo,
                                opponentElo
                            }));
                        } else {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: "Failed to get interview score", details: scoreError ? scoreError.message : "Unknown error" }));
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

        if (req.method === "GET" && pathname === "/get-results") {
            const username = parsedUrl.query.username;
            if (!username) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing username" }));
                return;
            }

            let matchEntry = null;
            let opponent = null;

            for (const [key, match] of matches.entries()) {
                if (match.users?.includes(username)) {
                    matchEntry = match;
                    opponent = match.users.find(u => u !== username);
                    break;
                }
            }

            if (!matchEntry || !matchEntry.scores) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "No match or scores found" }));
                return;
            }

            const result = {
                yourScore: matchEntry.scores[username] ?? null,
                opponentScore: matchEntry.scores[opponent] ?? null,
                yourElo: matchEntry.eloCache?.[username] ?? null,
                opponentElo: matchEntry.eloCache?.[opponent] ?? null,
            };

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
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
