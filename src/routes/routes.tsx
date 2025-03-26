import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login"; 
import Dashboard from "../pages/Dashboard/Dashboard";
import Relatorio from "../pages/Relatorios/Relatorios.tsx";
import Reservas from "../pages/Reserva/Reserva.tsx";  
import PageLayout from "../layouts/MainLayout/MainLayout"; 
import ProtectedRoute from "./ProtectedRoute"; // Importando a proteção de rota

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a página inicial "/" para "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Páginas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* add header */}
          <Route element={<PageLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/relatorios" element={<Relatorio />} />
          </Route>
        </Route>

        {/* Redireciona qualquer rota inválida para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
