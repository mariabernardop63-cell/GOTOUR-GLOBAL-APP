import React, { useState } from 'react';
import { Mail, ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import favelaDrone from '../../assets/images/favela_drone.png';
import gotourIcon from '../../assets/images/gotour_icon.png';
import HeroStatsCarousel from '../../components/HeroStatsCarousel/HeroStatsCarousel';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { countries } from '../../data/countries';
import '../DesktopLogin/DesktopLogin.css';

const DesktopEmailConfirmation = () => {
    const { navigateBack } = useNavigation();
    const location = useLocation();
    const email = location.state?.email || 'seu email';
    const flow = location.state?.flow || '';

    const [resendLoading, setResendLoading] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [resendError, setResendError] = useState('');
    const [langCode, setLangCode] = useState('PT');

    // Fetch user IP country on mount for language
    React.useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data.country_code) {
                    setLangCode(data.country_code);
                }
            })
            .catch(err => console.error("Error fetching IP location:", err));
    }, []);

    const isMagicLinkFlow = flow === 'signup-mobile-magic' || flow === 'forgot-password-mobile';

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

    const getTitle = () => 'Verifique o seu email';

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
        <div className="desktop-login-container" style={{ zIndex: 99999 }}>
            {/* Left Image Pane: 35% Width */}
            <div className="dl-left-pane">
                <button className="dl-back-button" onClick={() => navigateBack()} aria-label="Voltar">
                    <ArrowLeft size={24} color="#FFFFFF" />
                </button>

                <div className="dl-image-text-overlay" style={{ top: '80px' }}>
                    <div className="dl-brand-header">
                        <img src={gotourIcon} alt="GoTour Logo" className="dl-overlay-logo" />
                        <div className="dl-brand-text">
                            <span className="dl-brand-go">GO</span>
                            <span className="dl-brand-tour">TOUR</span>
                        </div>
                    </div>
                    <div className="dl-title-container">
                        <h2 className="dl-overlay-title">Seu Próximo</h2>
                        <h2 className="dl-overlay-title">Destino Está a Um</h2>
                        <h2 className="dl-overlay-title">Clique de Distância</h2>
                    </div>
                </div>

                <div className="dl-left-bottom-stats">
                    <HeroStatsCarousel />
                </div>

                <img src={favelaDrone} alt="Brazilian Favela" className="dl-cover-image" />
            </div>

            {/* Right Content Pane: 65% Width */}
            <div className="dl-right-pane">
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

                <div className="dl-content-wrapper">
                    <div className="dl-form-section" style={{ textAlign: 'center' }}>
                        <h1 className="dl-title" style={{ textAlign: 'center' }}>{getTitle()}</h1>

                        <div className="form-step fade-in-up" style={{ marginTop: '24px' }}>
                            <p style={{ color: '#5F6368', fontSize: '15px', lineHeight: '1.5', marginBottom: '24px' }}>
                                {getDescription()}
                            </p>

                            <div style={{
                                background: '#E0F2F1',
                                padding: '16px',
                                borderRadius: '12px',
                                marginBottom: '24px',
                                color: '#048c83',
                                fontWeight: '600',
                                fontSize: '16px'
                            }}>
                                {email}
                            </div>

                            <button
                                type="button"
                                className="dl-submit-btn"
                                onClick={handleOpenEmail}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <Mail size={20} />
                                Abrir Email
                            </button>

                            {isMagicLinkFlow && (
                                <p style={{ fontSize: '13px', color: '#80868B', marginTop: '16px' }}>
                                    Verifique também a pasta de spam. O link expira em alguns minutos.
                                </p>
                            )}

                            {resendError && (
                                <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '16px' }}>
                                    {resendError}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="dl-bottom-bar" style={{ justifyContent: 'center' }}>
                    <div style={{ color: '#5F6368', fontSize: '14px', textAlign: 'center' }}>
                        Não recebeu?{' '}
                        <button
                            onClick={!resendLoading && !isCoolingDown ? handleResend : undefined}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#048c83',
                                fontWeight: '600',
                                cursor: isCoolingDown ? 'default' : 'pointer',
                                padding: 0,
                                opacity: isCoolingDown ? 0.6 : 1
                            }}
                        >
                            {getResendText()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopEmailConfirmation;
