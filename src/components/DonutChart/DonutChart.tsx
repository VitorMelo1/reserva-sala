// Importa o React e estilos para o componente
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./DonutChart.module.scss";

// Registra os elementos necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Tipagem das props que o componente recebe
interface DonutChartProps {
  disponiveis: number;
  ocupadas: number;
}

// Componente funcional de gráfico do tipo doughnut (rosquinha)
const DonutChart: React.FC<DonutChartProps> = ({ disponiveis, ocupadas }) => {
  // Dados que serão exibidos no gráfico
  const data = {
    labels: ["Disponíveis", "Ocupadas"],
    datasets: [
      {
        label: "Salas",
        data: [disponiveis, ocupadas],
        backgroundColor: ["#4caf50", "#f44336"], // cores das fatias
        borderWidth: 1, // espessura da borda
      },
    ],
  };

  // Configurações visuais do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  // Renderiza o componente com o gráfico
  return (
    <div className={styles.chartWrapper}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;