const express = require("express");
const { createGrado } = require("../controllers/gradoController");

const router = express.Router();

router.post("/", createGrado);

module.exports = router;
