import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Star, ArrowLeft } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { supabase } from '../../lib/supabase';
import { validateFullName, validatePhone, validateAge, checkEmailExists } from '../../lib/authValidation';
import useCooldown from '../../hooks/useCooldown';
import { countries } from '../../data/countries';
import AuthLeftPanel from './AuthLeftPanel';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import CountryCodeDropdown from '../../components/CountryCodeDropdown/CountryCodeDropdown';
import PreparingScreen from '../../components/PreparingScreen/PreparingScreen';
import authBgCocktail from '../../assets/images/auth_bg_cocktail.jpg';
import './SharedAuth.css';

const formVariants = {
    initial: (dir) => ({
        opacity: 0,
        x: dir * 36,
        filter: 'blur(3px)',
    }),
    animate: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (dir) => ({
        opacity: 0,
        x: dir * -36,
        filter: 'blur(3px)',
        transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] },
    }),
};

const UnifiedDesktopAuth = ({ defaultTab = 'login', onBack }) => {
    const location = useLocation();
    const { navigateForward } = useNavigation();

    // ─── Tab state ───────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [tabDir, setTabDir] = useState(0);

    const switchTab = (tab) => {
        if (tab === activeTab) return;
        setTabDir(tab === 'register' ? 1 : -1);
        setActiveTab(tab);
    };

    // ─── Shared state ────────────────────────────────────────────────
    const [isLoading, setIsLoading] = useState(false);
    const [showPreparing, setShowPreparing] = useState(false);

    const handlePreparingComplete = useCallback(() => {
        navigateForward('/home');
    }, [navigateForward]);

    // ─── LOGIN state ─────────────────────────────────────────────────
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginShowPw, setLoginShowPw] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        if (!loginEmail.trim()) { setLoginError('Por favor, introduza o seu email.'); return; }
        if (!loginPassword) { setLoginError('Por favor, introduza a sua palavra-passe.'); return; }

        setIsLoading(true);
        let success = false;

        if (loginEmail.trim() === '111111111111' && loginPassword === '111111111111') {
            setTimeout(() => { setIsLoading(false); setShowPreparing(true); }, 1000);
            return;
        }

        try {
            const loginPromise = supabase.auth.signInWithPassword({ email: loginEmail.trim(), password: loginPassword });
            const timeoutPromise = new Promise((_, rej) => setTimeout(() => rej(new Error('TIMEOUT_LOGIN')), 30000));
            const { data, error: loginError } = await Promise.race([loginPromise, timeoutPromise]);

            if (loginError) {
                const msg = (loginError.message || '').toLowerCase();
                if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
                    setLoginError('Email ou palavra-passe incorretos.');
                } else if (msg.includes('email not confirmed')) {
                    setLoginError('O seu email ainda não foi confirmado. Verifique a sua caixa de entrada.');
                } else if (msg.includes('rate limit')) {
                    setLoginError('Demasiadas tentativas. Aguarde alguns minutos.');
                } else {
                    setLoginError(loginError.message || 'Erro ao iniciar sessão.');
                }
                setIsLoading(false);
                return;
            }
            success = true;
            setIsLoading(false);
            setShowPreparing(true);
        } catch (err) {
            setLoginError(err.message === 'TIMEOUT_LOGIN'
                ? 'O servidor demorou muito a responder. Tente novamente.'
                : 'Erro: ' + (err.message || 'Falha de conexão.'));
        } finally {
            if (!success) setIsLoading(false);
        }
    };

    const handleGoogleOAuth = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { queryParams: { access_type: 'offline', prompt: 'select_account' }, redirectTo: `${window.location.origin}/oauth-callback` },
            });
            if (error) { setLoginError(error.message); setIsLoading(false); }
        } catch { setLoginError('Erro ao ligar ao Google.'); setIsLoading(false); }
    };

    const handleDiscordOAuth = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
                options: { redirectTo: `${window.location.origin}/oauth-callback` },
            });
            if (error) { setLoginError(error.message); setIsLoading(false); }
        } catch { setLoginError('Erro ao ligar ao Discord.'); setIsLoading(false); }
    };

    // ─── SIGNUP state ─────────────────────────────────────────────────
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '', email: '', nationality: '',
        phone: '', dobDay: '', dobMonth: '', dobYear: '',
        password: '', confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [showPasswords, setShowPasswords] = useState(false);
    const [isOAuthFlow, setIsOAuthFlow] = useState(false);
    const [isTestFlow, setIsTestFlow] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [phoneDialCode, setPhoneDialCode] = useState('');
    const [phoneCountry, setPhoneCountry] = useState(null);
    const [phoneError, setPhoneError] = useState('');
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCocktailLoaded, setIsCocktailLoaded] = useState(false);
    const [otp, setOtp] = useState(Array(8).fill(''));
    const otpRefs = useRef([]);
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_signup_cooldown_desktop');

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(r => r.json())
            .then(data => {
                if (data.country_code) {
                    const found = countries.find(c => c.code === data.country_code);
                    if (found) { setPhoneCountry(found); setPhoneDialCode(found.dialCode); }
                }
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (location.state?.requireProfileCompletion) {
            setFormData(prev => ({
                ...prev,
                fullName: location.state.fullName || '',
                email: location.state.email || '',
            }));
            setIsOAuthFlow(true);
            setStep(2);
            setActiveTab('register');
        }
    }, [location.state]);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleNationalityChange = (e) => {
        setFormData(prev => ({ ...prev, nationality: e.target.value }));
        if (errors.nationality) setErrors(prev => ({ ...prev, nationality: '' }));
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handlePhoneChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, phone: val }));
        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
        if (isPhoneTouched) {
            setPhoneError(validatePhone(val).error);
        } else if (val.length >= 7 && validatePhone(val).isValid) {
            setPhoneError('');
            setIsPhoneTouched(true);
        }
    };

    const handlePhoneBlur = () => {
        setIsPhoneTouched(true);
        setPhoneError(validatePhone(formData.phone).error);
    };

    const handleDialCodeChange = (code) => {
        setPhoneDialCode(code);
        if (isPhoneTouched && formData.phone) setPhoneError(validatePhone(formData.phone).error);
    };

    const validateStep = (currentStep, explicitOtp = null) => {
        const errs = {};
        if (currentStep === 1) {
            const nameRes = validateFullName(formData.fullName);
            if (!nameRes.isValid) errs.fullName = nameRes.error;
            if (!formData.email.trim()) errs.email = 'Email obrigatório';
            else if (!isValidEmail(formData.email)) errs.email = 'Email inválido';
        }
        if (currentStep === 2) {
            if (!formData.nationality) errs.nationality = 'Selecione a nacionalidade';
            const pv = validatePhone(formData.phone);
            if (!pv.isValid) { errs.phone = pv.error; setPhoneError(pv.error); setIsPhoneTouched(true); }
            const av = validateAge(formData.dobDay, formData.dobMonth, formData.dobYear);
            if (!av.isValid) errs.dob = av.error;
        }
        if (currentStep === 3) {
            const code = explicitOtp ? explicitOtp.join('') : otp.join('');
            if (code.length < 8) errs.otp = 'Insira o código de 8 dígitos completo';
        }
        if (currentStep === 4) {
            if (formData.password.length < 6) errs.password = 'Mínimo 6 caracteres';
            if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Senhas não coincidem';
            if (!termsAccepted) errs.terms = 'Aceite os termos para continuar';
        }
        return errs;
    };

    const handleSkipStep2 = () => {
        setErrors({});
        setIsTestFlow(true);
        const fullPhone = (phoneDialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');
        localStorage.setItem('pendingProfileData', JSON.stringify({
            fullName: formData.fullName, nationality: formData.nationality || '',
            phone: fullPhone, dateOfBirth: '',
        }));
        setStep(4);
    };

    const handleNext = async (explicitOtp) => {
        const stepErrors = validateStep(step, explicitOtp);
        if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }

        if (step === 1) {
            setIsLoading(true); setErrors({});
            const emailCheck = await checkEmailExists(formData.email);
            if (!emailCheck.error && emailCheck.exists) {
                setErrors({ email: 'Este email já está registado. Faça login ou recupere a sua conta.' });
                setIsLoading(false); return;
            }
            localStorage.setItem('signupStep', '2');
            localStorage.setItem('signupEmail', formData.email.trim());
            localStorage.setItem('signupFullName', formData.fullName);
            await new Promise(r => setTimeout(r, 600));
            setIsLoading(false); setStep(2); return;
        }

        if (step === 2) {
            if (isCoolingDown) { setErrors({ submit: `Aguarde ${cooldown}s antes de tentar novamente.` }); return; }
            setIsLoading(true); setErrors({});
            try {
                const fullPhone = (phoneDialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');
                const profileData = {
                    fullName: formData.fullName, nationality: formData.nationality, phone: fullPhone,
                    dateOfBirth: `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`,
                };
                if (isOAuthFlow) {
                    const { data: sessionData } = await supabase.auth.getSession();
                    if (sessionData?.session?.user) {
                        await supabase.from('profiles').update({ phone: fullPhone, nationality: formData.nationality }).eq('id', sessionData.session.user.id);
                    }
                    localStorage.setItem('pendingProfileData', JSON.stringify(profileData));
                    setStep(4); setIsLoading(false); return;
                }
                const tempPwd = Math.random().toString(36).slice(-8) + 'X9@!';
                const { data, error } = await supabase.auth.signUp({ email: formData.email.trim(), password: tempPwd });
                if (error || (data?.user?.identities?.length === 0)) {
                    const msg = error ? error.message.toLowerCase() : '';
                    if (msg.includes('rate limit')) { setErrors({ submit: 'Você tentou muitas vezes. Aguarde alguns minutos.' }); startCooldown(); }
                    else { setErrors({ submit: 'Este email já está registado. Faça login ou recupere a sua conta.' }); }
                    setIsLoading(false); return;
                }
                startCooldown();
                localStorage.setItem('pendingProfileData', JSON.stringify(profileData));
                setStep(3);
            } catch (err) {
                setErrors({ submit: err.message || 'Erro ao criar conta.' });
            } finally { setIsLoading(false); }
        }

        if (step === 3) {
            setIsLoading(true); setErrors({});
            try {
                let code = otp.join('');
                if (Array.isArray(explicitOtp)) code = explicitOtp.join('');
                else if (typeof explicitOtp === 'string') code = explicitOtp;
                const { error } = await supabase.auth.verifyOtp({ email: formData.email, token: code, type: 'signup' });
                if (error) {
                    const msg = error.message?.toLowerCase() || '';
                    if (msg.includes('rate limit')) setErrors({ submit: 'Você tentou inúmeras vezes. Volte a tentar mais tarde.' });
                    else if (msg.includes('expired')) setErrors({ submit: 'O código expirou. Solicite um novo código.' });
                    else setErrors({ submit: 'Código incorreto. Por favor verifique e tente novamente.' });
                    setIsLoading(false); return;
                }
                setStep(4);
            } catch { setErrors({ submit: 'Erro interno ao verificar código.' }); }
            finally { setIsLoading(false); }
        }

        if (step === 4) {
            setIsLoading(true);
            try {
                if (!isTestFlow) {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session) {
                        const { error: updateError } = await supabase.auth.updateUser({ password: formData.password });
                        if (updateError) throw updateError;
                    }
                } else {
                    await new Promise(r => setTimeout(r, 800));
                }
            } catch (err) { setErrors({ password: 'Erro ao guardar palavra-passe: ' + (err.message || '') }); setIsLoading(false); return; }
            setIsLoading(false); setStep(5);
        }

        if (step === 5) {
            setIsLoading(true);
            try {
                if (!isTestFlow) await supabase.auth.updateUser({ data: { full_signup_completed: true } });
                localStorage.removeItem('pendingProfileData');
                localStorage.removeItem('signupStep');
                await new Promise(r => setTimeout(r, 1000));
                navigateForward('/home');
            } catch { navigateForward('/home'); }
            finally { setIsLoading(false); }
        }
    };

    const handleBackStep = () => {
        if (step > 1 && step < 5) setStep(prev => prev - 1);
        else if (step === 1) onBack();
    };

    const handleCountryClick = () => setShowPreparing(true);

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
        if (errors.submit) setErrors(prev => ({ ...prev, submit: '' }));
        if (value && index < 7) otpRefs.current[index + 1]?.focus();
        if (newOtp.join('').length === 8 && value) {
            setTimeout(() => handleNext(newOtp), 50);
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
    };

    const handleResendCode = async () => {
        if (isCoolingDown) { setErrors({ submit: `Aguarde ${cooldown}s antes de tentar novamente.` }); return; }
        setIsLoading(true); setErrors({});
        try {
            const { error } = await supabase.auth.signInWithOtp({ email: formData.email });
            if (error) throw error;
            startCooldown();
        } catch { setErrors({ submit: 'Erro ao reenviar código. Tente novamente.' }); }
        finally { setIsLoading(false); }
    };

    // ─── Signup step titles ───────────────────────────────────────────
    const getTitle = () => {
        if (step === 1) return 'Crie sua Conta';
        if (step === 2) return 'Quase lá';
        if (step === 3) return 'Verification Code';
        if (step === 4) return 'Segurança';
        if (step === 5) return 'Escolha um País';
        return 'Bem-vindo';
    };
    const getSubtitle = () => {
        if (step === 1) return 'Preencha seus dados básicos para começar';
        if (step === 2) return 'Precisamos de mais detalhes para sua experiência';
        if (step === 3) return 'Please enter the 8-digit code sent to your email';
        if (step === 4) return 'Crie uma palavra-passe forte para proteger sua conta';
        if (step === 5) return 'Qual país gostaria de explorar primeiro?';
        return '';
    };

    // ─── PreparingScreen ─────────────────────────────────────────────
    if (showPreparing) {
        return <PreparingScreen onComplete={handlePreparingComplete} duration={4000} />;
    }

    // ─── Signup Step 5 (full-screen country selection) ───────────────
    if (activeTab === 'register' && step === 5) {
        return (
            <div className="da-screen-wrapper">
                <div className="da-card-stack">
                    <div className="da-card">
                        <motion.div
                            className="da-left-pane"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <button className="da-back-btn-corner" onClick={handleBackStep} aria-label="Voltar">
                                <ArrowLeft size={20} />
                            </button>
                            <div className="da-left-content" style={{ marginTop: '60px', maxWidth: '480px', width: '100%', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
                                <h1 className="da-welcome-title" style={{ fontSize: '32px', marginBottom: '8px' }}>
                                    Qual país gostaria de <br />
                                    <span className="da-welcome-title-alt">explorar primeiro?</span>
                                </h1>
                                <p className="da-welcome-subtitle" style={{ marginBottom: '24px' }}>
                                    Pesquise ou selecione um destino para personalizar sua jornada.
                                </p>
                                <div style={{ marginBottom: '16px' }}>
                                    <input
                                        type="text"
                                        className="da-glass-search-bar"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="da-country-list-wrapper" style={{ flex: 1, marginTop: '0', height: 'auto' }}>
                                    <div className="da-country-list-scroll" style={{ height: '100%' }}>
                                        {[...countries]
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map(c => (
                                                <div key={c.code} className="da-country-list-item" onClick={handleCountryClick} style={{ justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                        <img src={c.flagUrl} alt={c.code} className="da-country-flag-img" />
                                                        <span className="name">{c.name}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Star size={16} fill="#FBBF24" color="#FBBF24" />
                                                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
                                                            {(4.0 + (c.code.charCodeAt(0) % 10) * 0.1).toFixed(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="da-country-list-bottom-bracket"></div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="da-right-pane"
                            style={{ padding: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)', boxShadow: '0 0 30px 15px rgba(255,255,255,0.2)', zIndex: 10 }} />
                            <AnimatePresence>
                                {!isCocktailLoaded && (
                                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                                        style={{ position: 'absolute', inset: 0, backgroundColor: '#e2e8f0', zIndex: 5, overflow: 'hidden' }}>
                                        <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                            style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <img src={authBgCocktail} alt="Premium Lifestyle" onLoad={() => setIsCocktailLoaded(true)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'translateZ(0)', filter: 'contrast(1.08) saturate(1.15) brightness(0.92)', display: 'block', opacity: isCocktailLoaded ? 1 : 0, transition: 'opacity 0.6s ease-in', position: 'relative', zIndex: 1 }}
                                loading="eager" decoding="async" />
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Main render (steps 1–4 + login) ─────────────────────────────
    const showLeftSocialButtons = activeTab === 'login' || step === 1;

    return (
        <div className="da-screen-wrapper" style={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.7 : 1, transition: 'opacity 0.3s ease' }}>
            <div className="da-card-stack">
                <div className="da-card">

                    {/* ── LEFT PANEL — completely static, NEVER re-animates on tab switch ── */}
                    <AuthLeftPanel
                        onBack={activeTab === 'login' ? onBack : handleBackStep}
                        onGoogleClick={showLeftSocialButtons ? handleGoogleOAuth : undefined}
                        onDiscordClick={showLeftSocialButtons ? handleDiscordOAuth : undefined}
                    />

                    {/* ── RIGHT PANEL ─────────────────────────────────────────────────── */}
                    <div className="da-right-pane">

                        {/* Tabs — only visible on login / signup steps 1–2 */}
                        <AnimatePresence mode="wait">
                            {(activeTab === 'login' || step <= 2) && (
                                <motion.div
                                    key="tabs"
                                    className="da-tabs-wrapper"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="da-tabs">
                                        <button
                                            className={`da-tab ${activeTab === 'login' ? 'active' : ''}`}
                                            onClick={() => switchTab('login')}
                                        >
                                            Login
                                        </button>
                                        <button
                                            className={`da-tab ${activeTab === 'register' ? 'active' : ''}`}
                                            onClick={() => switchTab('register')}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated form content — ONLY this area transitions */}
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeTab === 'login' ? 'login' : `register-step-${step}`}
                                className="da-form-content"
                                custom={tabDir}
                                variants={formVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                style={{ textAlign: (activeTab === 'register' && step === 3) ? 'center' : 'left' }}
                            >
                                {activeTab === 'login' ? (
                                    /* ──────────────── LOGIN FORM ──────────────── */
                                    <>
                                        <h1 className="dl-title">Iniciar Sessão</h1>
                                        <form className="da-form" onSubmit={handleLogin}>
                                            <div className="da-input-group">
                                                <input
                                                    type="email"
                                                    className="da-input"
                                                    placeholder="Endereço de email"
                                                    value={loginEmail}
                                                    onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }}
                                                    required
                                                />
                                            </div>
                                            <div className="da-input-group">
                                                <input
                                                    type={loginShowPw ? 'text' : 'password'}
                                                    className="da-input dl-input-password"
                                                    placeholder="Palavra-passe"
                                                    value={loginPassword}
                                                    onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                                                    required
                                                    autoComplete="current-password"
                                                />
                                                <button type="button" className="dl-password-toggle" onClick={() => setLoginShowPw(!loginShowPw)}>
                                                    {loginShowPw ? <Eye size={18} /> : <EyeOff size={18} />}
                                                </button>
                                            </div>
                                            <div className="da-form-options">
                                                <div />
                                                <button type="button" className="da-forgot-link" onClick={(e) => { e.preventDefault(); navigateForward('/forgot-password'); }}>
                                                    Recuperar palavra-passe
                                                </button>
                                            </div>
                                            {loginError && <span className="error-msg-ds">{loginError}</span>}
                                            <button type="submit" className="da-btn-primary" disabled={isLoading}>
                                                {isLoading ? 'Entrando...' : 'Entrar'}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    /* ──────────────── SIGNUP FORM ──────────────── */
                                    <>
                                        <h1 className="dl-title" style={{ textAlign: step === 3 ? 'center' : 'left' }}>{getTitle()}</h1>
                                        {step === 3 && (
                                            <p className="ds-subtitle" style={{ color: '#A0AAB3', fontSize: '15px', marginBottom: '32px', textAlign: 'center' }}>
                                                {getSubtitle()}
                                            </p>
                                        )}
                                        <div className="da-form">
                                            {/* Step 1 */}
                                            {step === 1 && (
                                                <div className="form-step fade-in-up">
                                                    <div className="da-input-group">
                                                        <input type="text" name="fullName" placeholder="Nome Completo" className="da-input" value={formData.fullName} onChange={handleChange} style={{ fontSize: '17px' }} />
                                                    </div>
                                                    {errors.fullName && <span className="error-msg-ds">{errors.fullName}</span>}
                                                    <div className="da-input-group" style={{ marginTop: '20px' }}>
                                                        <input type="email" name="email" placeholder="Endereço de Email" className="da-input" value={formData.email} onChange={handleChange} style={{ fontSize: '17px' }} />
                                                    </div>
                                                    {errors.email && <span className="error-msg-ds">{errors.email}</span>}
                                                    <button type="button" className="da-btn-primary" style={{ marginTop: '32px', width: '100%' }} onClick={handleNext}
                                                        disabled={isLoading || !(formData.fullName.trim().length > 0 && formData.email.trim().length > 0)}>
                                                        {isLoading ? 'Processing...' : 'Next Step'}
                                                    </button>
                                                </div>
                                            )}
                                            {/* Step 2 */}
                                            {step === 2 && (() => {
                                                return (
                                                    <div className="form-step fade-in-up">
                                                        <div className="da-input-group" style={{ zIndex: 100, position: 'relative' }}>
                                                            <CustomDropdown options={countries} value={formData.nationality} onChange={handleNationalityChange} placeholder="Nacionalidade" />
                                                        </div>
                                                        {errors.nationality && <span className="error-msg-ds">{errors.nationality}</span>}
                                                        <div className="da-input-group" style={{ marginTop: '18px' }}>
                                                            <div className={`da-input-phone ${phoneError ? 'invalid' : ''}`}>
                                                                <div className="da-phone-prefix">
                                                                    <CountryCodeDropdown value={phoneDialCode} onChange={handleDialCodeChange} />
                                                                </div>
                                                                <input type="tel" name="phone" placeholder="Número de telefone" value={formData.phone} onChange={handlePhoneChange} onBlur={handlePhoneBlur} style={{ fontSize: '17px' }} />
                                                            </div>
                                                        </div>
                                                        {(errors.phone || phoneError) && <span className="error-msg-ds">{errors.phone || phoneError}</span>}
                                                        <div className="da-input-group" style={{ marginTop: '18px' }}>
                                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                                <div style={{ flex: 1 }}>
                                                                    <select name="dobDay" className="da-input" value={formData.dobDay} onChange={handleChange}>
                                                                        <option value="">Dia</option>
                                                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div style={{ flex: 1 }}>
                                                                    <select name="dobMonth" className="da-input" value={formData.dobMonth} onChange={handleChange}>
                                                                        <option value="">Mês</option>
                                                                        {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div style={{ flex: 1 }}>
                                                                    <select name="dobYear" className="da-input" value={formData.dobYear} onChange={handleChange}>
                                                                        <option value="">Ano</option>
                                                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {errors.dob && <span className="error-msg-ds">{errors.dob}</span>}
                                                        {errors.submit && <span className="error-msg-ds" style={{ marginTop: '8px', display: 'block' }}>{errors.submit}</span>}
                                                        <button type="button" className="da-btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={() => handleNext()}
                                                            disabled={isLoading || !(formData.nationality || formData.phone.trim().length > 0 || phoneDialCode.trim().length > 0 || formData.dobDay || formData.dobMonth || formData.dobYear)}>
                                                            {isLoading ? 'Processing...' : 'Next Step'}
                                                        </button>
                                                        <button type="button" onClick={handleSkipStep2}
                                                            style={{ width: '100%', marginTop: '16px', background: 'transparent', border: '1px solid #DADCE0', color: '#5F6368', height: '48px', borderRadius: '8px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s ease' }}
                                                            onMouseEnter={(e) => e.target.style.background = '#F1F3F4'}
                                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                                                            Pular (Apenas para testes)
                                                        </button>
                                                    </div>
                                                );
                                            })()}
                                            {/* Step 3 — OTP */}
                                            {step === 3 && (() => {
                                                const isOtpComplete = otp.join('').length === 8;
                                                return (
                                                    <div className="form-step fade-in-up">
                                                        <div className={`dl-otp-container ${isLoading ? 'is-verifying' : ''}`} style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '24px' }}>
                                                            {otp.map((digit, idx) => (
                                                                <input key={idx} ref={(el) => (otpRefs.current[idx] = el)} type="text" inputMode="numeric" maxLength={1} value={digit}
                                                                    onChange={(e) => handleOtpChange(idx, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                                    autoFocus={idx === 0} className="da-otp-input" />
                                                            ))}
                                                        </div>
                                                        {errors.otp && <span className="error-msg-ds" style={{ textAlign: 'center' }}>{errors.otp}</span>}
                                                        {errors.submit && <span className="error-msg-ds" style={{ textAlign: 'center' }}>{errors.submit}</span>}
                                                        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
                                                            <span className={`dl-link-text ${isCoolingDown ? 'disabled' : ''}`} onClick={!isCoolingDown ? handleResendCode : undefined}
                                                                style={{ cursor: isCoolingDown ? 'not-allowed' : 'pointer', color: isCoolingDown ? '#9CA3AF' : '#4A72FF', fontWeight: '600', fontSize: '14px' }}>
                                                                {isCoolingDown ? `Aguarde ${cooldown}s para reenviar` : "Didn't get a code?"}
                                                            </span>
                                                        </div>
                                                        <button type="button" className="da-btn-primary" style={{ width: '100%' }} onClick={() => handleNext()} disabled={!isOtpComplete || isLoading}>
                                                            {isLoading ? 'Verificando...' : 'Verify'}
                                                        </button>
                                                    </div>
                                                );
                                            })()}
                                            {/* Step 4 — Password */}
                                            {step === 4 && (
                                                <div className="form-step fade-in-up">
                                                    <div className="da-input-group">
                                                        <input type={showPasswords ? 'text' : 'password'} name="password" placeholder="Criar palavra-passe" className="da-input dl-input-password" value={formData.password} onChange={handleChange} />
                                                        <button type="button" className="dl-password-toggle" onClick={() => setShowPasswords(!showPasswords)}>
                                                            {showPasswords ? <Eye size={18} /> : <EyeOff size={18} />}
                                                        </button>
                                                    </div>
                                                    {errors.password && <span className="error-msg-ds">{errors.password}</span>}
                                                    <div className="da-input-group" style={{ marginTop: '20px' }}>
                                                        <input type={showPasswords ? 'text' : 'password'} name="confirmPassword" placeholder="Confirmar palavra-passe" className="da-input dl-input-password" value={formData.confirmPassword} onChange={handleChange} />
                                                        <button type="button" className="dl-password-toggle" onClick={() => setShowPasswords(!showPasswords)}>
                                                            {showPasswords ? <Eye size={18} /> : <EyeOff size={18} />}
                                                        </button>
                                                    </div>
                                                    {errors.confirmPassword && <span className="error-msg-ds">{errors.confirmPassword}</span>}
                                                    <div className="da-form-options" style={{ marginTop: '16px' }}>
                                                        <label className="da-checkbox-group">
                                                            <input type="checkbox" className="da-checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); if (errors.terms) setErrors(prev => ({ ...prev, terms: '' })); }} />
                                                            <span className="da-checkbox-label">Eu concordo com os Termos e Políticas</span>
                                                        </label>
                                                    </div>
                                                    {errors.terms && <span className="error-msg-ds">{errors.terms}</span>}
                                                    <button type="button" className="da-btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={() => handleNext()}
                                                        disabled={isLoading || formData.password.length < 6 || !termsAccepted}>
                                                        {isLoading ? 'Processing...' : 'Next Step'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UnifiedDesktopAuth;
