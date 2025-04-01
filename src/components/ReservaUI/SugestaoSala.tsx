import React from "react";

// Interface para tipar as props recebidas
interface SugestaoSalaProps {
  alunos: number; // Quantidade de alunos para a reserva
  salasFiltradas: [string, number][]; // Array com [nome da sala, capacidade disponível]
}

// Componente que sugere uma sala com capacidade suficiente
const SugestaoSala: React.FC<SugestaoSalaProps> = ({ alunos, salasFiltradas }) => {
  // Se nenhum aluno foi informado, não renderiza nada
  if (alunos <= 0) return null;

  // Busca a primeira sala com capacidade suficiente
  const salaSugerida = salasFiltradas.find(([_, capacidade]) => capacidade >= alunos);

  // Renderiza sugestão ou mensagem de erro, se nenhuma sala servir
  return salaSugerida ? (
    <p style={{ marginTop: "1rem" }}>
      💡 <strong>Sala sugerida:</strong> {salaSugerida[0]} ({salaSugerida[1]} vagas)
    </p>
  ) : (
    <p style={{ color: "red", marginTop: "1rem" }}>
      ⚠️ Nenhuma sala tem capacidade suficiente para {alunos} alunos.
    </p>
  );
};

export default SugestaoSala;