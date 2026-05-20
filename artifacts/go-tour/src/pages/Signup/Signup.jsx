import React, { useState } from 'react';
import { User, Mail, Globe, Phone, Calendar, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { countries } from '../../data/countries';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import DesktopSignup from '../DesktopSignup/DesktopSignup';
import './Signup.css';

const Signup = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const { nationality, setNationality } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showPasswords, setShowPasswords] = useState(false);
    const [isOAuthFlow, setIsOAuthFlow] = useState(false);
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_signup_cooldown');

    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 1024);
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        nationality: nationality || '',
        phone: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        password: '',
        confirmPassword: ''
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});

    const activeCountry = countries.find(c => c.code === nationality) || countries[0];

    // On Mount: Check for incomplete signup state to restore
    React.useEffect(() => {
        // If we came from OAuth, don't override with localStorage
        const locState = location.state || {};
        if (locState.requireProfileCompletion) return;

        const savedStep = localStorage.getItem('signupStep');
        if (savedStep && parseInt(savedStep) > 1) {
            setStep(parseInt(savedStep));

            // Restore form data from localStorage
            setFormData(prev => ({
                ...prev,
                email: localStorage.getItem('signupEmail') || prev.email,
                fullName: localStorage.getItem('signupFullName') || prev.fullName
            }));

            // If they had pending profile data, restore that too
            const pendingProfile = localStorage.getItem('pendingProfileData');
            if (pendingProfile) {
                try {
                    const parsed = JSON.parse(pendingProfile);
                    let cleanPhone = parsed.phone || '';
                    if (activeCountry && activeCountry.dialCode && cleanPhone.startsWith(activeCountry.dialCode)) {
                        cleanPhone = cleanPhone.substring(activeCountry.dialCode.length);
                    }

                    setFormData(prev => ({
                        ...prev,
                        nationality: parsed.nationality || prev.nationality,
                        phone: cleanPhone
                    }));
                } catch (e) {
                    console.error('Error parsing pendingProfileData:', e);
                }
            }
        }
    }, [location.state, activeCountry]);

    // Handle return from Email Confirmation on mobile
    React.useEffect(() => {
        const locState = location.state || {};
        if (locState.returnStep === 3 && locState.formData) {
            setFormData(prev => ({ ...prev, ...locState.formData }));
            setStep(3);
        }
    }, [location.state]);

    // Handle OAuth return requirement for profile completion
    React.useEffect(() => {
        const locState = location.state || {};
        if (locState.requireProfileCompletion) {
            setFormData(prev => ({
                ...prev,
                fullName: locState.fullName || '',
                email: locState.email || ''
            }));
            setIsOAuthFlow(true);
            setStep(2); // Jump to demographic info
        }
    }, [location.state]);

    if (!isMobile) {
        return <DesktopSignup onBack={() => navigateBack('/')} onNavigateLogin={() => navigateForward('/login')} />;
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleNationalityChange = (e) => {
        setNationality(e.target.value);
        setFormData(prev => ({ ...prev, nationality: e.target.value }));
        if (errors.nationality) setErrors(prev => ({ ...prev, nationality: '' }));
    };

    // Validation helpers
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\d{7,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));

    const validateStep = (currentStep) => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Nome obrigatório';
            else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Nome deve ter no mínimo 2 caracteres';
            if (!formData.email.trim()) newErrors.email = 'Email obrigatório';
            else if (!isValidEmail(formData.email)) newErrors.email = 'Email inválido';
        }
        if (currentStep === 2) {
            if (!formData.nationality) newErrors.nationality = 'Selecione a nacionalidade';
            if (!formData.phone) newErrors.phone = 'Telefone obrigatório';
            else if (!isValidPhone(formData.phone)) newErrors.phone = 'Número de telefone inválido (mín. 7 dígitos)';
            if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) newErrors.dob = 'Data de nascimento obrigatória';
        }
        if (currentStep === 3) {
            if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não coincidem';
            if (!termsAccepted) newErrors.terms = 'Aceite os termos';
        }
        return newErrors;
    };

    const handleNext = async () => {
        const stepErrors = validateStep(step);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        // Use Supabase Magic Link flow
        if (step === 1) {
            setIsLoading(true);
            setErrors({});

            // We no longer block users here because unverified users would get locked out forever.
            // Supabase will automatically send/resend the OTP when they reach the next step.

            // Save step progress
            localStorage.setItem('signupStep', '2');
            localStorage.setItem('signupEmail', formData.email.trim());
            localStorage.setItem('signupFullName', formData.fullName);

            setIsLoading(false);
            setStep(2);
            return;
        }

        if (step === 2) {
            if (isCoolingDown) {
                setErrors({ email: `Aguarde ${cooldown}s antes de tentar novamente.` });
                return;
            }
            setIsLoading(true);
            setErrors({});
            try {
                const fullPhone = (activeCountry?.dialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');
                const profileData = {
                    fullName: formData.fullName,
                    nationality: formData.nationality,
                    phone: fullPhone,
                    dateOfBirth: formData.dobYear && formData.dobMonth && formData.dobDay
                        ? `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`
                        : null
                };

                const redirectUrl = window.location.origin + '/create-password';

                if (isOAuthFlow) {
                    // Update their profile in Supabase database
                    const { data: sessionData } = await supabase.auth.getSession();
                    if (sessionData?.session?.user) {
                        await supabase.from('profiles').update({
                            phone: fullPhone,
                            nationality: formData.nationality
                        }).eq('id', sessionData.session.user.id);
                    }
                    navigateForward('/create-password', {
                        state: {
                            email: formData.email,
                            flow: 'signup-oauth',
                            profileData: profileData
                        }
                    });
                    setIsLoading(false);
                    return;
                }

                const { error } = await supabase.auth.signInWithOtp({
                    email: formData.email,
                    options: { emailRedirectTo: redirectUrl }
                });

                if (error) {
                    const msg = error.message || '';
                    if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
                        setErrors({ email: 'Você tentou muitas vezes. Aguarde alguns minutos e tente novamente.' });
                        startCooldown();
                    } else if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already exists')) {
                        setErrors({ email: 'Este email já está registado. Faça login ou recupere a sua conta.' });
                    } else {
                        setErrors({ email: error.message || 'Erro ao enviar verificação. Tente novamente.' });
                    }
                    setIsLoading(false);
                    return;
                }

                startCooldown();
                localStorage.setItem('pendingProfileData', JSON.stringify(profileData));

                navigateForward('/email-confirmation', {
                    state: {
                        email: formData.email,
                        flow: 'signup-mobile-magic',
                        profileData: profileData
                    }
                });
            } catch (err) {
                setErrors({ email: 'Erro de conexão. Verifique sua internet.' });
                console.error('Verification send error:', err);
            } finally {
                setIsLoading(false);
            }
            return;
        }

    };



    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
        else navigateBack('/');
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleGoogleSignup = async () => {
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
                setErrors({ email: error.message });
                setIsLoading(false);
            }
        } catch (err) {
            setErrors({ email: 'Erro ao ligar ao Google.' });
            setIsLoading(false);
        }
    };

    const getButtonText = () => {
        if (isLoading) return step === 2 ? 'A enviar...' : 'Processando...';
        if (step === 2 && isCoolingDown) return `Aguarde ${cooldown}s`;
        if (step === 2) return 'Verificar';
        return 'Continuar';
    };

    return (
        <div className="signup-page-content">
            <div className="signup-glass-container fade-in-up">
                <button className="back-icon-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                </button>

                <div className="signup-header">
                    <h1>Registe-se</h1>
                    <p>Crie a sua conta e descubra os melhores destinos turísticos. Viaje com facilidade.</p>
                </div>

                <div className="signup-form-content">
                    {step === 1 && (
                        <div className="form-step fade-in">
                            <div className="input-field">
                                <User size={18} />
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Nome Completo"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.fullName && <span className="error-msg">{errors.fullName}</span>}

                            <div className="input-field">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Endereço de Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-step fade-in">
                            <div className="input-field">
                                <Globe size={18} />
                                <select
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleNationalityChange}
                                    className="custom-select"
                                >
                                    <option value="">Nacionalidade</option>
                                    {countries.map(c => (
                                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.nationality && <span className="error-msg">{errors.nationality}</span>}

                            <div className="input-field">
                                <Phone size={18} />
                                <span className="prefix">{activeCountry?.dialCode || '+00'}</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Telefone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.phone && <span className="error-msg">{errors.phone}</span>}

                            <div className="input-field date-field">
                                <Calendar size={18} />
                                <div className="date-selects">
                                    <select name="dobDay" value={formData.dobDay} onChange={handleChange}>
                                        <option value="">Dia</option>
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <select name="dobMonth" value={formData.dobMonth} onChange={handleChange}>
                                        <option value="">Mês</option>
                                        {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                    </select>
                                    <select name="dobYear" value={formData.dobYear} onChange={handleChange}>
                                        <option value="">Ano</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                            {errors.dob && <span className="error-msg">{errors.dob}</span>}

                            {/* General error display for step 2 (Supabase errors, rate limit, etc.) */}
                            {errors.email && (
                                <div className="error-msg" style={{ marginTop: '12px', textAlign: 'center', fontSize: '13px' }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="form-step fade-in">
                            <div className="input-field">
                                <Lock size={18} />
                                <input
                                    type={showPasswords ? "text" : "password"}
                                    name="password"
                                    placeholder="Palavra-passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div onClick={() => setShowPasswords(!showPasswords)} className="eye-btn">
                                    {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                            {errors.password && <span className="error-msg">{errors.password}</span>}

                            <div className="input-field">
                                <Lock size={18} />
                                <input
                                    type={showPasswords ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirmar palavra-passe"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}

                            <label className="terms-label">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <span>Li e concordo com os Termos & Condições.</span>
                            </label>
                            {errors.terms && <span className="error-msg">{errors.terms}</span>}
                        </div>
                    )}

                    <button
                        className="signup-main-btn"
                        onClick={handleNext}
                        disabled={isLoading || (step === 2 && isCoolingDown)}
                    >
                        {getButtonText()}
                    </button>

                    {step === 1 && (
                        <div className="social-login-section">
                            <p>Ou continue com</p>
                            <div className="social-row">
                                <button className="social-btn google" onClick={handleGoogleSignup}><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" /></button>
                                <button className="social-btn facebook"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="F" /></button>
                                <button className="social-btn apple"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg" alt="A" /></button>
                            </div>
                        </div>
                    )}

                    <p className="login-link">
                        Já tem conta? <span onClick={() => navigateForward('/login')}>Iniciar sessão</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
