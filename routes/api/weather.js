const express = require('express');
const router = express.Router();
const weatherController = require('../../controllers/weather');

router.post('/', weatherController.index);


module.exports = router;