const express = require('express');
const { connectToDatabase } = require('./db');

//Carica le variabili d'ambiente
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/users", async (req, res) => {
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const users = await db.collection("Users").find({}).limit(2).toArray();
        res.send(users);
    } catch (err) {
        console.error("Errore nel recupero degli utenti:", err);
        res.status(500).send("Errore interno del server");
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});