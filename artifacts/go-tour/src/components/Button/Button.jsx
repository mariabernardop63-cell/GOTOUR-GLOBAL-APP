import React from 'react';
import './Button.css';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled,
    className = '',
    ...props
}) => {
    const combinedClassName = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${isLoading ? 'btn-loading' : ''} ${className}`;

    return (
        <button className={combinedClassName} disabled={disabled || isLoading} {...props}>
            {isLoading ? <div className="btn-spinner"></div> : children}
        </button>
    );
};

export default Button;
