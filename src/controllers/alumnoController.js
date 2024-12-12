const { pool } = require("../../db/config");
const { validateRequiredFields } = require("../helpers");

const createAlumno = async (req, res) => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    genero,
  } = req.body;

  if (!validateRequiredFields(req.body)) {
    return res.status(400).json({ error: "Falta información requerida" });
  }

  try {
    await pool.execute("CALL insert_alumno(?,?,?,?,?)", [
      nombre,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento,
      genero,
    ]);
    res.status(201).json({ message: "Alumno creado exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el alumno.", details: error.message });
  }
};

const getAlumnos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  try {
    const [rows] = await pool.execute("CALL get_alumnos(?, ?)", [
      parseInt(limit),
      parseInt(offset),
    ]);

    const totalRegistros = rows[0][0].total_registros;
    const data = rows[1];

    res.status(200).json({
      page: parseInt(page, 10),
      pageSize: limit,
      totalRegistros,
      totalPages: Math.ceil(totalRegistros / limit),
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los alumnos.", details: error.message });
  }
};

const searchAlumnos = async (req, res) => {
  const { id, nombre, page = 1, pageSize = 10 } = req.params;

  if (!validateRequiredFields(id, nombre)) {
    return res
      .status(400)
      .json({ error: "Debes proporcionar un ID o un nombre para buscar." });
  }

  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  try {
    const [result] = await pool.execute("CALL search_alumnos(?, ?, ?, ?)", [
      id || null,
      nombre || null,
      limit,
      offset,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Alumno no encontrado." });
    }

    const totalRegistros = result[0]?.total_registros || 0;
    const data = result.map((alumno) => {
      const { total_registros, ...rest } = alumno;
      return rest;
    });

    res.status(200).json({
      total: totalRegistros,
      page: parseInt(page, 10),
      pageSize: limit,
      data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el alumno.", details: error.message });
  }
};

const updateAlumno = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    fecha_nacimiento,
    genero,
    estatus,
  } = req.body;

  const params = [
    nombre !== undefined ? nombre : null,
    apellido_paterno !== undefined ? apellido_paterno : null,
    apellido_materno !== undefined ? apellido_materno : null,
    fecha_nacimiento !== undefined ? fecha_nacimiento : null,
    genero !== undefined ? genero : null,
    estatus !== undefined ? estatus : null,
  ];

  try {
    await pool.execute("CALL update_alumno(?, ?, ?, ?, ?, ?, ?)", [
      id,
      ...params,
    ]);

    res.status(200).json({ message: "Alumno actualizado exitosamente." });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el alumno.",
      details: error.message,
    });
  }
};

const deleteAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.execute("CALL delete_alumno(?)", [id]);
    res.status(200).json({ message: "Alumno eliminado exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el alumno.", details: error.message });
  }
};

module.exports = {
  createAlumno,
  getAlumnos,
  searchAlumnos,
  updateAlumno,
  deleteAlumno,
};
