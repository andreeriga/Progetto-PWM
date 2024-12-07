const { MongoClient } = require('mongodb');
const crypto = require("crypto")

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

function generateHashedPassword(psw) {
    return crypto.createHash("sha256").update(psw).digest("hex")
}

async function insertUser(db, user) {
    console.log(user)
    try {
        var final_user = await db.collection("Users").insertOne({
            'nome': user.nome,
            'cognome': user.cognome,
            'email': user.email,
            'password': generateHashedPassword(user.password),
            'preferito': user.preferito,
            'figurine' : [],
            'crediti' : 0
        })
        return final_user;
    } catch(err) {
        throw err
    }

}

module.exports = { connectToDatabase, insertUser };