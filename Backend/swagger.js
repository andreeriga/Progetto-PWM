/**
 * @swagger
 * /login:
 *   post:
 *     summary: Effettua il login di un utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un utente per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente da eliminare
 *     responses:
 *       200:
 *         description: Utente eliminato con successo
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Recupera tutti gli utenti
 *     responses:
 *       200:
 *         description: Lista di utenti recuperata con successo
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Recupera un utente per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente da recuperare
 *     responses:
 *       200:
 *         description: Utente recuperato con successo
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuovo utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utente creato con successo
 *       400:
 *         description: Mail già registrata o richiesta non valida
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /credits/{id}:
 *   post:
 *     summary: Aggiorna i crediti di un utente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               crediti:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Crediti aggiornati con successo
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */
