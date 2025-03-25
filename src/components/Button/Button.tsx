import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
    text: string;
    onClick?: () => void; 
    variant?: "primary" | "secondary";
    disabled?: boolean;
    type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button" 
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled}
            type={type} 
        >
            {text}
        </button>
    );
};

export default Button;
