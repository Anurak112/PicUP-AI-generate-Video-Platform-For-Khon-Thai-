import React from 'react';
import './Card.css';

export interface CardProps {
    variant?: 'default' | 'glass' | 'elevated';
    hover?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    variant = 'default',
    hover = false,
    className = '',
    children,
}) => {
    return (
        <div
            className={`card card-${variant} ${hover ? 'card-hover' : ''} ${className}`}
        >
            {children}
        </div>
    );
};
