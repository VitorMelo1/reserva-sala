import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Relatorio from "../pages/Relatorios/Relatorios";
import Reservas from "../pages/Reserva/Reserva";
import PageLayout from "../layouts/MainLayout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound/NotFound.tsx"; // aqui

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/relatorios" element={<Relatorio />} />
          </Route>
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
