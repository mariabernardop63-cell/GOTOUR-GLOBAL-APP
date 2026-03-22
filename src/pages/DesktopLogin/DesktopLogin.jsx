import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Eye, EyeOff, ChevronDown, ArrowLeft, Loader2, Mail, Lock } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import authBgNew from '../../assets/images/auth_bg_new.jpg';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { countries } from '../../data/countries';
import SkeletonAuth from '../../components/SkeletonAuth/SkeletonAuth';
import '../SharedAuth/SharedAuth.css';
import AuthLeftPanel from '../SharedAuth/AuthLeftPanel';
import AuthTabs from '../SharedAuth/AuthTabs';
import AuthSocialButtons from '../SharedAuth/AuthSocialButtons';
import PreparingScreen from '../../components/PreparingScreen/PreparingScreen';

const DesktopLogin = ({ onBack, onNavigateSignup }) => {
    const { navigateForward, navigateBack } = useNavigation();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [langCode, setLangCode] = useState('PT');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showPreparing, setShowPreparing] = useState(false);

    const handlePreparingComplete = useCallback(() => {
        navigateForward('/home');
    }, [navigateForward]);

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

    // Simple password state
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Por favor, introduza o seu email.');
            return;
        }
        if (!password) {
            setError('Por favor, introduza a sua palavra-passe.');
            return;
        }

        setIsLoading(true);
        let loginSuccess = false;

        // Test User Bypass (same as mobile LoginForm)
        if (email.trim() === '111111111111' && password === '111111111111') {
            setTimeout(() => {
                setIsLoading(false);
                setShowPreparing(true);
            }, 1000);
            return;
        }

        try {
            const loginPromise = supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_LOGIN')), 30000));

            const { data, error: loginError } = await Promise.race([loginPromise, timeoutPromise]);

            if (loginError) {
                const msg = (loginError.message || '').toLowerCase();
                if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
                    setError('Email ou palavra-passe incorretos.');
                } else if (msg.includes('email not confirmed')) {
                    setError('O seu email ainda não foi confirmado. Verifique a sua caixa de entrada.');
                } else if (msg.includes('rate limit') || msg.includes('rate_limit')) {
                    setError('Demasiadas tentativas. Aguarde alguns minutos.');
                } else {
                    setError(loginError.message || 'Erro ao iniciar sessão.');
                }
                setIsLoading(false);
                return;
            }

            // Success: show preparing screen
            loginSuccess = true;
            setIsLoading(false);
            setShowPreparing(true);

        } catch (err) {
            if (err.message === 'TIMEOUT_LOGIN') {
                setError('O servidor demorou muito a responder. Tente novamente.');
            } else {
                setError('Erro: ' + (err.message || 'Falha de conexão.'));
            }
            console.error('Login error:', err);
        } finally {
            if (!loginSuccess) {
                setIsLoading(false);
            }
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

    const handleDiscordLogin = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
                options: {
                    redirectTo: `${window.location.origin}/oauth-callback`,
                },
            });

            if (error) {
                setError(error.message);
                setIsLoading(false);
            }
        } catch (err) {
            setError('Erro ao ligar ao Discord.');
            setIsLoading(false);
        }
    };

    // Show preparing screen
    if (showPreparing) {
        return (
            <PreparingScreen onComplete={handlePreparingComplete} duration={4000} />
        );
    }

    return (
        <div className="da-screen-wrapper" style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.7 : 1, transition: 'opacity 0.3s ease' }}>
            <div className="da-card-stack">
                <div className="da-card">
                    {/* Left Pane: 3D Illustration & Welcome Text */}
                    <AuthLeftPanel onBack={onBack} onGoogleClick={handleGoogleLogin} onDiscordClick={handleDiscordLogin} />

                    {/* Right Pane: Form Content */}
                    <div className="da-right-pane">
                        <AuthTabs activeTab="login" onSignupClick={onNavigateSignup} />

                        <div className="da-form-content">
                            <h1 className="dl-title">Iniciar Sessão</h1>
                            <form className="da-form" onSubmit={handleLogin}>
                                <div className="da-input-group">
                                    <input
                                        type="email"
                                        className="da-input"
                                        placeholder="Endereço de email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                        required
                                    />
                                </div>

                                <div className="da-input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="da-input dl-input-password"
                                        placeholder="Palavra-passe"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="dl-password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                </div>

                                <div className="da-form-options">
                                    <div></div>
                                    <button
                                        type="button"
                                        className="da-forgot-link"
                                        onClick={(e) => { e.preventDefault(); navigateForward('/forgot-password'); }}
                                    >
                                        Recuperar palavra-passe
                                    </button>
                                </div>

                                {error && <span className="error-msg-ds">{error}</span>}

                                <button type="submit" className="da-btn-primary" disabled={isLoading}>
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopLogin;
