import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
    // const token = localStorage.getItem("jwt_token");  Verifica se há um token salvo
    const token = localStorage.getItem("jwt_token");// Simula um usuário autenticado

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
