const { pool } = require("../../db/config");
const bcrypt = require("bcrypt");
const { validateRequiredFields } = require("../helpers");

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!validateRequiredFields(req.body)) {
    return res.status(400).json({
      error: "Both 'username' and 'password' are required.",
    });
  }

  try {
    const [[user]] = await pool.execute("CALL get_user(?, ?)", [
      null,
      username,
    ]);
    if (user.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute("CALL create_user(?, ?)", [username, hashedPassword]);

    res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the user.",
      details: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  try {
    const [rows] = await pool.execute("CALL get_users(?, ?)", [
      parseInt(limit),
      parseInt(offset),
    ]);

    const totalRows = rows[0][0].total_records;
    const data = rows[1];

    res.status(200).json({
      page: parseInt(page, 10),
      pageSize: limit,
      totalRows,
      totalPages: Math.ceil(totalRows / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error on getUsers",
      details: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { id, username } = req.query;

  try {
    const [[user]] = await pool.execute("CALL get_user(?, ?)", [
      id || null,
      username || null,
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Error on getUser",
      details: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
};
