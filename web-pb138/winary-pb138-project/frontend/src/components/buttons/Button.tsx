import React, {CSSProperties} from 'react';
import "./button.css"

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    styles?: CSSProperties;
};

const Button: React.FC<ButtonProps> = ({children, onClick, disabled = false, type = "button", styles}) => {
    return (
        <button
            style={styles}
            type={type}
            className="btn-primary"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
