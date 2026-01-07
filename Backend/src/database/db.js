import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const conn = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a la base de datos:", err.message);
  } else {
    console.log("Conexion a base de datos exitosa");
  }
});
