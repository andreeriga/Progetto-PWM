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

class ValidationError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "ValidationError";
        this.code = code;
    }
}

function validateUserInput(user) {
    if (!user.email && !user.password) {
        throw new ValidationError("Email e password mancanti", 400);
    }
    if (!user.email) {
        throw new ValidationError("Email mancante", 400);
    }
    if (!user.password) {
        throw new ValidationError("Password mancante", 400);
    }
    if (!validator.isEmail(user.email)) {
        throw new ValidationError("Formattazione errata della mail", 400);
    }
}

async function insertUser(db, user) {
    validateUserInput(user);

    const finalUser = await db.collection("Users").insertOne({
        nome: user.nome || null,
        cognome: user.cognome || null,
        email: user.email,
        password: generateHashedPassword(user.password),
        preferito: user.preferito || null,
        figurine: [],
        crediti: 0,
    });

    return finalUser;
}

function validateLoginInput(user) {
    if (!user.email && !user.password) {
        throw new ValidationError("Email e password mancanti", 400);
    }
    if (!user.email) {
        throw new ValidationError("Email mancante", 400);
    }
    if (!user.password) {
        throw new ValidationError("Password mancante", 400);
    }
}

async function logIn(user, res) {
    try {
        validateLoginInput(user);
        const client = new MongoClient(uri);
        const pwmClient = await client.connect();
        const user_find = await pwmClient.db("PROGETTO-PWM").collection("Users").findOne({
            email: user.email
        });

        await client.close();

        if (!user_find) {
            return res.status(400).json({ message: "Non esiste un utente con questa mail" });
        }

        const passwordMatch = generateHashedPassword(user.password) === user_find.password;
        if (!passwordMatch) {
            return res.status(400).json({ message: "Password errata" });
        }

        res.status(200).json({ user_credentials: user_find });
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(err.code).json({ message: err.message });
        } else {
            console.error("Errore durante il login:", err);
            res.status(500).json({ message: "Errore interno del server" });
        }
    }
}

async function updateUser(db, user, user_id) {
    validateUserInput(user);

    filter = {_id : user_id};
    update_doc = {$set: user};

    const finalUser = await db.collection("Users").updateOne(filter, update_doc);
    return finalUser;
}

function validateSignUpInput(user) {
    if (!user.email || !user.password || !user.nome || !user.cognome || user.preferito == null) {
        throw new ValidationError("Tutti i campi (email, password, nome, cognome, eroe preferito) sono obbligatori", 400);
    }
    if (!validator.isEmail(user.email)) {
        throw new ValidationError("Formattazione errata della mail", 400);
    }
}

async function signUp(user, res) {
    try {
        validateSignUpInput(user);
        const client = new MongoClient(uri);
        const pwmClient = await client.connect();
        const db = pwmClient.db("PROGETTO-PWM");

        const userExists = await db.collection("Users").findOne({ email: user.email });
        if (userExists) {
            await pwmClient.close();
            return res.status(400).json({ message: "Email già registrata" });
        }

        const hashedPassword = generateHashedPassword(user.password);
        const newUser = {
            nome: user.nome,
            cognome: user.cognome,
            email: user.email,
            password: hashedPassword,
            preferito: user.preferito,
            crediti: 0, // inizializza i crediti a 0
            trading_cards: [] // inizializza le trading cards come array vuoto
        };

        const result = await db.collection("Users").insertOne(newUser);
        await pwmClient.close();

        res.status(201).json({ message: "Utente registrato con successo", userId: result.insertedId });
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(err.code).json({ message: err.message });
        } else {
            console.error("Errore durante il signup:", err);
            res.status(500).json({ message: "Errore interno del server" });
        }
    }
}

module.exports = { connectToDatabase, insertUser, logIn, updateUser, signUp };