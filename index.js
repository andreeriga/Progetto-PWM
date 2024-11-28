const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// URI del database
const uri = "mongodb+srv://andrea2002:czTvgZY0N2tPKB7t@cluster0.daiqpb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Route per recuperare gli utenti
app.get("/users", async (req, res) => {
    let client; // Per gestire la connessione
    try {
        // Crea una nuova connessione
        client = new MongoClient(uri);
        await client.connect();
        console.log("Connesso a MongoDB");

        // Seleziona il database e la collezione
        const db = client.db("Test");
        const users = await db.collection("Users").find({}).limit(2).toArray();

        // Invia la risposta
        res.send(users);
    } catch (err) {
        console.error("Errore nel recupero degli utenti:", err);
        res.status(500).send("Errore interno del server");
    } finally {
        // Chiudi la connessione
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
