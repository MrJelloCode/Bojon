const http = require("http");
const { MongoClient } = require("mongodb");
const url = require("url");

require("dotenv").config();
const fetch = require("node-fetch");


const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

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
    try {
        await client.connect();
        const db = client.db("bojonDB");
        const collection = db.collection("testCollection");

        const parsedUrl = url.parse(req.url, true);

        // GET /get-elo?username=...
        if (req.method === "GET" && parsedUrl.pathname === "/get-elo") {
            const username = parsedUrl.query.username;
            if (!username) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Missing username" }));
                return;
            }
            let user = await collection.findOne({ username });
            if (user) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ username, elo: user.elo }));
            } else {
                await collection.insertOne({ username, elo: 500 });
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ username, elo: 500 }));
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

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(8080, () => {
    console.log("server running successfully");
});


