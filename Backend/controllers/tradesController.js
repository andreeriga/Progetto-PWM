const { connectToDatabase } = require('../db/index');
const { ObjectId } = require('mongodb');

module.exports = {
    getAllTrades: async (req, res) => {
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
    },
    createTrade: async (req, res) => {
        console.log(req.body)
        const id_utente = req.body.id_utente;
        const trading_cards = req.body.trading_cards;
        let client;
        try {
            // connessione al db
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            console.log(id_utente)

            const userExists = await db.collection("Users").findOne({ _id: new ObjectId(id_utente) });
            if (!userExists) {
                return res.status(404).send({ error: "Utente non trovato" });
            }

            const updatePromises = trading_cards.map(async (card) => {
                const myquery = { _id: new ObjectId(id_utente), 'figurine.id': String(card.id) };
                const update = { $inc: { "figurine.$.quantità": -1 } };

                // Aggiorna la figurina se esiste
                await db.collection("Users").updateOne(myquery, update);
            });

            // Attendi il completamento di tutte le operazioni
            await Promise.all(updatePromises);

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
        } finally {
            if (client) {
                await client.close();
            }
        }
    },
    proposeTrade: async (req, res) => {
        id_scambio = req.params.id;
        id_utente = req.body.id_utente;
        trading_cards = req.body.trading_cards;
        try {
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

            const updatePromises = trading_cards.map(async (card) => {
                const myquery = { _id: new ObjectId(id_utente), 'figurine.id': String(card.id) };
                const update = { $inc: { "figurine.$.quantità": -1 } };

                // Aggiorna la figurina se esiste
                await db.collection("Users").updateOne(myquery, update);
            });

            // Attendi il completamento di tutte le operazioni
            await Promise.all(updatePromises);

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
    },
    acceptTrade: async (req, res) => {
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
            // Scambio delle trading cards tra gli utenti
            const user1Cards = trade.user_1.trading_cards;
            const user2Cards = trade.user_2.trading_cards;

            const updatePromises = user2Cards.map(async (card) => {
                const myquery = { _id: new ObjectId(trade.user_1.id) };
                update = { $push: { figurine: { id: String(card.id), quantità : 1, nome : card.nome, thumbnail : card.thumbnail } } }

                // Aggiorna la figurina se esiste
                t = await db.collection("Users").updateOne(myquery, update);
                console.log(t);
            });

            // Attendi il completamento di tutte le operazioni
            t = await Promise.all(updatePromises);
            console.log(t);

            const updatePromises2 = user1Cards.map(async (card) => {
                const myquery = { _id: new ObjectId(trade.user_2.id)};
                update = { $push: { figurine: { id: String(card.id), quantità : 1, nome : card.nome, thumbnail : card.thumbnail } } }

                // Aggiorna la figurina se esiste
                t = await db.collection("Users").updateOne(myquery, update);
                console.log(t);
            });

            // Attendi il completamento di tutte le operazioni
            await Promise.all(updatePromises2);

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
    },
    deleteTrade: async (req, res) => {
        let trade_id = req.params.id
        let client;
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;
            console.log(trade_id)
            const trade = await db.collection("Trades").findOne({ _id: new ObjectId(trade_id) });
            if (!trade) {
                return res.status(404).send({ error: "Scambio non trovato" });
            }

            // Restituzione delle carte agli utenti
            const user1Cards = trade.user_1.trading_cards;
            const user2Cards = trade.user_2.trading_cards;

            // Aggiornamento delle trading cards per l'utente 2
            // console.log(trade.user_2.id)
            if (trade.user_2.id !== null) {
                const updatePromises2 = user2Cards.map(async (card) => {
                    const myquery = { _id: new ObjectId(trade.user_2.id), 'figurine.id': String(card.id) };
                    const update = { $inc: { "figurine.$.quantità": 1 } };
    
                    // Aggiorna la figurina se esiste
                    await db.collection("Users").updateOne(myquery, update);
                });
    
                await Promise.all(updatePromises2);
            }

            const updatePromises = user1Cards.map(async (card) => {
                const myquery = { _id: new ObjectId(trade.user_1.id), 'figurine.id': String(card.id) };
                const update = { $inc: { "figurine.$.quantità": 1 } };

                // Aggiorna la figurina se esiste
                await db.collection("Users").updateOne(myquery, update);
            });

            // Attendi il completamento di tutte le operazioni
            await Promise.all(updatePromises);

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
    },
    getAvailableTrades: async (req, res) => {
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({ status: "available" }).toArray();
            res.status(200).send(trades);
        } catch (err) {
            console.error("Errore nella route '/available_trades':", err);
            res.status(500).send({ error: "Errore interno del server" });
        }
    },
    getCompletedTrades: async (req, res) => {
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({ status: "completed" }).toArray();
            res.status(200).send(trades);
        } catch (err) {
            console.error("Errore nella route '/completed_trades':", err);
            res.status(500).send({ error: "Errore interno del server" });
        }
    },
    getPendingTrades: async (req, res) => {
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({ status: "pending" }).toArray();
            res.status(200).send(trades);
        } catch (err) {
            console.error("Errore nella route '/pending_trades':", err);
            res.status(500).send({ error: "Errore interno del server" });
        }
    },
    getFilteredAvailableTrades: async (req, res) => {
        const id = req.params.id;
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({
                status: "available",
                $or: [
                    { "user_1.id": id },
                    { "user_2.id": id }
                ]
            }).toArray();
            res.status(200).send(trades);
        } catch (err) {
            console.error("Errore nella route '/available_trades/:id':", err);
            res.status(500).send({ error: "Errore interno del server" });
        }
    },
    getFilteredCompletedTrades: async (req, res) => {
        const id = req.params.id;
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({
                status: "completed",
                $or: [
                    { "user_1.id": id },
                    { "user_2.id": id }
                ]
            }).toArray();
            res.status(200).send(trades);
        } catch (err) {
            console.error("Errore nella route '/completed_trades/:id':", err);
            res.status(500).send({ error: "Errore interno del server" });
        }
    },
    getFilteredPendingTrades: async (req, res) => {
        const id = req.params.id;
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({
                status: "pending",
                $or: [
                    { "user_1.id": id },
                    { "user_2.id": id }
                ]
            }).toArray();
            res.status(200).send(trades);
        } catch (err) {
            console.error("Errore nella route '/pending_trades/:id':", err);
            res.status(500).send({ error: "Errore interno del server" });
        }
    },
    getTradesById: async (req, res) => {
        const id = req.params.id;
        console.log(id)
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const trades = await db.collection("Trades").find({_id : new ObjectId(id)}).toArray();
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
    }
};
