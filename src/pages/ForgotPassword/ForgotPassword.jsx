import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, digite seu e-mail');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Digite um e-mail válido');
            return;
        }

        setIsLoading(true);

        // ========== MOBILE FLOW (Supabase Magic Link for password reset) ==========
        if (isMobile) {
            try {
                const redirectUrl = window.location.origin + '/create-password';
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: redirectUrl
                });

                if (resetError) {
                    setError(resetError.message || 'Erro ao enviar link. Tente novamente.');
                    setIsLoading(false);
                    return;
                }

                // Navigate to email confirmation
                navigateForward('/email-confirmation', {
                    state: {
                        email,
                        flow: 'forgot-password-mobile'
                    }
                });
            } catch (err) {
                setError('Erro de conexão. Verifique sua internet.');
                console.error('Reset password error:', err);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // ========== DESKTOP FLOW (mock — unchanged) ==========
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
