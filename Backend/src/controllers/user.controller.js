import { conn } from "../database/db.js";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
export const getUsers = (req, res) => {
  const query = `
      SELECT *
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

// Crear un nuevo usuario
export const createUser = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  // Contraseña encriptada
  const password_hash = bcrypt.hashSync(req.body.password, 10);

  // Verificar que los datos del usuario sean correctos
  if (!username || !email || !req.body.password) {
    return res.status(400).json({
      ok: false,
      message: "Faltan datos",
    });
  }

  // Verificar que el nombre de usuario no este ya en uso
  const queryCheckUsername = "SELECT * FROM users WHERE username = ?";
  conn.query(queryCheckUsername, [username], (err, results) => {
    if (err) {
      console.error("❌ Error al verificar usuario:", err);
      return res.status(500).json({
        ok: false,
        message: "Error del servidor",
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "El nombre que elegiste ya esta en uso",
      });
    } else {
      // Verificar si el email existe
      const queryCheck = "SELECT * FROM users WHERE email = ?";
      conn.query(queryCheck, [email], (err, results) => {
        if (err) {
          console.error("❌ Error al verificar usuario:", err);
          return res.status(500).json({
            ok: false,
            message: "Error del servidor",
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            ok: false,
            message: "El email que elegiste ya esta en uso",
          });
        } else {
          // En caso de que el usuario no exista, lo guarda en la base de datos
          const query =
            "INSERT INTO users (username, email, password_hash) VALUES (?,?,?)";
          conn.query(
            query,
            [username, email, password_hash],
            (err, results) => {
              if (err) {
                console.error("❌ Error al crear usuario:", err);
                return res.status(500).json({
                  ok: false,
                  message: "Error del servidor",
                });
              }
              res.status(200).json({
                ok: true
              });
            },
          );
        }
      });
    }
  });
};

// Obtener un usuario por su id
export const getUserById = (req, res) => {
  const id = req.params.id;

  const query = `
      SELECT *
      FROM users
      WHERE id = ?
    `;

  conn.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener usuario:", err);
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

// Obtener usuario por username y contraseña
export const getUserByUsername = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = `
      SELECT *
      FROM users
      WHERE username = ?
      AND password_hash = ?
    `;

  conn.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener usuario:", err);
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

// Obtener usuario por email y contraseña
export const getUserByEmail = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      ok: false,
      message: "Faltan datos",
    });
  }

  // Conseguir contraseña encriptada
  const query = "SELECT password_hash FROM users WHERE email = ?";
  conn.query(query, [email], (err, results) => {
    if (err) {
      console.error("❌ Error al obtener usuario:", err);
      return res.status(500).json({
        ok: false,
        message: "Error del servidor",
      });
    }
    // Comprobar si la contraseña es correcta
    // Si la contraseña es correcta, devolver datos del usuario
    if (bcrypt.compareSync(password, results[0].password_hash)) {
      const query = "SELECT * FROM users WHERE email = ?";
      conn.query(query, [email], (err, results) => {
        if (err) {
          console.error("❌ Error al obtener usuario:", err);
          return res.status(500).json({
            ok: false,
            message: "Error del servidor",
          });
        }
        res.status(200).json({
          ok: true
        });
      });
    }
    // Si la contraseña es incorrecta, devolver error
    else {
      return res.status(400).json({
        ok: false,
        message: "Contraseña incorrecta",
      });
    }
  });
};
