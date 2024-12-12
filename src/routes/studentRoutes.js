const express = require("express");
const {
  createStudent,
  getStudents,
  searchStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { authenticateToken } = require("../middlewares/authToken");

const router = express.Router();

router.post("/", authenticateToken, createStudent);
router.get("/", authenticateToken, getStudents);
router.get("/search", authenticateToken, searchStudents);
router.put("/:id", authenticateToken, updateStudent);
router.delete("/:id", authenticateToken, deleteStudent);

module.exports = router;
