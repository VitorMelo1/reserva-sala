import React, { useState } from "react";
import styles from "./ReservaCard.module.scss";

interface ReservaCardProps {
  bloco: string;
  sala: string;
  data: string;
  hora: string;
  motivo: string;
  materia: string;
  alunos: number;
  status: "ativa" | "cancelada";
  motivoCancelamento?: string;
  onCancelar?: () => void;
}

const ReservaCard: React.FC<ReservaCardProps> = ({
  bloco,
  sala,
  data,
  hora,
  motivo,
  materia,
  alunos,
  status,
  motivoCancelamento,
  onCancelar,
}) => {
  const [mostrarMotivoCompleto, setMostrarMotivoCompleto] = useState(false);
  const [motivoSelecionado, setMotivoSelecionado] = useState("");

  const abrirModal = (texto: string) => {
    setMotivoSelecionado(texto);
    setMostrarMotivoCompleto(true);
  };

  const encurtarMotivo = (texto: string) => {
    const limite = 80;
    return texto.length > limite
      ? `${texto.substring(0, limite)}... Ler mais`
      : texto;
  };

  return (
    <>
      <div
        className={`${styles.card} ${
          status === "cancelada" ? styles.cancelado : styles.ativo
        }`}
      >
        <h4
          className={
            status === "cancelada"
              ? styles.canceladoTitulo
              : styles.ativoTitulo
          }
        >
          {bloco} - Sala {sala}
        </h4>

        <p><strong>Data:</strong> {data}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>Alunos:</strong> {alunos}</p>
        <p><strong>Matéria:</strong> {materia}</p>

        {/* Motivo (ativa ou cancelada) */}
        {status === "ativa" && (
          <p
            className={styles.motivoTexto}
            title="Clique para ver o motivo completo"
            onClick={() => abrirModal(motivo)}
            style={{ cursor: "pointer" }}
          >
            <strong>Motivo:</strong> {encurtarMotivo(motivo)}
          </p>
        )}

        {status === "cancelada" && motivoCancelamento && (
          <p
            className={styles.canceladoMotivo}
            title="Clique para ver o motivo completo"
            onClick={() => abrirModal(motivoCancelamento)}
            style={{ cursor: "pointer" }}
          >
            <strong>Motivo:</strong> {encurtarMotivo(motivoCancelamento)}
          </p>
        )}

        <p
          className={
            status === "cancelada"
              ? styles.canceladoStatus
              : styles.ativoStatus
          }
        >
          <strong>Status:</strong>{" "}
          {status === "cancelada" ? "🔴 Cancelada" : "🟢 Ativa"}
        </p>

        {status === "ativa" && onCancelar && (
          <button onClick={onCancelar} className={styles.botaoCancelar}>
            Cancelar Reserva
          </button>
        )}
      </div>

      {/* Modal */}
      {mostrarMotivoCompleto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h4>Motivo Completo</h4>
            <p>{motivoSelecionado}</p>
            <button onClick={() => setMostrarMotivoCompleto(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservaCard;
