// Importa o React e o arquivo de estilos específicos para o componente
import React from "react";
import styles from "./CampoFormulario.module.scss";

// Define a interface das props esperadas pelo componente CampoFormulario
interface CampoFormularioProps {
  label: string; // Texto do rótulo exibido acima do campo
  tipo?: string; // Tipo do input (padrão: text)
  valor: string | number; // Valor atual do campo (controlado pelo estado)
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Função chamada quando o valor muda
  placeholder?: string; // Texto de dica dentro do campo
  textarea?: boolean; // Se true, renderiza um <textarea> ao invés de <input>
  min?: string; // Valor mínimo (usado em campos do tipo date ou number, por exemplo)
}

// Componente funcional CampoFormulario
const CampoFormulario: React.FC<CampoFormularioProps> = ({
  label,
  tipo = "text", // Se não for passado, assume "text"
  valor,
  onChange,
  placeholder,
  textarea = false,
  min,
}) => {
  return (
    <div className={styles.campo}>
      <label>{label}</label>

      {/* Se for textarea, renderiza um <textarea>; caso contrário, renderiza um <input> */}
      {!textarea ? (
        <input
          type={tipo}
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
          min={min} // Funciona para tipos como "date" ou "number"
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
