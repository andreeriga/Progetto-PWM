/**
 * @swagger
 * tags:
 *   name: Accesso
 *   description: Operazioni di accesso al sito
 */

/**
 * @swagger
 * tags:
 *   name: Crediti
 *   description: Aggiornamento dei crediti di un utente
 */

/**
 * @swagger
 * tags:
 *   name: Scambi
 *   description: Aggiornamento degli scambi
 */


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

/**
 * @swagger
 * tags:
 *   name: Utenti
 *   description: Operazioni sugli utenti
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Utenti]
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
 *     tags: [Utenti]
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
 *     tags: [Utenti]
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
 *     tags: [Utenti]
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
 *     tags: [Crediti]
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

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     tags: [Utenti]
 *     summary: Aggiorna un utente per ID
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
 *               email:
 *                 type: string
 *               nome:
 *                 type: string
 *               cognome:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Crediti aggiornati con successo
 *       400:
 *         description: Richiesta non valida (es. mail già registrata)
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /trading_cards/{id}:
 *   post:
 *     tags: [Utenti]
 *     summary: Aggiorna le trading cards di un utente per ID
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
 *               trading_cards:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Trading cards aggiornate con successo
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /trade:
 *   post:
 *     tags: [Scambi]
 *     summary: Inserisce uno scambio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_utente:
 *                 type: string
 *                 description: ID dell'utente che effettua lo scambio
 *               trading_cards:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista delle trading cards da scambiare
 *     responses:
 *       200:
 *         description: Scambio inserito con successo
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /trade/{id}:
 *   post:
 *     tags: [Scambi]
 *     summary: Inserisce una proposta di scambio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dello scambio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_utente:
 *                 type: string
 *                 description: ID dell'utente che effettua lo scambio
 *               trading_cards:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista delle trading cards da scambiare
 *     responses:
 *       400:
 *         description: Proposta fatta con te stesso
 *       200:
 *         description: Proposta inserita con successo
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /trades/{id}:
 *   delete:
 *     tags: [Scambi]
 *     summary: Elimina uno scambio
 *     description: Elimina uno scambio esistente dal database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dello scambio da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scambio eliminato con successo
 *       404:
 *         description: Scambio non trovato
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /trades:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi
 *     responses:
 *       200:
 *         description: Lista di scambi recuperata con successo
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /credits/{id}:
 *   get:
 *     tags: [Crediti]
 *     summary: Recupera i crediti di un utente per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: Crediti recuperati con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 crediti:
 *                   type: integer
 *       400:
 *         description: ID utente non valido
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /accept_trade/{id}:
 *   post:
 *     tags: [Scambi]
 *     summary: Accetta uno scambio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dello scambio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_utente:
 *                 type: string
 *                 description: ID dell'utente che accetta lo scambio
 *     responses:
 *       200:
 *         description: Scambio accettato con successo
 *       400:
 *         description: Non puoi accettare uno scambio che non hai proposto
 *       404:
 *         description: Scambio non trovato
 *       500:
 *         description: Errore interno del server
 */

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

/**
 * @swagger
 * /available_trades:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi disponibili
 *     responses:
 *       200:
 *         description: Lista di scambi disponibili recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_1:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   user_2:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /completed_trades:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi completati
 *     responses:
 *       200:
 *         description: Lista di scambi completati recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_1:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   user_2:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /pending_trades:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi in sospeso
 *     responses:
 *       200:
 *         description: Lista di scambi in sospeso recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_1:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   user_2:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /available_trades/{id}:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi disponibili per un utente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: Lista di scambi disponibili recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_1:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   user_2:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /completed_trades/{id}:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi completati per un utente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: Lista di scambi completati recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_1:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   user_2:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Errore interno del server
 */

/**
 * @swagger
 * /pending_trades/{id}:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera tutti gli scambi in sospeso per un utente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: Lista di scambi in sospeso recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_1:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   user_2:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       trading_cards:
 *                         type: array
 *                         items:
 *                           type: string
 *                   status:
 *                     type: string
 *       500:
 *         description: Errore interno del server
 */