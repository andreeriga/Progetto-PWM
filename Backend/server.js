const express = require('express');
const dotenv = require('dotenv');
const { logIn, signUp } = require('./db/index');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const usersRoutes = require('./routes/users');
const tradesRoutes = require('./routes/trades');
const swaggerOptions = require('./swagger/swagger');

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
