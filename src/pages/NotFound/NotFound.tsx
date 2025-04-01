import React from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import styles from "./NotFound.module.scss";    // Estilização específica do componente

// Componente de página 404 (não encontrada)
const NotFound: React.FC = () => {
  const navigate = useNavigate(); // Hook para redirecionar programaticamente

  return (
    <div className={styles.notfound_container}>
      {/* Código de erro */}
      <h1>404</h1>

      {/* Mensagem explicando o erro */}
      <p>Página não encontrada.</p>

      {/* Botão que leva o usuário de volta ao dashboard */}
      <button onClick={() => navigate("/dashboard")}>
        Voltar ao Início
      </button>
    </div>
  );
};

export default NotFound;
