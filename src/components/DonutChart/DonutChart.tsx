import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./DonutChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  disponiveis: number;
  ocupadas: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ disponiveis, ocupadas }) => {
  const data = {
    labels: ["Disponíveis", "Ocupadas"],
    datasets: [
      {
        label: "Salas",
        data: [disponiveis, ocupadas],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
