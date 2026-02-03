import React, { useState } from 'react';
import { Mail, ChevronRight } from 'lucide-react';
import { useNavigation } from '../../App';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, digite seu e-mail');
            return;
        }
        if (!email.includes('@')) {
            setError('Digite um e-mail válido');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigateForward('/otp-verification');
        }, 2000);
    };

    return (
        <div className="forgot-page">
            {/* Logo */}
            <div className="forgot-logo">
                <img src={gotourIcon} alt="GoTour" className="forgot-logo-img" />
                <span className="forgot-logo-text">GOTOUR</span>
            </div>

            {/* Header */}
            <div className="forgot-header">
                <h1 className="forgot-title">Esqueceu a senha?</h1>
                <p className="forgot-subtitle">Redefina a senha em duas etapas</p>
            </div>

            {/* Form */}
            <form className="forgot-form" onSubmit={handleSubmit}>
                <label className="forgot-label">Qual seu e-mail de cadastro?</label>

                <div className="forgot-input-group">
                    <Mail className="forgot-input-icon" size={18} />
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        className="forgot-input"
                        autoFocus
                    />
                </div>

                {error && <span className="forgot-error">{error}</span>}

                <button
                    type="submit"
                    className={`forgot-button ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div className="btn-spinner"></div>
                    ) : (
                        <>
                            <Mail size={18} />
                            <span>Enviar</span>
                            <ChevronRight size={20} />
                        </>
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="forgot-footer">
                Lembrou da senha? <span onClick={() => navigateBack('/login')}>Fazer login</span>
            </p>
        </div>
    );
};

export default ForgotPassword;
