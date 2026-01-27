import { useState,useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const { request, data, loading, error } = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(null);
  const navigate = useNavigate();

  // Validacion de campos
  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setInputError("Todos los campos son obligatorios");
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
  }, [email, password]);

  // Funcion para enviar el formulario al backend
  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    request("http://localhost:3000/api/users/login/email", "POST", {
      email,
      password,
    });
  }

  // Guardar token en localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      navigate("/game");
    }
  }, [data]);
  return (
    <div className="login_card">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          type="email"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          required
          placeholder="Contraseña"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {inputError && <p className="error">{inputError}</p>}

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};
