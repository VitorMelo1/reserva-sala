import React from "react";
import styles from "./button.module.scss"; // Importação dos estilos SCSS usando CSS Modules

// Interface definindo as props aceitas pelo componente
interface ButtonProps {
    text: string; // Texto exibido no botão
    onClick?: () => void; // Função opcional que será chamada ao clicar
    variant?: "primary" | "secondary" | "Side-menu"; // Estilo visual do botão
    disabled?: boolean; // Desabilita o botão se true
    type?: "button" | "submit" | "reset"; // Tipo do botão (padrão: "button")
    padding?: string; // Padding customizado via props
    width?: string; // Largura customizada via props
}

// Componente funcional do botão
const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant = "primary", // Define um estilo padrão
    disabled = false,
    type = "button",
    padding,
    width 
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`} // Aplica estilo base + estilo por variante
            onClick={onClick}
            disabled={disabled}
            type={type}
            style={{ ...(padding && { padding }), ...(width && { width }) }} // Aplica padding e largura se existirem
        >
            {text}
        </button>
    );
};

export default Button;
