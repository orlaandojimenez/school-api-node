CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS Alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    estatus ENUM('activo', 'inactivo', 'suspendido') NOT NULL DEFAULT 'activo',
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
    mes INT NOT NULL, 
    calificacion DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (id_alumno) REFERENCES Alumnos(id),
    FOREIGN KEY (id_grado) REFERENCES Grados(id),
    FOREIGN KEY (id_materia) REFERENCES Materias(id),
    CONSTRAINT unique_calificaciones UNIQUE (id_alumno, id_grado, id_materia, calificacion, mes)
);

DROP PROCEDURE IF EXISTS insert_grado;
CREATE PROCEDURE insert_grado(IN p_nombre VARCHAR(20))
BEGIN
    INSERT INTO Grados (nombre) VALUES (p_nombre);
END;

DROP PROCEDURE IF EXISTS insert_materia;
CREATE PROCEDURE insert_materia(IN p_nombre VARCHAR(50))
BEGIN
    INSERT INTO Materias (nombre) VALUES (p_nombre);
END;

DROP PROCEDURE IF EXISTS insert_alumno;
CREATE PROCEDURE insert_alumno(IN 
    p_nombre VARCHAR(50), 
    p_apellido_paterno VARCHAR(50), 
    p_apellido_materno VARCHAR(50), 
    p_fecha_nacimiento DATE, 
    p_genero CHAR(1))
BEGIN
    INSERT INTO Alumnos 
        (nombre, apellido_paterno, apellido_materno, fecha_nacimiento, genero) 
    VALUES 
        (p_nombre, p_apellido_paterno, p_apellido_materno, p_fecha_nacimiento, p_genero);
END;

DROP PROCEDURE IF EXISTS get_alumnos;
CREATE PROCEDURE get_alumnos(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT COUNT(*) AS total_registros FROM Alumnos;

    SELECT * FROM Alumnos ORDER BY id LIMIT p_limit OFFSET p_offset;
END;

DROP PROCEDURE IF EXISTS update_alumno;
CREATE PROCEDURE update_alumno(
    IN p_id INT,
    IN p_nombre VARCHAR(50),
    IN p_apellido_paterno VARCHAR(50),
    IN p_apellido_materno VARCHAR(50),
    IN p_fecha_nacimiento DATE,
    IN p_genero ENUM('M', 'F'),
    IN p_estatus ENUM('activo', 'inactivo', 'suspendido')
)
BEGIN
    UPDATE Alumnos
    SET 
        nombre = IF(p_nombre IS NOT NULL, p_nombre, nombre),
        apellido_paterno = IF(p_apellido_paterno IS NOT NULL, p_apellido_paterno, apellido_paterno),
        apellido_materno = IF(p_apellido_materno IS NOT NULL, p_apellido_materno, apellido_materno),
        fecha_nacimiento = IF(p_fecha_nacimiento IS NOT NULL, p_fecha_nacimiento, fecha_nacimiento),
        genero = IF(p_genero IS NOT NULL, p_genero, genero),
        estatus = IF(p_estatus IS NOT NULL, p_estatus, estatus)
    WHERE id = p_id;
END;

DROP PROCEDURE IF EXISTS delete_alumno;
CREATE PROCEDURE delete_alumno(IN p_id INT)
BEGIN
    DELETE FROM Alumnos WHERE id = p_id;
END;

DROP PROCEDURE IF EXISTS search_alumnos;
CREATE PROCEDURE search_alumnos(
    IN p_id INT,
    IN p_nombre VARCHAR(50),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    DECLARE total INT;

    IF p_id IS NOT NULL THEN
        SELECT COUNT(*) INTO total
        FROM Alumnos
        WHERE id = p_id;
    ELSEIF p_nombre IS NOT NULL THEN
        SELECT COUNT(*) INTO total
        FROM Alumnos
        WHERE nombre LIKE CONCAT('%', p_nombre, '%')
           OR apellido_paterno LIKE CONCAT('%', p_nombre, '%')
           OR apellido_materno LIKE CONCAT('%', p_nombre, '%');
    ELSE
        SELECT COUNT(*) INTO total
        FROM Alumnos;
    END IF;

    IF p_id IS NOT NULL THEN
        SELECT *, total AS total_registros
        FROM Alumnos
        WHERE id = p_id
        LIMIT p_limit OFFSET p_offset;
    ELSEIF p_nombre IS NOT NULL THEN
        SELECT *, total AS total_registros
        FROM Alumnos
        WHERE nombre LIKE CONCAT('%', p_nombre, '%')
           OR apellido_paterno LIKE CONCAT('%', p_nombre, '%')
           OR apellido_materno LIKE CONCAT('%', p_nombre, '%')
        LIMIT p_limit OFFSET p_offset;
    ELSE
        SELECT *, total AS total_registros
        FROM Alumnos
        LIMIT p_limit OFFSET p_offset;
    END IF;
END;