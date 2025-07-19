const http = require("http");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://sulaimanqazi14:erIe7KEzuD6IUKwj@cluster0.leduri1.mongodb.net/?retryWrites=true&w=majority"; // Replace with your Atlas URI
const client = new MongoClient(uri);

async function handleRequest(req, res) {
    try {
        await client.connect();
        const db = client.db("bojonDB");
        const collection = db.collection("testCollection");

        await collection.insertOne({ message: "Hello from Atlas!" });

        res.write("Inserted document into MongoDB Atlas");
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


