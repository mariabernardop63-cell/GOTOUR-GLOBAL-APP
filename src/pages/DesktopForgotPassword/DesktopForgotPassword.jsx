import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import exploreMundoLocal from '../../assets/images/explore_mundo.jpg';
import gotourIcon from '../../assets/images/gotour_icon.png';
import HeroStatsCarousel from '../../components/HeroStatsCarousel/HeroStatsCarousel';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { countries } from '../../data/countries';
import '../DesktopLogin/DesktopLogin.css';

const DesktopForgotPassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [langCode, setLangCode] = useState('PT');
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_forgot_cooldown');

    // OTP state
    const [otp, setOtp] = useState(Array(8).fill(''));
    const otpRefs = useRef([]);

    // Fetch user IP country on mount for language
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.country_code) {
                    setLangCode(data.country_code);
                }
            })
            .catch(err => console.error("Error fetching IP location:", err));
    }, []);

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
            const redirectUrl = window.location.origin + '/create-password';
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectUrl
            });

            if (resetError) {
                const msg = resetError.message || '';
                if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
                    setError('Voce tentou inumeras vezes,Volte a tentar mais tarde.');
                    startCooldown();
                } else {
                    setError(resetError.message || 'Não foi possível enviar o email. Tente novamente.');
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
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (error) setError('');

        // Move to next input if value is entered
        if (value && index < 7) {
            otpRefs.current[index + 1].focus();
        }

        // Auto-verify when 8 digits are entered
        const isComplete = newOtp.join('').length === 8;
        if (isComplete && value) {
            // Give React a tick to update the state before submitting
            setTimeout(() => {
                handleVerifyOtp(newOtp.join(''));
            }, 50);
        }
    };

    const handleOtpKeyDown = (index, e) => {
        // Move to previous on Backspace if empty
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
            const redirectUrl = window.location.origin + '/create-password';
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: redirectUrl
            });
            if (resetError) throw resetError;
            startCooldown();
        } catch (err) {
            setError('Erro ao reenviar código. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Check if passed explicitly from handleOtpChange, else use state
            let code = otp.join('');
            // If the first argument passed to handleVerifyOtp is a string, use it
            // (Note: we avoid 'arguments' keyword because arrow functions don't have it)
            if (arguments.length > 0 && typeof arguments[0] === 'string') {
                code = arguments[0];
            }

            const { data, error: vError } = await supabase.auth.verifyOtp({
                email: email,
                token: code,
                type: 'recovery'
            });

            if (vError) {
                const isLimit = vError.message.toLowerCase().includes('rate limit');
                if (isLimit) {
                    setError('Voce tentou inumeras vezes,Volte a tentar mais tarde.');
                } else {
                    setError('Codigo incorreto, Por favor verifique e tente novamente.');
                }
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            // Navigate to create a new password
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
        <div className="desktop-login-container" style={{ zIndex: 99999 }}>
            {/* Left Image Pane: 35% Width */}
            <div className="dl-left-pane">
                <button className="dl-back-button" onClick={() => navigateBack('/login')} aria-label="Voltar para Iniciar Sessão" style={{ zIndex: 20 }}>
                    <ArrowLeft size={24} color="#FFFFFF" />
                </button>

                <img src={exploreMundoLocal} alt="Explore o mundo como um local" className="dl-cover-image" />
            </div>

            {/* Right Content Pane: 65% Width */}
            <div className="dl-right-pane" style={{ paddingLeft: 0, justifyContent: 'center' }}>
                <div className="dl-top-right-actions" style={{ width: '220px' }}>
                    <div style={{ zIndex: 100, position: 'relative' }}>
                        <CustomDropdown
                            options={countries}
                            value={langCode}
                            onChange={(e) => setLangCode(e.target.value)}
                            placeholder="Idioma"
                            mode="language"
                        />
                    </div>
                </div>

                <div className="dl-content-wrapper" style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <div className="dl-form-section" style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '420px', width: '100%' }}>
                        <h1 className="dl-title" style={{ textAlign: 'center', width: '100%' }}>
                            {step === 1 ? 'Recuperar acesso' : 'Enter your verification code'}
                        </h1>

                        {step === 1 && (
                            <form className="dl-form form-step fade-in-up" onSubmit={handleSubmit} style={{ marginTop: '24px', width: '100%' }}>
                                <p style={{ color: '#5F6368', fontSize: '15px', lineHeight: '1.5', marginBottom: '24px', textAlign: 'center' }}>
                                    Introduza o email associado à sua conta e enviaremos um link seguro para redefinir a sua palavra-passe.
                                </p>

                                <div className="dl-input-group">
                                    <input
                                        type="email"
                                        className="dl-input"
                                        placeholder="O seu email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setError('');
                                        }}
                                        autoFocus
                                        disabled={isLoading || isCoolingDown}
                                    />
                                    <label className="dl-floating-label">Email</label>
                                </div>

                                {error && <span className="error-msg-ds" style={{ display: 'block', marginTop: '16px' }}>{error}</span>}

                                <button
                                    type="submit"
                                    className={`dl-submit-btn ${email ? 'is-active' : ''}`}
                                    style={{ marginTop: '24px' }}
                                    disabled={isLoading || isCoolingDown || !email}
                                >
                                    {getButtonText()}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <div className="dl-form form-step fade-in-up" style={{ marginTop: '24px', width: '100%' }}>
                                <p className="ds-subtitle" style={{ color: '#5F6368', fontSize: '15px', marginBottom: '32px', textAlign: 'center' }}>
                                    Please enter the 8-digit code sent to your email.
                                </p>

                                <div className={`dl-otp-container ${isLoading ? 'is-verifying' : ''}`} style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
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
                                            className={`dl-otp-input ${digit ? 'has-value' : ''}`}
                                        />
                                    ))}
                                </div>

                                {error && <span className="error-msg-ds" style={{ textAlign: 'center', display: 'block' }}>{error}</span>}

                                <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
                                    <span
                                        className={`dl-link-text ${isCoolingDown ? 'disabled' : ''}`}
                                        onClick={!isCoolingDown ? handleResendCode : undefined}
                                        style={{ cursor: isCoolingDown ? 'not-allowed' : 'pointer', color: isCoolingDown ? '#9CA3AF' : 'var(--primary)', fontWeight: '500', fontSize: '14px' }}
                                    >
                                        {isCoolingDown ? `Aguarde ${cooldown}s para reenviar` : "Didn't get a code?"}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className={`dl-submit-btn ${otp.join('').length === 8 ? 'is-active' : ''}`}
                                    onClick={() => handleVerifyOtp()}
                                    disabled={otp.join('').length < 8 || isLoading}
                                >
                                    {isLoading ? 'Verificando...' : 'Verify'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dl-bottom-bar">
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
                        className="dl-create-account-centered"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {step === 2 ? 'Voltar' : 'Voltar para Iniciar Sessão'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DesktopForgotPassword;
