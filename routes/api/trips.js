const express = require('express');
const router = express.Router();
const tripsController = require('../../controllers/trips');

router.post('/create', tripsController.create);
router.get('/index', tripsController.index);

module.exports = router;