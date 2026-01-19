import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const conn = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const initQuery = `
    CREATE DATABASE IF NOT EXISTS minigame_db;
    USE minigame_db;

    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS scores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        username VARCHAR (50) NOT NULL,
        score INT NOT NULL,
        incorrect_clicks INT NOT NULL,
        duration INT COMMENT 'Duración de la partida en segundos',
        level INT NOT NULL,
        played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    console.log(process.env.DB_USER)

conn.connect((err) => {
  if (err) {
    return console.log("Error de conexion", err);
  }
  conn.query(initQuery, (err, results) => {
    if (err) {
      console.log("Error ejecutando script SQL", err);
    }
    console.log("✅ Base de datos y tablas creadas correctamente");
    process.exit(1);
  });
});
