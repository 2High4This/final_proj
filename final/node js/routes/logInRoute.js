const express = require('express');
const router = express.Router();
const logInController = require('../controllers/logIn');

router.post('/', logInController.logIn);

module.exports = router;