import { useState } from "react"; 

import { offices } from "../mock/offices";

import { calculateISP } from "../utils/ispCalculator";

import { getRiskLevel } from "../utils/riskEngine";

function Oficinas() {

  const [search, setSearch] = useState("");

  const [riskFilter, setRiskFilter] =
  useState("all");

  const processedOffices = offices.map((office) => {
  const isp = calculateISP(office);
  const risk = getRiskLevel(isp);

  return {
    ...office,
    isp,
    risk,
  };
});

const filteredOffices = processedOffices.filter((office) => {
  const nameMatch = office.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const riskMatch =
    riskFilter === "all" || office.risk === riskFilter;

  return nameMatch && riskMatch;
});
const topOffice = filteredOffices[0];

const recommendationMessage =
  topOffice?.risk === "red"
    ? `Las esperas en ${topOffice.name} están creciendo demasiado rápido. Conviene mover apoyo cuanto antes.`
    : topOffice?.risk === "orange"
    ? `${topOffice.name} empieza a acumular más carga de trabajo de lo habitual.`
    : topOffice?.risk === "yellow"
    ? `${topOffice.name} sigue estable, aunque conviene vigilar la evolución de las próximas horas.`
    : "Las oficinas mantienen una situación estable y sin incidencias importantes.";

const recommendationActions =
  topOffice?.risk === "red"
    ? [
        `Añadir personal de apoyo en ${topOffice.name}`,
        "Reducir tiempos de espera prioritarios",
        "Reorganizar atención presencial",
        "Seguir evolución durante las próximas horas",
      ]
    : topOffice?.risk === "orange"
    ? [
        `Preparar refuerzo preventivo en ${topOffice.name}`,
        "Vigilar crecimiento de colas",
        "Redistribuir carga entre oficinas",
        "Revisar evolución durante el día",
      ]
    : topOffice?.risk === "yellow"
    ? [
        "Mantener seguimiento preventivo",
        "Controlar tiempos de atención",
        "Vigilar evolución de demanda",
      ]
    : [
        "Mantener supervisión habitual",
        "Continuar seguimiento operativo",
      ];
    const criticalCount = filteredOffices.filter(
  (office) =>
    getRiskLevel(
      calculateISP(office)
    ) === "red"
    ).length;

    const warningCount = filteredOffices.filter(
      (office) => {

        const risk = getRiskLevel(
          calculateISP(office)
        );

        return (
          risk === "orange" ||
          risk === "yellow"
        );

      }
    ).length;

        const mediumCount = filteredOffices.filter(
      (office) =>
        getRiskLevel(
          calculateISP(office)
        ) === "yellow"
    ).length;

    const stableCount = filteredOffices.filter(
      (office) =>
        getRiskLevel(
          calculateISP(office)
        ) === "green"
    ).length;
    
    let systemStatus =
      "Sistema operativo estable";

    if (criticalCount > 0) {

      systemStatus =
        "Atención operativa requerida";

    } else if (warningCount > 0) {

      systemStatus =
        "Carga operativa elevada";

    }

    let systemRecommendation =
  "Operativa dentro de parámetros normales.";

if (criticalCount > 0) {

  systemRecommendation =
    "Redistribuir recursos urgentemente en oficinas críticas.";

} else if (warningCount > 0) {

  systemRecommendation =
    "Supervisar evolución de saturación operativa.";

}

let systemTrend =
  "Tendencia estable";

if (criticalCount > 0) {

  systemTrend =
    "Tendencia de empeoramiento";

} else if (warningCount > 0) {

  systemTrend =
    "Tendencia de presión operativa";

}

let predictionConfidence = "92%";

if (criticalCount > 0) {

  predictionConfidence = "97%";

} else if (warningCount > 0) {

  predictionConfidence = "94%";

}
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

  return (

  
   <div className="page">

  <div className="page-header-row">

    <div>
      <h1 className="page-title">
        Oficinas
      </h1>
  

      <p className="page-text">
        Estado general de saturación administrativa
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
<div className="offices-stats">

  <div
    className={`
      office-stat-card
      ${criticalCount > 0
        ? "critical"
        : ""}
    `}
  >

    <div className="office-stat-top">

      <span>
        Oficinas críticas
      </span>

      <div className="metric-icon metric-red">

        ⚠

      </div>

    </div>

    <strong>
      {criticalCount}
    </strong>

  </div>

  <div
    className={`
      office-stat-card
      ${warningCount > 0
        ? "warning"
        : ""}
    `}
  >

    <div className="office-stat-top">

      <span>
        Riesgo elevado
      </span>

      <div className="metric-icon metric-orange">

        ↗

      </div>

    </div>

    <strong>
      {warningCount}
    </strong>

  </div>

  <div
    className={`
      office-stat-card
      ${mediumCount > 0
        ? "medium"
        : ""}
    `}
  >

    <div className="office-stat-top">

      <span>
        Riesgo medio
      </span>

      <div className="metric-icon metric-yellow">

        ≋

      </div>

    </div>

    <strong>
      {mediumCount}
    </strong>

  </div>

  <div
    className={`
      office-stat-card
      ${stableCount > 0
        ? "stable"
        : ""}
    `}
  >

    <div className="office-stat-top">

      <span>
        Operativas
      </span>

      <div className="metric-icon metric-green">

        ✓

      </div>

    </div>

    <strong>
      {stableCount}
    </strong>

  </div>

</div>

      <div className="offices-toolbar">

  <div className="toolbar-left-panel">

    <div className="search-wrapper">

      <span className="search-icon">

        ⌕

      </span>

      <input
        type="text"
        placeholder="Buscar por nombre de oficina..."
        className="office-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

    </div>

    <select
  className={`risk-filter filter-${riskFilter}`}
  value={riskFilter}
  onChange={(e) => setRiskFilter(e.target.value)}
>

      <option value="all">
        Todos los riesgos
      </option>

      <option value="red">
        Crítico
      </option>

      <option value="orange">
        Alto
      </option>

      <option value="yellow">
        Medio
      </option>

      <option value="green">
        Bajo
      </option>

    </select>

  </div>

  <div className="toolbar-ai-panel">

    <div className="toolbar-ai-header">

      <span className="ai-dot"></span>

      <h3>
        Núcleo Inteligente FARO
      </h3>

    </div>

    <div className="toolbar-ai-grid">

      <div className="toolbar-alert-box">

        <span>
          Atención operativa requerida
        </span>

        <p>
          Redistribuir recursos urgentemente
          en oficinas críticas.
        </p>

      </div>

      <div className="toolbar-ai-metrics">

        <div>
          Tendencia de empeoramiento
        </div>

        <div>
          Confianza predictiva: 97%
        </div>

        <div>
          FARO analizando evolución operativa...
        </div>

        <div>
          Última actualización:
          hace unos segundos
        </div>

      </div>

      <div className="toolbar-ai-count">

        <strong>
          {filteredOffices.length}
        </strong>

        <span>
          Oficinas monitorizadas
        </span>

      </div>

    </div>

  </div>

</div>


        
        <div className="offices-content-grid">
      <div className="table-container">

        <table className="offices-table">

          <thead>

            <tr>
              <th>Oficina</th>
              <th>ISP</th>
              <th>Saturación</th>
              <th>Tiempo</th>
              <th>Riesgo</th>
            </tr>

          </thead>

          <tbody>
           
 {filteredOffices.length === 0 && (

  <div className="empty-offices-state">

    <div className="empty-icon">
      ⌕
    </div>

    <strong>
      No encontramos oficinas
    </strong>

    <p>
      Prueba otro nombre o cambia el filtro seleccionado.
    </p>

  </div>

)}
            {filteredOffices.map((office, index) => {

              const isp = calculateISP(office);

              const risk = getRiskLevel(isp);

              return (

                <tr
                key={office.id}
                className={`
                  row-${risk}
                  ${index === 0
                    ? "top-priority"
                    : ""}
                `}
              >

                  <td>

                <div className={`office-cell office-${risk}`}>

                  <div className="office-icon">

                    🏢

                  </div>

                  <span>

                    {office.name}

                  </span>

                </div>

              </td>

                  <td>

                  <div className="table-metric-value">

                    {isp}

                  </div>

                </td>

                  <td>

                  <div className="saturation-cell">

                    <span>

                      {office.saturation}%

                    </span>

                    <div className="saturation-bar">

                      <div
                        className={`
                          saturation-fill
                          fill-${risk}
                        `}
                        style={{
                          width: `${office.saturation}%`
                        }}
                      />

                    </div>

                  </div>

                </td>

                  <td>

                  <div className="metric-time">

                    {office.waitTime}
                    <span>min</span>

                  </div>

                </td>

                  <td>

                  <div className="risk-cell">

                    <span className={`risk-${risk}`}>

                      {getLabel(risk)}

                    </span>

                    <div className="row-arrow">

                      ›

                    </div>

                  </div>

                </td>

                </tr>

              )

            })}

          </tbody>

        </table>

      </div>
      {filteredOffices.length > 0 && (
       <div className="system-panel">

    <div className="recommendation-header">

      ✦
      <span>
        QUÉ ESTÁ PASANDO
      </span>

    </div>

    <p className="recommendation-text">
  {recommendationMessage}
</p>

    <div className="recommendation-actions">

      <span className="actions-title">
        QUÉ CONVIENE HACER
      </span>

     <ul>

  {recommendationActions.map((action) => (

    <li key={action}>
      ✓ {action}
    </li>

  ))}

</ul>
    </div>

    <button className="report-button">

      Ver análisis completo →

    </button>

  </div>
)}
</div>
      
      </div>
  )
}

export default Oficinas;