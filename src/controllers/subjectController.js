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

const getSubjects = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  try {
    const [rows] = await pool.execute("CALL get_subjects(?, ?)", [
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
    res
      .status(500)
      .json({ error: "Error on getSubjects", details: error.message });
  }
};

module.exports = { createSubject, getSubjects };
