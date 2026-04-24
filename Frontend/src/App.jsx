import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./utils/protectedRoute.jsx";

import Game from "./components/Game/Game.jsx";
import Account from "./components/Account/Account.jsx";
import "./main.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  console.log("API:", import.meta.env.VITE_API_URL);
  return (
    <Routes>
      <Route path="/" element={<Account />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
