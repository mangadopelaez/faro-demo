import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="landing-page">

      <div className="landing-hero">

        <div className="landing-brand-mark">

  <img
    src="/faro-icon-only.svg"
    alt="FARO"
    className="landing-brand-logo"
  />

  <span>
    FARO
  </span>

</div>

        <p className="landing-badge">
          FARO · GovTech Predictivo
        </p>

        <h1>
          Anticipa saturación administrativa antes de que ocurra
        </h1>

        <p className="landing-subtitle">
          FARO ayuda a oficinas públicas a prever colas, esperas y puntos de riesgo para tomar mejores decisiones antes de que el servicio se bloquee.
        </p>

        <div className="landing-actions">
          <Link to="/dashboard" className="landing-primary-btn">
            Entrar en la demo
          </Link>

          <Link to="/simulador" className="landing-secondary-btn">
            Ver simulador
          </Link>
        </div>

           </div>

      <div className="landing-features">

  <div className="landing-feature-card">

    <span className="landing-feature-label">
      Ver problemas antes
    </span>

    <h3>
     Detecta aumentos de demanda antes de que afecten a la atención ciudadana.
    </h3>

    <p>
      FARO muestra dónde puede haber más espera y qué oficinas empiezan a necesitar apoyo.
    </p>

  </div>

  <div className="landing-feature-card">

    <span className="landing-feature-label">
      Actuar antes
    </span>

    <h3>
      Ver qué problema es más urgente y dónde conviene empezar.
    </h3>

    <p>
      La plataforma ayuda a decidir si hace falta mover personal, abrir más citas o vigilar una oficina concreta.
    </p>

  </div>

  <div className="landing-feature-card">

    <span className="landing-feature-label">
      Probar escenarios
    </span>

    <h3>
      Cambiar datos y ver cómo podría evolucionar la situación.
    </h3>

    <p>
      Puedes simular más demanda, menos personal o una campaña fuerte y ver si el riesgo sube o baja.
    </p>

  </div>

      </div>

      <div className="landing-preview">

        <div className="landing-preview-header">

          <div className="landing-preview-dots">
            <span />
            <span />
            <span />
          </div>

          <p>
            FARO · Operational Intelligence
          </p>

        </div>

        <div className="landing-preview-grid">

          <div className="landing-preview-card large">

            <span>
              Riesgo operativo
            </span>

            <h3>
              ALTO
            </h3>

            <p>
              3 oficinas empiezan a acumular más carga de atención.
            </p>

          </div>

          <div className="landing-preview-card">

            <span>
              Espera media
            </span>

            <h3>
              28 min
            </h3>

          </div>

          <div className="landing-preview-card">

            <span>
              Oficinas críticas
            </span>

            <h3>
              3
            </h3>

          </div>

          <div className="landing-preview-card wide">

            <span>
              Qué conviene hacer
            </span>

            <p>
              Reforzar atención en Oficina Centro y mover parte de la demanda a oficinas con menor saturación.
            </p>

          </div>

        </div>

            </div>

      <div className="landing-cta">

        <span className="landing-cta-label">
          FARO · Plataforma predictiva
        </span>

        <h2>
          Convierte datos administrativos en decisiones anticipadas.
        </h2>

        <p>
          Detecta saturación antes de que aumenten las esperas y visualiza qué oficinas necesitan apoyo.
        </p>

        <div className="landing-actions">

          <Link
            to="/dashboard"
            className="landing-primary-btn"
          >
            Ver plataforma
          </Link>

          <Link
            to="/simulador"
            className="landing-secondary-btn"
          >
            Abrir simulador
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Landing;