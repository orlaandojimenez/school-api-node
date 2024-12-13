CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    username VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    gender ENUM('M', 'F') NOT NULL,
    status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS Grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,  
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS Subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,  
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS Scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    grade_id INT NOT NULL,
    subject_id INT NOT NULL,
    month INT NOT NULL, 
    score DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(id),
    FOREIGN KEY (grade_id) REFERENCES Grades(id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(id),
    CONSTRAINT unique_scores UNIQUE (student_id, grade_id, subject_id, score, month)
);

DROP PROCEDURE IF EXISTS insert_grade;
CREATE PROCEDURE insert_grade(IN p_name VARCHAR(20))
BEGIN
    INSERT INTO Grades (name) VALUES (p_name);
END;

DROP PROCEDURE IF EXISTS get_grades;
CREATE PROCEDURE get_grades(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT COUNT(*) AS total_records FROM Grades;

    SELECT * FROM Grades ORDER BY id LIMIT p_limit OFFSET p_offset;
END;

DROP PROCEDURE IF EXISTS insert_subject;
CREATE PROCEDURE insert_subject(IN p_name VARCHAR(50))
BEGIN
    INSERT INTO Subjects (name) VALUES (p_name);
END;

DROP PROCEDURE IF EXISTS get_subjects;
CREATE PROCEDURE get_subjects(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT COUNT(*) AS total_records FROM Subjects;

    SELECT * FROM Subjects ORDER BY id LIMIT p_limit OFFSET p_offset;
END;

DROP PROCEDURE IF EXISTS insert_student;
CREATE PROCEDURE insert_student(
    IN p_first_name VARCHAR(50), 
    IN p_last_name VARCHAR(50), 
    IN p_middle_name VARCHAR(50), 
    IN p_birth_date DATE, 
    IN p_gender CHAR(1)
)
BEGIN
    INSERT INTO Students 
        (first_name, last_name, middle_name, birth_date, gender) 
    VALUES 
        (p_first_name, p_last_name, p_middle_name, p_birth_date, p_gender);
END;

DROP PROCEDURE IF EXISTS get_students;
CREATE PROCEDURE get_students(
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SELECT COUNT(*) AS total_records FROM Students;

    SELECT * FROM Students ORDER BY id LIMIT p_limit OFFSET p_offset;
END;

DROP PROCEDURE IF EXISTS update_student;
CREATE PROCEDURE update_student(
    IN p_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_middle_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_gender ENUM('M', 'F'),
    IN p_status ENUM('active', 'inactive', 'suspended')
)
BEGIN
    UPDATE Students
    SET 
        first_name = IF(p_first_name IS NOT NULL, p_first_name, first_name),
        last_name = IF(p_last_name IS NOT NULL, p_last_name, last_name),
        middle_name = IF(p_middle_name IS NOT NULL, p_middle_name, middle_name),
        birth_date = IF(p_birth_date IS NOT NULL, p_birth_date, birth_date),
        gender = IF(p_gender IS NOT NULL, p_gender, gender),
        status = IF(p_status IS NOT NULL, p_status, status)
    WHERE id = p_id;
END;

DROP PROCEDURE IF EXISTS delete_student;
CREATE PROCEDURE delete_student(IN p_id INT)
BEGIN
    DELETE FROM Students WHERE id = p_id;
END;

DROP PROCEDURE IF EXISTS search_students;
CREATE PROCEDURE search_students(
    IN p_id INT,
    IN p_name VARCHAR(50),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    DECLARE total INT;

    IF p_id IS NOT NULL THEN
        SELECT COUNT(*) INTO total
        FROM Students
        WHERE id = p_id;
    ELSEIF p_name IS NOT NULL THEN
        SELECT COUNT(*) INTO total
        FROM Students
        WHERE first_name LIKE CONCAT('%', p_name, '%')
           OR last_name LIKE CONCAT('%', p_name, '%')
           OR middle_name LIKE CONCAT('%', p_name, '%');
    ELSE
        SELECT COUNT(*) INTO total
        FROM Students;
    END IF;

    IF p_id IS NOT NULL THEN
        SELECT id, first_name, last_name, middle_name, birth_date, gender, status
        FROM Students
        WHERE id = p_id
        LIMIT p_limit OFFSET p_offset;
    ELSEIF p_name IS NOT NULL THEN
        SELECT id, first_name, last_name, middle_name, birth_date, gender, status
        FROM Students
        WHERE first_name LIKE CONCAT('%', p_name, '%')
           OR last_name LIKE CONCAT('%', p_name, '%')
           OR middle_name LIKE CONCAT('%', p_name, '%')
        LIMIT p_limit OFFSET p_offset;
    ELSE
        SELECT id, first_name, last_name, middle_name, birth_date, gender, status
        FROM Students
        LIMIT p_limit OFFSET p_offset;
    END IF;

    SELECT total AS total_records;
END;

DROP PROCEDURE IF EXISTS create_user;
CREATE PROCEDURE create_user(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO Users (username, password)
    VALUES (p_username, p_password);
END; 

DROP PROCEDURE IF EXISTS get_users;
CREATE PROCEDURE get_users(
    IN p_limit INT,  
    IN p_offset INT
)
BEGIN
    SELECT COUNT(*) AS total_records
    FROM Users;

    SELECT id, username, created_at, updated_at
    FROM Users
    LIMIT p_offset, p_limit;
END;

DROP PROCEDURE IF EXISTS get_user;
CREATE PROCEDURE get_user(
    IN p_id INT,  
    IN p_username VARCHAR(50)  
)
BEGIN
    IF p_id IS NOT NULL THEN
        SELECT id, username, created_at, updated_at
        FROM Users
        WHERE id = p_id;
    ELSEIF p_username IS NOT NULL THEN
        SELECT id, username, created_at, updated_at
        FROM Users
        WHERE username = p_username;
    END IF;
END;

DROP PROCEDURE IF EXISTS get_user_login;
CREATE PROCEDURE get_user_login(
    IN p_username VARCHAR(50)  
)
BEGIN
    SELECT * FROM Users
    WHERE username = p_username;
END;