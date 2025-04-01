import React from "react";
import ReservaCard from "../ReservaCard/ReservaCard";
import styles from "./ListaReserva.module.scss";

interface Reserva {
  id: number;
  bloco: string;
  sala: string;
  data: string;
  hora: string;
  motivo: string;
  materia: string;
  alunos: number;
  status: "ativa" | "cancelada";
  motivoCancelamento?: string;
}

interface ListaReservasProps {
  titulo: string;
  reservas: Reserva[];
  onCancelar?: (id: number) => void;
}

const ListaReservas: React.FC<ListaReservasProps> = ({ titulo, reservas, onCancelar }) => {
  return (
    <div>
      <h3>{titulo}</h3>
      {reservas.length === 0 && <p>Nenhuma reserva disponível.</p>}

      <div className={styles.lista}>
        {reservas.map((reserva) => (
          <ReservaCard
            key={reserva.id}
            bloco={reserva.bloco}
            sala={reserva.sala}
            data={reserva.data}
            hora={reserva.hora}
            motivo={reserva.motivo}
            materia={reserva.materia}
            alunos={reserva.alunos}
            status={reserva.status}
            motivoCancelamento={reserva.motivoCancelamento}
            onCancelar={onCancelar ? () => onCancelar(reserva.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaReservas;
