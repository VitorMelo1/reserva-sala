// Importações principais do React e estilo da página
import React, { useState } from "react";
import style from "./Relatorios.module.scss";
import Header from "../../layouts/Header/Header";

// Importação dos módulos do Chart.js
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

// Registro dos componentes de gráfico utilizados
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

// Interface para definir a estrutura de uma reserva
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

// Dados mockados das reservas
const reservas: Reserva[] = [
  {
    id: 1,
    bloco: "A",
    sala: "A101",
    data: "2025-03-20",
    hora: "08:00 - 09:00",
    motivo: "Aula regular",
    materia: "Matemática",
    alunos: 30,
    status: "ativa",
  },
  {
    id: 2,
    bloco: "A",
    sala: "A101",
    data: "2025-03-21",
    hora: "08:00 - 09:00",
    motivo: "Prova",
    materia: "História",
    alunos: 25,
    status: "ativa",
  },
  {
    id: 3,
    bloco: "B",
    sala: "B201",
    data: "2025-03-21",
    hora: "10:00 - 11:00",
    motivo: "Reunião",
    materia: "Física",
    alunos: 15,
    status: "ativa",
  },
  {
    id: 4,
    bloco: "B",
    sala: "B201",
    data: "2025-03-21",
    hora: "10:00 - 11:00",
    motivo: "Desmarcada",
    materia: "Física",
    alunos: 15,
    status: "cancelada",
    motivoCancelamento: "Professor ausente"
  },
  {
    id: 5,
    bloco: "C",
    sala: "C301",
    data: "2025-03-22",
    hora: "14:00 - 15:00",
    motivo: "Aula prática",
    materia: "Biologia",
    alunos: 20,
    status: "ativa",
  },
  {
    id: 6,
    bloco: "A",
    sala: "A102",
    data: "2025-03-22",
    hora: "08:00 - 09:00",
    motivo: "Aula normal",
    materia: "Português",
    alunos: 35,
    status: "ativa",
  },
  {
    id: 7,
    bloco: "A",
    sala: "A101",
    data: "2025-03-23",
    hora: "08:00 - 09:00",
    motivo: "Simulado",
    materia: "Química",
    alunos: 38,
    status: "ativa",
  }
];

// Função para agrupar reservas por uma chave (sala, data, hora...)
const agrupar = (lista: Reserva[], chave: keyof Reserva) => {
  const resultado: Record<string, number> = {};
  lista.forEach((r) => {
    const valor = r[chave];
    if (r.status === "ativa" && typeof valor === "string") {
      resultado[valor] = (resultado[valor] || 0) + 1;
    }
  });
  return resultado;
};

const Relatorios: React.FC = () => {
  // Estado para controle dos filtros de data
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Filtragem das reservas com base nas datas selecionadas
  const reservasFiltradas = reservas.filter((r) => {
    if (!dataInicio && !dataFim) return true;
    const data = new Date(r.data);
    const inicio = dataInicio ? new Date(dataInicio) : null;
    const fim = dataFim ? new Date(dataFim) : null;
    return (!inicio || data >= inicio) && (!fim || data <= fim);
  });

  // Gera estatísticas com base nas reservas filtradas
  const totalReservas = reservasFiltradas.filter(r => r.status === "ativa").length;
  const totalCanceladas = reservasFiltradas.filter(r => r.status === "cancelada").length;
  const porSala = agrupar(reservasFiltradas, "sala");
  const porData = agrupar(reservasFiltradas, "data");
  const porHorario = agrupar(reservasFiltradas, "hora");

  // Descobre a sala mais usada e o dia com mais reservas
  const topSala = Object.entries(porSala).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const diaComMais = Object.entries(porData).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return (
    <div className={style.relatorios_container}>
      {/* Cabeçalho da página */}
      <Header titulo="Relatórios" subtitulo="Visualize os dados de uso das salas" />

      {/* Filtros por intervalo de datas */}
      <div className={style.date_filter}>
        <label>Início:
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </label>
        <label>Fim:
          <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </label>
      </div>

      {/* Cards com informações resumidas */}
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

      {/* Gráficos com dados agregados */}
      <div className={style.grup_chart}>
        <div className={style.chart_box}>
          <h3>Salas Mais Reservadas</h3>
          <div className={style.chart_wrapper}>
            <Bar
              data={{ labels: Object.keys(porSala), datasets: [{ label: "Reservas", data: Object.values(porSala), backgroundColor: "#007bff", borderRadius: 8 }] }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        <div className={style.chart_box}>
          <h3>Reservas por Data</h3>
          <div className={style.chart_wrapper}>
            <Line
              data={{ labels: Object.keys(porData), datasets: [{ label: "Reservas por dia", data: Object.values(porData), borderColor: "#28a745", backgroundColor: "#28a74533", tension: 0.3, fill: true, pointRadius: 5 }] }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        <div className={style.chart_box}>
          <h3>Horários Mais Reservados</h3>
          <div className={style.chart_wrapper}>
            <Pie
              data={{ labels: Object.keys(porHorario), datasets: [{ label: "Reservas", data: Object.values(porHorario), backgroundColor: ["#ffc107", "#dc3545", "#17a2b8", "#6f42c1", "#20c997"] }] }}
              options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
            />
          </div>
        </div>
      </div>

      {/* Tabela com detalhes das reservas */}
      <div className={style.tabela_box}>
        <h3>Reservas Detalhadas</h3>
        <div className={style.tabela_wrapper}>
          <table className={style.tabela}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Horário</th>
                <th>Bloco/Sala</th>
                <th>Matéria</th>
                <th>Alunos</th>
                <th>Motivo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.data}</td>
                  <td>{r.hora}</td>
                  <td>{r.bloco} / {r.sala}</td>
                  <td>{r.materia}</td>
                  <td>{r.alunos}</td>
                  <td>{r.motivo}</td>
                  <td>
                    <span className={`${style.status} ${r.status === "cancelada" ? style.cancelado : style.ativa}`}>
                      {r.status === "cancelada" ? "Cancelada" : "Ativa"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;