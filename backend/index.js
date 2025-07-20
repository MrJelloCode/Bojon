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

let interviewStatus = "incomplete";
async function createInterview(geminiQuestion) {
    const apiKey = process.env.RIBBON_API_KEY; // Make sure this is set in your env

    // STEP 1: Create Interview Flow
    const flowResponse = await fetch("https://app.ribbon.ai/be-api/v1/interview-flows", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${apiKey}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "org_name": "Hack the 6ix",
            "title": "Hacker",
            "additional_info": "30 second MAX interview . Wrap it up at 30 Seconds. DO NOT GO OVER 30 SECONDS. DO NOT ASK FOLLOW UP QUESTIONS. NO FOLLOW UP QUESTIONS. ONLY 1 QUESTION ASKED.",
            "questions": [
                `${geminiQuestion} (((((Ribbon The interview needs to be EXTREMELY short no longer than 30 seconds. Do not ask follow ups. NO FOLLOW UP QUESTIONS. NO FOLLOW UP QUESTIONS. NO FOLLOW UP QUESTIONS. NO FOLLOW UP QUESTIONS. NO FOLLOW UP QUESTIONS.)))))`
            ]
        })
    });

    const flowResult = await flowResponse.json();
    console.log("Interview Flow Result:", flowResult);

    // STEP 2: Create Interview using the interview_flow_id
    const interviewFlowId = flowResult.interview_flow_id;
    if (!interviewFlowId) {
        console.error("Failed to get interview_flow_id from flowResult");
        return;
    }

    const interviewResponse = await fetch("https://app.ribbon.ai/be-api/v1/interviews", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${apiKey}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({ "interview_flow_id": interviewFlowId })
    });
    const interviewResult = await interviewResponse.json();
    console.log("Interview Result:", interviewResult);

    // STEP 3: Poll the interview endpoint every 2 seconds
    const interviewId = interviewResult.interview_id || interviewResult.id;
    if (!interviewId) {
        console.error("Failed to get interview_id from interviewResult");
        return;
    }

    const pollUrl = `https://app.ribbon.ai/be-api/v1/interviews/${interviewId}`;
    const pollOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'authorization': `Bearer ${apiKey}`
        }
    };

    console.log(`⏱️ Starting to poll ${pollUrl} every 2 seconds…`);
    setInterval(async () => {
        try {
            const res = await fetch(pollUrl, pollOptions);
            //const { status } = await res.json();
            const data = await res.json();
            console.log("Polling result:", data);
            interviewStatus = data.status;
            //console.log("API Status", status);
        } catch (err) {
            console.error("Polling error:", err);
        }
    }, 2000);

    return interviewResult;
}

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
      // Find this section in your index.js file and add the leaderboard route
// Add this RIGHT AFTER the /login route handler (around line 180-200)

        // GET /leaderboard - ADD THIS NEW ROUTE
        if (req.method === "GET" && pathname === "/leaderboard") {
            try {
                await client.connect();
                const db = client.db("bojonDB");
                const collection = db.collection("users");

                console.log("Fetching leaderboard data...");

                // Get all users, sort by ELO descending (highest first), limit to top 10
                const topUsers = await collection
                    .find({})
                    .sort({ elo: -1 })
                    .limit(10)
                    .toArray();

                console.log("Raw MongoDB data:", topUsers);

                // Transform usernames to show only first 5 characters
                const leaderboard = topUsers.map(user => ({
                    name: user.username ? user.username.substring(0, 5) : 'Guest',
                    elo: user.elo || 500
                }));

                console.log("Transformed leaderboard:", leaderboard);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(leaderboard));
            } catch (error) {
                console.error("Leaderboard error:", error);
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to fetch leaderboard" }));
            }
            return;
        }
               // GET /get-interview-link
        if (req.method === "GET" && pathname === "/get-interview-link") {
            // You may want to store interview_link somewhere accessible (e.g., in memory or DB)
            // For demo, let's call createInterview and return the link directly
            const interviewResult = await createInterview();
            if (interviewResult && interviewResult.interview_link) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ interview_link: interviewResult.interview_link }));
            } else {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to get interview link" }));
            }
            return;
        }

            if (req.method === "GET" && pathname === "/status") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: interviewStatus }));
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

            const prompt = "Generate a very very short (solvable in a 10 second response) example technical interview question for a software engineering candidate. Make it a theory based question that can be answered only with words, no code. Generate a highly varied, random question. Only generate the question, and no other information about it.";
            
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


