import { conn } from "../database/db.js";

// GET /api/scores
export const getScores = (req, res) => {
  const query =
    "SELECT username, score, incorrect_clicks, duration FROM scores ORDER BY score DESC LIMIT 10";
  conn.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error al obtener las partidas:", err);
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
// POST /api/scores
export const createScores = (req, res) => {
  const { user_id, username, score, incorrect_clicks, duration,level } = req.body;
  if (user_id || username || score || incorrect_clicks || duration === null) {
    return res.status(400).json({
      ok: false,
      message: "Datos incompletos",
    });
  }

  const query =
    "INSERT INTO scores (user_id, username, score, incorrect_clicks, duration, level) VALUES (?, ?, ?, ?, ?, ?);";
  conn.query(
    query,
    [user_id, username, score, incorrect_clicks, duration,level],
    (err, results) => {
      if (err) {
        console.log("❌ Error al cargar las partidas:", err);
        return res.status(500).json({
          ok: false,
          message: "Error del servidor",
        });
      }
      res.status(200).json({
        ok: true,
        message: "Partida guardada con exito"
      });
    }
  );
};
