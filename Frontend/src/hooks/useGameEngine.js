import { useState, useEffect, useRef } from "react";
import { getTimeBonusByLevel } from "../utils/levelUpTime.js";
import { getCirclesByLevel } from "../utils/getCirclesByLevel.js";

export const useGameEngine = () => {
  const INITIAL_TIME = 30;
  const INITIAL_LIVES = 3;

  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [circles, setCircles] = useState([]);
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
  const generateCircles = () => {
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
  };

  // Funcion timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          gameOver("¡Se acabó el tiempo!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Funcion para terminar el juego (Game Over)
  const gameOver = (message) => {
    setIsPlaying(false);
    setCircles([]);
    setTimeLeft(INITIAL_TIME);
    setScore(0);
    setLives(INITIAL_LIVES);
    setLevel(1);
    alert(message || "¡Game Over!");
  };

  // Mover circulos de forma aleatoria
  function moveCircleSlightly(circleEl, container) {
    const maxOffset = Math.min(3 + level, 10) // 🔹 rango corto de movimiento

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
      generateCircles();
    }

    // Eliminar el circulo clickeado
    setCircles((prevCircles) =>
      prevCircles.filter((circle) => circle.id !== e),
    );

    // Actualizar el puntaje y game over
    if (type === "good") {
      setScore((prevScore) => prevScore + 10);
    } else if (type === "bad") {
      setLives((prevLives) => {
        if (prevLives === 1) {
          gameOver("¡Te has quedado sin vidas!");
        }
        return prevLives - 1;
      });
    } else if (type === "time") {
      setTimeLeft((prevTime) => prevTime + 5);
    } else if (type === "kill") {
      // Circulo de instantKill
      gameOver("¡Has tocado un circulo mortal!");
    }

    // Verificar si quedan circulos buenos para subir nivel
    if (circles.filter((circle) => circle.type === "good").length - 1 === 0) {
      handleLevelUp();
    }
  };

  return {
    controlGame,
    moveCircleSlightly,
    level,
    score,
    lives,
    timeLeft,
    circles,
    containerRef,
  };
};
