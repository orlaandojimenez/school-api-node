const express = require("express");
const { createGrade } = require("../controllers/gradeController");

const router = express.Router();

router.post("/", createGrade);

module.exports = router;
