require('dotenv').config(); 

module.exports = {
  "development": {
    "database": process.env.DB_NAME,   // ← Nombre de la DB previamente creada
    "username": process.env.DB_USER, // ← Usuario de la DB
    "password": process.env.DB_PASS, // ← Contraseña del usuario de la DB
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}