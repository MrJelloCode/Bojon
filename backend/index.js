const http = require("http");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function handleRequest(req, res) {
    try {
        await client.connect();
        const db = client.db("bojonDB");
        const collection = db.collection("testCollection");

        // Example: Insert a document
        await collection.insertOne({ message: "Hello from server!" });

        res.write("Inserted document into MongoDB");
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