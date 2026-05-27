import SaturationCard from "../components/SaturationCard";

import PredictiveChart from "../components/PredictiveChart";

import RecommendationCard from "../components/RecommendationCard";

import TopMetrics from "../components/TopMetrics";

import LiveAlerts from "../components/LiveAlerts";

import { faroSystem } from "../data/faroSystem";

import { getRecommendation } from "../utils/recommendations";

function Dashboard() {

  const {
  processedOffices,
  metrics,
} = faroSystem;

const criticalOffices =
  metrics.criticalOffices;

const avgWait =
  metrics.avgWaitTime;

const avgSaturation =
  metrics.avgSaturation;

const totalRisk =
  metrics.globalRisk;

    const liveIncidents = processedOffices.filter(
  office => office.risk === "red" || office.risk === "orange"
).length;

const lastUpdate = processedOffices.some(
  office => office.risk === "red"
)
  ? 12
  : 28;
  return (


    <div className="dashboard-container">

  <h1 className="title">
    FARO
  </h1>

  <p className="subtitle">
    Anticipa colas, esperas y oficinas que necesitan apoyo
  </p>

  <div className="top-dashboard-layout">

  <div className="top-kpi-panel">

    <TopMetrics
      totalRisk={totalRisk}
      criticalOffices={criticalOffices}
      avgWait={avgWait}
      avgSaturation={avgSaturation}
      liveIncidents={liveIncidents}
      lastUpdate={lastUpdate}
    />

  </div>

  <div className="top-chart-panel">

    <PredictiveChart
  avgSaturation={avgSaturation}
  totalRisk={totalRisk}
/>

  </div>

</div>

<div className="cards-grid-header">

  <h3 className="dashboard-section-title">
    Cómo están las oficinas ahora
  </h3>

</div>

<div className="cards-grid">

  {processedOffices.map((office) => (

    <div
      className="saturation-card-wrapper"
      key={office.id}
    >

      <SaturationCard
        title={office.name}
        saturation={office.saturation}
        time={office.waitTime}
        risk={office.risk}
        isp={office.isp}
      />

    </div>

  ))}

</div>

<div className="bottom-panels-grid">

  {/* ALERTAS */}

  <div className="bottom-panel">

    <h3 className="dashboard-section-title">
      Avisos importantes
    </h3>

    <LiveAlerts />

  </div>

  {/* RECOMENDACIONES */}

  <div className="bottom-panel">

    <h3 className="dashboard-section-title">
     Qué conviene hacer
    </h3>

    <div className="recommendations-grid">

      {processedOffices.map((office) => (

        <RecommendationCard
          key={office.name}
          title={office.name}
          recommendation={office.recommendation}
          risk={office.risk}
        />

      ))}

    </div>

  </div>

</div>

</div>

);
}

export default Dashboard;