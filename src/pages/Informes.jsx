import { faroSystem } from "../data/faroSystem";

function Informes() {

  const {
  processedOffices,
  metrics,
} = faroSystem;

const operationalRisk =
  metrics.avgSaturation;

const efficiency =
  Math.max(
    100 - metrics.avgSaturation,
    32
  );

  return (

    <div className="page">

      <div className="page-header">

  <div>

    <h1 className="page-title">
      Informes
    </h1>

    <p className="page-subtitle">
     Resumen del estado de las oficinas y posibles problemas
    </p>

  </div>

  <div className="page-status-bar">

    <span>
      Actualizado hace 2 min
    </span>

    <button className="refresh-button">
      Exportar PDF
    </button>

  </div>

</div>
<div className="reports-kpi-grid">

  <div className="report-kpi-card critical">

    <span>
      INCIDENCIAS REVISADAS
    </span>

    <strong>
  {processedOffices.length * 31}
</strong>

    <p>
      +18% respecto a la semana anterior
    </p>

  </div>

  <div className="report-kpi-card warning">

    <span>
      NIVEL MEDIO DE SATURACIÓN
    </span>

    <strong>
  {operationalRisk}%
</strong>

    <p>
      Saturación elevada detectada
    </p>

  </div>

  <div className="report-kpi-card stable">

    <span>
      OFICINAS CON MÁS CARGA
    </span>

    <strong>
  {metrics.highRiskOffices}
</strong>

    <p>
      Conviene vigilarlas de cerca
    </p>

  </div>

  <div className="report-kpi-card info">

    <span>
      CAPACIDAD DISPONIBLE
    </span>

    <strong>
  {efficiency}%
</strong>

    <p>
      Capacidad actual del sistema
    </p>

  </div>

</div>
    <div className="reports-main-grid">

  <div className="reports-chart-card">

    <div className="reports-section-header">

      <div>

        <span>
         EVOLUCIÓN DE LAS OFICINAS
        </span>

        <h3>
          Las esperas empiezan a aumentar
        </h3>

      </div>

      <div className="reports-trend">

        <strong>
          +14%
        </strong>

        <p>
          Cambio respecto a días anteriores
        </p>

      </div>

    </div>

    <div className="reports-big-chart">

      <div className="chart-line blue"></div>

      <div className="chart-line red"></div>

      <div className="chart-line dashed"></div>

    </div>

  </div>

  <div className="reports-ai-card">

    <span>
      RESUMEN GENERAL
    </span>

    <h3>
      Varias oficinas empiezan a saturarse
    </h3>

    <p>
      Algunas oficinas están recibiendo más personas de las que pueden atender con normalidad. Conviene reforzar personal y repartir mejor las citas durante las próximas horas.
    </p>

    <div className="reports-ai-metrics">

      <div>

        <strong>
          ALTO
        </strong>

        <span>
          Riesgo global
        </span>

      </div>

      <div>

        <strong>
          +14%
        </strong>

        <span>
          Tendencia
        </span>

      </div>

      <div>

        <strong>
          48H
        </strong>

        <span>
          Horizonte
        </span>

      </div>

    </div>

  </div>

</div>
<div className="reports-bottom-grid">

  <div className="reports-table-card">

    <div className="reports-section-header">

      <div>

        <span>
          COMPARATIVA OPERATIVA
        </span>

        <h3>
          Oficinas monitorizadas
        </h3>

      </div>

    </div>

    <div className="reports-table">

  <div className="reports-table-row header">

    <span>Oficina</span>
    <span>ISP</span>
    <span>Riesgo</span>
    <span>Tendencia</span>
    <span>Acción</span>

  </div>

  {processedOffices.map((office) => (

    <div
      className="reports-table-row"
      key={office.id}
    >

      <span>
        {office.name}
      </span>

      <div className="isp-cell">

        <strong
          className={
            office.risk === "red"
              ? "critical"
              : office.risk === "orange"
              ? "warning"
              : office.risk === "yellow"
              ? "warning"
              : "stable"
          }
        >
          {office.isp}
        </strong>

        <div className="isp-bar">

          <div
            className={
              office.risk === "red"
                ? "isp-fill critical"
                : office.risk === "orange"
                ? "isp-fill warning"
                : office.risk === "yellow"
                ? "isp-fill warning"
                : "isp-fill stable"
            }
            style={{
              width: `${office.isp}%`
            }}
          ></div>

        </div>

      </div>

      <span
        className={
          office.risk === "red"
            ? "critical"
            : office.risk === "orange"
            ? "warning"
            : office.risk === "yellow"
            ? "warning"
            : "stable"
        }
      >

        {office.risk === "red" && "Crítico"}
        {office.risk === "orange" && "Alto"}
        {office.risk === "yellow" && "Medio"}
        {office.risk === "green" && "Estable"}

      </span>

      <span
        className={
          office.risk === "red"
            ? "critical"
            : office.risk === "orange"
            ? "warning"
            : office.risk === "yellow"
            ? "warning"
            : "stable"
        }
      >

        {office.risk === "red" && "+24%"}
        {office.risk === "orange" && "+12%"}
        {office.risk === "yellow" && "+6%"}
        {office.risk === "green" && "-4%"}

      </span>

      <small
        className={
          office.risk === "red"
            ? "critical"
            : office.risk === "orange"
            ? "warning"
            : office.risk === "yellow"
            ? "warning"
            : "stable"
        }
      >

        {office.risk === "red" &&
          "Refuerzo urgente"}

        {office.risk === "orange" &&
          "Reforzar personal"}

        {office.risk === "yellow" &&
          "Seguimiento preventivo"}

        {office.risk === "green" &&
          "Mantener estabilidad"}

      </small>

    </div>

  ))}

</div>

  </div>

  <div className="reports-side-stack">

    <div className="reports-insights-card">

      <span>
        QUÉ ESTÁ PASANDO
      </span>

      <div className="insight-box critical">
        <h4>Qué ocurre ahora</h4>
        <p>Oficina Centro está recibiendo más personas de las que puede atender con normalidad.</p>
      </div>

      <div className="insight-box warning">
        <h4>Qué puede estar provocándolo</h4>
        <p>Se están acumulando citas y no hay suficiente personal de apoyo disponible.</p>
      </div>

      <div className="insight-box stable">
        <h4>Qué conviene hacer</h4>
        <p>Mover apoyo desde oficinas con menos carga hacia las que empiezan a saturarse.</p>
      </div>

    </div>

    <div className="reports-actions-grid">

      <div className="reports-events-card">

        <span>
          EVENTOS RELEVANTES
        </span>

        <div className="report-event critical">
          <strong>12:42</strong>
          <p>Pico de saturación en Oficina Centro.</p>
        </div>

        <div className="report-event warning">
          <strong>11:18</strong>
          <p>Incremento de ISP en Oficina Norte.</p>
        </div>

        <div className="report-event stable">
          <strong>10:05</strong>
          <p>Estabilización en Oficina Este.</p>
        </div>

        <div className="report-event info">
          <strong>09:30</strong>
          <p>Refuerzo completado en Oficina Sur.</p>
        </div>

        <button className="reports-link-button">
          Ver todos los eventos →
        </button>

      </div>

      <div className="reports-export-card">

        <span>
          EXPORTACIÓN Y REPORTES
        </span>

        <button>Descargar informe PDF</button>
        <button>Enviar a responsables</button>
        <button>Crear informe mensual</button>

      </div>

    </div>

  </div>

</div>
</div>

  )
}

export default Informes