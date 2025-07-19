const http = require("http");
const { MongoClient } = require("mongodb");

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
    console.log("Gemini raw response:", data); // Add this line
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

async function handleRequest(req, res) {
    try {
        await client.connect();
        const db = client.db("bojonDB");
        const collection = db.collection("testCollection");

        const geminiText = await getGeminiResponse("Hello Gemini, say something cool!");
        await collection.insertOne({ message: geminiText });

        res.write("Gemini response inserted into MongoDB Atlas: " + geminiText);
        res.end();
    } catch (err) {
        res.write("Error: " + err.message);
        res.end();
    }
}

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(8080, () => {
    console.log("server running successfully");
});


