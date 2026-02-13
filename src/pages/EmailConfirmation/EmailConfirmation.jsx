import React from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
    const { navigateForward } = useNavigation();
    const location = useLocation();
    const email = location.state?.email || 'seu email';

    const handleOpenEmail = () => {
        window.location.href = `mailto:`;
    };

    const handleSkip = () => {
        if (location.state?.flow === 'signup-mobile') {
            navigateForward('/signup', {
                state: {
                    returnStep: 3,
                    formData: location.state.formData
                }
            });
        } else {
            navigateForward('/home');
        }
    };

    const handleResend = () => {
        // Simulation only
        alert(`Link reenviado para ${email}`);
    };

    return (
        <div className="email-conf-page">
            <div className="email-conf-overlay"></div>

            {/* Logo Section */}
            <div className="email-conf-logo-section fade-in">
                <img src={gotourIcon} alt="GoTour" className="email-conf-logo-img" />
                <span className="email-conf-logo-text">GOTOUR</span>
            </div>

            <div className="email-conf-glass-container fade-in-up">
                <div className="icon-wrapper">
                    <CheckCircle size={64} color="#10B981" />
                </div>

                <div className="email-conf-header">
                    <h1>Enviámos um link de confirmação</h1>
                    <p>Verifique a sua caixa de entrada (e também o Spam). Assim que clicar no link, poderá prosseguir com segurança.</p>
                </div>

                <div className="email-display">
                    <p>Email enviado para: <strong>{email}</strong></p>
                </div>

                <div className="email-conf-actions">
                    <button
                        className="email-conf-main-btn"
                        onClick={handleOpenEmail}
                    >
                        <Mail size={20} />
                        Abrir Email
                    </button>

                    <button
                        className="email-conf-secondary-btn"
                        onClick={handleSkip}
                    >
                        {location.state?.flow === 'signup-mobile' ? 'Continuar' : 'Pular (ainda estamos em testes)'}
                        <ArrowRight size={16} />
                    </button>
                    <p className="skip-hint">Se não recebeu o email agora, pode continuar a explorar a plataforma.</p>
                </div>

                <p className="resend-link">
                    Não recebeu o email? <span onClick={handleResend}>Reenviar link</span>
                </p>
            </div>
        </div>
    );
};

export default EmailConfirmation;
