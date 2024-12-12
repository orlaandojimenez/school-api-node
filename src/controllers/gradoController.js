const { pool } = require("../../db/config");

const createGrado = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res
      .status(400)
      .json({ error: "El nombre del grado es obligatorio." });
  }

  try {
    const [result] = await pool.execute("CALL insert_grado(?)", [nombre]);
    res.status(201).json({ message: "Grado creado exitosamente." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el grado.", details: error.message });
  }
};

module.exports = { createGrado };
