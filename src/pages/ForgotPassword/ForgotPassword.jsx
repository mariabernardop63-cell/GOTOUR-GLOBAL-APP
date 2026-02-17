import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_forgot_cooldown');

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Por favor, introduza o seu email');
            return;
        }
        if (!isValidEmail(email)) {
            setError('Introduza um email válido');
            return;
        }
        if (isCoolingDown) {
            setError(`Aguarde ${cooldown}s antes de tentar novamente.`);
            return;
        }

        setIsLoading(true);

        // ========== MOBILE FLOW (Supabase) ==========
        if (isMobile) {
            try {
                const redirectUrl = window.location.origin + '/create-password';
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: redirectUrl
                });

                if (resetError) {
                    const msg = resetError.message || '';
                    if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
                        setError('Você tentou muitas vezes. Aguarde alguns minutos e tente novamente.');
                        startCooldown();
                    } else {
                        setError(resetError.message || 'Não foi possível enviar o email. Tente novamente.');
                    }
                    setIsLoading(false);
                    return;
                }

                // Success — start cooldown
                startCooldown();

                navigateForward('/email-confirmation', {
                    state: {
                        email,
                        flow: 'forgot-password-mobile'
                    }
                });
            } catch (err) {
                setError('Erro de conexão. Verifique a sua ligação à internet.');
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

    const getButtonText = () => {
        if (isLoading) return 'A enviar...';
        if (isCoolingDown) return `Aguarde ${cooldown}s`;
        return 'Recuperar';
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
                {/* Back button — no background */}
                <button className="forgot-back-btn" onClick={() => navigateBack('/login')}>
                    <ArrowLeft size={24} />
                </button>

                <div className="forgot-header">
                    <h1>Recuperar acesso</h1>
                    <p>Introduza o email associado à sua conta e enviaremos um link seguro para redefinir a sua palavra-passe.</p>
                </div>

                <form className="forgot-form-content" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <Mail size={18} />
                        <input
                            type="email"
                            placeholder="O seu email"
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
                        disabled={isLoading || isCoolingDown}
                    >
                        {getButtonText()}
                    </button>
                </form>

                <p className="back-link" style={{ marginTop: '32px' }} onClick={() => navigateBack('/login')}>
                    <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Voltar para Iniciar Sessão
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
