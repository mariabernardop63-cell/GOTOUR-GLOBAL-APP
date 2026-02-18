import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../App';
import Button from '../../components/Button/Button';
import { Globe, Hotel, MapPin, Map as MapIcon, Users, X, ArrowLeft } from 'lucide-react';
import LoginForm from '../../components/LoginForm/LoginForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import './Welcome.css';

import gotourIcon from '../../assets/images/gotour_icon.png';

const marketingTexts = [
    {
        title: "Descubra o mundo com um clique.",
        subtitle: "Explore praias, hotéis, restaurantes e experiências únicas, tudo num só lugar.",
        desc: "A Gotour mostra-te o melhor do teu país e do mundo, de forma rápida e inteligente."
    },
    {
        title: "África é gigante. E tu ainda viste pouco.",
        subtitle: "Explora destinos autênticos, cultura, gastronomia e aventuras reais.",
        desc: ""
    },
    {
        title: "Planeie a tua viagem como um profissional.",
        subtitle: "Crie roteiros, guarde lugares favoritos e encontre destinos incríveis perto de ti.",
        desc: "Viajar nunca foi tão simples e organizado. Da tua província para o mundo."
    }
];

const Welcome = () => {
    const { navigateForward } = useNavigation();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [loadingBtn, setLoadingBtn] = useState(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [sheetAnimating, setSheetAnimating] = useState(false);
    const [sheetMode, setSheetMode] = useState('social'); // 'social' | 'login' | 'signup' | 'forgot'
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    useEffect(() => {
        const textInterval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % marketingTexts.length);
        }, 6000);

        return () => clearInterval(textInterval);
    }, []);

    const handleNavigation = (path, btnType) => {
        setLoadingBtn(btnType);
        setTimeout(() => {
            setLoadingBtn(null);
            navigateForward(path);
        }, 2000);
    };

    const handleOpenSheet = (btnType, mode = 'social') => {
        setLoadingBtn(btnType);
        setSheetMode(mode);
        setShowBottomSheet(true); // Hide the card immediately

        // Shorter delay for the sheet to appear
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
        handleOpenSheet('primary', 'social');
    };

    const handleCloseSheet = () => {
        setSheetAnimating(false);
        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            setShowBottomSheet(false);
        }, 350);
    };

    return (
        <div className="welcome-page-content">
            {/* Mobile logo icon only — top right corner */}
            <div className="mobile-logo-area fade-in">
                <img src={gotourIcon} alt="GoTour Icon" className="gotour-icon" />
            </div>

            <div className="welcome-desktop-grid">

                {/* LEFT COL: Marketing Text (Desktop Only) */}
                <div className="welcome-left-col">
                    <div className="logo-brand-area">
                        <img src={gotourIcon} alt="GoTour" className="brand-logo-img" />
                        <span className="brand-name-text">GOTOUR</span>
                    </div>

                    <div className="rotating-text-container">
                        {marketingTexts.map((item, index) => (
                            <div
                                key={index}
                                className={`text-slide ${index === currentTextIndex ? 'active' : ''}`}
                            >
                                <h1 className="marketing-title">{item.title}</h1>
                                <h2 className="marketing-subtitle">{item.subtitle}</h2>
                                {item.desc && <p className="marketing-desc">{item.desc}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicators */}
                    <div className="rotation-indicators">
                        {marketingTexts.map((_, idx) => (
                            <div
                                key={idx}
                                className={`dot ${idx === currentTextIndex ? 'active' : ''}`}
                            ></div>
                        ))}
                    </div>

                    {/* Mini Features Line */}
                    <div className="mini-features">
                        <div className="feat-item"><Globe size={16} /> Destinos reais</div>
                        <div className="feat-separator">•</div>
                        <div className="feat-item"><Hotel size={16} /> Lugares incríveis</div>
                        <div className="feat-separator">•</div>
                        <div className="feat-item"><MapIcon size={16} /> Exploração inteligente</div>
                    </div>

                    {/* Stats */}
                    <div className="stats-row">
                        <div className="stat-box">
                            <span className="stat-num">+500</span>
                            <span className="stat-label">destinos</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-num">+10</span>
                            <span className="stat-label">províncias</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-num">+2k</span>
                            <span className="stat-label">viajantes</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Action Container (Desktop puts this in right col, Mobile centers it) */}
                <div className="welcome-right-col">
                    {/* Mobile Title (Hidden on Desktop) */}
                    <div className="mobile-intro slide-up">
                        <h1 className="welcome-title">Explore o Mundo <br />Como um Local</h1>
                        <p className="welcome-subtitle">
                            Descubra destinos incríveis, conecte-se com guias locais e viva experiências autênticas.
                        </p>
                    </div>

                    {/* Glass Card Container (Desktop) / Standard (Mobile) */}
                    <div className={`action-glass-card slide-up ${showBottomSheet ? 'card-hidden' : ''}`}>
                        <div className="desktop-card-header">
                            <h2>Comece sua jornada</h2>
                            <p>Crie sua conta ou faça login para continuar.</p>
                        </div>

                        <div className="welcome-actions">
                            {/* Mobile: opens bottom sheet | Desktop: navigates directly */}
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

                            {/* Desktop only buttons */}
                            <div className="desktop-only-actions">
                                <Button
                                    type="button"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    onClick={() => handleOpenSheet('primary', 'social')}
                                    isLoading={loadingBtn === 'primary'}
                                >
                                    Começar Agora
                                </Button>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="lg"
                                    fullWidth
                                    onClick={() => handleOpenSheet('secondary', 'login')}
                                    isLoading={loadingBtn === 'secondary'}
                                >
                                    Já tenho conta
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

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
