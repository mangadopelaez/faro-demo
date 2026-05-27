function AlertRow({
  onClick,
  isSelected,
  office,
  level,
  label,
  status,
  priority,
  isp,
  action,
  time,
}) {
  return (
    <div
  className={`alert-row ${level} ${isSelected ? "selected" : ""}`}
  onClick={onClick}
>

      <div className="alert-office-icon">
        🏢
      </div>

      <div className="alert-row-info">

        <div>
          <span className={`alert-badge ${level}`}>
            {label}
          </span>

          <span className={`alert-priority ${level}`}>
            {priority}
          </span>
        </div>

        <h4>
          {office}
        </h4>

        <p>
          ISP operativo: {isp} · {action}
        </p>

      </div>

      <span className={`alert-live ${status}`}>
        {status === "critical" ? "CRÍTICA" : status === "warning" ? "VIGILANCIA" : "ESTABLE"}
      </span>

      <span className="alert-time">
        {time}
      </span>

      <button
        className="alert-arrow"
        aria-label={`Ver detalle de ${office}`}
      >
        ›
      </button>

    </div>
  );
}

export default AlertRow;