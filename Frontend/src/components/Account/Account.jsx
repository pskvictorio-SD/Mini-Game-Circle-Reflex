import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Register } from "./Register.jsx";
import { Login } from "./Login.jsx";
import "../../styles/account.css";

export const Account = () => {
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
    <div className="account_card">
        <Register onSubmit={handleSubmit}></Register>
        <Login></Login>
    </div>
  );
};
