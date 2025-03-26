import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    text: string;
    onClick?: () => void; 
    variant?: "primary" | "secondary" | "Side-menu";
    disabled?: boolean;
    type?: "button" | "submit" | "reset"; 
    padding?: string;
    width?: string; 
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button",
    padding,
    width 
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled}
            type={type} 
            style={{ ...(padding && { padding }), ...(width && { width }) }} 
        >
            {text}
        </button>
    );
};

export default Button;
