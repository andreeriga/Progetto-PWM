const express = require('express');
const dotenv = require('dotenv');
const { logIn, signUp, connectToDatabase } = require('./db/index');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const usersRoutes = require('./routes/users');
const tradesRoutes = require('./routes/trades');
const swaggerOptions = require('./swagger/swagger');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const {MongoClient, ObjectId} = require('mongodb');

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors())

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/users', usersRoutes);
app.use('/trades', tradesRoutes);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Accesso]
 *     summary: Effettua il login di un utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       400:
 *         description: Richiesta non valida
 *       500:
 *         description: Errore interno del server
 */
app.post("/login", function (req, res) {
    user = req.body
    logIn(user, res)
})

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Accesso]
 *     summary: Registra un nuovo utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email dell'utente
 *               password:
 *                 type: string
 *                 description: Password dell'utente
 *               nome:
 *                 type: string
 *                 description: Nome dell'utente
 *               cognome:
 *                 type: string
 *                 description: Cognome dell'utente
 *               preferito:
 *                 type: integer
 *                 description: Eroe preferito
 *     responses:
 *       200:
 *         description: Utente registrato con successo
 *       400:
 *         description: Mail già registrata o richiesta non valida
 *       500:
 *         description: Errore interno del server
 */
app.post("/signup", async (req, res) => {
    user = req.body
    signUp(user, res)
});

function getFromMarvel(url, query = "") {
    var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
    var timestamp = Date.now();
    var parameters = `ts=${timestamp}&apikey=${process.env.PUBLIC_API_KEY}&hash=${MD5(timestamp + process.env.PRIVATE_API_KEY + process.env.PUBLIC_API_KEY)}&`

    return fetch(`http://gateway.marvel.com/v1/${url}?${parameters}${query}`)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

function generateTradingCards() {
    const limite = 100;
    let offset = 0;
    const eroi = [];

    getFromMarvel('/public/characters', 'limit=1')
        .then(response => {
            const totale = response.data.total;

            const fetchEroi = (offset) => {
                return getFromMarvel('/public/characters', `limit=100&offset=${offset}`)
                    .then(response => {
                        response.data.results.forEach(eroe => {
                            eroi.push({
                                id : eroe.id,
                                nome : eroe.name,
                                thumbnail : eroe.thumbnail.path + "." + eroe.thumbnail.extension
                            });
                        });
                    });
            };

            const promises = [];
            while (offset + limite <= totale) {
                promises.push(fetchEroi(offset));
                offset += limite;
            }

            // Handle the remaining characters if total is not a multiple of 100
            if (offset < totale) {
                promises.push(fetchEroi(offset));
            }

            Promise.all(promises).then(() => {
                const filePath = path.join(__dirname, 'tutti_eroi.json');
                fs.writeFile(filePath, JSON.stringify(eroi, null, 2), (err) => {
                    if (err) {
                        console.error('Errore nel salvare il file:', err);
                    } else {
                        console.log('File salvato correttamente!');
                    }
                });
            });
        })
        .catch(err => {
            console.error('Errore durante la richiesta:', err);
        });
}

setInterval(generateTradingCards, 43200000);

// generateTradingCards()

/**
 * @swagger
 * tags:
 *   name: Marvel
 *   description: Operazioni base sui personaggi Marvel
 */

/**
 * @swagger
 * /marvel/heroes:
 *   post:
 *     tags: [Marvel]
 *     summary: Restituisce un numero di eroi casuali
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_di_figurine:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Eroi restituiti con successo
 *       500:
 *         description: Errore interno del server
 */
app.post('/marvel/heroes', (req, res) => {
    numero_di_figurine = req.body.numero_di_figurine
    const filePath = path.join(__dirname, 'tutti_eroi.json');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Errore nel leggere il file:', err);
            res.status(500).send('Errore nel leggere il file');
        } else {
            arr = Array.from(JSON.parse(data));
            const shuffled = arr.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, numero_di_figurine);
            res.status(200).send(selected);
        }
    });
});

/**
 * @swagger
 * tags:
 *   name: Superuser
 *   description: Operazioni che può fare solo un utente specializzato
 */


/**
 * @swagger
 * /superuser:
 *   post:
 *     tags: [Superuser]
 *     summary: Crea un nuovo superuser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome del superuser
 *               email:
 *                 type: string
 *                 description: Email del superuser
 *               password:
 *                 type: string
 *                 description: Password del superuser
 *     responses:
 *       201:
 *         description: Superuser creato con successo
 *       400:
 *         description: Richiesta non valida
 *       500:
 *         description: Errore interno del server
 */
app.post('/superuser', async (req, res) => {
    const { nome, email, password } = req.body;
    let client;
    try {
        if (!nome || !email || !password) {
            return res.status(400).send('Richiesta non valida');
        }

        const connection = await connectToDatabase();
        const db = connection.db;
        client = connection.client;

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const result = await db.collection("Users").insertOne({
            nome: nome,
            email: email,
            password: hashedPassword,
            admin : true
        });

        res.status(201).send({ message: "Superuser creato con successo", userId: result.insertedId });
    } catch (err) {
        console.error("Errore nella route '/superuser':", err);
        res.status(500).send({ error: "Errore interno del server" });
    } finally {
        if (client) {
            await client.close();
        }
    }
});

/**
 * @swagger
 * /superuser/pack:
 *   post:
 *     tags: [Superuser]
 *     summary: Crea un nuovo pacchetto esclusivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crediti:
 *                 type: integer
 *                 description: Crediti del pacchetto
 *               numero_figurine:
 *                 type: integer
 *                 description: Numero di figurine nel pacchetto
 *     responses:
 *       200:
 *         description: Operazione riuscita
 *       400:
 *         description: Richiesta non valida
 *       500:
 *         description: Errore interno del server
 */
app.post('/superuser/pack', async (req, res) => {
    if (!req.body.crediti || !req.body.numero_figurine) {
        res.status(400).send('Richiesta non valida');
    }
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        const pwmClient = await client.connect();
        const db = pwmClient.db("PROGETTO-PWM");
        const pack = {
            crediti: req.body.crediti,
            numero_figurine: req.body.numero_figurine
        };
        await db.collection('Exclusives').insertOne(pack);
        await client.close();
        res.status(200).send('Operazione riuscita');
    } catch (err) {
        console.error('Errore durante la connessione al database:', err);
        res.status(500).send('Errore interno del server');
    }
});

/**
 * @swagger
 * /superuser/pack/{id}:
 *   delete:
 *     tags: [Superuser]
 *     summary: Elimina un pacchetto esclusivo per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pacchetto da eliminare
 *     responses:
 *       200:
 *         description: Pacchetto eliminato con successo
 *       400:
 *         description: Pack non trovato
 *       500:
 *         description: Errore interno del server
 */
app.delete('/superuser/pack/:id', async (req, res) => {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        const pwmClient = await client.connect();
        const db = pwmClient.db("PROGETTO-PWM");
        if (!db.collection('Exclusives').findOne({ _id: new ObjectId(req.params.id) })) {
            res.status(400).send('Pack non trovato');
        }
        await db.collection('Exclusives').deleteOne({ _id: new ObjectId(req.params.id) });
        await client.close();
        res.status(200).send('Operazione riuscita');
    } catch (err) {
        console.error('Errore durante la connessione al database:', err);
        res.status(500).send('Errore interno del server');
    }
});

/**
 * @swagger
 * /superuser/packs:
 *   get:
 *     tags: [Superuser]
 *     summary: Recupera tutti i pacchetti esclusivi
 *     responses:
 *       200:
 *         description: Lista di pacchetti esclusivi recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID del pacchetto
 *                   crediti:
 *                     type: integer
 *                     description: Crediti del pacchetto
 *                   numero_figurine:
 *                     type: integer
 *                     description: Numero di figurine nel pacchetto
 *       500:
 *         description: Errore interno del server
 */

app.get('/superuser/packs', async (req, res) => {
    let client;
    try {
        client = new MongoClient(process.env.MONGO_URI);
        const pwmClient = await client.connect();
        const db = pwmClient.db("PROGETTO-PWM");

        const packs = await db.collection('Exclusives').find().toArray();
        await client.close();
        res.status(200).send(packs);
    } catch (err) {
        console.error("Errore nella route '/superuser/packs':", err);
        res.status(500).send({ error: "Errore interno del server" });
    }
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'AFSE', 'index.html'))
});

app.get('/:page_name', (req,res) => {
    nome = req.params.page_name
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'AFSE', nome))
});

app.get('/Utils/images/:image_name', (req, res) => {
    const imagePath = path.join(__dirname,'..', 'Frontend','AFSE' ,'Utils', 'images', req.params.image_name);
    res.sendFile(imagePath)
});

// app.use('/Utils/images', express.static(path.join(__dirname,'..', 'Frontend','AFSE' ,'Utils', 'images')));

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
