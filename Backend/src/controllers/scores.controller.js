import { conn } from "../database/db.js";

// GET /api/scores
export const getScores = (req, res) => {
  const query =
    "SELECT username, score, incorrect_clicks, duration, level FROM scores ORDER BY score DESC LIMIT 10";
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
export const createScore = (req, res) => {
  const { score, duration, incorrectClicks,level } = req.body;
  const { id, username } = req.user;

  const query = `
    INSERT INTO scores (user_id, username, score, duration, incorrect_clicks, level)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  conn.query(
    query,
    [id, username, score, duration, incorrectClicks,level],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al guardar score" });
      }
      res.status(201).json({ ok: true });
    }
  );
};
