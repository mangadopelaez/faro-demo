const alerts = [

  {
    id: 1,
    level: "red",
    office: "Oficina Centro",
    message: "Colapso operativo detectado",
    time: "Hace 2 min",
  },

  {
    id: 2,
    level: "orange",
    office: "Oficina Norte",
    message: "Aumento anormal de demanda",
    time: "Hace 8 min",
  },

  {
    id: 3,
    level: "yellow",
    office: "Oficina Sur",
    message: "Tiempo de espera elevado",
    time: "Hace 15 min",
  },

];

function LiveAlerts() {

  return (

    <div className="live-alerts">

      <div className="section-header">

        <h2>
          Alertas Operativas
        </h2>

        <span className="live-dot" />

      </div>

      {alerts.map((alert) => (

        <div
          key={alert.id}
          className={`
            alert-item
            alert-${alert.level}
          `}
        >

          <div className="alert-left">

            <span className="alert-office">
              {alert.office}
            </span>

            <p>
              {alert.message}
            </p>

          </div>

          <span className="alert-time">
            {alert.time}
          </span>

        </div>

      ))}

    </div>

  )
}

export default LiveAlerts;