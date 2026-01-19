import { useGameEngine } from "../hooks/useGameEngine.js";
import { useEffect } from "react";

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
  } = useGameEngine();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const circles = container.querySelectorAll(".circle");
      circles.forEach((circle) => moveCircleSlightly(circle, container));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="container_game">
      <button onClick={controlGame}>Start</button>
      <p>Tiempo: {timeLeft}s</p>
      <p>Nivel: {level}</p>
      <p>
        Good Circles: {circles.filter((circle) => circle.type === "good").length}
      </p>
      <p>Lives: {lives}</p>
      <p>Score: {score}</p>

      {circles.map((circle) => (
        <div
          onFocus={() => controlGame(circle.id, circle.type)}
          key={circle.id}
          tabIndex={0}
          className={`circle ${circle.className}`}
          style={{
            left: circle.x,
            top: circle.y,
          }}
        />
      ))}
    </div>
  );
};
