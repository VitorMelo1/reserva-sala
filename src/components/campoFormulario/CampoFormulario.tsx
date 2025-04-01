import React from "react";
import styles from "./CampoFormulario.module.scss";

interface CampoFormularioProps {
  label: string;
  tipo?: string;
  valor: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  textarea?: boolean;
  min?: string; // ✅ agora aceita a prop `min`
}

const CampoFormulario: React.FC<CampoFormularioProps> = ({
  label,
  tipo = "text",
  valor,
  onChange,
  placeholder,
  textarea = false,
  min,
}) => {
  return (
    <div className={styles.campo}>
      <label>{label}</label>
      {!textarea ? (
        <input
          type={tipo}
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
          min={min} // ✅ agora funciona sem erro
        />
      ) : (
        <textarea
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CampoFormulario;
