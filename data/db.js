const mysql = require('mysql2');

// La configuración se lee de variables de entorno (ver .env.example).
// Los valores por defecto son los de un MySQL local, para que el proyecto
// siga arrancando sin configurar nada.
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestifleetbd'
});

module.exports = pool;
