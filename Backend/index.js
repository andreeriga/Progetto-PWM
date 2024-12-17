const express = require('express');
const { connectToDatabase, insertUser, logIn } = require('./db');
const {ObjectId} = require('mongodb')

//Carica le variabili d'ambiente
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/login", function (req, res) {
    user = req.body
    logIn(user, res)
})

app.delete('/users/:id', async function (req, res) {
    let user_id = req.params.id
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        var msg = await db.collection("Users").deleteOne({ _id: ObjectId.createFromHexString(user_id) });
        res.status(200).send(msg)
    } catch (err) {
        console.error("Errore nel recupero degli utenti:", err);
        res.status(500).send({message:"errore interno del server"});
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
})

app.get("/users", async (req, res) => {
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const users = await db.collection("Users").find({}).toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error("Errore nel recupero degli utenti:", err);
        res.status(500).send({message:"errore interno del server"});
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
});

app.get('/users/:id', async function (req, res) {
    let user_id = req.params.id
    
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        var user = await db.collection("Users").findOne({ _id: ObjectId.createFromHexString(user_id)})
        res.status(200).json(user);
    } catch (err) {
        console.error("Errore nel recupero degli utenti:", err);
        res.status(500).send({message:"errore interno del server"});
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
})

app.post("/users", async (req, res) => {
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;
        
        const final_user = await insertUser(db, req.body);
        res.status(200).send(final_user);
    } catch (err) {
        if (err.code == 11000) {
            res.status(400).send({ message: "mail già registrata" });
        } else {
            // console.error("Errore nel recupero degli utenti:", err);
            res.status(400).send({ message: err.message });
        }
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
});

app.post('/credits/:id', async (req, res) => {
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const user_id = req.params.id;

        const myquery = { _id: new ObjectId(user_id) };
        const update = { $set: { crediti: parseInt(req.body.crediti) } };

        const result = await db.collection("Users").updateOne(myquery, update);

        if (result.matchedCount === 0) {
            return res.status(404).send({ error: "Utente non trovato" });
        }

        res.status(200).send({ message: "Crediti aggiornati con successo", result });
    } catch (err) {
        console.error("Errore nella route '/credits/:id':", err);
        res.status(500).send({ error: "Errore interno del server" });
    } finally {
        if (client) {
            await client.close();
        }
    }
});


app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});