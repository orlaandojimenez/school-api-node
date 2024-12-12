const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  login,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authToken");

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.get("/search", authenticateToken, getUser);
router.post("/", authenticateToken, createUser);
router.post("/login", login);

module.exports = router;
