// Importa o React e os estilos do card
import React, { useState } from "react";
import styles from "./ReservaCard.module.scss";

// Tipagem das propriedades que o componente irá receber
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

// Componente do card individual de reserva
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

  // Exibe o motivo completo ao abrir o modal
  const abrirModal = (texto: string) => {
    setMotivoSelecionado(texto);
    setMostrarMotivoCompleto(true);
  };

  // Limita o texto do motivo e adiciona 'Ler mais' se necessário
  const encurtarMotivo = (texto: string) => {
    const limite = 80;
    return texto.length > limite
      ? `${texto.substring(0, limite)}... Ler mais`
      : texto;
  };

  return (
    <>
      {/* Card visual com status diferente para ativa/cancelada */}
      <div
        className={`${styles.card} ${
          status === "cancelada" ? styles.cancelado : styles.ativo
        }`}
      >
        {/* Título do card */}
        <h4
          className={
            status === "cancelada"
              ? styles.canceladoTitulo
              : styles.ativoTitulo
          }
        >
          {bloco} - Sala {sala}
        </h4>

        {/* Informações da reserva */}
        <p><strong>Data:</strong> {data}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>Alunos:</strong> {alunos}</p>
        <p><strong>Matéria:</strong> {materia}</p>

        {/* Exibe o motivo (ativa ou cancelada) com clique para expandir */}
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

        {/* Exibe status com emoji de status */}
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

        {/* Botão de cancelamento (apenas se for ativa) */}
        {status === "ativa" && onCancelar && (
          <button onClick={onCancelar} className={styles.botaoCancelar}>
            Cancelar Reserva
          </button>
        )}
      </div>

      {/* Modal para exibir o motivo completo */}
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