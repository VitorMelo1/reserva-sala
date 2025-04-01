// ✅ NOVO Reservas.tsx com capacidade dinâmica baseada no horário

import React, { useState } from "react";
import style from "./Reserva.module.scss";
import Header from "../../layouts/Header/Header";
import { Button } from "../../components";
import CampoFormulario from "../../components/campoFormulario/CampoFormulario";
import { SelectSala, SugestaoSala, ListaReservas } from "../../components/ReservaUI";

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

function horariosConflitam(horario1: string, horario2: string): boolean {
  const [inicio1, fim1] = horario1.split(" - ").map((h) => h.trim());
  const [inicio2, fim2] = horario2.split(" - ").map((h) => h.trim());
  return inicio1 < fim2 && fim1 > inicio2;
}

const Reservas: React.FC = () => {
  const [sala, setSala] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [horaFinal, setHoraFinal] = useState("");
  const [motivo, setMotivo] = useState("");
  const [materia, setMateria] = useState("");
  const [alunos, setAlunos] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [abaSelecionada, setAbaSelecionada] = useState<"ativas" | "canceladas">("ativas");
  const [filtroSala, setFiltroSala] = useState("");

  const capacidadeBase: { [sala: string]: number } = {
    A101: 40,
    A102: 35,
    B201: 30,
    C301: 25,
  };

  const calcularCapacidades = () => {
    const resultado: { [sala: string]: number } = { ...capacidadeBase };

    reservas.forEach((reserva) => {
      if (
        reserva.data === data &&
        reserva.status === "ativa" &&
        horariosConflitam(reserva.hora, `${hora} - ${horaFinal}`)
      ) {
        resultado[reserva.sala] -= reserva.alunos;
      }
    });

    return resultado;
  };

  const capacidades = calcularCapacidades();

  const salasFiltradas = Object.entries(capacidades)
    .filter(([nome, capacidade]) => {
      const indisponivel = reservas.some((r) => {
        if (r.sala !== nome || r.status !== "ativa") return false;
        if (r.data !== data) return false;

        if (r.data === new Date().toISOString().split("T")[0]) {
          const fimReserva = new Date(`${r.data}T${r.hora.split(" - ")[1]}:00`);
          if (fimReserva < new Date()) return false;
        }

        return horariosConflitam(r.hora, `${hora} - ${horaFinal}`);
      });

      return (
        nome.toLowerCase().includes(filtroSala.toLowerCase()) &&
        capacidade >= alunos &&
        !indisponivel
      );
    })
    .sort((a, b) => a[1] - b[1]);

  const handleReserva = async (e: React.FormEvent) => {
    e.preventDefault();

    const hojeData = new Date().toISOString().split("T")[0];
    const agora = new Date();
    const horarioSelecionado = new Date(`${data}T${hora}:00`);

    if (data < hojeData) {
      setMensagem("Não é possível realizar reservas para datas passadas.");
      return;
    }

    if (data === hojeData && horarioSelecionado < agora) {
      setMensagem("Não é possível reservar para horários que já passaram hoje.");
      return;
    }

    if (!sala || !data || !hora || !horaFinal || !motivo || !materia || alunos <= 0) {
      setMensagem("Por favor, preencha todos os campos corretamente.");
      return;
    }

    if (hora >= horaFinal) {
      setMensagem("O horário final deve ser maior que o horário inicial.");
      return;
    }

    const salaOcupada = reservas.some(
      (r) =>
        r.sala === sala &&
        r.data === data &&
        r.status === "ativa" &&
        horariosConflitam(r.hora, `${hora} - ${horaFinal}`)
    );

    if (salaOcupada) {
      setMensagem("Essa sala já está reservada nesse horário.");
      return;
    }

    if (alunos > capacidades[sala]) {
      setMensagem(`Capacidade insuficiente na sala ${sala}. Restam apenas ${capacidades[sala]} vagas.`);
      return;
    }

    const bloco = sala.charAt(0).toUpperCase();
    setLoading(true);
    setMensagem("");

    setTimeout(() => {
      const novaReserva: Reserva = {
        id: Date.now(),
        bloco,
        sala,
        data,
        hora: `${hora} - ${horaFinal}`,
        motivo,
        materia,
        alunos,
        status: "ativa",
      };

      setReservas((prev) => [...prev, novaReserva]);
      setLoading(false);
      setMensagem("Reserva realizada com sucesso!");
      setSala("");
      setData("");
      setHora("");
      setHoraFinal("");
      setMotivo("");
      setMateria("");
      setAlunos(0);
      setFiltroSala("");
    }, 1500);
  };

  const handleCancelar = (id: number) => {
    const motivoCancelamento = prompt("Informe o motivo do cancelamento:");
    if (!motivoCancelamento || motivoCancelamento.trim() === "") {
      setMensagem("Cancelamento não realizado: motivo obrigatório.");
      return;
    }

    setReservas((prev) =>
      prev.map((reserva) =>
        reserva.id === id
          ? { ...reserva, status: "cancelada", motivoCancelamento }
          : reserva
      )
    );

    setMensagem("Reserva cancelada com sucesso.");
  };

  const reservasAtivas = reservas.filter((r) => r.status === "ativa");
  const reservasCanceladas = reservas.filter((r) => r.status === "cancelada");

  return (
    <div>
      <Header titulo="Reserva de Sala" subtitulo="Preencha os dados para reservar uma sala." />

      <div className={style.reserva_container}>
        <form onSubmit={handleReserva}>
          <CampoFormulario label="Matéria:" valor={materia} onChange={(e) => setMateria(e.target.value)} />
          <CampoFormulario label="Data:" tipo="date" valor={data} onChange={(e) => setData(e.target.value)} min={new Date().toISOString().split("T")[0]} />

          <div className={style.horarios}>
            <CampoFormulario label="Início:" tipo="time" valor={hora} onChange={(e) => setHora(e.target.value)} />
            <CampoFormulario label="Fim:" tipo="time" valor={horaFinal} onChange={(e) => setHoraFinal(e.target.value)} />
          </div>

          <CampoFormulario label="Quantidade de Alunos:" tipo="number" valor={alunos} onChange={(e) => setAlunos(Number(e.target.value))} />
          <CampoFormulario label="Filtro por Nome da Sala:" valor={filtroSala} onChange={(e) => setFiltroSala(e.target.value)} placeholder="Digite para filtrar salas..." />

          <SugestaoSala alunos={alunos} salasFiltradas={salasFiltradas} />
          <SelectSala value={sala} onChange={(e) => setSala(e.target.value)} salas={salasFiltradas} disabled={false} />

          <CampoFormulario label="Motivo da Reserva:" valor={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Descreva o motivo da reserva" textarea />

          <Button text={loading ? "Reservando..." : "Reservar"} type="submit" disabled={loading} />
        </form>

        {mensagem && <p>{mensagem}</p>}
      </div>

      <div className={style.reserva_container}>
        <div className={style.abas}>
          <button className={abaSelecionada === "ativas" ? style.abaAtiva : ""} onClick={() => setAbaSelecionada("ativas")}>Reservas Ativas</button>
          <button className={abaSelecionada === "canceladas" ? style.abaAtiva : ""} onClick={() => setAbaSelecionada("canceladas")}>Reservas Canceladas</button>
        </div>

        {abaSelecionada === "ativas" && (
          <ListaReservas titulo="Reservas Ativas:" reservas={reservasAtivas} onCancelar={handleCancelar} />
        )}

        {abaSelecionada === "canceladas" && (
          <ListaReservas titulo="Reservas Canceladas:" reservas={reservasCanceladas} />
        )}
      </div>
    </div>
  );
};

export default Reservas;
