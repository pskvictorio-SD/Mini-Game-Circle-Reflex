import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const Login = () => {
  const { request, data, loading, error } = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    request("http://localhost:3000/api/users/login/email", "POST", {
      email,
      password,
    });

    console.log(data);
  }
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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};
