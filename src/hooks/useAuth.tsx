// Hook do React Router para redirecionamento
import { useNavigate } from "react-router-dom";

// Hook customizado para lógica de autenticação
export const useAuth = () => {
  const navigate = useNavigate(); // Permite navegação programática entre rotas

  // Função de logout
  const logout = () => {
    // Exibe uma confirmação antes de sair
    if (window.confirm("Tem certeza que deseja sair?")) {
      // Remove o token JWT do localStorage
      localStorage.removeItem("jwt_token");

      // Redireciona para a página de login
      navigate("/login");
    }
  };

  // Retorna a função logout para ser usada em componentes
  return { logout };
};
