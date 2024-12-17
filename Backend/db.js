const { MongoClient } = require('mongodb');
const crypto = require("crypto")

var validator = require('validator');


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
    try {
        if ((user.email == undefined || user.email == "") && (user.password == undefined || user.password == "")) {
            var error = new Error("Email e password mancanti")
            error.code = 400
            throw error
        }
    
        //controllo che abbia già inserito qualcosa nei campi(in questo caso solo la mail) della form per il login
        if (user.email == undefined || user.email == "") {
            var error = new Error("Email mancante")
            error.code = 400
            throw error
        }
    
        //controllo che abbia già inserito qualcosa nei campi(in questo caso solo la password) della form per il login
        if (user.password == undefined || user.password == "") {
            var error = new Error("Password mancante")
            error.code = 400
            throw error
        }
        if (!validator.isEmail(user.email)) {
            var error = new Error("Formattazione errata della mail")
            error.code = 400
            throw error
        }
        var final_user = await db.collection("Users").insertOne({
            'nome': user.nome,
            'cognome': user.cognome,
            'email': user.email,
            'password': generateHashedPassword(user.password),
            'preferito': user.preferito,
            'figurine': [],
            'crediti': 0
        })
        return final_user;
    } catch (err) {
        throw err
    }

}

async function logIn(user, res) {
    //controllo che abbia già inserito qualcosa nei campi(in questo caso entrambi) della form per il login
    if ((user.email == undefined || user.email == "") && (user.password == undefined || user.password == "")) {
        res.status(400).json({ message: "Email e password mancanti" })
        return
    }

    //controllo che abbia già inserito qualcosa nei campi(in questo caso solo la mail) della form per il login
    if (user.email == undefined || user.email == "") {
        res.status(400).json({ message: "Email mancante" })
        return
    }

    //controllo che abbia già inserito qualcosa nei campi(in questo caso solo la password) della form per il login
    if (user.password == undefined || user.password == "") {
        res.status(400).json({ message: "Password mancante" })
        return
    }

    const pwmClient = await client.connect();
    let user_find = await pwmClient.db("Test").collection("Users").findOne({
        email: user.email
    })
    client.close()
    if (user_find == null) {
        res.status(400).json({ message: "Non esiste un utente con questa mail" })
        return
    }
    const password = user_find.password
    const result = generateHashedPassword(user.password) == password
    if (!result) {
        res.status(400).json({ message: "Password errata" })
        return
    }
    res.status(200).json({ user_credentials: user_find })
}

module.exports = { connectToDatabase, insertUser, logIn };