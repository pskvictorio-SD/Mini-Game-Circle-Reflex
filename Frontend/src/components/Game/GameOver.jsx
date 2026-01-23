import { Ranking } from "../Ranking/Ranking.jsx";

export const GameOver = ({ score, level, onRestart }) => {
  return (
    <div className="gameover_card">
      <h1>Game Over</h1>
      <p>Puntaje: {score}</p>
      <p>Nivel alcanzado: {level}</p>

      <hr />

      <Ranking></Ranking>

      <button onClick={onRestart} className="btn_restart">
        Continuar
      </button>
    </div>
  );
};
