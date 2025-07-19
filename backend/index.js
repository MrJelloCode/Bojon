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
                const newElo = data.elo; // Only update if provided

                let updateDoc = { $set: { username: username } };
                if (newElo !== undefined) {
                    updateDoc.$set.elo = newElo;
                } else {
                    updateDoc.$setOnInsert = { elo: 500 };
                }

                const result = await collection.findOneAndUpdate(
                    { username: username },
                    updateDoc,
                    { upsert: true, returnDocument: "after" }
                );

                const elo = (result.value && result.value.elo !== undefined) ? result.value.elo : 500;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ elo: elo }));
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

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(8080, () => {
    console.log("server running successfully");
});


