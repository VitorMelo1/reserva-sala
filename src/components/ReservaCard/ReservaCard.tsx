import React from "react";
import styles from "./ReservaCard.module.scss";

interface ReservaCardProps {
  bloco: string;
  sala: string;
  data: string;
  hora: string;
  motivo: string;
  alunos: number;
}

const ReservaCard: React.FC<ReservaCardProps> = ({
  bloco,
  sala,
  data,
  hora,
  motivo,
  alunos,
}) => {
  return (
    <div className={styles.card}>
      <h4>{bloco} - Sala {sala}</h4>
      <p><strong>Data:</strong> {data}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Alunos:</strong> {alunos}</p>
      <p><strong>Motivo:</strong> {motivo}</p>
    </div>
  );
};

export default ReservaCard;
