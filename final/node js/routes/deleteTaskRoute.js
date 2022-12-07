const express = require("express");
const router = express.Router();
const deleteTaskController = require("../controllers/deleteTask");

router.post("/", deleteTaskController.deleteTask);

module.exports = router;
