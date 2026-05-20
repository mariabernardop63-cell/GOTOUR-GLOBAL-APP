import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = ({ onBack }) => {
    const { navigateForward } = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_forgot_cooldown');

    const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

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

            startCooldown();
            navigateForward('/email-confirmation', {
                state: { email, flow: 'forgot-password-mobile' }
            });
        } catch (err) {
            setError('Erro de conexão. Verifique a sua ligação à internet.');
            console.error('Reset password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        if (isLoading) return 'A enviar...';
        if (isCoolingDown) return `Aguarde ${cooldown}s`;
        return 'Recuperar';
    };

    return (
        <div className="forgot-form-panel">
            <p className="forgot-form-desc">
                Introduza o email associado à sua conta e enviaremos um link seguro para redefinir a sua palavra-passe.
            </p>

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

                {error && <div className="error-message">{error}</div>}

                <button
                    type="submit"
                    className="login-btn"
                    disabled={isLoading || isCoolingDown}
                >
                    {getButtonText()}
                </button>
            </form>

            {onBack && (
                <button className="forgot-back-link" onClick={onBack}>
                    ← Voltar para Iniciar Sessão
                </button>
            )}
        </div>
    );
};

export default ForgotPasswordForm;
