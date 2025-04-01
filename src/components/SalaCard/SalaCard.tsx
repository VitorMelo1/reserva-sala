import React from "react";
import style from "./SalaCard.module.scss"; // Importa os estilos do componente com CSS Modules

// Interface para tipar as propriedades que o componente recebe
interface SalaProps {
  id: number;
  bloco: string;
  nome: string;
  capacidade: number;
  ocupada: boolean;
}

// Componente funcional que representa o cartão de uma sala
const SalaCard: React.FC<SalaProps> = ({ bloco, nome, capacidade, ocupada }) => {
  return (
    <div className={`${style.salaCard} ${ocupada ? style.ocupada : style.livre}`}>
      {/* Nome da sala */}
      <h3>{nome}</h3>

      {/* Informações sobre bloco e capacidade */}
      <p>Bloco: {bloco}</p>
      <p>Capacidade: {capacidade}</p>

      {/* Status da sala, com estilo condicional */}
      <span className={style.status}>{ocupada ? "Ocupada" : "Livre"}</span>
    </div>
  );
};

export default SalaCard;
