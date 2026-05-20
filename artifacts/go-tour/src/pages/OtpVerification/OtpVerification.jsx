import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import gotourLogo from '../../assets/images/gotour_icon.png';

import './OtpVerification.css';

const OtpVerification = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();
    const { t } = useApp();

    const phone = location.state?.phone || '';
    const email = location.state?.email || 'seu e-mail';
    const flow = location.state?.flow || '';
    const profileData = location.state?.profileData || {};

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isMobileSignup = flow === 'signup-mobile';

    const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digits for Supabase
    const inputRefs = useRef([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [timer, setTimer] = useState(60);
    const [error, setError] = useState('');
    const [warning, setWarning] = useState('');

    const otpLength = isMobileSignup ? 6 : 4; // Supabase uses 6, legacy uses 4

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');
        setWarning('');

        // Auto-focus next
        if (value && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, otpLength).split('');
        if (data.length === otpLength && data.every(char => /^\d$/.test(char))) {
            setOtp([...data, ...Array(6 - data.length).fill('')]);
            inputRefs.current[otpLength - 1]?.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const code = otp.slice(0, otpLength).join('');
        if (code.length < otpLength) {
            setError(`Por favor, digite o código de ${otpLength} dígitos.`);
            return;
        }

        setIsLoading(true);
        setError('');

        // ========== MOBILE FLOW (Supabase OTP verification) ==========
        if (isMobileSignup && isMobile) {
            try {
                const { data, error: verifyError } = await supabase.auth.verifyOtp({
                    phone: phone,
                    token: code,
                    type: 'sms'
                });

                if (verifyError) {
                    setError(verifyError.message || 'Código inválido. Tente novamente.');
                    setIsLoading(false);
                    return;
                }

                // OTP verified! Navigate to create password
                setIsExiting(true);
                setTimeout(() => {
                    navigateForward('/create-password', {
                        state: {
                            profileData: profileData
                        }
                    });
                }, 400);
            } catch (err) {
                setError('Erro de conexão. Verifique sua internet.');
                console.error('OTP verify error:', err);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // ========== DESKTOP/LEGACY FLOW (mock) ==========
        setTimeout(() => {
            setIsLoading(false);
            setIsExiting(true);
            setTimeout(() => {
                navigateForward('/home');
            }, 400);
        }, 1000);
    };

    const handleResend = async () => {
        setTimer(60);
        setError('');

        // Mobile Supabase resend
        if (isMobileSignup && isMobile && phone) {
            try {
                const { error } = await supabase.auth.signInWithOtp({ phone });
                if (error) {
                    setError(error.message || 'Erro ao reenviar código.');
                } else {
                    setWarning('');
                    alert('Código reenviado com sucesso!');
                }
            } catch (err) {
                setError('Erro ao reenviar código.');
            }
            return;
        }

        // Legacy resend
        alert("Código reenviado!");
    };

    // Block advance without OTP
    const handleTrySkip = () => {
        setWarning('Você precisa verificar o código OTP antes de continuar.');
    };

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, otpLength);
    }, [otpLength]);

    const displayIdentifier = phone || email;

    return (
        <div className={`otp-page ${isExiting ? 'slide-exit' : 'slide-enter'}`}>
            {/* Logo */}
            <div className="otp-logo-container">
                <img src={gotourLogo} alt="GoTour" className="otp-logo-img" />
                <span className="otp-logo-text">GOTOUR</span>
            </div>

            <div className="otp-header">
                <h1 className="otp-title">
                    {isMobileSignup ? 'Verifique seu telefone' : 'Verifique seu e-mail'}
                </h1>
                <p className="otp-subtitle">
                    {isMobileSignup
                        ? `Digite o código de ${otpLength} dígitos enviado para ${displayIdentifier}`
                        : `Digite o código de ${otpLength} dígitos enviado para ${displayIdentifier}`
                    }
                </p>
            </div>

            {/* Form */}
            <form className="otp-form" onSubmit={handleVerify}>
                <div className="otp-inputs-row">
                    {otp.slice(0, otpLength).map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="tel"
                            maxLength={1}
                            className={`otp-input-bar ${digit ? 'filled' : ''}`}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>

                {error && <p className="otp-error-msg">{error}</p>}
                {warning && <p className="otp-warning-msg">{warning}</p>}

                <div className="otp-resend">
                    {timer > 0 ? (
                        <span style={{ color: '#475569' }}>Reenviar em {timer}s</span>
                    ) : (
                        <button type="button" className="otp-resend-link" onClick={handleResend}>
                            Reenviar código
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className={`otp-button ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? <div className="btn-spinner"></div> : "Verificar"}
                </button>
            </form>

            {/* Footer */}
            <div className="otp-footer">
                <span className="otp-back-link" onClick={() => navigateBack(isMobileSignup ? '/signup' : '/forgot-password')}>
                    Voltar
                </span>
            </div>
        </div>
    );
};

export default OtpVerification;
