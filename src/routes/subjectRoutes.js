const express = require("express");
const {
  createSubject,
  getSubjects,
} = require("../controllers/subjectController");
const { authenticateToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/", authenticateToken, createSubject);
router.get("/", authenticateToken, getSubjects);

module.exports = router;
