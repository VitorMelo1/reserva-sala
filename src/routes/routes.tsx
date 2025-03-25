import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login"; 
import Dashboard from "../pages/Dashboard/Dashboard"; 
import ProtectedRoute from "./ProtectedRoute"; // Importando a proteção de rota

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a página inicial "/" para "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida (somente acessível se estiver autenticado) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redireciona qualquer rota inválida para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
