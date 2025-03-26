import React from "react";
import style from "./Dashboard.scss";
import SalaCard from "../../components/SalaCard/SalaCard";

// Dados mockados (iremos substituir pela API depois)
const salasMock = [
  { id: 1, bloco: "A", nome: "Sala 101", capacidade: 30, ocupada: false },
  { id: 2, bloco: "A", nome: "Sala 102", capacidade: 25, ocupada: true },
  { id: 3, bloco: "B", nome: "Sala 201", capacidade: 40, ocupada: false },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard de Reservas</h1>
      <div className="salas-grid">
        {salasMock.map((sala) => (
          <SalaCard 
            key={sala.id} 
            id={sala.id} 
            bloco={sala.bloco} 
            nome={sala.nome} 
            capacidade={sala.capacidade} 
            ocupada={sala.ocupada} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;