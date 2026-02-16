import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
    const { navigateForward } = useNavigation();
    const location = useLocation();
    const email = location.state?.email || 'seu email';
    const flow = location.state?.flow || '';
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const [resendLoading, setResendLoading] = useState(false);

    const isMagicLinkFlow = flow === 'signup-mobile-magic' || flow === 'forgot-password-mobile';

    const handleOpenEmail = () => {
        // Open the user's default mail app so they can see the magic link
        // On mobile, this typically opens Gmail/Outlook/Mail app
        const emailDomain = email.split('@')[1];
        let mailUrl = 'mailto:';

        // Try to open the webmail for known providers
        if (emailDomain === 'gmail.com') {
            mailUrl = 'https://mail.google.com';
        } else if (emailDomain === 'outlook.com' || emailDomain === 'hotmail.com' || emailDomain === 'live.com') {
            mailUrl = 'https://outlook.live.com';
        } else if (emailDomain === 'yahoo.com') {
            mailUrl = 'https://mail.yahoo.com';
        }

        window.open(mailUrl, '_blank');
    };

    const handleSkip = () => {
        if (flow === 'signup-mobile') {
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

    const handleResend = async () => {
        if (isMagicLinkFlow && isMobile) {
            setResendLoading(true);
            try {
                if (flow === 'signup-mobile-magic') {
                    const redirectUrl = window.location.origin + '/create-password';
                    const { error } = await supabase.auth.signInWithOtp({
                        email: email,
                        options: { emailRedirectTo: redirectUrl }
                    });
                    if (error) {
                        alert('Erro ao reenviar: ' + error.message);
                    } else {
                        alert('Link reenviado com sucesso!');
                    }
                } else if (flow === 'forgot-password-mobile') {
                    const redirectUrl = window.location.origin + '/create-password';
                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: redirectUrl
                    });
                    if (error) {
                        alert('Erro ao reenviar: ' + error.message);
                    } else {
                        alert('Link reenviado com sucesso!');
                    }
                }
            } catch (err) {
                alert('Erro ao reenviar link.');
            } finally {
                setResendLoading(false);
            }
            return;
        }

        // Legacy resend
        alert(`Link reenviado para ${email}`);
    };

    const getTitle = () => {
        if (isMagicLinkFlow) return 'Enviámos um link mágico!';
        return 'Enviámos um link de confirmação';
    };

    const getDescription = () => {
        if (flow === 'signup-mobile-magic') {
            return 'Verifique a sua caixa de entrada (e também o Spam). Clique no link para confirmar a sua conta e criar a sua palavra-passe.';
        }
        if (flow === 'forgot-password-mobile') {
            return 'Verifique a sua caixa de entrada (e também o Spam). Clique no link para redefinir a sua palavra-passe.';
        }
        return 'Verifique a sua caixa de entrada (e também o Spam). Assim que clicar no link, poderá prosseguir com segurança.';
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
                    <h1>{getTitle()}</h1>
                    <p>{getDescription()}</p>
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

                    {!isMagicLinkFlow && (
                        <button
                            className="email-conf-secondary-btn"
                            onClick={handleSkip}
                        >
                            {flow === 'signup-mobile' ? 'Continuar' : 'Pular (ainda estamos em testes)'}
                            <ArrowRight size={16} />
                        </button>
                    )}

                    {isMagicLinkFlow && (
                        <p className="skip-hint" style={{ textAlign: 'center', marginTop: '8px' }}>
                            Abra o seu email e clique no link mágico para continuar. Não é possível avançar sem confirmar o link.
                        </p>
                    )}
                </div>

                <p className="resend-link">
                    Não recebeu o email?{' '}
                    <span onClick={!resendLoading ? handleResend : undefined}>
                        {resendLoading ? 'Reenviando...' : 'Reenviar link'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default EmailConfirmation;
