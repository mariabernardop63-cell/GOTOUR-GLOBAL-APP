import './Welcome.css';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../../App';
import Button from '../../components/Button/Button';
import { ArrowLeft } from 'lucide-react';
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import DesktopNavbar from '../../components/DesktopNavbar/DesktopNavbar';
import DesktopLogin from '../DesktopLogin/DesktopLogin';
import DesktopSignup from '../DesktopSignup/DesktopSignup';
import DesktopSlideshow from '../../components/DesktopSlideshow/DesktopSlideshow';

import gotourIcon from '../../assets/images/gotour_icon.png';

/* ── Rotating headlines for the desktop hero ── */
const HERO_HEADLINES = [
    { line1: 'GO TOUR — Sua', line2: 'Plataforma Digital', line3: 'de Turismo Global' },
    { line1: 'Descubra destinos,', line2: 'planeie itinerários', line3: 'e reserve com segurança' },
    { line1: 'Conecte-se a guias', line2: 'locais e viva', line3: 'experiências autênticas' },
    { line1: 'Compare alojamentos,', line2: 'organize viagens', line3: 'tudo num só lugar' },
];



const Welcome = () => {
    const { navigateForward } = useNavigation();
    const [loadingBtn, setLoadingBtn] = useState(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [sheetAnimating, setSheetAnimating] = useState(false);
    const [sheetMode, setSheetMode] = useState('social');
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 1024);
    const [showDesktopLogin, setShowDesktopLogin] = useState(false);
    const [showDesktopSignup, setShowDesktopSignup] = useState(false);

    /* Rotating headline index */
    const [headlineIdx, setHeadlineIdx] = useState(0);
    const [headlineVisible, setHeadlineVisible] = useState(true);
    const headlineTimerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* ── Headline rotation every 5 s ── */
    useEffect(() => {
        if (isMobile) return;
        headlineTimerRef.current = setInterval(() => {
            setHeadlineVisible(false);
            setTimeout(() => {
                setHeadlineIdx((prev) => (prev + 1) % HERO_HEADLINES.length);
                setHeadlineVisible(true);
            }, 500);
        }, 5000);
        return () => clearInterval(headlineTimerRef.current);
    }, [isMobile]);



    // Body bg setup
    useEffect(() => {
        const originalBackground = document.body.style.background;
        const originalBackgroundColor = document.body.style.backgroundColor;

        if (isMobile) {
            document.body.classList.add('video-active');
            document.body.style.background = 'none';
            document.body.style.backgroundColor = '#000';
        } else {
            document.body.classList.remove('video-active');
            document.body.style.background = 'none';
            document.body.style.backgroundColor = '#000';
        }

        return () => {
            document.body.classList.remove('video-active');
            document.body.style.background = originalBackground;
            document.body.style.backgroundColor = originalBackgroundColor;
        };
    }, [isMobile]);

    const handleOpenSheet = (btnType, mode = 'social') => {
        setLoadingBtn(btnType);
        setSheetMode(mode);
        setShowBottomSheet(true);
        setTimeout(() => {
            setLoadingBtn(null);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setSheetAnimating(true);
                });
            });
        }, isMobile ? 800 : 500);
    };

    const handleComecarAgora = () => {
        // Check for incomplete signup before showing standard auth sheet
        const savedStep = localStorage.getItem('signupStep');
        const pendingProfile = localStorage.getItem('pendingProfileData');

        if ((savedStep && parseInt(savedStep) > 1) || pendingProfile) {
            navigateForward('/signup');
            return;
        }

        handleOpenSheet('primary', 'social');
    };

    const handleCloseSheet = () => {
        setSheetAnimating(false);
        setTimeout(() => {
            setShowBottomSheet(false);
        }, 350);
    };

    const currentHeadline = HERO_HEADLINES[headlineIdx];

    return (
        <div className="welcome-page-content">
            {isMobile ? (
                <>
                    {/* Mobile Slideshow Background */}
                    <div className="mobile-video-container">
                        <VideoBackground />
                    </div>

                    {/* Mobile logo icon only — top right corner */}
                    <div className="mobile-logo-area fade-in">
                        <img src={gotourIcon} alt="GoTour Icon" className="gotour-icon" />
                    </div>

                    {/* Mobile Title */}
                    <div className="mobile-intro slide-up">
                        <h1 className="welcome-title">GO TOUR — Explore o<br />Mundo Como um Local</h1>
                        <p className="welcome-subtitle">
                            A plataforma digital de turismo para descobrir destinos, planear viagens e reservar experiências autênticas.
                        </p>
                    </div>

                    {/* Glass Card Container */}
                    <div className={`action-glass-card slide-up ${showBottomSheet ? 'card-hidden' : ''}`}>
                        <div className="desktop-card-header">
                            <h2>Comece sua jornada</h2>
                            <p>Crie sua conta ou faça login para continuar.</p>
                        </div>

                        <div className="welcome-actions">
                            <div className="mobile-only-actions">
                                <Button
                                    type="button"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    onClick={handleComecarAgora}
                                    isLoading={loadingBtn === 'primary'}
                                >
                                    Começar Agora
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="lg"
                                    fullWidth
                                    onClick={() => isMobile ? navigateForward('/login') : handleOpenSheet('secondary', 'login')}
                                    isLoading={loadingBtn === 'secondary'}
                                >
                                    Já tenho conta
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <DesktopSlideshow />
                    {/* ═══════ DESKTOP ═══════ */}
                    <DesktopNavbar
                        onLoginClick={() => setShowDesktopLogin(true)}
                        onSignupClick={() => setShowDesktopSignup(true)}
                    />

                    <div className="desktop-hero">
                        {/* ── LEFT COLUMN ── */}
                        <div className="hero-left">
                            <div className={`hero-headline-wrapper ${headlineVisible ? 'visible' : 'hidden'}`}>
                                <h1 className="hero-h1">
                                    <span className="hero-h1-line">{currentHeadline.line1}</span>
                                    <span className="hero-h1-line">{currentHeadline.line2}</span>
                                    <span className="hero-h1-line">{currentHeadline.line3}</span>
                                </h1>
                            </div>

                            <p className="hero-sub">
                                GO TOUR é a plataforma digital de turismo que conecta viajantes a destinos, guias locais e experiências autênticas pelo mundo inteiro.
                            </p>

                            <div className="hero-ctas">
                                <button
                                    className="hero-btn-primary"
                                    onClick={() => {
                                        const savedStep = localStorage.getItem('signupStep');
                                        const pendingProfile = localStorage.getItem('pendingProfileData');
                                        if ((savedStep && parseInt(savedStep) > 1) || pendingProfile) {
                                            navigateForward('/signup');
                                            return;
                                        }
                                        setShowDesktopSignup(true);
                                    }}
                                >
                                    Começar agora
                                </button>
                                <button
                                    className="hero-btn-secondary"
                                    onClick={() => setShowDesktopLogin(true)}
                                >
                                    Já tenho conta
                                </button>
                            </div>

                            {/* Desktop Legal Links */}
                            <div className="hero-legal-links" style={{ marginTop: '24px', fontSize: '14px', color: '#E5E7EB' }}>
                                Aceder aos <button onClick={() => navigateForward('/terms-of-service')} style={{ background: 'none', border: 'none', color: '#3B82F6', padding: 0, fontWeight: '500', cursor: 'pointer', textDecoration: 'none' }}>Termos de Serviço</button> e à <button onClick={() => navigateForward('/privacy-policy')} style={{ background: 'none', border: 'none', color: '#3B82F6', padding: 0, fontWeight: '500', cursor: 'pointer', textDecoration: 'none' }}>Política de Privacidade</button>.
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN — REMOVED ── */}
                        <div className="hero-right">
                            {/* Empty or can hold something else in the future */}
                        </div>
                    </div>

                    {/* ── Desktop Footer — visible for Google Cloud OAuth verification ── */}
                    <footer className="welcome-footer">
                        <div className="welcome-footer-inner">
                            <div className="welcome-footer-brand">
                                <h2 className="welcome-footer-title">GO TOUR</h2>
                                <p className="welcome-footer-desc">
                                    GO TOUR é a plataforma digital de turismo que conecta viajantes a destinos, guias locais e experiências autênticas pelo mundo inteiro.
                                    Descubra destinos, planeie itinerários personalizados, compare alojamentos e reserve experiências — tudo num só lugar.
                                </p>
                            </div>
                            <div className="welcome-footer-features">
                                <div className="welcome-footer-col">
                                    <h3>Explorar</h3>
                                    <span>Destinos Globais</span>
                                    <span>Guias Locais</span>
                                    <span>Experiências Autênticas</span>
                                </div>
                                <div className="welcome-footer-col">
                                    <h3>Planear</h3>
                                    <span>Itinerários Personalizados</span>
                                    <span>Comparar Alojamentos</span>
                                    <span>Reservas Seguras</span>
                                </div>
                                <div className="welcome-footer-col">
                                    <h3>Legal</h3>
                                    <span style={{ cursor: 'pointer' }} onClick={() => navigateForward('/privacy-policy')}>Política de Privacidade</span>
                                    <span style={{ cursor: 'pointer' }} onClick={() => navigateForward('/terms-of-service')}>Termos de Serviço</span>
                                </div>
                            </div>
                        </div>
                        <div className="welcome-footer-bottom">
                            <span>© 2025 GO TOUR — Plataforma Digital de Turismo. Todos os direitos reservados.</span>
                        </div>
                    </footer>

                    {/* Desktop Login Full Screen Overlay */}
                    {showDesktopLogin && (
                        <DesktopLogin
                            onBack={() => setShowDesktopLogin(false)}
                            onNavigateSignup={() => {
                                setShowDesktopLogin(false);
                                setShowDesktopSignup(true);
                            }}
                        />
                    )}

                    {/* Desktop Signup Full Screen Overlay */}
                    {showDesktopSignup && (
                        <DesktopSignup
                            onBack={() => setShowDesktopSignup(false)}
                            onNavigateLogin={() => {
                                setShowDesktopSignup(false);
                                setShowDesktopLogin(true);
                            }}
                        />
                    )}
                </>
            )}

            {/* ===== MOBILE BOTTOM SHEET ===== */}
            {showBottomSheet && (
                <div
                    className={`bottom-sheet-overlay ${sheetAnimating ? 'active' : ''}`}
                    onClick={handleCloseSheet}
                >
                    <div
                        className={`bottom-sheet ${sheetAnimating ? 'active' : ''} sheet-auth-mode`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bottom-sheet-handle" />

                        {/* Fixed header */}
                        <div className="bottom-sheet-fixed-header">
                            {sheetMode !== 'social' && (
                                <button
                                    className="sheet-back-btn"
                                    onClick={() => setSheetMode(sheetMode === 'forgot' ? 'login' : sheetMode === 'signup' ? 'social' : 'social')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        marginBottom: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#64748b',
                                        cursor: 'pointer',
                                        padding: 0,
                                        fontFamily: 'inherit',
                                        fontSize: '14px'
                                    }}>
                                    <ArrowLeft size={20} /> Voltar
                                </button>
                            )}
                            <p className="bottom-sheet-label">
                                {sheetMode === 'login' ? 'Aceder à conta' : sheetMode === 'forgot' ? 'Recuperar acesso' : sheetMode === 'signup' ? 'Criar nova conta' : 'Iniciar sessão ou Registar-se'}
                            </p>
                            <h2 className="bottom-sheet-title">
                                {sheetMode === 'login' ? 'Bem-vindo de volta' : sheetMode === 'forgot' ? 'Esqueceu a senha?' : sheetMode === 'signup' ? 'Registe-se' : 'Bem-vindo à GoTour'}
                            </h2>
                        </div>

                        {/* Scrollable content */}
                        <div className="bottom-sheet-scroll-content">
                            {sheetMode === 'forgot' ? (
                                <ForgotPasswordForm
                                    onBack={() => setSheetMode('login')}
                                />
                            ) : sheetMode === 'login' ? (
                                <LoginForm
                                    onSuccess={() => navigateForward('/home')}
                                    onForgotPassword={() => setSheetMode('forgot')}
                                    showSocial={!isMobile}
                                    showSignupLink={!isMobile}
                                    onSignupClick={() => setSheetMode('signup')}
                                />
                            ) : sheetMode === 'signup' ? (
                                <SignupForm
                                    onLoginClick={() => setSheetMode('login')}
                                />
                            ) : (
                                <>
                                    {/* Social Buttons */}
                                    <div className="social-buttons-list">
                                        <button className="social-auth-btn" onClick={() => { }}>
                                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="social-auth-icon" />
                                            <span>Continuar com Google</span>
                                        </button>
                                        <button className="social-auth-btn" onClick={() => { }}>
                                            <svg className="social-auth-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                            </svg>
                                            <span>Continuar com Apple</span>
                                        </button>
                                        <button className="social-auth-btn" onClick={() => { }}>
                                            <svg className="social-auth-icon" viewBox="0 0 24 24" fill="#1877F2">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                            <span>Continuar com Facebook</span>
                                        </button>
                                        <button className="social-auth-btn" onClick={() => { }}>
                                            <svg className="social-auth-icon" viewBox="0 0 24 24" fill="#1DB954">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                            </svg>
                                            <span>Continuar com Spotify</span>
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="sheet-divider">
                                        <div className="sheet-divider-line"></div>
                                        <span className="sheet-divider-text">OU</span>
                                        <div className="sheet-divider-line"></div>
                                    </div>

                                    {/* Manual Auth Buttons */}
                                    <div className="sheet-auth-buttons">
                                        <button className="sheet-login-btn" onClick={() => setSheetMode('login')}>
                                            Iniciar sessão com email
                                        </button>
                                        <button className="sheet-signup-btn" onClick={() => setSheetMode('signup')}>
                                            Criar conta
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;
