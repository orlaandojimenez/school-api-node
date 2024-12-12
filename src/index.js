const express = require("express");
const gradoRoutes = require("./routes/gradoRoutes");
const materiaRoutes = require("./routes/materiaRoutes");
const alumnoRoutes = require("./routes/alumnoRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/api/grados", gradoRoutes);
app.use("/api/materias", materiaRoutes);
app.use("/api/alumnos", alumnoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
