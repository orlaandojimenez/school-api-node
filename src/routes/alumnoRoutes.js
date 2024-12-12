const express = require("express");
const {
  createAlumno,
  getAlumnos,
  searchAlumnos,
  updateAlumno,
  deleteAlumno,
} = require("../controllers/alumnoController");

const router = express.Router();

router.post("/", createAlumno);
router.get("/", getAlumnos);
router.get("/:id", searchAlumnos);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);

module.exports = router;
