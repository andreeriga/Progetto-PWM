const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

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
router.get('/', usersController.getAllUsers);

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
router.get('/:id', usersController.getUserById);

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
router.post('/', usersController.createUser);

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
router.post('/:id', usersController.updateUser);

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
router.delete('/:id', usersController.deleteUser);

/**
 * @swagger
 * /users/{id}/credits:
 *   get:
 *     tags: [Utenti]
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
router.get('/:id/credits', usersController.getUserCredits);

/**
 * @swagger
 * /users/{id}/password:
 *   post:
 *     tags: [Utenti]
 *     summary: Aggiorna la password di un utente
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password aggiornata con successo
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */
router.post('/:id/password', usersController.updateUserPassword);

/**
 * @swagger
 * /users/{id}/credits:
 *   post:
 *     tags: [Utenti]
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
router.post('/:id/credits', usersController.updateUserCredits);

/**
 * @swagger
 * /users/{id}/trading_cards:
 *   get:
 *     tags: [Utenti]
 *     summary: Recupera le figurine di un utente per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: Figurine recuperate con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 figurine:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: ID utente non valido
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get('/:id/trading_cards', usersController.getTradingCards);

/**
 * @swagger
 * /users/{id}/filtered_trading_cards:
 *   get:
 *     tags: [Utenti]
 *     summary: Recupera le figurine di un utente con quantità maggiore di 1 per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dell'utente
 *     responses:
 *       200:
 *         description: Figurine filtrate recuperate con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 figurine:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                       quantita:
 *                         type: integer
 *       400:
 *         description: ID utente non valido
 *       404:
 *         description: Utente non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get('/:id/filtered_trading_cards', usersController.getFilteredTradingCards);

/**
 * @swagger
 * /users/{id}/trading_cards:
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
router.post('/:id/trading_cards', usersController.updateTradingCards);

module.exports = router;