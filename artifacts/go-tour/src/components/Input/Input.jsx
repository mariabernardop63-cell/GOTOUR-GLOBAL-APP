import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.css';

const Input = ({
    label,
    error,
    icon: Icon,
    value,
    type,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`input-group ${error ? 'has-error' : ''}`}>
            <div className="input-wrapper">
                {Icon && <Icon className="input-icon" size={20} />}
                <input
                    className={`input-field ${Icon ? 'has-icon' : ''} ${value ? 'has-value' : ''} ${isPassword ? 'has-toggle' : ''}`}
                    value={value}
                    type={inputType}
                    placeholder=" " /* Required for :placeholder-shown trick */
                    {...props}
                />
                {label && <label className={`input-label ${Icon ? 'with-icon' : ''}`}>{label}</label>}
                {isPassword && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
                <div className="input-border"></div>
            </div>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};

export default Input;
