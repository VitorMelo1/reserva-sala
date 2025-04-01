import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas do sistema
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Relatorio from "../pages/Relatorios/Relatorios";
import Reservas from "../pages/Reserva/Reserva";
import NotFound from "../pages/NotFound/NotFound.tsx"; // Página 404 personalizada

// Layout e rotas protegidas
import PageLayout from "../layouts/MainLayout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz "/" para "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Página pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas, apenas para usuários autenticados */}
        <Route element={<ProtectedRoute />}>
          {/* Layout principal aplicado às páginas internas */}
          <Route element={<PageLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/relatorios" element={<Relatorio />} />
          </Route>
        </Route>

        {/* Rota para qualquer caminho não reconhecido (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
