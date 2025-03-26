import React from "react";
import style from "./SalaCard.module.scss"; // Importação correta do CSS Modules

interface SalaProps {
  id: number;
  bloco: string;
  nome: string;
  capacidade: number;
  ocupada: boolean;
}

const SalaCard: React.FC<SalaProps> = ({ bloco, nome, capacidade, ocupada }) => {
  return (
    <div className={`${style.salaCard} ${ocupada ? style.ocupada : style.livre}`}>
      <h3>{nome}</h3>
      <p>Bloco: {bloco}</p>
      <p>Capacidade: {capacidade}</p>
      <span className={style.status}>{ocupada ? "Ocupada" : "Livre"}</span>
    </div>
  );
};

export default SalaCard;
