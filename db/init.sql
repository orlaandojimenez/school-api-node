CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS Alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50),
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    estatus ENUM('activo', 'inactivo', 'suspendido') NOT NULL,
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS Grados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE,  
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS Materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,  
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS Calificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_grado INT NOT NULL,
    id_materia INT NOT NULL,
    calificacion DECIMAL(5, 2) NOT NULL,
    mes INT NOT NULL, 
    anio INT NOT NULL, 
    FOREIGN KEY (id_alumno) REFERENCES Alumnos(id),
    FOREIGN KEY (id_grado) REFERENCES Grados(id),
    FOREIGN KEY (id_materia) REFERENCES Materias(id),
    CONSTRAINT unique_calificaciones UNIQUE (id_alumno, id_grado, id_materia, calificacion, mes, anio)
);
