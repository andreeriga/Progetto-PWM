const { connectToDatabase, insertUser, logIn, updateUser, signUp } = require('../db/index');
const { ObjectId } = require('mongodb');
const crypto = require('crypto');

module.exports = {
    getAllUsers: async (req, res) => {
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
    },
    getUserById: async (req, res) => {
        let user_id = req.params.id

        let client;
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            var user = await db.collection("Users").findOne({ _id: new ObjectId(user_id) })
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
    },
    createUser: async (req, res) => {
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
    },
    updateUser: async (req, res) => {
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
    },
    deleteUser: async (req, res) => {
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
    },
    getUserCredits: async (req, res) => {
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
    },
    updateUserCredits: async (req, res) => {
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
    },
    getTradingCards: async (req, res) => {
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

            res.status(200).send({ figurine: user.figurine });
        } catch (err) {
            console.error("Errore nella route '/figurine/:id':", err);
            res.status(500).send({ error: "Errore interno del server" });
        } finally {
            if (client) {
                await client.close();
            }
        }
    },
    getFilteredTradingCards: async (req, res) => {
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

            const filteredFigurine = user.figurine.filter(figurina => figurina.quantità > 1);

            res.status(200).send({ figurine: filteredFigurine });
        } catch (err) {
            console.error("Errore nella route '/filtered_trading_cards/:id':", err);
            res.status(500).send({ error: "Errore interno del server" });
        } finally {
            if (client) {
                await client.close();
            }
        }
    },
    updateTradingCards: async (req, res) => {
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
    },
    updateUserPassword : async (req, res) => {
        let client;
        try {
            const connection = await connectToDatabase();
            const db = connection.db;
            client = connection.client;

            const user_id = req.params.id;

            const myquery = { _id: new ObjectId(user_id) };
            const update = { $set: { password: crypto.createHash("sha256").update(req.body.password).digest("hex") } };

            const result = await db.collection("Users").updateOne(myquery, update);

            if (result.matchedCount === 0) {
                return res.status(404).send({ error: "Utente non trovato" });
            }

            res.status(200).send({ message: "Password aggiornata con successo" });
        } catch (err) {
            console.error("Errore nella route '/password/:id':", err);
            res.status(500).send({ error: "Errore interno del server" });
        } finally {
            if (client) {
                await client.close();
            }
        }
    }
};
