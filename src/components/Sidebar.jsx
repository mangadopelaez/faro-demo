import { NavLink } from "react-router-dom"

function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">
        FARO
      </h2>

      <ul className="nav-links">

        <li>
          <NavLink to="/">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/oficinas">
            Oficinas
          </NavLink>
        </li>

        <li>
          <NavLink to="/alertas">
            Alertas
          </NavLink>
        </li>

        <li>
          <NavLink to="/informes">
            Informes
          </NavLink>
        </li>

        <li>
          <NavLink to="/simulador">
            Simulador
          </NavLink>
        </li>

      </ul>

    </div>

  )
}

export default Sidebar