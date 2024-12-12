const { pool } = require("../../db/config");

const createMateria = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res
      .status(400)
      .json({ error: "El nombre de la materia es obligatorio." });
  }

  try {
    const [result] = await pool.execute("CALL insert_materia(?)", [nombre]);
    res.status(201).json({ message: "Materia creada exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear la materia.", details: error.message });
  }
};

module.exports = { createMateria };
