const express = require("express");
const { createMateria } = require("../controllers/materiaController");

const router = express.Router();

router.post("/", createMateria);

module.exports = router;
