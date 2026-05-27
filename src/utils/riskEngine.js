export function getRiskLevel(isp) {

  if (isp >= 85) {
    return "red";
  }

  if (isp >= 60) {
    return "orange";
  }

  if (isp >= 40) {
    return "yellow";
  }

  return "green";
}