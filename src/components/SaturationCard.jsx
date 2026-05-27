function SaturationCard({

  title,
  saturation,
  time,
  risk,
  isp

}) {

  function getLabel(risk) {

    if (risk === "red") {
      return "CRÍTICO";
    }

    if (risk === "orange") {
      return "ALTO";
    }

    if (risk === "yellow") {
      return "MEDIO";
    }

    return "BAJO";
  }

  function getStatusMessage(risk) {

    if (risk === "red") {
      return "Intervención urgente";
    }

    if (risk === "orange") {
      return "Demanda elevada";
    }

    if (risk === "yellow") {
      return "Monitoreo activo";
    }

    return "Operación estable";
  }

  return (

    <div className={`card card-${risk}`}>

      <div className="saturation-top">

        <div>

          <div
            className={`
              status-badge
              risk-${risk}
            `}
          >

            {getLabel(risk)}

          </div>

          <h2 className="office-title">
            {title}
          </h2>

          <p className="office-status">

  {getStatusMessage(risk)}

</p>

        </div>

        <div className="isp-side">

          <span className="isp-label">
            ISP
          </span>

          <strong className="isp-number">
            {isp}
          </strong>

        </div>

      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${saturation}%`,
            background:
              risk === "red"
                ? "#ff5c5c"
                : risk === "orange"
                ? "#ff9f43"
                : risk === "yellow"
                ? "#ffd000"
                : "#00ff99"
          }}
        />

      </div>

      <div className="metrics-grid">

        <div className="metric-box">

          <span className="metric-label">
            Saturación
          </span>

          <strong>
            {saturation}%
          </strong>

        </div>

        <div className="metric-box">

          <span className="metric-label">
            Espera
          </span>

          <strong>
            {time} min
          </strong>

        </div>

      </div>

      <div className={`office-status-badge badge-${risk}`}>
        {risk === "red"
  ? "CRÍTICO"
  : risk === "orange"
  ? "ALTA PRESIÓN"
  : risk === "yellow"
  ? "VIGILANCIA"
  : "ESTABLE"}
      </div>
      {risk === "red" && (
  <div className="office-live-badge">
    LIVE
  </div>
)}

<p className="office-update">
  
  {risk === "red"
  ? "Nuevo pico detectado hace 12s"
  : risk === "orange"
  ? "Demanda creciente hace 3 min"
  : risk === "yellow"
  ? "Monitorización activa"
  : "Operación estable"}
</p>

    </div>

  )
}

export default SaturationCard;