export function calculateISP(office) {

  let score = 0;

  // Saturación
  score += office.saturation * 0.4;

  if (office.saturation > 85) {
  score += 12;
}

  // Tiempo de espera
  const waitImpact = Math.min(
  office.waitTime,
  40
);

score += waitImpact * 0.8;

  // Personal insuficiente
  score += (20 - office.staff) * 1.5;

  // Campaña activa
  if (office.campaign) {
    score += 15;
  }

  if (
  office.saturation > 80 &&
  office.waitTime > 30 &&
  office.staff < 10
) {
  score += 18;
}

if (
  office.saturation > 95 &&
  office.waitTime > 45 &&
  office.staff < 6
) {
  score += 25;
}

  // Limitar a 100
  if (score > 100) {
    score = 100;
  }

  return Math.round(score);
}