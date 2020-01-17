const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/images');

router.post('/', imageController.create);




module.exports = router;