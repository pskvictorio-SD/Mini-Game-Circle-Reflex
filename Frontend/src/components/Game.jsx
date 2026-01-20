import { useGameEngine } from "../hooks/useGameEngine";
import { useEffect } from "react";
import "./game.css"

export const Game = () => {
  const {
    controlGame,
    moveCircleSlightly,
    level,
    score,
    lives,
    timeLeft,
    circles,
    containerRef,
    isPlaying,
  } = useGameEngine();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const elements = container.querySelectorAll(".circle");
      elements.forEach((circle) =>
        moveCircleSlightly(circle, container)
      );
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game_wrapper">
      
      {/* HUD */}
      <div className="hud">
        <div className="hud_main">
          <span>⏱ {timeLeft}s</span>
          <span>❤️ {lives}</span>
          <span>⭐ {score}</span>
        </div>
        <div className="hud_level">Nivel {level}</div>
      </div>

      {/* GAME AREA */}
      <div ref={containerRef} className="container_game">
        {circles.map((circle) => (
          <div
            key={circle.id}
            onClick={() => controlGame(circle.id, circle.type)}
            className={`circle ${circle.className}`}
            style={{
              left: circle.x,
              top: circle.y,
            }}
          />
        ))}
      </div>

      {/* CONTROLES */}
      {!isPlaying && (
        <button className="btn_start" onClick={controlGame}>
          ▶ Start
        </button>
      )}
    </div>
  );
};
