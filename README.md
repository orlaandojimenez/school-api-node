# Proyecto de API de Gestión de Usuarios

Este proyecto es una API RESTful para gestionar usuarios, con soporte para autenticación utilizando JWT, encriptación de contraseñas con bcrypt, y acceso a base de datos mediante MySQL.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior)
- **MySQL** (con una base de datos configurada)

## Instrucciones

### 1. Clonar el repositorio

Clona este repositorio a tu máquina local:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```

### 2. Instalar dependencias

Instala todas las dependencias necesarias utilizando npm:

```bash
npm install
```

Este comando instalará todas las librerías necesarias definidas en package.json, además de generar la base de datos junto con los stored procedures necesarios

### 3. Ejecutar el servidor

Una vez que hayas configurado el archivo .env y ejecutado los stored procedures, puedes iniciar el servidor con el siguiente comando:

```bash
npm start
```

El servidor estará disponible en http://localhost:3000.

### 4. Probar la API

La API incluye varios endpoints, tales como:
• POST /api/users: Crear un nuevo usuario.
• POST /api/login: Iniciar sesión y obtener un token JWT.
• GET /api/users: Obtener todos los usuarios.
• GET /api/users/{id}: Obtener un usuario por id.

El endpoint de crear usuario es público, de modo que se puedan crear usuarios para navegar por la api
Recuerda incluir el token JWT en los headers de las solicitudes a los endpoints protegidos.
