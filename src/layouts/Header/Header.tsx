import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  titulo: string;
  subtitulo?: string;
  children?: React.ReactNode; // Se quiser colocar botões ou filtros específicos
}

const Header: React.FC<HeaderProps> = ({ titulo, subtitulo, children }) => {
  return (
    <div className={styles.header}>
      <div>
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
      <div className={styles.headerExtras}>
        {children}
      </div>
    </div>
  );
};

export default Header;
