const express = require('express');
const router = express.Router();
const getTasksController = require('../controllers/getTasks');

router.get('/', getTasksController.getTasks);

module.exports = router;