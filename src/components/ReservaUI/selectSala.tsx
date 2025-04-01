import React from "react";

interface SelectSalaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  salas: [string, number][];
  disabled?: boolean;
}

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
