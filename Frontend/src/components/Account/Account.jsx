import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Register } from "./Register.jsx";
import { Login } from "./Login.jsx";
import "../../styles/account.css";

const Account = () => {
  const { request, data, loading, error } = useFetch();

  return (
    <div className="account_card">
        <Register></Register>
        <Login></Login>
    </div>
  );
};

export default Account;