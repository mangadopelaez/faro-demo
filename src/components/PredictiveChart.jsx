import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function buildPredictiveData(avgSaturation) {
  return [
    { day: "Lun", saturation: Math.max(avgSaturation - 18, 20) },
    { day: "Mar", saturation: Math.max(avgSaturation - 8, 20) },
    { day: "Mié", saturation: avgSaturation },
    { day: "Jue", saturation: Math.min(avgSaturation + 12, 100) },
    { day: "Vie", saturation: Math.min(avgSaturation + 6, 100) },
    { day: "Sáb", saturation: Math.max(avgSaturation - 14, 20) },
    { day: "Dom", saturation: Math.max(avgSaturation - 22, 20) },
  ];
}

function PredictiveChart({
  avgSaturation = 60,
  totalRisk = "ESTABLE",
}) {

  const data = buildPredictiveData(avgSaturation);

  const chartColor =
  totalRisk === "CRÍTICO"
    ? "#ff8f8f"
    : totalRisk === "ALTO"
    ? "#ffbf80"
    : "#7db2ff";

  return (

    <div className="chart-container">

      <div className="chart-header">

        <h2>
          Cómo puede evolucionar la saturación
        </h2>

        <span className="chart-badge">
          Previsión FARO
        </span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={220}
      >

        <LineChart
  data={data}
  margin={{
  top: 6,
  right: -40,
  left: -12,
  bottom: 0,
}}
>
  <defs>
    <linearGradient
  id="forecastGradient"
  x1="0"
  y1="0"
  x2="0"
  y2="1"
>

  <stop
    offset="0%"
    stopColor="#5ea0ff"
    stopOpacity={0.5}
  />

  <stop
    offset="100%"
    stopColor="#5ea0ff"
    stopOpacity={0}
  />

</linearGradient>

  <filter id="forecastGlow">

    <feGaussianBlur
      stdDeviation="3"
      result="coloredBlur"
    />

    <feMerge>

      <feMergeNode in="coloredBlur" />

      <feMergeNode in="SourceGraphic" />

    </feMerge>

  </filter>

</defs>

          <XAxis
            dataKey="day"
            stroke="rgba(255,255,255,0.2)"
            tickMargin={4}
            dy={8}
            axisLine={false}
            tickLine={false}
            padding={{
            left: 0,
            right: 0,
    
            }}
      />

          <YAxis
            domain={[20, 100]}
            stroke="rgba(255,255,255,0.2)"
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
  content={({ active, payload, label }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      return (

        <div className="forecast-tooltip">

          <span className="forecast-tooltip-label">
            Día {label}
          </span>

          <strong className="forecast-tooltip-value">
            Carga estimada:
            {" "}
            {payload[0].value}%
          </strong>

        </div>

      )
    }

    return null;

  }}
  cursor={{
    stroke: "rgba(126,166,255,0.12)",
    strokeWidth: 1,
  }}
/>
      <Area
       type="monotone"
      dataKey="saturation"
      stroke="none"
      fill="url(#forecastGradient)"
      fillOpacity={1}
/>

          <Line
            type="monotone"
            dataKey="saturation"
            stroke="#5ea0ff"
            filter="url(#forecastGlow)"
            strokeWidth={2.8}
            strokeLinecap="round"
            isAnimationActive={true}
            animationDuration={1800}
            dot={{
              r: 2.2,
              fill: "#ffffff",
              stroke: "#5ea0ff",
              strokeWidth: 1.5,
            }}
             activeDot={{
              r: 4,
              fill: "#ffffff",
              stroke: "#7ea6ff",
              strokeWidth: 2,
            }}
        />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}

export default PredictiveChart;