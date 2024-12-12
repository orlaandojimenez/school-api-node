const { pool } = require("../../db/config");
const { validateRequiredFields } = require("../helpers");

const createStudent = async (req, res) => {
  const { first_name, last_name, middle_name, birth_date, gender } = req.body;

  if (!validateRequiredFields(req.body)) {
    return res.status(400).json({ error: "Missing information" });
  }

  try {
    await pool.execute("CALL insert_student(?,?,?,?,?)", [
      first_name,
      last_name,
      middle_name,
      birth_date,
      gender,
    ]);
    res
      .status(201)
      .json({ message: "The student has been created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error on creteStudent", details: error.message });
  }
};

const getStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  try {
    const [rows] = await pool.execute("CALL get_students(?, ?)", [
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
      .json({ error: "Error on getStudents", details: error.message });
  }
};

const searchStudents = async (req, res) => {
  const { id, name, page = 1, pageSize = 10 } = req.query;
  if (!id && !name) {
    return res
      .status(400)
      .json({ error: "You must provide an id or name to search." });
  }

  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  try {
    const [result, totalResult] = await pool.execute(
      "CALL search_students(?, ?, ?, ?)",
      [id || null, name || null, limit, offset]
    );

    const data = result[0] || [];
    const totalRows = totalResult[0]?.total_records || 0;

    res.status(200).json({
      total: totalRows,
      page: parseInt(page, 10),
      pageSize: limit,
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error on searchStudents", details: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, middle_name, birth_date, gender, status } =
    req.body;

  const params = [
    first_name !== undefined ? first_name : null,
    last_name !== undefined ? last_name : null,
    middle_name !== undefined ? middle_name : null,
    birth_date !== undefined ? birth_date : null,
    gender !== undefined ? gender : null,
    status !== undefined ? status : null,
  ];

  try {
    await pool.execute("CALL update_student(?, ?, ?, ?, ?, ?, ?)", [
      id,
      ...params,
    ]);

    res
      .status(200)
      .json({ message: "The student has been updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Error on updateStudent",
      details: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.execute("CALL delete_student(?)", [id]);
    res
      .status(200)
      .json({ message: "The student has been deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error on deleteStudent", details: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  searchStudents,
  updateStudent,
  deleteStudent,
};
