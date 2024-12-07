const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGO_URI

async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connesso a MongoDB");
        const db = client.db("PROGETTO-PWM");
        return { db, client };
    } catch (err) {
        console.error("Errore durante la connessione al database:", err);
        throw err;
    }
}

module.exports = { connectToDatabase };