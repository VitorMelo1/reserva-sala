import React, { useState } from "react";
import style from "./Reserva.module.scss";
import Header from "../../layouts/Header/Header";
import { Button } from "../../components";
import ReservaCard from "../../components/ReservaCard/ReservaCard";
import cardStyle from "../../components/ReservaCard/ReservaCard.module.scss";

interface Reserva {
  bloco: string;
  sala: string;
  data: string;
  hora: string;
  motivo: string;
  alunos: number;
}

const Reservas: React.FC = () => {
  const [sala, setSala] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [motivo, setMotivo] = useState("");
  const [alunos, setAlunos] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [capacidades, setCapacidades] = useState<{ [sala: string]: number }>({
    A101: 40,
    A102: 35,
    B201: 30,
    C301: 25,
  });
  const [filtroSala, setFiltroSala] = useState("");

  const salasFiltradas = Object.entries(capacidades).filter(([nome]) =>
    nome.toLowerCase().includes(filtroSala.toLowerCase())
  );

  const handleReserva = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sala || !data || !hora || !motivo || alunos <= 0) {
      setMensagem("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const capacidadeAtual = capacidades[sala];
    if (capacidadeAtual === undefined) {
      setMensagem(`Sala ${sala} não existe.`);
      return;
    }

    if (alunos > capacidadeAtual) {
      setMensagem(`Capacidade insuficiente na sala ${sala}. Restam apenas ${capacidadeAtual} vagas.`);
      return;
    }

    const bloco = sala.charAt(0).toUpperCase();

    setLoading(true);
    setMensagem("");

    setTimeout(() => {
      const novaReserva: Reserva = { bloco, sala, data, hora, motivo, alunos };
      setReservas((prev) => [...prev, novaReserva]);
      setCapacidades((prev) => ({
        ...prev,
        [sala]: prev[sala] - alunos,
      }));

      setLoading(false);
      setMensagem("Reserva realizada com sucesso!");
      setSala("");
      setData("");
      setHora("");
      setMotivo("");
      setAlunos(0);
      setFiltroSala("");
    }, 1500);
  };

  return (
    <div>
      <Header titulo="Reserva de Sala" subtitulo="Preencha os dados para reservar uma sala." />

      <div className={style.reserva_container}>
        <form onSubmit={handleReserva}>
          <label>
            Sala:
            <input
              type="text"
              placeholder="Digite para filtrar salas..."
              value={filtroSala}
              onChange={(e) => setFiltroSala(e.target.value)}
              style={{ marginBottom: "8px", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <select
              value={sala}
              onChange={(e) => setSala(e.target.value)}
              style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
            >
              <option value="">Selecione uma sala</option>
              {salasFiltradas.map(([nomeSala, capacidade]) => (
                <option key={nomeSala} value={nomeSala}>
                  {nomeSala} ({capacidade} vagas disponíveis)
                </option>
              ))}
            </select>
          </label>

          <label>
            Data:
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
          </label>

          <label>
            Horário:
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
          </label>

          <label>
            Quantidade de Alunos:
            <input type="number" value={alunos} onChange={(e) => setAlunos(Number(e.target.value))} />
          </label>

          <label>
            Motivo da Reserva:
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
              style={{ resize: "vertical", width: "100%", borderRadius: "8px", padding: "8px" }}
              placeholder="Descreva o motivo da reserva"
            />
          </label>

          <Button text={loading ? "Reservando..." : "Reservar"} type="submit" disabled={loading} />
        </form>

        {mensagem && <p>{mensagem}</p>}

        {reservas.length > 0 && (
          <div className={style.reservas_lista}>
            <h3>Reservas Realizadas:</h3>
            <div className={cardStyle.cards_container}>
              {reservas.map((reserva, index) => (
                <ReservaCard key={index} {...reserva} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservas;
