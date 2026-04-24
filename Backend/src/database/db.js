import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const conn = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});



const initDB = async () => {
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        username VARCHAR(50) NOT NULL,
        score INTEGER NOT NULL,
        incorrect_clicks INTEGER NOT NULL,
        duration INTEGER,
        level INTEGER NOT NULL,
        played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("Tablas creadas correctamente");
  } catch (error) {
    console.error("Error creando tablas", error);
  }
};

conn.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error conectando a la DB", err);
  } else {
    console.log("DB conectada:", res.rows);
  }
});

export { conn };