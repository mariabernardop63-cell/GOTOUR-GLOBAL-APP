import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../App';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { useApp } from '../../context/AppContext';
import gotourIcon from '../../assets/images/gotour_icon_dark.png'; // Need dark icon for light bg? Using existing or hiding logic. 
// Actually user said "Logo da GoTour" at top. Assuming we have one. If not, I'll use text or existing icon. 
// I will reuse `gotour_icon.png` (purple/dark) if available or text. 
// User said: "GoTour logo centered".
import gotourLogo from '../../assets/images/gotour_icon.png'; 

import './OtpVerification.css';

const OtpVerification = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();
    const { t } = useApp();
    const email = location.state?.email || 'seu e-mail';

    const [otp, setOtp] = useState(['', '', '', '', '']); // 5 digits
    const inputRefs = useRef([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [timer, setTimer] = useState(30);

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

        // Auto-focus next
        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, 5).split('');
        if (data.length === 5 && data.every(char => /^\d$/.test(char))) {
             setOtp(data);
             inputRefs.current[4].focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 5) {
            alert("Por favor, digite o código de 5 dígitos.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (code === '12345') { // Mock validation
                setIsExiting(true);
                setTimeout(() => {
                    navigateForward('/welcome'); // Or wherever 'Welcome' is? Wait, flow is usually Signup -> OTP -> Welcome/Home?
                    // User said: "próxima tela entrar da direita".
                    // Usually OTP goes to success or Home. I'll send to Welcome or Dashboard.
                    // User prompt didn't specify destination, just "Login" button calls it usually.
                    // In Signup flow, after OTP usually comes Success or Login.
                    navigateForward('/login'); // Sending to Login as completion for now.
                }, 400); // Wait for exit anim
            } else {
                alert('Código inválido. Tente 12345');
            }
        }, 2000);
    };

    const handleResend = () => {
        setTimer(30);
        alert("Código reenviado!");
    };

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 5);
    }, []);

    return (
        <div className={`otp-page ${isExiting ? 'slide-exit' : 'slide-enter'}`}>
            {/* Logo */}
            <div className="otp-logo-container">
               <img src={gotourLogo} alt="GoTour" className="otp-logo-img" />
               <span className="otp-logo-text">GOTOUR</span>
            </div>

            {/* Header */}
            <div className="otp-header">
                <h1 className="otp-title">Verifique seu e-mail</h1>
                <p className="otp-subtitle">
                    Acabamos de enviar um código de 5 dígitos para o seu e-mail. Insira-o abaixo para continuar.
                </p>
            </div>

            {/* Form */}
            <form className="otp-form" onSubmit={handleVerify}>
                <div className="otp-inputs-row">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="tel"
                            maxLength={1}
                            className="otp-input-square"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                        />
                    ))}
                </div>

                <div className="otp-resend">
                    {timer > 0 ? (
                        <span style={{ color: '#94a3b8' }}>Reenviar em {timer}s</span>
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
                <span className="otp-back-link" onClick={() => navigateBack('/forgot-password')}>
                    Voltar
                </span>
            </div>
        </div>
    );
};

export default OtpVerification;
