import { useState } from "react";

import AlertRow from "../components/AlertRow";

import { alertsData } from "../data/alertsData";

import { faroSystem } from "../data/faroSystem";

const criticalAlerts = alertsData.filter(
  (alert) => alert.level === "critical"
).length;

const warningAlerts = alertsData.filter(
  (alert) => alert.level === "warning"
).length;

const stableAlerts = alertsData.filter(
  (alert) => alert.level === "stable"
).length;


function Alertas() {

  const {
  metrics,
  processedOffices,
} = faroSystem;

const [activeFilter, setActiveFilter] = useState("all");
const [selectedAlert, setSelectedAlert] = useState(null);
const filteredAlerts =
  activeFilter === "all"
    ? alertsData
    : alertsData.filter((alert) => alert.level === activeFilter);

const filteredCritical = filteredAlerts.filter(
  (alert) => alert.level === "critical"
).length;

const filteredWarning = filteredAlerts.filter(
  (alert) => alert.level === "warning"
).length;

const filteredStable = filteredAlerts.filter(
  (alert) => alert.level === "stable"
).length;    

const globalRisk =
  filteredCritical > 0
    ? "critical"
    : filteredWarning > 0
    ? "warning"
    : "stable";


const riskLabel =
  globalRisk === "critical"
    ? "CRÍTICO"
    : globalRisk === "warning"
    ? "ALTO"
    : "ESTABLE";

const intelligenceMessage =
  globalRisk === "critical"
    ? "Hay oficinas con demasiada carga de trabajo. Conviene reforzarlas cuanto antes para evitar más esperas."
    : globalRisk === "warning"
    ? "Algunas oficinas empiezan a acumular más trabajo de lo normal. Conviene vigilarlas y preparar apoyo si la situación empeora."
    : "Las oficinas funcionan con normalidad. No hay señales importantes de saturación ahora mismo.";
    
    return (

    <div className="page">

  <div className="page-header-row">

    <div>

      <h1 className="page-title">
        Alertas
      </h1>

      <p className="page-text">
        Sistema centralizado de incidencias administrativas
      </p>

    </div>

    <div className="top-header-bar">

      <div className="top-header-status">

        <div className="status-chip">
          28 May 2025
        </div>

        <div className="status-chip">
          12:45
        </div>

      </div>

      <button className="refresh-button">
        ↻
      </button>

    </div>

  </div>

  <div className="alerts-kpi-grid">

    <div className="alert-kpi-card critical">

      <span>
        CRÍTICAS
      </span>

      <strong>
  {metrics.criticalOffices}
</strong>

      <p>
        Requieren atención inmediata
      </p>

    </div>

    <div className="alert-kpi-card warning">

      <span>
        VIGILANCIA
      </span>

      <strong>
  {metrics.highRiskOffices}
</strong>

      <p>
        Requieren seguimiento
      </p>

    </div>

    <div className="alert-kpi-card stable">

      <span>
        ESTABLES
      </span>

      <strong>
  {processedOffices.length}
</strong>

      <p>
        Situación controlada
      </p>

    </div>

    <div className="alert-kpi-card info">

      <span>
        TIEMPO MEDIO RESPUESTA
      </span>

      <strong>
        28 MIN
      </strong>

      <p>
        Últimas 24 horas
      </p>

    </div>

  </div>
<div className="alerts-main-grid">

  <div className="alerts-feed">

    <div className="alerts-feed-header">

      <h3>
        ALERTAS ACTIVAS
      </h3>

      <div className="alerts-feed-actions">

        <button
  className={`feed-filter-button ${activeFilter === "all" ? "active" : ""}`}
  onClick={() => {
  setActiveFilter("all");
  setSelectedAlert(null);
}}
>
  Todas
</button>

<button
  className={`feed-filter-button ${activeFilter === "critical" ? "active" : ""}`}
  onClick={() => {
    setActiveFilter("critical");
    setSelectedAlert(null);
}}
>
  Críticas
</button>

<button
  className={`feed-filter-button ${activeFilter === "warning" ? "active" : ""}`}
  onClick={() => {
  setActiveFilter("warning");
  setSelectedAlert(null);
  }}
>
  Altas
</button>

<button
  className={`feed-filter-button ${activeFilter === "stable" ? "active" : ""}`}
  onClick={() => {
  setActiveFilter("stable");
  setActiveFilter(null);
  }}
>
  Estable
</button>


        <button className="feed-filter-button">
          Filtros
        </button>

      </div>

    </div>

    <div className="alerts-list">

      {filteredAlerts.map((alert) => (

  <AlertRow
    key={alert.office}
    onClick={() => setSelectedAlert(alert)}
    isSelected={
  selectedAlert?.office === alert.office
}
    office={alert.office}
    level={alert.level}
    label={alert.label}
    isp={alert.isp}
    action={alert.action}
    time={alert.time}
  />

))}

    </div>
<button className="alerts-view-all">
  Ver todas las alertas →
</button>
  </div>

  <div className={`alerts-intelligence ${globalRisk}`}>

    <div className="alerts-intelligence-header">

      <span className="ai-dot"></span>

      <h3>
        FARO INTELLIGENCE
      </h3>

    </div>
<div className="intelligence-block">

  <span>
    ANÁLISIS ACTUAL
  </span>

  {selectedAlert && (

  <span className={`detail-status ${selectedAlert.level}`}>
    {selectedAlert.label}
  </span>

)}

  <p>
  {selectedAlert
    ? `${selectedAlert.office} está acumulando más carga de trabajo de lo habitual. Conviene ${selectedAlert.action.toLowerCase()}.`
    : intelligenceMessage}
</p>

</div>

<div className="intelligence-metrics">

  <div>
    <span>
  SITUACIÓN ACTUAL
</span>

    <strong>
  {riskLabel}
</strong>

    <p>
  Si no se toman medidas
</p>
  </div>

  <div>
   <span>
  POSIBILIDAD DE MÁS ESPERAS
</span>

    <strong>
  {Math.min(
  96,
  filteredCritical * 34 +
  filteredWarning * 18 +
  filteredStable * 4
)}%
</strong>

    <p>
      Próximas 2 horas
    </p>
  </div>

</div>
 
<div className="intelligence-action">

  <span>
  QUÉ CONVIENE HACER
</span>

  <p>
  Mover apoyo y personal desde oficinas con menos carga hacia las que empiezan a saturarse.
</p>

  <button className="intelligence-button">
    Ver recomendación completa →
  </button>

<div className="intelligence-chart">

  <div className="chart-header">

    <span>
      EVOLUCIÓN DE ALERTAS
    </span>

    <p>
      Últimas 24 horas
    </p>

  </div>

  <div className="fake-chart">

    <div className="chart-line red"></div>

    <div className="chart-line orange"></div>

    <div className="chart-line green"></div>

  </div>

  <div className="chart-legend">

    <div>
      <span className="legend-dot red"></span>
      Críticas
    </div>

    <div>
      <span className="legend-dot orange"></span>
      Vigilancia
    </div>

    <div>
      <span className="legend-dot green"></span>
      Estables
    </div>

  </div>
<div className="faro-timeline">

  <h4>
    ACTIVIDAD RECIENTE
  </h4>

  {globalRisk === "critical" && (
    <>
      <div className="timeline-event critical">

        <span>
          13:42
        </span>

        <p>
          FARO detecta saturación crítica operativa.
        </p>

      </div>

      <div className="timeline-event warning">

        <span>
          13:46
        </span>

        <p>
          Recomendado refuerzo temporal de personal.
        </p>

      </div>

      <div className="timeline-event critical">

        <span>
          13:51
        </span>

        <p>
          Riesgo elevado de bloqueo administrativo.
        </p>

      </div>
    </>
  )}

  {globalRisk === "warning" && (
    <>
      <div className="timeline-event warning">

        <span>
          13:42
        </span>

        <p>
          FARO detecta incremento operativo moderado.
        </p>

      </div>

      <div className="timeline-event warning">

        <span>
          13:47
        </span>

        <p>
          Supervisión preventiva activada.
        </p>

      </div>

      <div className="timeline-event stable">

        <span>
          13:52
        </span>

        <p>
          Saturación contenida dentro del margen previsto.
        </p>

      </div>
    </>
  )}

  {globalRisk === "stable" && (
    <>
      <div className="timeline-event stable">

        <span>
          13:40
        </span>

        <p>
          Operativa estable en todas las oficinas.
        </p>

      </div>

      <div className="timeline-event stable">

        <span>
          13:45
        </span>

        <p>
          FARO mantiene monitorización pasiva.
        </p>

      </div>

      <div className="timeline-event stable">

        <span>
          13:50
        </span>

        <p>
          No se detectan incidencias relevantes.
        </p>

      </div>
    </>
  )}

</div>
 </div>
 
</div>
</div>

</div>
</div>
  )
}

export default Alertas;