export const getCirclesByLevel = (level) => {
  const good = 2 + level + Math.floor(Math.random() * 2); // +0..2
  const bad = 3 + Math.floor(level / 2) + Math.floor(Math.random() * 3); // +0..1
  const time = Math.random() < 0.2 ? 1 : 0; // 20% de probabilidad de 1 circulo de tiempo a partir del nivel 8
  const kill = Math.random() < 0.3 ? 1 : 0; // 30% de probabilidad de 1 circulo instantKill a partir del nivel 15
  if (level >= 15) {
    return { good, bad, time, kill };
  }
  if (level >= 8) {
    return { good, bad, time };
  }
  return { good, bad };
};
