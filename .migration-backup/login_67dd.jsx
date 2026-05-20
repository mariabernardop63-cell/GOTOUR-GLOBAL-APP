import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, ChevronDown, ArrowLeft, Loader2, Mail, Lock } from 'lucide-react';
import authBgNew from '../../assets/images/auth_bg_new.jpg';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { countries } from '../../data/countries';
import SkeletonAuth from '../../components/SkeletonAuth/SkeletonAuth';
import './DesktopLogin.css';

const DesktopLogin = ({ onBack, onNavigateSignup }) => {
    const { navigateForward, navigateBack } = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [langCode, setLangCode] = useState('PT');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseClick = () => {
        setIsClosing(true);
        setTimeout(() => {
            onBack();
        }, 1500);
    };

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

    // Custom masking states
    const [realPassword, setRealPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const hideTimeoutRef = useRef(null);

    const handlePasswordChange = (e) => {
        const newVal = e.target.value;

        // If password is fully visible, just sync both directly
        if (showPassword) {
            setRealPassword(newVal);
            setDisplayPassword(newVal);
            return;
        }

        // Logic for hidden masking:
        if (newVal.length > displayPassword.length) {
            // User typed something (assume at the end for simplicity)
            const addedChar = newVal.slice(-1);
            const newRealPwd = realPassword + addedChar;
            setRealPassword(newRealPwd);

            // Showbullets for all EXCEPT the last character
            const bullets = '•'.repeat(Math.max(0, newRealPwd.length - 1));
            setDisplayPassword(bullets + addedChar);

            // Clear any existing timeout so we don't hide the character too early
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

            // Hide the last character after 600ms
            hideTimeoutRef.current = setTimeout(() => {
                setDisplayPassword('•'.repeat(newRealPwd.length));
            }, 600);
        } else if (newVal.length < displayPassword.length) {
            // User deleted something
            // We just truncate the real password and display bullets
            const newRealPwd = realPassword.slice(0, newVal.length);
            setRealPassword(newRealPwd);
            setDisplayPassword('•'.repeat(newRealPwd.length));
        } else {
            // Fallback for copy/paste replacement of same length
            setRealPassword(newVal);
            setDisplayPassword('•'.repeat(newVal.length));
        }
    };

    const togglePasswordVisibility = () => {
        if (!showPassword) {
            // Switch to visible
            setDisplayPassword(realPassword);
        } else {
            // Switch to hidden
            setDisplayPassword('•'.repeat(realPassword.length));
        }
        setShowPassword(!showPassword);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Por favor, introduza o seu email.');
            return;
        }
        if (!realPassword) {
            setError('Por favor, introduza a sua palavra-passe.');
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: realPassword,
            });

            if (loginError) {
                const msg = loginError.message.toLowerCase();
                if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
                    setError('Email ou palavra-passe incorretos. Verifique os seus dados ou crie uma conta.');
                } else if (msg.includes('email not confirmed')) {
                    setError('O seu email ainda não foi confirmado. Verifique a sua caixa de entrada.');
                } else if (msg.includes('rate limit') || msg.includes('rate_limit')) {
                    setError('Demasiadas tentativas. Aguarde alguns minutos e tente novamente.');
                } else {
                    setError(loginError.message || 'Erro ao iniciar sessão. Tente novamente.');
                }
                setIsLoading(false);
                return;
            }

            if (data?.user) {
                // Successful login
                navigateForward('/home');
            }
        } catch (err) {
            setError('Erro de conexão. Verifique a sua ligação à internet.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account',
                    },
                    redirectTo: `${window.location.origin}/oauth-callback`,
                },
            });

            if (error) {
                setError(error.message);
                setIsLoading(false);
            }
            // If successful, Supabase redirects the page, so no need for further logic here.
        } catch (err) {
            setError('Erro ao ligar ao Google.');
            setIsLoading(false);
        }
    };

    return (
        <div className="desktop-login-container">
            {/* Left Image Pane: 35% Width */}
            <div className="dl-left-pane">
                {/* Back Button */}
                <button className={`dl-back-button ${isClosing ? 'is-closing' : ''}`} onClick={handleCloseClick} aria-label="Voltar para a tela anterior">
                    {isClosing ? (
                        <Loader2 size={24} color="#FFFFFF" className="dl-spin-icon" />
                    ) : (
                        <ArrowLeft size={24} color="#FFFFFF" />
                    )}
                </button>

                {!imageLoaded && (
                    <div className="dl-cover-image shimmer" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, borderRadius: 0 }}></div>
                )}
                <img
                    src={authBgNew}
                    alt="Explore o mundo como um local"
                    className={`dl-cover-image ${imageLoaded ? 'content-fade-in' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                    fetchpriority="high"
                    style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
                />
            </div>

            {/* Right Content Pane: 65% Width */}
            <div className="dl-right-pane">

                {/* Top Right Language Selector */}
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

                <div className="dl-content-wrapper content-fade-in">
                    <div className="dl-form-section">
                        <h1 className="dl-title">Acesse Sua Conta</h1>

                        <form className="dl-form" onSubmit={handleLogin}>
                            <div className="dl-input-group has-icon-left">
                                <Mail size={20} color="#8E8E93" className="dl-input-icon-left" />
                                <input
                                    type="email"
                                    className={`dl-input${email ? ' has-value' : ''}`}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    required
                                />
                                <label className="dl-floating-label">Email</label>
                            </div>

                            <div className="dl-input-group dl-mt-18 dl-password-wrapper has-icon-left">
                                <Lock size={20} color="#8E8E93" className="dl-input-icon-left" />
                                <input
                                    type="text"
                                    className={`dl-input dl-input-password${displayPassword ? ' has-value' : ''}`}
                                    placeholder="Senha"
                                    value={displayPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    autoComplete="off"
                                />
                                <label className="dl-floating-label">Senha</label>
                                <button
                                    type="button"
                                    className="dl-password-toggle"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} color="#80868B" />
                                    ) : (
                                        <Eye size={20} color="#80868B" />
                                    )}
                                </button>
                            </div>

                            <button
                                type="button"
                                className="dl-forgot-link"
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                                onClick={(e) => { e.preventDefault(); navigateForward('/forgot-password'); }}
                            >
                                Esqueci a Senha
                            </button>

                            {error && <span className="error-msg-ds" style={{ display: 'block', marginTop: '12px' }}>{error}</span>}

                            <button type="submit" className={`dl-submit-btn ${email.trim().length > 0 || displayPassword.length > 0 ? 'is-active' : ''}`} disabled={isLoading}>
                                {isLoading ? 'Processando...' : 'Entrar'}
                            </button>
                        </form>

                        <div className="dl-social-section">
                            <div className="dl-divider">
                                <div className="dl-divider-line"></div>
                                <div className="dl-divider-text">ou continuar com</div>
                                <div className="dl-divider-line"></div>
                            </div>
                            <div className="dl-social-row">
                                {/* Google */}
                                <button className="dl-social-icon-btn" onClick={handleGoogleLogin} aria-label="Continuar com Google">
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="24" height="24" />
                                </button>
                                {/* Facebook */}
                                <button className="dl-social-icon-btn" aria-label="Continuar com Facebook">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="24" height="24" />
                                </button>
                                {/* X (Twitter) */}
                                <button className="dl-social-icon-btn" aria-label="Continuar com X">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.901 1.153H22.58L14.541 10.342L24 22.846H16.592L10.787 15.253L4.148 22.846H0.466L8.981 13.116L0 1.153H7.587L12.84 8.093L18.901 1.153ZM17.61 20.644H19.648L6.486 3.24H4.314L17.61 20.644Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dl-bottom-bar" style={{ position: 'absolute', bottom: '32px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#5F6368', marginRight: '4px' }}>Novo por aqui?</span>
                    <button
                        onClick={() => navigateForward('/signup')}
                        className="dl-create-account-btn"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'var(--gotour-primary)', fontWeight: '600' }}
                    >
                        Crie sua conta agora
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DesktopLogin;
