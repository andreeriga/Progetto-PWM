const express = require('express');
const { connectToDatabase, insertUser, logIn, updateUser } = require('./db');
const { ObjectId } = require('mongodb')

require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentazione delle API'
        },
    },
    apis: ['./swagger.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
        res.status(500).send({ message: "errore interno del server" });
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
        res.status(500).send({ message: "errore interno del server" });
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

        var user = await db.collection("Users").findOne({ _id: ObjectId.createFromHexString(user_id) })
        res.status(200).json(user);
    } catch (err) {
        console.error("Errore nel recupero degli utenti:", err);
        res.status(500).send({ message: "errore interno del server" });
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
})

app.post("/users", async (req, res) => {
    console.log(req.body);
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

app.post("/users/:id", async (req, res) => {
    let user_id = req.params.id
    console.log(req.body);
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const final_user = await updateUser(db, req.body, user_id);
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

app.get('/credits/:id', async (req, res) => {
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const user_id = req.params.id;

        if (!ObjectId.isValid(user_id)) {
            return res.status(400).send({ error: "ID utente non valido" });
        }

        const user = await db.collection("Users").findOne({ _id: new ObjectId(user_id) });

        if (!user) {
            return res.status(404).send({ error: "Utente non trovato" });
        }

        res.status(200).send({ crediti: user.crediti });
    } catch (err) {
        console.error("Errore nella route '/credits/:id':", err);
        res.status(500).send({ error: "Errore interno del server" });
    } finally {
        if (client) {
            await client.close();
        }
    }
});



app.post('/trading_cards/:id', async (req, res) => {
    let client;
    try {
        // Connessione al database
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        // Verifica che l'ID sia valido
        const user_id = req.params.id;
        if (!ObjectId.isValid(user_id)) {
            return res.status(400).send({ error: "ID utente non valido" });
        }

        // Validazione del body
        const tradingCards = req.body.trading_cards;
        if (!Array.isArray(tradingCards) || tradingCards.length === 0) {
            return res.status(400).send({ error: "Le trading cards devono essere un array non vuoto" });
        }

        // Ciclo per ogni trading card
        const updatePromises = tradingCards.map(async (card) => {
            const myquery = { _id: new ObjectId(user_id), 'figurine.id': String(card) };
            const update = { $inc: { "figurine.$.quantità": 1 } };

            // Aggiorna la figurina se esiste
            const result = await db.collection("Users").updateOne(myquery, update);

            if (result.matchedCount === 0) {
                // Aggiungi la figurina se non esiste
                await db.collection("Users").updateOne(
                    { _id: new ObjectId(user_id) }, // Cerca utente
                    { $push: { figurine: { id: String(card), quantità: 1 } } } // Aggiungi la nuova figurina
                );
            }
        });

        // Attendi il completamento di tutte le operazioni
        await Promise.all(updatePromises);

        res.status(200).send({
            message: "Trading cards aggiornate con successo"
        });
    } catch (err) {
        console.error("Errore nella route '/trading_cards/:id':", err);
        res.status(500).send({ error: "Errore interno del server" });
    } finally {
        // Chiudi la connessione al database
        if (client) {
            await client.close();
        }
    }
});

app.post('/trade', async (req, res) => {
    // route dedicata all'inserimento di uno scambio
    // req -> id_utente e [] di trading cards
    id_utente = req.body.id_utente;
    trading_cards = req.body.trading_cards;
    try {
        // connessione al db
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const userExists = await db.collection("Users").findOne({ _id: new ObjectId(id_utente) });
        if (!userExists) {
            return res.status(404).send({ error: "Utente non trovato" });
        }
        // inserimento dello scambio
        const result = await db.collection("Trades").insertOne({
            user_1: {
                id: id_utente,
                trading_cards: trading_cards
            },
            user_2: {
                id: null,
                trading_cards: []
            },
            status: "available"
        });
        console.log(result);
        res.status(200).send({ message: "Scambio inserito con successo" });
    } catch (err) {
        console.error("Errore nella route '/trade':", err);
        res.status(500).send({ error: "Errore interno del server" });
    }
});

app.post('/trade/:id', async (req, res) => {
    // route dedicata alla proposta di scambio
    id_scambio = req.params.id;
    id_utente = req.body.id_utente; //secondo utente
    trading_cards = req.body.trading_cards;
    try {
        // connessione al db
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const tradeExists = await db.collection("Trades").findOne({ _id: new ObjectId(id_scambio), "user_1.id": id_utente });
        if (tradeExists) {
            return res.status(400).send({ error: "Non puoi proporre uno scambio con te stesso" });
        }

        const trade = await db.collection("Trades").findOne({ _id: new ObjectId(id_scambio) });
        if (!trade) {
            return res.status(404).send({ error: "Scambio non trovato" });
        }
        // aggiornamento dello scambio
        const result = await db.collection("Trades").updateOne(
            { _id: new ObjectId(id_scambio) },
            { $set: { status: "pending", user_2: { id: id_utente, trading_cards: trading_cards } } }
        );
        console.log(result);
        res.status(200).send({ message: "Scambio accettato con successo" });
    } catch (err) {
        console.error("Errore nella route '/trade/:id':", err);
        res.status(500).send({ error: "Errore interno del server" });
    }
});

app.get('/trades', async (req, res) => {
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const trades = await db.collection("Trades").find({}).toArray();
        res.status(200).json(trades);
    } catch (err) {
        console.error("Errore nel recupero degli scambi:", err);
        res.status(500).send({ message: "errore interno del server" });
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
});

app.delete('/trades/:id', async function (req, res) {
    let trade_id = req.params.id
    let client;
    try {
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const tradeExists = await db.collection("Trades").findOne({ _id: new ObjectId(trade_id) });
        if (!tradeExists) {
            return res.status(404).send({ error: "Scambio non trovato" });
        }

        var msg = await db.collection("Trades").deleteOne({ _id: new ObjectId(trade_id) });
        res.status(200).send(msg)
    } catch (err) {
        console.error("Errore nel recupero degli scambi:", err);
        res.status(500).send({ message: "errore interno del server" });
    } finally {
        if (client) {
            await client.close();
            console.log("Connessione a MongoDB chiusa");
        }
    }
});

app.post('/accept_trade/:id', async (req, res) => {
    // route dedicata all'accettazione di uno scambio
    id_scambio = req.params.id;
    id_utente = req.body.id_utente; //primo utente
    try {
        // connessione al db
        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const trade = await db.collection("Trades").findOne({ _id: new ObjectId(id_scambio) });
        if (!trade) {
            return res.status(404).send({ error: "Scambio non trovato" });
        }

        if (trade.user_1.id != id_utente) { 
            return res.status(400).send({ error: "Non puoi accettare uno scambio che non hai proposto" });
        }
        // aggiornamento dello scambio
        const result = await db.collection("Trades").updateOne(
            { _id: new ObjectId(id_scambio) },
            { $set: { status: "completed" } }
        );
        console.log(result);
        res.status(200).send({ message: "Scambio accettato con successo" });
    } catch (err) {
        console.error("Errore nella route '/accept_trade/:id':", err);
        res.status(500).send({ error: "Errore interno del server" });
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});