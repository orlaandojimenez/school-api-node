const express = require("express");
const { createGrade } = require("../controllers/gradeController");
const { authenticateToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/", authenticateToken, createGrade);

module.exports = router;
