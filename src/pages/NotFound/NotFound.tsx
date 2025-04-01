import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notfound_container}>
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <button onClick={() => navigate("/dashboard")}>Voltar ao Início</button>
    </div>
  );
};

export default NotFound;
