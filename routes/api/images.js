const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/images');

router.post('/', imageController.create);
router.post('/index', imageController.index);




module.exports = router;