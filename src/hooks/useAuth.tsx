import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("jwt_token");
      navigate("/login");
    }
  };

  return { logout };
};
