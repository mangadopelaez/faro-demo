function TopMetrics({

  totalRisk,
  criticalOffices,
  avgWait,
  avgSaturation,
  liveIncidents,
  lastUpdate,

}) {

  function getRiskClass() {

    if (totalRisk === "CRÍTICO") {
      return "metric-red";
    }

    if (avgSaturation > 70) {
      return "metric-orange";
    }

    return "metric-green";
  }

  return (

  <div className="top-metrics-wrapper">

    <div className="top-metrics">

      <div className={`metric-card ${getRiskClass()}`}>

        <div className="metric-top-row">

          <div className="metric-icon metric-icon-red">
            🛡
          </div>

          <span className="top-label">
            RIESGO GLOBAL
          </span>

        </div>

        <h2>
          CRÍTICO
        </h2>

        <p className="metric-secondary">
          ↑ 12% esta semana
        </p>

        <div className="metric-status-pill">

  <span className="status-dot"></span>

  <span>
    ACTIVO
  </span>

</div>

      </div>

      <div className="metric-card metric-orange">

        <div className="metric-top-row">

          <div className="metric-icon metric-icon-blue">
            🏢
          </div>

          <span className="top-label">
            OFICINAS CRÍTICAS
          </span>

        </div>

        <h2>
          {criticalOffices}
        </h2>

        <p className="metric-secondary">
          2 nuevas incidencias
        </p>

      </div>

      <div className="metric-card metric-yellow">

        <div className="metric-top-row">

          <div className="metric-icon metric-icon-yellow">
            🕒
          </div>

          <span className="top-label">
            ESPERA MEDIA
          </span>

        </div>

        <h2>
          {avgWait} min
        </h2>

        <p className="metric-secondary">
          ↓ 4 min hoy
        </p>

      </div>

      <div className="metric-card metric-blue">

        <div className="metric-top-row">

          <div className="metric-icon metric-icon-green">
            📈
          </div>

          <span className="top-label">
            SATURACIÓN MEDIA
          </span>

        </div>

        <h2>
          {avgSaturation}%
        </h2>

        <p className="metric-secondary">
          Demanda estable
        </p>

      </div>

    </div>

    <div className="metric-card metric-purple metric-live-wide">

      <div className="metric-top-row">

        <div className="metric-icon metric-icon-purple">
          🔔
        </div>

        <div className="incident-live-header">

        <span className="top-label">
          INCIDENTES LIVE
        </span>

        <span className="incident-count">
          {liveIncidents}
        </span>

      </div>

      </div>

      <div className="incident-live-feed">

        <span className="status-dot"></span>

        <span className="incident-feed-text">
          Oficina Centro · Pico detectado hace 12s
        </span>

      </div>

          </div>

        </div>

      )

      }

export default TopMetrics;