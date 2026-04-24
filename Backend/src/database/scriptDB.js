import db from "./db.js";

const initQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    `;


    const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
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