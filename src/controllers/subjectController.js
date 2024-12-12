const { pool } = require("../../db/config");

const createSubject = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "The name is required" });
  }

  try {
    const [result] = await pool.execute("CALL insert_subject(?)", [name]);
    res
      .status(201)
      .json({ message: "The subject has been created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error on createSubject", details: error.message });
  }
};

module.exports = { createSubject };
