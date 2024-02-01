// src/routes/webhookRoutes.js

const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

// Atualize a rota para aceitar POSTs em /webhook
router.post('/', webhookController.handleWebhook);

module.exports = router;

