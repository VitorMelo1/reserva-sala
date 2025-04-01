import React, { useState } from "react";
import style from "./Relatorios.module.scss";
import Header from "../../layouts/Header/Header";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Chart as ChartJS
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

interface Reserva {
  sala: string;
  data: string;
  hora: string;
  status: "ativa" | "cancelada";
}

const reservas: Reserva[] = [
  { sala: "A101", data: "2025-03-20", hora: "08:00", status: "ativa" },
  { sala: "A101", data: "2025-03-21", hora: "08:00", status: "ativa" },
  { sala: "B201", data: "2025-03-21", hora: "10:00", status: "ativa" },
  { sala: "B201", data: "2025-03-21", hora: "10:00", status: "cancelada" },
  { sala: "C301", data: "2025-03-22", hora: "14:00", status: "ativa" },
  { sala: "A102", data: "2025-03-22", hora: "08:00", status: "ativa" },
  { sala: "A101", data: "2025-03-23", hora: "08:00", status: "ativa" },
];

const agrupar = (lista: Reserva[], chave: keyof Reserva) => {
  const resultado: Record<string, number> = {};
  lista.forEach((r) => {
    if (r.status === "ativa") {
      const valor = r[chave];
      resultado[valor] = (resultado[valor] || 0) + 1;
    }
  });
  return resultado;
};

const Relatorios: React.FC = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const reservasFiltradas = reservas.filter((r) => {
    if (!dataInicio && !dataFim) return true;
    const data = new Date(r.data);
    const inicio = dataInicio ? new Date(dataInicio) : null;
    const fim = dataFim ? new Date(dataFim) : null;
    return (!inicio || data >= inicio) && (!fim || data <= fim);
  });

  const totalReservas = reservasFiltradas.filter(r => r.status === "ativa").length;
  const totalCanceladas = reservasFiltradas.filter(r => r.status === "cancelada").length;
  const porSala = agrupar(reservasFiltradas, "sala");
  const porData = agrupar(reservasFiltradas, "data");
  const porHorario = agrupar(reservasFiltradas, "hora");

  const topSala = Object.entries(porSala).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const diaComMais = Object.entries(porData).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return (
    <div className={style.relatorios_container}>
      <Header titulo="Relatórios" subtitulo="Visualize os dados de uso das salas" />

      <div className={style.date_filter}>
        <label>Início:
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </label>
        <label>Fim:
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </label>
      </div>

      <div className={style.resumo_grid}>
        <div className={style.resumo_card}>
          <h4>Total de Reservas</h4>
          <span>{totalReservas}</span>
        </div>
        <div className={style.resumo_card}>
          <h4>Total Canceladas</h4>
          <span>{totalCanceladas}</span>
        </div>
        <div className={style.resumo_card}>
          <h4>Top Sala</h4>
          <span>{topSala}</span>
        </div>
        <div className={style.resumo_card}>
          <h4>Dia Mais Cheio</h4>
          <span>{diaComMais}</span>
        </div>
      </div>
      <div className={style.grup_chart}>
        <div className={style.chart_box}>
          <h3>Salas Mais Reservadas</h3>
          <div className={style.chart_wrapper}>
            <Bar
              data={{
                labels: Object.keys(porSala),
                datasets: [
                  {
                    label: "Reservas",
                    data: Object.values(porSala),
                    backgroundColor: "#007bff",
                    borderRadius: 8
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        <div className={style.chart_box}>
          <h3>Reservas por Data</h3>
          <div className={style.chart_wrapper}>
            <Line
              data={{
                labels: Object.keys(porData),
                datasets: [
                  {
                    label: "Reservas por dia",
                    data: Object.values(porData),
                    borderColor: "#28a745",
                    backgroundColor: "#28a74533",
                    tension: 0.3,
                    fill: true,
                    pointRadius: 5
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        <div className={style.chart_box}>
          <h3>Horários Mais Reservados</h3>
          <div className={style.chart_wrapper}>
            <Pie
              data={{
                labels: Object.keys(porHorario),
                datasets: [
                  {
                    label: "Reservas",
                    data: Object.values(porHorario),
                    backgroundColor: ["#ffc107", "#dc3545", "#17a2b8", "#6f42c1", "#20c997"],
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
