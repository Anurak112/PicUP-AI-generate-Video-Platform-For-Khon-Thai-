import React from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className="input-wrapper">
            {label && <label className="input-label">{label}</label>}
            <div className="input-container">
                {icon && <div className="input-icon">{icon}</div>}
                <input
                    className={`input ${icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''} ${className}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};
