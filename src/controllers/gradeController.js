const { pool } = require("../../db/config");

const createGrade = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "The name is required" });
  }

  try {
    const [result] = await pool.execute("CALL insert_grade(?)", [name]);
    res
      .status(201)
      .json({ message: "The grade has been created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error on createGrade", details: error.message });
  }
};

module.exports = { createGrade };
