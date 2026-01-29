import { useState, useEffect, use } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export const Register = ({ onRestart }) => {
  const { request, data, loading, error } = useFetch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(null);
  const navigate = useNavigate();

  // Validacion de campos
  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setInputError("Todos los campos son obligatorios");
      return false;
    }

    if (username.length < 6) {
      setInputError("El nombre de usuario debe tener al menos 6 caracteres");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInputError("Email inválido");
      return false;
    }

    if (password.length < 6) {
      setInputError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    setInputError(null);
    return true;
  };

  // Mostrar error en tiempo real
  useEffect(() => {
    if (inputError) validateForm();
  }, [username, email, password]);

  // Enviar formulario al backend
  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    request("http://localhost:3000/api/users", "POST", {
      username,
      email,
      password,
    });

    // Resetear formulario
    setUsername("");
    setEmail("");
    setPassword("");
  }

  // Mostrar mensaje de error
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  // Guardar token en localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/game");
    }
  }, [data]);

  return (
    <div className="register_component">
      {/* Tarjeta de llamada a Iniciar sesión */}
      <div className="login_call">
        <h1>Bienvenido de nuevo</h1>
        <p>Inicia sesión para continuar</p>
        <button onClick={onRestart}>Iniciar sesión</button>
      </div>

      {/* Formulario */}
      <div className="register_card">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            placeholder="Nombre de usuario"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            placeholder="Contraseña"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {inputError && <p className="error">{inputError}</p>}

          <button type="submit">Crear cuenta</button>
        </form>
      </div>
    </div>
  );
};
