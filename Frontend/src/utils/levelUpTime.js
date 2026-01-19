export const getTimeBonusByLevel = (level) => {
  const baseBonus = 1; // tiempo mínimo que se suma
  const incrementEvery = 5; // cada cuántos niveles aumenta
  const incrementAmount = 2; // cuánto aumenta

  const steps = Math.floor((level - 1) / incrementEvery);

  return baseBonus + steps * incrementAmount;
};
