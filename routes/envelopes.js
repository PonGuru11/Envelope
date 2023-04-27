const express = require('express');
const router = express.Router();
const envelopesController = require('../controllers/envelopesController');

router.post('/', envelopesController.createEnvelope);

module.exports = router;
