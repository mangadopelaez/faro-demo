import "./App.css"

import "./styles/dashboard.css"
import "./styles/simulator.css"
import "./styles/alerts.css"
import "./styles/reports.css"
import "./styles/offices.css"
import "./styles/responsive.css"

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom"

import Sidebar from "./components/Sidebar"

import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import Oficinas from "./pages/Oficinas"
import Alertas from "./pages/Alertas"
import Informes from "./pages/Informes"
import Simulador from "./pages/Simulador"

function AppLayout() {
  const location = useLocation()
  const isLanding = location.pathname === "/"

  return (
    <div className="app">

      {!isLanding && <Sidebar />}

      <main className={isLanding ? "landing-main" : "main-content"}>

        <Routes>

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/oficinas"
            element={<Oficinas />}
          />

          <Route
            path="/alertas"
            element={<Alertas />}
          />

          <Route
            path="/informes"
            element={<Informes />}
          />

          <Route
            path="/simulador"
            element={<Simulador />}
          />

        </Routes>

      </main>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App