import { Register } from "./Register.jsx";
import { Login } from "./Login.jsx";
import "../../styles/account.css";
import { useState } from "react";

const Account = () => {
  const [isOnRegister, setIsOnRegister] = useState(true);
  const [animation, setAnimation] = useState("slide-in-right");

  function handleIsOnRegister() {
    // Si estamos en register y vamos a login → slide izquierda
    const exitAnimation = isOnRegister
      ? "slide-out-left"
      : "slide-out-right";

    const enterAnimation = isOnRegister
      ? "slide-in-right"
      : "slide-in-left";

    setAnimation(exitAnimation);

    setTimeout(() => {
      setIsOnRegister((prev) => !prev);
      setAnimation(enterAnimation);
    }, 300);
  }

  return (
    <div className={`account_card auth_transition ${animation}`}>
      {isOnRegister ? (
        <Register onRestart={handleIsOnRegister} />
      ) : (
        <Login onRestart={handleIsOnRegister} />
      )}
    </div>
  );
};

export default Account;