const express = require("express");
const { createGrade, getGrades } = require("../controllers/gradeController");
const { authenticateToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/", authenticateToken, createGrade);
router.get("/", authenticateToken, getGrades);

module.exports = router;
