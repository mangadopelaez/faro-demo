function RecommendationCard({

  title,
  recommendation,
  risk,

}) {

  function getPriority(risk) {

    if (risk === "red") {
      return "PRIORIDAD CRÍTICA";
    }

    if (risk === "orange") {
      return "PRIORIDAD ALTA";
    }

    if (risk === "yellow") {
      return "PRIORIDAD MEDIA";
    }

    return "ESTABLE";
  }

  function getIcon(risk) {

    if (risk === "red") {
      return "🚨";
    }

    if (risk === "orange") {
      return "⚠️";
    }

    if (risk === "yellow") {
      return "📊";
    }

    return "✅";
  }

  return (

  <div className={`recommendation-card ${risk.toLowerCase()}`}>

    <span className="recommendation-priority">
      {risk === "CRÍTICO"
        ? "PRIORIDAD CRÍTICA"
        : risk === "ALTO"
        ? "PRIORIDAD ALTA"
        : risk === "MEDIO"
        ? "PRIORIDAD MEDIA"
        : "ESTABLE"}
    </span>

    <div className="recommendation-content">

      <span className="recommendation-icon">
  {getIcon(risk)}
</span>

      <div className="recommendation-text">

        <h3>{title}</h3>

        <p>{recommendation}</p>

      </div>

    </div>

  </div>

);
}

export default RecommendationCard;