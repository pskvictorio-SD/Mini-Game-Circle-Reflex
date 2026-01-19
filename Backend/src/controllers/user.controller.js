import { conn } from "../database/db.js";

export const getUsers = (req, res) => {
  const query = `
      SELECT id, username, created_at
      FROM users
    `;

  conn.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener usuarios:", err);
      return res.status(500).json({
        ok: false,
        message: "Error del servidor",
      });
    }

    res.status(200).json({
      ok: true,
      data: results,
    });
  });
};
