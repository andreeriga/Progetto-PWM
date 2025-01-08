const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/tradesController');

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
router.get('/', tradesController.getAllTrades);

/**
 * @swagger
 * /trades/byId/{id}:
 *   get:
 *     tags: [Scambi]
 *     summary: Recupera uno scambio per ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dello scambio
 *     responses:
 *       200:
 *         description: Scambio recuperato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user_1:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     trading_cards:
 *                       type: array
 *                       items:
 *                         type: string
 *                 user_2:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     trading_cards:
 *                       type: array
 *                       items:
 *                         type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Scambio non trovato
 *       500:
 *         description: Errore interno del server
 */
router.get('/byId/:id', tradesController.getTradesById)

/**
 * @swagger
 * /trades:
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
router.post('/', tradesController.createTrade);

/**
 * @swagger
 * /trades/{id}:
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
router.post('/:id', tradesController.proposeTrade);

/**
 * @swagger
 * /trades/{id}/accept:
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
router.post('/:id/accept', tradesController.acceptTrade);

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
router.delete('/:id', tradesController.deleteTrade);

/**
 * @swagger
 * /trades/available:
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
router.get('/available', tradesController.getAvailableTrades);

/**
 * @swagger
 * /trades/completed:
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
router.get('/completed', tradesController.getCompletedTrades);

/**
 * @swagger
 * /trades/pending:
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
router.get('/pending', tradesController.getPendingTrades);

/**
 * @swagger
 * /trades/{id}/available:
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
router.get('/:id/available', tradesController.getFilteredAvailableTrades);

/**
 * @swagger
 * /trades/{id}/completed:
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
router.get('/:id/completed', tradesController.getFilteredCompletedTrades);

/**
 * @swagger
 * /trades/{id}/pending:
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
router.get('/:id/pending', tradesController.getFilteredPendingTrades);

module.exports = router;