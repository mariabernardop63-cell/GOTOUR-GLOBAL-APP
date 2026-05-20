import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLocation } from 'react-router-dom';
import useCooldown from '../../hooks/useCooldown';
import DesktopEmailConfirmation from '../DesktopEmailConfirmation/DesktopEmailConfirmation';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();
    const email = location.state?.email || 'seu email';
    const flow = location.state?.flow || '';
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [resendError, setResendError] = useState('');

    const isMagicLinkFlow = flow === 'signup-mobile-magic' || flow === 'forgot-password-mobile';

    // Responsive check
    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 1024);
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Use the same cooldown key as the screen that sent the email
    const cooldownKey = flow === 'signup-mobile-magic'
        ? 'gotour_signup_cooldown'
        : flow === 'forgot-password-mobile'
            ? 'gotour_forgot_cooldown'
            : 'gotour_resend_cooldown';

    const { cooldown, startCooldown, isCoolingDown } = useCooldown(cooldownKey);

    const handleOpenEmail = () => {
        const emailDomain = email.split('@')[1];
        let mailUrl = 'mailto:';

        if (emailDomain === 'gmail.com') {
            mailUrl = 'https://mail.google.com';
        } else if (emailDomain === 'outlook.com' || emailDomain === 'hotmail.com' || emailDomain === 'live.com') {
            mailUrl = 'https://outlook.live.com';
        } else if (emailDomain === 'yahoo.com') {
            mailUrl = 'https://mail.yahoo.com';
        }

        window.open(mailUrl, '_blank');
    };

    const handleResend = async () => {
        if (isCoolingDown) return;

        if (isMagicLinkFlow) {
            setResendLoading(true);
            setResendSuccess(false);
            setResendError('');
            try {
                if (flow === 'signup-mobile-magic') {
                    const redirectUrl = window.location.origin + '/create-password';
                    const { error } = await supabase.auth.signInWithOtp({
                        email: email,
                        options: { emailRedirectTo: redirectUrl }
                    });
                    if (error) {
                        const msg = error.message || '';
                        if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
                            setResendError('Você tentou muitas vezes. Aguarde alguns minutos.');
                            startCooldown();
                        } else {
                            setResendError('Não foi possível reenviar. Tente novamente.');
                        }
                    } else {
                        setResendSuccess(true);
                        startCooldown();
                    }
                } else if (flow === 'forgot-password-mobile') {
                    const redirectUrl = window.location.origin + '/create-password';
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: redirectUrl
                    });
                    if (error) {
                        const msg = error.message || '';
                        if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
                            setResendError('Você tentou muitas vezes. Aguarde alguns minutos.');
                            startCooldown();
                        } else {
                            setResendError('Não foi possível reenviar. Tente novamente.');
                        }
                    } else {
                        setResendSuccess(true);
                        startCooldown();
                    }
                }
            } catch (err) {
                setResendError('Erro ao reenviar. Verifique a sua conexão.');
            } finally {
                setResendLoading(false);
            }
            return;
        }

        alert(`Email reenviado para ${email}`);
    };

    const getResendText = () => {
        if (resendLoading) return 'A enviar...';
        if (resendSuccess && isCoolingDown) return `Reenviado ✓ (${cooldown}s)`;
        if (isCoolingDown) return `Aguarde ${cooldown}s`;
        return 'Reenviar';
    };

    const getTitle = () => {
        return 'Verifique o seu email';
    };

    const getDescription = () => {
        if (flow === 'signup-mobile-magic') {
            return 'Enviámos um link de verificação para o seu email. Abra a sua caixa de entrada e clique no link para concluir o registo.';
        }
        if (flow === 'forgot-password-mobile') {
            return 'Enviámos um link de recuperação para o seu email. Abra a sua caixa de entrada e clique no link para redefinir a sua palavra-passe.';
        }
        return 'Enviámos um email de confirmação. Verifique a sua caixa de entrada para prosseguir com segurança.';
    };

    if (!isMobile) {
        return <DesktopEmailConfirmation />;
    }

    return (
        <div className="email-conf-page">
            <div className="email-conf-overlay"></div>

            {/* Logo Section (desktop only) */}
            <div className="email-conf-logo-section fade-in">
                <img src={gotourIcon} alt="GoTour" className="email-conf-logo-img" />
                <span className="email-conf-logo-text">GOTOUR</span>
            </div>

            <div className="email-conf-glass-container fade-in-up">
                {/* Back button */}
                <button className="email-conf-back-btn" onClick={() => navigateBack()}>
                    <ArrowLeft size={24} />
                </button>

                <div className="email-conf-header">
                    <h1>{getTitle()}</h1>
                    <p>{getDescription()}</p>
                </div>

                <div className="email-display">
                    <p><strong>{email}</strong></p>
                </div>

                <div className="email-conf-actions">
                    <button
                        className="email-conf-main-btn"
                        onClick={handleOpenEmail}
                    >
                        <Mail size={20} />
                        Abrir Email
                    </button>

                    {isMagicLinkFlow && (
                        <p className="email-conf-hint">
                            Verifique também a pasta de spam. O link expira em alguns minutos.
                        </p>
                    )}
                </div>

                {resendError && (
                    <p className="resend-error" style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center', marginBottom: '8px' }}>
                        {resendError}
                    </p>
                )}

                <p className="resend-link">
                    Não recebeu?{' '}
                    <span
                        onClick={!resendLoading && !isCoolingDown ? handleResend : undefined}
                        style={{ opacity: isCoolingDown ? 0.6 : 1, cursor: isCoolingDown ? 'default' : 'pointer' }}
                    >
                        {getResendText()}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default EmailConfirmation;
