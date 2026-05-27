export function getRecommendation(risk) {

  if (risk === "red") {
    return "Abrir refuerzo urgente";
  }

  if (risk === "orange") {
    return "Reforzar personal";
  }

  if (risk === "yellow") {
    return "Monitorizar demanda";
  }

  return "Situación estable";
}