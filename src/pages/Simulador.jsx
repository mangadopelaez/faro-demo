import { useState } from "react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { faroSystem } from "../data/faroSystem";

import { calculateISP } from "../utils/ispCalculator";

import { getRiskLevel } from "../utils/riskEngine";

import { getRecommendation } from "../utils/recommendations";

function Simulador() {

const { processedOffices } = faroSystem;

  const [selectedOffice, setSelectedOffice] = useState(0);

  const [office, setOffice] = useState({
  ...processedOffices[0],
});

  const isp = calculateISP(office);

  const risk = getRiskLevel(isp);

  const recommendation = getRecommendation(risk);

  const riskGrowth = {
  red: 18,
  orange: 12,
  yellow: 6,
  green: 2,
};

const simulatedReduction = {
  red: 24,
  orange: 16,
  yellow: 10,
  green: 4,
};

const forecastData = [
  {
    hour: "+6h",
    actual: isp,
    simulated: Math.max(
      isp - simulatedReduction[risk] * 0.35,
      0
    ),
  },
  {
    hour: "+12h",
    actual: Math.min(
      isp + riskGrowth[risk] * 0.4,
      100
    ),
    simulated: Math.max(
      isp - simulatedReduction[risk] * 0.55,
      0
    ),
  },
  {
    hour: "+24h",
    actual: Math.min(
      isp + riskGrowth[risk] * 0.7,
      100
    ),
    simulated: Math.max(
      isp - simulatedReduction[risk] * 0.75,
      0
    ),
  },
  {
    hour: "+48h",
    actual: Math.min(
      isp + riskGrowth[risk],
      100
    ),
    simulated: Math.max(
      isp - simulatedReduction[risk],
      0
    ),
  },
];

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

  if (risk === "green") {
    return "ESTABLE";
  }

    return "ESTABLE";
  }

  return (

  <div className="page">

    <div className="simulator-topbar">

      <div>

        <span className="simulator-mini-label">
          FARO Intelligence
        </span>

        <h1 className="page-title">
          Simulador 
        </h1>

        <p className="simulator-subtitle">
          Centro de simulación estratégica y predicción operativa
        </p>

      </div>

      <div className="forecast-badge">

        Horizonte predictivo:
        <strong> próximas 48h</strong>

      </div>

    </div>

    <div className="simulation-layout">

    

      <div className="simulation-main">

        <div className="office-selector">

  {processedOffices.map((item, index) => (

    <button
      key={item.id}
      className={`office-pill risk-${item.risk} ${
  selectedOffice === index ? "active" : ""
    }`}
      onClick={() => {

  setSelectedOffice(index);

  setOffice({
    saturation: item.saturation,
    waitTime: item.waitTime,
    staff: item.staff,
    campaign: item.campaign,
    pressure: item.pressure,
    trend: item.trend,
    criticalWindow: item.criticalWindow,
    isp: calculateISP(item),
  });

}}
    >

      {item.name}

    </button>

  ))}

</div>

        <div className="simulator-card">

          <label>
            Saturación
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={office.saturation}
            onChange={(e) =>
              setOffice({
                ...office,
                saturation: Number(e.target.value),
              })
            }
          />

          <p className="slider-value">
            {office.saturation}%
          </p>

          <label>
            Tiempo de espera
          </label>

          <input
            type="range"
            min="0"
            max="60"
            value={office.waitTime}
            onChange={(e) =>
              setOffice({
                ...office,
                waitTime: Number(e.target.value),
              })
            }
          />

          <p className="slider-value">
          {office.waitTime} min
          </p>

          <label>
            Personal disponible
          </label>

          <input
            type="range"
            min="1"
            max="20"
            value={office.staff}
            onChange={(e) =>
              setOffice({
                ...office,
                staff: Number(e.target.value),
              })
            }
          />

          <p className="slider-value">
            {office.staff}
          </p>

          <div className="checkbox-container">

            <input
              type="checkbox"
              checked={office.campaign}
              onChange={(e) =>
                setOffice({
                  ...office,
                  campaign: e.target.checked,
                })
              }
            />

            <span>
              Campaña activa
            </span>

          </div>
            <div className="simulation-actions">

  <span className="simulation-actions-label">
    ACCIONES SIMULADAS ACTIVAS
  </span>

  <div className="simulation-action-list">

    <div className="simulation-action-item">

      <span className="action-dot"></span>

      <p>

        {office.staff < 8
          ? "Refuerzo automático de personal recomendado"
          : "Capacidad operativa suficiente"}

      </p>

    </div>

    <div className="simulation-action-item">

      <span className="action-dot"></span>

      <p>

        {office.waitTime > 30
          ? "Redistribución de citas prioritaria"
          : "Flujo de atención estable"}

      </p>

    </div>

    <div className="simulation-action-item">

      <span className="action-dot"></span>

      <p>

        {office.campaign
          ? "Campaña administrativa con impacto operativo activo"
          : "Sin campañas críticas detectadas"}

      </p>

    </div>

  </div>

</div>
        <div className="simulation-impact-card">

  <span className="impact-card-label">
    IMPACTO ESTIMADO
  </span>

  <div className="impact-grid">

    <div className="impact-item">

      <strong>
        -{Math.max(Math.round(isp * 0.22), 8)}
      </strong>

      <span>
        reducción ISP
      </span>

    </div>

    <div className="impact-item">

      <strong>
        +{Math.max(Math.round(office.staff * 0.35), 2)}%
      </strong>

      <span>
        capacidad operativa
      </span>

    </div>

    <div className="impact-item">

      <strong>
        -{Math.max(Math.round(office.waitTime * 0.28), 4)} min
      </strong>

      <span>
        espera estimada
      </span>

    </div>

  </div>

</div>
        <div className="scenario-comparison-card">

  <span className="comparison-label">
    COMPARACIÓN OPERATIVA
  </span>

  <div className="comparison-grid">

    <div className="comparison-column current">

      <span className="comparison-type">
        ACTUAL
      </span>

      <strong className="comparison-value">
        ISP {isp}
      </strong>

      <p className="comparison-text">
        {risk === "red" &&
          "Saturación crítica y presión operativa elevada."}

        {risk === "orange" &&
          "Demanda en aumento."}

        {risk === "yellow" &&
          "Presión moderada con crecimiento controlado."}

        {risk === "green" &&
          "Situación operativa estable y controlada."}
      </p>

    </div>

    <div className="comparison-arrow">
      →
    </div>

    <div className="comparison-column optimized">

      <span className="comparison-type">
        OPTIMIZADO
      </span>

      <strong className="comparison-value">
        ISP {Math.max(isp - 26, 32)}
      </strong>

            <p className="comparison-text">
              {risk === "red" &&
        "↓ FARO estima una reducción crítica de saturación si se aplica refuerzo inmediato."}

      {risk === "orange" &&
        "↓ FARO optimiza la recarga."}

      {risk === "yellow" &&
        "↓ FARO detecta margen de optimización preventiva en próximas horas."}

      {risk === "green" &&
        "↓ FARO mantiene una previsión operativa estable y controlada."}
            </p>

     </div>

  </div>

        </div>
<div className={`simulator-result risk-${risk}`}>

  <div className="isp-header">

  <span className="isp-label">
    Índice de Saturación Predictiva
  </span>

  <strong className="isp-score">
    {isp}
  </strong>

</div>

  <div className="sim-live">

    <span className="sim-context">
      Detectadas variaciones operativas en los últimos ciclos de simulación
    </span>

    <div className="sim-live-text">

      <span className="live-dot"></span>

      <span>
        Actualizado hace 12s
      </span>

    </div>

  </div>

  <div className={`risk-pill risk-pill-${risk}`}>

    {getLabel(risk)}

  </div>

  <div className={`intervention-level risk-${risk}`}>

  <span className="intervention-label">
    Nivel de intervención recomendado
  </span>

  <strong>

    {risk === "red" &&
      "Intervención inmediata"}

    {risk === "orange" &&
      "Refuerzo preventivo"}

    {risk === "yellow" &&
      "Seguimiento operativo"}

    {risk === "green" &&
      "Monitorización estándar"}

  </strong>

</div>

  <p>
    {recommendation}
  </p>

    <p className="prediction-message">

  {risk === "red" &&
    "Las colas y los tiempos de espera pueden empeorar rápidamente si no se refuerza esta oficina."}

  {risk === "orange" &&
    "La oficina empieza a mostrar más carga de trabajo de lo habitual."}

  {risk === "yellow" &&
    "La situación sigue siendo estable, aunque conviene vigilar la evolución durante las próximas horas."}

  {risk === "green" &&
    "La oficina funciona con normalidad y no se prevén problemas inmediatos."}

</p>

<p>

  {isp > 75 &&
    "Si no se toman medidas, esta oficina puede sufrir retrasos importantes y aumento de colas durante las próximas horas."}

  {isp <= 75 && isp > 55 &&
    "La simulación mejora parte de la carga de trabajo, aunque todavía puede haber momentos de saturación."}

  {isp <= 55 &&
    "Con las medidas aplicadas, la oficina mantiene una situación estable y tiempos de espera controlados."}

</p>

  <div className="impact-summary">

    <span>
      Capacidad comprometida:
      <strong>
        {office.saturation > 75 ? " alta" : " moderada"}
      </strong>
    </span>

    <span>
      Riesgo de colas:
      <strong>
        {office.waitTime > 30 ? " elevado" : " controlado"}
      </strong>
    </span>

    <span>
      Estado operativo:
      <strong>
        {risk === "red"
          ? " intervención recomendada"
          : " estable"}
      </strong>
    </span>

  </div>

  <div className="scenario-comparison-card">

    <div className="scenario-column">

      <span className="scenario-label">
        Escenario actual
      </span>

      <strong className="scenario-value">
        ISP {office.isp || 78}
      </strong>

      <p className="scenario-description">
        Riesgo alto de saturación en las próximas 48h.
      </p>

    </div>

    <div className="scenario-divider"></div>

    <div className="scenario-column">

      <span className="scenario-label">
        Escenario simulado
      </span>

      <strong className="scenario-value positive">
        ISP {isp}
      </strong>

      <p className="scenario-description">
        La simulación reduce el riesgo operativo.
      </p>

      <div className="scenario-improvement">

     <span className={`improvement-badge improvement-${risk}`}>
        {office.isp > isp
  ? `-${office.isp - isp} ISP`
  : "+0 ISP"}
      </span>

      <span className="improvement-text">
        Mejora operativa estimada
      </span>

    </div>

    </div>

  </div>
  <div className="simulation-insight-card">

  <span className="simulation-insight-label">
    FARO Intelligence
  </span>

  <h3>
    Impacto operativo proyectado
  </h3>

  <p>

    {isp > 75 &&
      "La simulación mantiene un escenario de alta presión operativa. FARO recomienda intervención inmediata para evitar degradación del servicio."}

    {isp <= 75 && isp > 55 &&
      "La simulación reduce parcialmente la presión operativa, aunque persiste riesgo de saturación en franjas de alta demanda."}

    {isp <= 55 &&
      "La simulación estabiliza el flujo operativo y reduce significativamente el riesgo de colapso administrativo."}

  </p>

</div>

</div>

</div>

</div>

      <div className="simulation-side">

        <span className="side-label">
          QUÉ PUEDE PASAR
        </span>

        <p className="side-text">

          Aquí ves cómo puede cambiar la situación si modificas personal, esperas o campañas.

        </p>
        <div className="side-prediction-card">

  <span className="side-label">
    SITUACIÓN ACTUAL
  </span>

  <h3>
  {office.trend}
</h3>

  <div className="side-metrics">

    <div>
      <span>Demanda prevista</span>
      <strong>{office.pressure}</strong>
    </div>

    <div>
      <span>Ventana crítica</span>
      <strong>{office.criticalWindow}</strong>
    </div>

    <div>
  <span>Probabilidad de saturación</span>
  <strong className={`risk-text risk-text-${risk}`}>
    {risk === "red" && "Crítica"}
    {risk === "orange" && "Alta"}
    {risk === "yellow" && "Media"}
    {risk === "green" && "Baja"}
  </strong>
</div>

  </div>
  <div className="trend-analysis">

  <span className="trend-dot"></span>

  <p>

    {isp > 75 &&
      "Las colas pueden crecer rápido si no se refuerza esta oficina."}

    {isp <= 75 && isp > 55 &&
      "La oficina debe vigilarse durante las próximas horas."}

    {isp <= 55 &&
      "Con estos datos, la oficina debería mantenerse estable."}

  </p>

</div>

</div>
                    <div className="scenario-preview">

  <span className="scenario-label">
    ESCENARIO ACTUAL
  </span>

  <div className="scenario-item">

    <span>
      Presión operativa
    </span>

    <strong>
      {risk === "red" && "+24%"}
      {risk === "orange" && "+14%"}
      {risk === "yellow" && "+6%"}
      {risk === "green" && "+1%"}
    </strong>

  </div>

  <div className="scenario-item">

    <span>
      Capacidad estimada
    </span>

    <strong>

      {risk === "red" && "Crítica"}
      {risk === "orange" && "Inestable"}
      {risk === "yellow" && "Moderada"}
      {risk === "green" && "Óptima"}

    </strong>

  </div>

</div>

<div className="recommendation-panel">

  <span className="recommendation-label">
    QUÉ CONVIENE HACER
  </span>

  <p className="recommendation-text">

    {risk === "red" &&
      "Mover apoyo y personal hacia esta oficina cuanto antes."}

    {risk === "orange" &&
      "Conviene preparar más personal para las próximas horas."}

    {risk === "yellow" &&
      "Mantener vigilancia activa sobre la demanda."}

    {risk === "green" &&
      "La oficina funciona con normalidad y no necesita refuerzo."}

  </p>

</div>

<div className="explanation-panel">

  <span className="explanation-label">
    POR QUÉ ESTÁ PASANDO
  </span>

  <p className="explanation-text">

    {risk === "red" &&
      "Las personas están esperando demasiado tiempo y la oficina no tiene suficiente capacidad para absorber la demanda."}

    {risk === "orange" &&
      "Cada vez acuden más ciudadanos y las esperas empiezan a crecer poco a poco."}

    {risk === "yellow" &&
      "En directo, la carga de trabajo es manejable. Aunque hay señales moderadas de aumento, se recomienda mantener vigilancia."}

    {risk === "green" &&
      "Ahora mismo la oficina puede atender la demanda sin generar grandes esperas."}

  </p>

</div>

<div className="impact-panel">

  <span className="impact-label">
    QUÉ PUEDE OCURRIR
  </span>

  <ul className="impact-list">

    {risk === "red" && (
      <>
        <li>Las esperas pueden crecer rápidamente</li>
        <li>La oficina podría dejar de absorber toda la demanda</li>
        <li>El personal puede verse desbordado por la gestión de la operativa interna</li>
      </>
    )}

    {risk === "orange" && (
      <>
        <li>El tiempo entre las esperas puede comenzar a aumentar</li>
        <li>La atención puede volverse mas lenta</li>
        <li>Puede necesitarse más personal</li>
      </>
    )}

    {risk === "yellow" && (
      <>
        <li>Incremento moderado de demanda</li>
        <li>Presión operativa controlable</li>
        <li>Conviene seguir observando la evolución</li>
      </>
    )}

    {risk === "green" && (
      <>
        <li>La oficina funciona con normalidad</li>
        <li>Las esperas se mantienen estables</li>
        <li>La demanda puede gestionarse sin problemas</li>
      </>
    )}

  </ul>

</div>

<div className="timeline-panel">

  <span className="timeline-label">
    CÓMO PUEDE EVOLUCIONAR
  </span>
  <div className="forecast-chart">

  <ResponsiveContainer width="100%" height={180}>

    <LineChart data={forecastData}>

      <Tooltip />

      <Line
        type="monotone"
        dataKey="actual"
        stroke="#ff8a65"
        strokeWidth={3}
        dot={false}
      />

      <Line
        type="monotone"
        dataKey="simulated"
        stroke="#7db2ff"
        strokeWidth={3}
        dot={false}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

<div className="forecast-legend">

  <div className="legend-item">

    <span className="legend-dot actual"></span>

    <span>
      Situación actual 
    </span>

  </div>

  <div className="legend-item">

    <span className="legend-dot simulated"></span>

    <span>
      Situación tras aplicar medidas
    </span>

  </div>

</div>

  <div className="timeline-items">

  <div className="timeline-item">

    <span>+6h</span>

    <strong>

      {risk === "red" && "las esperas pueden empeorar"}
      {risk === "orange" && "empiezan a formarse más colas"}
      {risk === "yellow" && "conviene seguir observando"}
      {risk === "green" && "la situación se encuentra estable"}

    </strong>

  </div>

  <div className="timeline-item">

    <span>+12h</span>

    <strong>

      {risk === "red" && "la oficina podría colapsar"}
      {risk === "orange" && "muchos ciudadanos esperando"}
      {risk === "yellow" && "más carga de gestión interna"}
      {risk === "green" && "atención estable"}

    </strong>

  </div>

  <div className="timeline-item">

    <span>+24h</span>

    <strong>

      {risk === "red" && "se necesita apoyo inmediato"}
      {risk === "orange" && "convendría añadir más personal"}
      {risk === "yellow" && "seguir revisando la situación"}
      {risk === "green" && "la oficina se mantendría estable"}

    </strong>

  </div>

  <div className="timeline-item">

    <span>+48h</span>

    <strong>

      {risk === "red" && "las colas podrían desbordarse"}
      {risk === "orange" && "las esperas podrían aumentar significativamente"}
      {risk === "yellow" && "la situación seguiría controlada"}
      {risk === "green" && "la gestión funcionaría correctamente"}

    </strong>

  </div>

</div>

</div>
        <div className={`side-mini-status risk-${risk}`}>

  <span className="side-status-dot"></span>

  {risk === "red" &&
    "Monitorización crítica activa"}

  {risk === "orange" &&
    "Seguimiento preventivo reforzado"}

  {risk === "yellow" &&
    "Supervisión operativa en curso"}

  {risk === "green" &&
    "Sistema operativo estable"}

</div>
      </div>

    </div>

  </div>

)
}



export default Simulador;