const http = require("http");
const { MongoClient } = require("mongodb");
const url = require("url");
const fs = require("fs");
const path = require("path");

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
      name: "Test Index",
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

testTwelveLabs();
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
                updateDoc.$setOnInsert = { elo: 500 }; // Default ELO for new users

                const result = await collection.findOneAndUpdate(
                    { username: username },
                    updateDoc,
                    { upsert: true, returnDocument: "after" }
                );

                // Always return the user's ELO (default to 500 if missing)
                const elo = (result.value && result.value.elo !== undefined && result.value.elo !== null)
                    ? result.value.elo
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
                // Save the match
                currentMatch = {
                    users: [waitingUser, username],
                    question: null
                };

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
            if (
                !username ||
                !currentMatch ||
                !currentMatch.users.includes(username)
            ) {
                res.writeHead(403, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Not authorized or no match in progress" }));
                return;
            }

            // If question already generated, serve it
            if (currentMatch.question) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ question: currentMatch.question }));
                return;
            }

            // Otherwise, generate and cache the question
            const prompt = "Generate a very very short (solvable in a 10 second response) example technical interview question for a software engineering candidate. Make it a theory based question that can be answered only with words, no code. Only generate the question, and no other information about it.";
            try {
                const question = await getGeminiResponse(prompt);
                currentMatch.question = question;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ question }));
            } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to generate question" }));
            }
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
let currentMatch = null; // { users: [user1, user2], question: "..." }

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(8080, () => {
    console.log("server running successfully");
});


