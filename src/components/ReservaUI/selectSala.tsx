import React from "react";

// Tipagem das propriedades esperadas pelo componente
interface SelectSalaProps {
  value: string; // Valor atual selecionado
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Função para lidar com mudanças
  salas: [string, number][]; // Lista de salas com [nome, capacidade]
  disabled?: boolean; // Flag para desabilitar o select
}

// Componente de seleção de sala
const SelectSala: React.FC<SelectSalaProps> = ({ value, onChange, salas, disabled }) => {
  return (
    <label>
      Sala:
      <select value={value} onChange={onChange} disabled={disabled}>
        <option value="">Selecione uma sala</option>
        {salas.map(([nomeSala, capacidade]) => (
          <option key={nomeSala} value={nomeSala}>
            {nomeSala} ({capacidade} vagas disponíveis)
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectSala;
