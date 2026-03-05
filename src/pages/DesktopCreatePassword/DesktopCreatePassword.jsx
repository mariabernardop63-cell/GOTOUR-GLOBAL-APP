import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import HeroStatsCarousel from '../../components/HeroStatsCarousel/HeroStatsCarousel';
import authBgNew from '../../assets/images/auth_bg_new.jpg';
import gotourIcon from '../../assets/images/gotour_icon.png';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { countries } from '../../data/countries';
import '../DesktopLogin/DesktopLogin.css';

const DesktopCreatePassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();

    // Profile data may come from location state OR localStorage (after redirect)
    const [profileData, setProfileData] = useState(location.state?.profileData || {});

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isReady, setIsReady] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [langCode, setLangCode] = useState('PT');

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => { if (data.country_code) setLangCode(data.country_code); })
            .catch(() => { });
    }, []);

    // Default to true manually if we want to show terms for signup flow
    // A simplistic check: if profileData has keys, it's a signup flow
    const isSignup = Object.keys(profileData).length > 0;
    const isPasswordReset = location.state?.flow === 'password-reset-verified';

    // On mount: recover profile data from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('pendingProfileData');
        if (stored && Object.keys(profileData).length === 0) {
            try {
                const parsed = JSON.parse(stored);
                setProfileData(parsed);
            } catch (e) {
                console.error('Failed to parse pendingProfileData:', e);
            }
        }

        // Check that user is authenticated by the magic link
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsReady(true);
            } else {
                setTimeout(async () => {
                    const { data: { session: retrySession } } = await supabase.auth.getSession();
                    setIsReady(true);
                }, 2000);
            }
        };
        checkSession();
    }, []);

    const handleSave = async () => {
        setError('');

        const hasLetter = /[a-zA-Z]/.test(password);
        if (password.length < 6 || !hasLetter) {
            setError('A senha deve ter no mínimo 6 caracteres e uma letra');
            return;
        }
        if (password !== confirmPassword) {
            setError('Senhas não coincidem');
            return;
        }
        if (isSignup && !termsAccepted) {
            setError('Aceite os termos para continuar');
            return;
        }

        setIsLoading(true);

        try {
            // Test User Bypass
            if (location.state?.email === '111111111111') {
                setTimeout(() => {
                    localStorage.removeItem('pendingProfileData');
                    setIsLoading(false);
                    navigateForward(isSignup ? '/select-country' : '/home');
                }, 1000);
                return;
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) {
                setError(updateError.message || 'Erro ao guardar a palavra-passe');
                setIsLoading(false);
                return;
            }

            // Save profile data if available (only for signup)
            if (profileData && Object.keys(profileData).length > 0) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .upsert({
                            id: user.id,
                            full_name: profileData.fullName || null,
                            nationality: profileData.nationality || null,
                            phone: profileData.phone || user.phone || null,
                            date_of_birth: profileData.dateOfBirth || null,
                            created_at: new Date().toISOString()
                        });

                    if (profileError) {
                        console.error('Profile save error:', profileError);
                    }
                }
                localStorage.removeItem('pendingProfileData');
            }

            navigateForward(isSignup ? '/select-country' : '/home');
        } catch (err) {
            setError('Ocorreu um erro inesperado. Tente novamente.');
            console.error('Create password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        // Just clear the pending data and go to the next screen as a bypass
        localStorage.removeItem('pendingProfileData');
        navigateForward(isSignup ? '/select-country' : '/home');
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
                        <h2 className="dl-overlay-title">{isSignup ? 'Registo' : 'Clique'} de Distância</h2>
                    </div>
                </div>

                <div className="dl-left-bottom-stats">
                    <HeroStatsCarousel />
                </div>

                <img src={authBgNew} alt="Mundo GoTour" className="dl-cover-image" />
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
                    <div className="dl-form-section">
                        <h1 className="dl-title">{isSignup ? 'Segurança' : (isPasswordReset ? 'Recupere a sua conta' : 'Nova Palavra-passe')}</h1>

                        <div className="form-step fade-in-up">
                            <div className="dl-input-group dl-password-wrapper">
                                <input
                                    type={showPasswords ? "text" : "password"}
                                    name="password"
                                    placeholder="Palavra-passe"
                                    className={`dl-input dl-input-password${password ? ' has-value' : ''}`}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                />
                                <label className="dl-floating-label">Palavra-passe</label>
                                <button type="button" className="dl-password-toggle" onClick={() => setShowPasswords(!showPasswords)}>
                                    {showPasswords ? <EyeOff size={20} color="#80868B" /> : <Eye size={20} color="#80868B" />}
                                </button>
                            </div>

                            <div className="dl-input-group dl-password-wrapper" style={{ marginTop: '18px' }}>
                                <input
                                    type={showPasswords ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Repetir Palavra-passe"
                                    className={`dl-input dl-input-password${confirmPassword ? ' has-value' : ''}`}
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                                />
                                <label className="dl-floating-label">Repetir Palavra-passe</label>
                            </div>

                            {isSignup && (
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '16px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--primary)' }}
                                    />
                                    <span style={{ fontSize: '13px', color: '#5F6368', lineHeight: '1.5' }}>
                                        Li e concordo plenamente com os <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Termos de Serviço</span> e <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Política de Privacidade</span> da GoTour.
                                    </span>
                                </label>
                            )}

                            {error && <span className="error-msg-ds" style={{ marginTop: '16px', display: 'block' }}>{error}</span>}

                            <button
                                type="button"
                                className={`dl-submit-btn ${password.length >= 1 ? 'has-input' : ''}`}
                                style={{ marginTop: '24px', ...(password.length >= 1 ? { backgroundColor: '#000000', color: '#FFFFFF' } : {}) }}
                                onClick={handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Processando...' : (isSignup ? 'Registar' : 'Alterar Senha')}
                            </button>

                            {isSignup && (
                                <button
                                    type="button"
                                    onClick={handleSkip}
                                    style={{
                                        width: '100%',
                                        marginTop: '16px',
                                        background: 'transparent',
                                        border: '1px solid #DADCE0',
                                        color: '#5F6368',
                                        height: '48px',
                                        borderRadius: '8px',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = '#F1F3F4'}
                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                >
                                    Pular (Apenas para testes)
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopCreatePassword;
