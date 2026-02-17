import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();
    const email = location.state?.email || 'seu email';
    const flow = location.state?.flow || '';
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const isMagicLinkFlow = flow === 'signup-mobile-magic' || flow === 'forgot-password-mobile';

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
        if (isMagicLinkFlow && isMobile) {
            setResendLoading(true);
            setResendSuccess(false);
            try {
                if (flow === 'signup-mobile-magic') {
                    const redirectUrl = window.location.origin + '/create-password';
                    const { error } = await supabase.auth.signInWithOtp({
                        email: email,
                        options: { emailRedirectTo: redirectUrl }
                    });
                    if (error) {
                        alert('Não foi possível reenviar. Tente novamente.');
                    } else {
                        setResendSuccess(true);
                    }
                } else if (flow === 'forgot-password-mobile') {
                    const redirectUrl = window.location.origin + '/create-password';
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: redirectUrl
                    });
                    if (error) {
                        alert('Não foi possível reenviar. Tente novamente.');
                    } else {
                        setResendSuccess(true);
                    }
                }
            } catch (err) {
                alert('Erro ao reenviar. Verifique a sua conexão.');
            } finally {
                setResendLoading(false);
            }
            return;
        }

        alert(`Email reenviado para ${email}`);
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

                <p className="resend-link">
                    Não recebeu?{' '}
                    <span onClick={!resendLoading ? handleResend : undefined}>
                        {resendLoading ? 'A enviar...' : resendSuccess ? 'Reenviado ✓' : 'Reenviar'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default EmailConfirmation;
