const express = require('express');
const router = express.Router();
const newUserController = require('.././controllers/newUser');

router.post('/', newUserController.addUser);

module.exports = router;