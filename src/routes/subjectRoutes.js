const express = require("express");
const { createSubject } = require("../controllers/subjectController");
const { authenticateToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/", authenticateToken, createSubject);

module.exports = router;
