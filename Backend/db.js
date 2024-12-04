const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://andrea2002:czTvgZY0N2tPKB7t@cluster0.daiqpb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connesso a MongoDB");
        const db = client.db("Test");
        return { db, client };
    } catch (err) {
        console.error("Errore durante la connessione al database:", err);
        throw err;
    }
}

module.exports = { connectToDatabase };