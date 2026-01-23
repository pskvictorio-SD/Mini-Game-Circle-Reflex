import { useGameEngine } from "../hooks/useGameEngine";
import { GameOver } from "./GameOver";
import { Interfaze } from "./GameHUD";

export const Game = () => {
  const game = useGameEngine();

  return (
    <div className="game_wrapper">
      {game.isGameOver ? (
        <GameOver
          score={game.score}
          level={game.level}
          onRestart={game.resetGame}
        />
      ) : (
        <Interfaze {...game} />
      )}
    </div>
  );
};
