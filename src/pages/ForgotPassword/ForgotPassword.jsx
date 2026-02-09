import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import gotourIcon from '../../assets/images/gotour_icon.png';
import bgImage from '../../assets/images/dubai_city.png'; // Consistent with Login
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
            navigateForward('/email-confirmation', { state: { email } });
        }, 1500);
    };

    return (
        <div className="forgot-page">
            <div className="forgot-overlay"></div>

            {/* Logo Section */}
            <div className="forgot-logo-section fade-in">
                <img src={gotourIcon} alt="GoTour" className="forgot-logo-img" />
                <span className="forgot-logo-text">GOTOUR</span>
            </div>

            <div className="forgot-glass-container fade-in-up">
                <div className="forgot-header">
                    <h1>Esqueceu a palavra-passe?</h1>
                    <p>Insira o seu e-mail e enviaremos um link seguro para redefinir a sua palavra-passe rapidamente.</p>
                </div>

                <form className="forgot-form-content" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <Mail size={18} />
                        <input
                            type="email"
                            placeholder="Digite o seu e-mail"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            autoFocus
                        />
                    </div>

                    {error && <p className="error-msg text-center">{error}</p>}

                    <button
                        type="submit"
                        className="forgot-main-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                    </button>
                </form>

                <p className="help-text">Não recebeu o e-mail? Verifique o spam ou tente novamente.</p>

                <p className="back-link" onClick={() => navigateBack('/login')}>
                    <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Voltar para Iniciar Sessão
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
