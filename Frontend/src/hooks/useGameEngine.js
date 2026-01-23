import { useState, useEffect, useRef } from "react";
import { useFetch } from "./useFetch.js";
import { getTimeBonusByLevel } from "../utils/levelUpTime.js";
import { getCirclesByLevel } from "../utils/getCirclesByLevel.js";
import goodCircleSound from "../assets/goodCircleSound.mp3";
import badCircleSound from "../assets/badCircleSound.mp3";
import instantKillSound from "../assets/instantKillSound.mp3";

export const useGameEngine = () => {
  const { request, data, loading, error } = useFetch();

  const INITIAL_TIME = 30;
  const INITIAL_LIVES = 3;
  const INITIAL_LEVEL = 1;

  // Estados para manejar logica del juego
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [circles, setCircles] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  // Estados para manejar logica de juego y mandar al backend datos de la partida
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [duration, setDuration] = useState(0);
  const [incorrectClicks, setIncorrectClicks] = useState(0);

  const containerRef = useRef(null);

  // Funcion para manejar los niveles
  const handleLevelUp = () => {
    setLevel((prevLevel) => prevLevel + 1);

    // Aumentar tiempo por nivel
    const timeBonus = getTimeBonusByLevel(level + 1);
    setTimeLeft((prevTime) => prevTime + timeBonus);

    generateCircles();
  };

  // Funcion para generar los circulos asignandoles posiciones aleatorias
  function generateCircles() {
    // Funcion para generar una posicion aleatoria dentro del contenedor
    function getRandomPosition() {
      const container = containerRef.current;
      if (!container) return { top: 0, left: 0 };

      const circleSize = 22;

      const maxX = container.clientWidth - circleSize;
      const maxY = container.clientHeight - circleSize;
      return {
        left: Math.random() * maxX,
        top: Math.random() * maxY,
      };
    }

    // Funcion para calcular cantidad de circulos que se crearan segun el nivel
    getCirclesByLevel(level);

    const newCircles = [];

    const {
      good: circlesGood,
      bad: circlesBad,
      time: circlesTime,
      kill: circlesKill,
    } = getCirclesByLevel(level);

    // Circulos buenos
    for (let i = 0; i < circlesGood; i++) {
      const pos = getRandomPosition();

      newCircles.push({
        id: crypto.randomUUID(),
        x: pos.left,
        y: pos.top,
        type: "good",
        className: "circle_good",
      });
    }

    // Circulos malos
    for (let i = 0; i < circlesBad; i++) {
      const pos = getRandomPosition();

      newCircles.push({
        id: crypto.randomUUID(),
        x: pos.left,
        y: pos.top,
        type: "bad",
        className: "circle_bad",
      });
    }

    // Circulos de tiempo
    for (let i = 0; i < circlesTime; i++) {
      const pos = getRandomPosition();

      newCircles.push({
        id: crypto.randomUUID(),
        x: pos.left,
        y: pos.top,
        type: "time",
        className: "circle_time",
      });
    }

    // circulos instantKill
    for (let i = 0; i < circlesKill; i++) {
      const pos = getRandomPosition();

      newCircles.push({
        id: crypto.randomUUID(),
        x: pos.left,
        y: pos.top,
        type: "kill",
        className: "circle_kill",
      });
    }

    setCircles(newCircles);
  }

  // Funcion timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
      setDuration((d) => d + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);
  // Detectar cuando el tiempo termino para terminar el juego
  useEffect(() => {
    if (isPlaying && timeLeft === 0) {
      gameOver("¡Se acabó el tiempo!");
    }
  }, [timeLeft, isPlaying]);

  // Terminar juego una vez que el jugador se haya quedado sin vidas
  useEffect(() => {
    if (lives <= 0 && isPlaying) {
      gameOver("¡Te has quedado sin vidas!");
    }
  }, [lives, isPlaying]);

  // Funcion para terminar el juego (Game Over)
  const gameOver = () => {
    setIsGameOver(true);

    request("http://localhost:3000/api/scores", "POST", {
      user_id: 1,
      username: "player1",
      score: score,
      incorrect_clicks: incorrectClicks,
      duration: duration,
      level: level,
    });
  };

  // Mover circulos de forma aleatoria
  function moveCircleSlightly(circleEl, container) {
    const maxOffset = Math.min(3 + level, 10); // 🔹 rango corto de movimiento

    // desplazamiento pequeño
    const dx = Math.random() * maxOffset * 2 - maxOffset;
    const dy = Math.random() * maxOffset * 2 - maxOffset;

    // obtener posición actual
    const currentTransform = circleEl.style.transform;
    let x = 0;
    let y = 0;

    if (currentTransform) {
      const match = currentTransform.match(
        /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/,
      );
      if (match) {
        x = parseFloat(match[1]);
        y = parseFloat(match[2]);
      }
    }

    // nueva posición acumulada
    let newX = x + dx;
    let newY = y + dy;

    // límites del contenedor
    const rect = circleEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (
      rect.left + dx < containerRect.left ||
      rect.right + dx > containerRect.right
    ) {
      newX = x; // rebote
    }

    if (
      rect.top + dy < containerRect.top ||
      rect.bottom + dy > containerRect.bottom
    ) {
      newY = y;
    }

    circleEl.style.transform = `translate(${newX}px, ${newY}px)`;
  }

  // Funcion para manejar evento de click en circulos
  const controlGame = (e, type) => {
    // Comenzar el juego
    if (isPlaying === false) {
      setIsPlaying(true);
      setIsGameOver(false);
      setTimeLeft(INITIAL_TIME);
      generateCircles();
    }

    // Eliminar el circulo clickeado
    setCircles((prevCircles) =>
      prevCircles.filter((circle) => circle.id !== e),
    );

    // Actualizar el puntaje y game over
    if (type === "good") {
      new Audio(goodCircleSound).play();

      setScore((prevScore) => prevScore + 10);
    } else if (type === "bad") {
      new Audio(badCircleSound).play();

      setIncorrectClicks((prevClicks) => {
        return prevClicks + 1;
      });
      setLives((prevLives) => {
        return prevLives - 1;
      });
    } else if (type === "time") {
      return setTimeLeft((prevTime) => prevTime + 5);
    } else if (type === "kill") {
      // Circulo de instantKill
      new Audio(instantKillSound).play();

      setIncorrectClicks((prevClicks) => {
        return prevClicks + 1;
      });
      gameOver("¡Has tocado un circulo mortal!");
    }

    // Verificar si quedan circulos buenos para subir nivel
    if (circles.filter((circle) => circle.type === "good").length - 1 === 0) {
      handleLevelUp();
    }
  };

  // Funcion para reiniciar valores del juego (Usado para volver a jugar en pantalla de Game Over
  const resetGame = () => {
    setIsGameOver(false);
    setIsPlaying(false);
    setCircles([]);
    setTimeLeft(INITIAL_TIME);
    setDuration(0);
    setIncorrectClicks(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setLevel(INITIAL_LEVEL);
  };
  return {
    controlGame,
    moveCircleSlightly,
    resetGame,
    isGameOver,
    level,
    score,
    lives,
    timeLeft,
    circles,
    containerRef,
  };
};
