import React from "react";

interface SugestaoSalaProps {
  alunos: number;
  salasFiltradas: [string, number][];
}

const SugestaoSala: React.FC<SugestaoSalaProps> = ({ alunos, salasFiltradas }) => {
  if (alunos <= 0) return null;

  const salaSugerida = salasFiltradas.find(([_, capacidade]) => capacidade >= alunos);

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
