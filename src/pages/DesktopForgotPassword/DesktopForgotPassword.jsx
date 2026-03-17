import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import AuthLeftPanel from '../SharedAuth/AuthLeftPanel';
import AuthTabs from '../SharedAuth/AuthTabs';
import '../SharedAuth/SharedAuth.css';

const DesktopForgotPassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_forgot_cooldown');

    // OTP state
    const [otp, setOtp] = useState(Array(8).fill(''));
    const otpRefs = useRef([]);

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

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);

            if (resetError) {
                const msg = resetError.message.toLowerCase();
                if (msg.includes('rate limit') || msg.includes('rate_limit')) {
                    setError('Você tentou inúmeras vezes. Volte a tentar mais tarde.');
                    startCooldown();
                } else {
                    setError('Erro ao enviar código de recuperação. Verifique o email.');
                }
                setIsLoading(false);
                return;
            }

            startCooldown();
            setIsLoading(false);
            setStep(2);

        } catch (err) {
            setError('Erro de conexão. Verifique a sua ligação à internet.');
            console.error('Reset password error:', err);
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (error) setError('');

        if (value && index < 7) {
            otpRefs.current[index + 1].focus();
        }

        const isComplete = newOtp.join('').length === 8;
        if (isComplete && value) {
            setTimeout(() => {
                handleVerifyOtp(newOtp.join(''));
            }, 50);
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleResendCode = async () => {
        if (isCoolingDown) {
            setError(`Aguarde ${cooldown}s antes de tentar novamente.`);
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const { error: resendError } = await supabase.auth.resetPasswordForEmail(email);
            if (resendError) throw resendError;
            startCooldown();
        } catch (err) {
            setError('Erro ao reenviar código. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (explicitOtp) => {
        setIsLoading(true);
        setError('');

        try {
            let code = otp.join('');
            if (explicitOtp && typeof explicitOtp === 'string') {
                code = explicitOtp;
            }

            const { error: vError } = await supabase.auth.verifyOtp({
                email: email,
                token: code,
                type: 'recovery'
            });

            if (vError) {
                const isLimit = vError.message.toLowerCase().includes('rate limit');
                if (isLimit) {
                    setError('Você tentou inúmeras vezes. Volte a tentar mais tarde.');
                } else {
                    setError('Código incorreto. Por favor verifique e tente novamente.');
                }
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            navigateForward('/create-password', {
                state: {
                    email: email,
                    flow: 'password-reset-verified'
                }
            });
        } catch (err) {
            setError('Erro interno ao verificar código.');
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        if (isLoading) return 'Processando...';
        if (isCoolingDown && step === 1) return `Aguarde ${cooldown}s`;
        return 'Recuperar senha';
    };

    return (
        <div className="da-screen-wrapper">
            <div className="da-card-stack">
                <div className="da-card">
                    {/* Left Pane: Illustration & Text */}
                    <AuthLeftPanel onBack={() => navigateBack('/login')} />

                    {/* Right Pane: Form Content */}
                    <div className="da-right-pane">
                        <div className="da-form-content">
                            <h1 className="dl-title">
                                {step === 1 ? 'Recuperar acesso' : 'Verificar código'}
                            </h1>
                            
                            {step === 1 && (
                                <form className="da-form" onSubmit={handleSubmit}>
                                    <p className="da-welcome-subtitle" style={{ marginBottom: '24px', maxWidth: '100%' }}>
                                        Introduza o email associado à sua conta e enviaremos um código de 8 dígitos para redefinir a sua palavra-passe.
                                    </p>

                                    <div className="da-input-group">
                                        <input
                                            type="email"
                                            className="da-input"
                                            placeholder="Endereço de email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                            required
                                            autoFocus
                                            disabled={isLoading || isCoolingDown}
                                        />
                                    </div>

                                    {error && <span className="error-msg-ds">{error}</span>}

                                    <button type="submit" className="da-btn-primary" disabled={isLoading || isCoolingDown || !email}>
                                        {getButtonText()}
                                    </button>
                                </form>
                            )}

                            {step === 2 && (
                                <div className="da-form">
                                    <p className="da-welcome-subtitle" style={{ marginBottom: '32px', maxWidth: '100%' }}>
                                        Introduza o código de 8 dígitos enviado para o seu email.
                                    </p>

                                    <div className="da-otp-container">
                                        {otp.map((digit, idx) => (
                                            <input
                                                key={idx}
                                                ref={(el) => (otpRefs.current[idx] = el)}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                autoFocus={idx === 0}
                                                className="da-otp-input"
                                            />
                                        ))}
                                    </div>

                                    {error && <span className="error-msg-ds" style={{ textAlign: 'center', display: 'block' }}>{error}</span>}

                                    <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
                                        <button
                                            type="button"
                                            className="da-forgot-link"
                                            onClick={!isCoolingDown ? handleResendCode : undefined}
                                            disabled={isCoolingDown}
                                            style={{ color: isCoolingDown ? '#94A3B8' : '#4A72FF' }}
                                        >
                                            {isCoolingDown ? `Aguarde ${cooldown}s para reenviar` : "Não recebeu o código?"}
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="da-btn-primary"
                                        onClick={() => handleVerifyOtp()}
                                        disabled={otp.join('').length < 8 || isLoading}
                                    >
                                        {isLoading ? 'Verificando...' : 'Verificar'}
                                    </button>
                                </div>
                            )}

                            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                                <button
                                    onClick={() => {
                                        if (step === 2) {
                                            setStep(1);
                                            setError('');
                                            setOtp(Array(8).fill(''));
                                        } else {
                                            navigateBack('/login');
                                        }
                                    }}
                                    className="da-forgot-link"
                                >
                                    {step === 2 ? 'Voltar' : 'Já tem uma conta? Iniciar Sessão'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopForgotPassword;
