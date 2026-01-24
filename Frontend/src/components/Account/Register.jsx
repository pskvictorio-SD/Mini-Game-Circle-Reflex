import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const Register = () => {
  const { request, data, loading, error } = useFetch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    request("http://localhost:3000/api/users", "POST", {
      username,
      email,
      password,
    });
  }

  return (
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
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
};
