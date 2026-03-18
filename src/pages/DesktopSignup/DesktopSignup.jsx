import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, User, Mail, Globe, Phone, Calendar, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useNavigation } from '../../App';
import { countries } from '../../data/countries';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import authBgNew from '../../assets/images/auth_bg_new.jpg';
// We use the new universal layout format for auth
import '../SharedAuth/SharedAuth.css';
import AuthLeftPanel from '../SharedAuth/AuthLeftPanel';
import AuthTabs from '../SharedAuth/AuthTabs';
import AuthSocialButtons from '../SharedAuth/AuthSocialButtons';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import CountryCodeDropdown from '../../components/CountryCodeDropdown/CountryCodeDropdown';
import SkeletonAuth from '../../components/SkeletonAuth/SkeletonAuth';
import { useLocation } from 'react-router-dom';

const DesktopSignup = ({ onBack, onNavigateLogin }) => {
    const location = useLocation();
    const { navigateForward, navigateBack } = useNavigation();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Extra states for Magic Link / Flow
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_signup_cooldown_desktop');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        nationality: '',
        phone: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        password: '',
        confirmPassword: ''
    });

    const [isOAuthFlow, setIsOAuthFlow] = useState(false);

    useEffect(() => {
        if (location.state?.requireProfileCompletion) {
            setFormData(prev => ({
                ...prev,
                fullName: location.state.fullName || '',
                email: location.state.email || ''
            }));
            setIsOAuthFlow(true);
            setStep(2); // Jump to "Quase lá"
        }
    }, [location.state]);

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [langCode, setLangCode] = useState('PT');
    const [phoneCountry, setPhoneCountry] = useState(null);
    const [phoneDialCode, setPhoneDialCode] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);

    // OTP state
    const [otp, setOtp] = useState(Array(8).fill(''));
    const otpRefs = useRef([]);

    // Fetch user IP country on mount for language + phone code (NOT nationality)
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const countryCode = data.country_code;
                if (countryCode) {
                    setLangCode(countryCode);
                    const found = countries.find(c => c.code === countryCode);
                    if (found) {
                        setPhoneCountry(found);
                        setPhoneDialCode(found.dialCode);
                    }
                }
            })
            .catch(err => console.error("Error fetching IP location:", err));
    }, []);


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

    const checkPhoneValidity = (phoneRaw, dialCode) => {
        if (!phoneRaw) return { isValid: false, error: 'Telefone obrigatório' };

        const cleanPhone = phoneRaw.replace(/\D/g, '');
        if (cleanPhone.length === 0) return { isValid: false, error: 'Telefone obrigatório' };

        const selectedCountry = countries.find(c => c.dialCode === dialCode);
        const countryCodeIso = selectedCountry ? selectedCountry.code : undefined;

        if (countryCodeIso === 'MZ') {
            if (cleanPhone.length !== 9 || !['82', '83', '84', '85', '86', '87'].includes(cleanPhone.substring(0, 2))) {
                return { isValid: false, error: 'Número incorreto' };
            }
            return { isValid: true, error: '' };
        }

        const fullNumber = (dialCode || '') + cleanPhone;
        const phoneNumber = parsePhoneNumberFromString(fullNumber, countryCodeIso);

        if (!phoneNumber || !phoneNumber.isValid()) {
            return { isValid: false, error: 'Número incorreto' };
        }

        return { isValid: true, error: '' };
    };

    const handlePhoneChange = (e) => {
        // Allow only numbers and spaces
        const val = e.target.value.replace(/[^\d\s]/g, '');
        setFormData(prev => ({ ...prev, phone: val }));

        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));

        if (isPhoneTouched) {
            const valRes = checkPhoneValidity(val, phoneDialCode);
            setPhoneError(valRes.error);
        } else if (val.replace(/\D/g, '').length >= 9) {
            // Trigger dynamic validation if enough digits
            const valRes = checkPhoneValidity(val, phoneDialCode);
            if (valRes.isValid) {
                setPhoneError('');
                setIsPhoneTouched(true);
            }
        }
    };

    const handlePhoneBlur = () => {
        setIsPhoneTouched(true);
        const valRes = checkPhoneValidity(formData.phone, phoneDialCode);
        setPhoneError(valRes.error);
    };

    const handleDialCodeChange = (code) => {
        setPhoneDialCode(code);
        if (isPhoneTouched && formData.phone) {
            const valRes = checkPhoneValidity(formData.phone, code);
            setPhoneError(valRes.error);
        }
    };

    const validateStep = (currentStep, explicitOtp = null) => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Nome obrigatório';
            else if (formData.fullName.trim().length < 2) newErrors.fullName = 'Nome deve ter no mínimo 2 caracteres';
            if (!formData.email.trim()) newErrors.email = 'Email obrigatório';
            else if (!isValidEmail(formData.email)) newErrors.email = 'Email inválido';
        }
        if (currentStep === 2) {
            if (!formData.nationality) newErrors.nationality = 'Selecione a nacionalidade';

            const phoneVal = checkPhoneValidity(formData.phone, phoneDialCode);
            if (!phoneVal.isValid) {
                newErrors.phone = phoneVal.error;
                setPhoneError(phoneVal.error);
                setIsPhoneTouched(true);
            }

            if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) newErrors.dob = 'Data de nascimento obrigatória';
        }
        if (currentStep === 3) {
            const currentOtp = explicitOtp ? explicitOtp.join('') : otp.join('');
            if (currentOtp.length < 8) newErrors.otp = 'Insira o código de 8 dígitos completo';
        }
        if (currentStep === 4) {
            if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Senhas não coincidem';
            if (!termsAccepted) newErrors.terms = 'Aceite os termos para continuar';
        }
        return newErrors;
    };

    const handleSkipStep2 = () => {
        const stepErrors = validateStep(2);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        const fullPhone = (phoneDialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');
        const profileData = {
            fullName: formData.fullName,
            nationality: formData.nationality,
            phone: fullPhone,
            dateOfBirth: `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`
        };

        localStorage.setItem('pendingProfileData', JSON.stringify(profileData));
        setStep(4);
    };

    const handleNext = async (explicitOtp) => {
        const stepErrors = validateStep(step, explicitOtp);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        if (step === 1) {
            setIsLoading(true);
            setErrors({});

            try {
                // To accurately check if an email exists without a secure backend RPC, 
                // we attempt a real sign-up with a highly complex temporary password.
                // If they exist, Supabase explicitly returns "User already registered".
                // If they don't, it safely creates an unverified shell user that we immediately
                // send an OTP to in Step 2, and then update with their real password in Step 4.
                const tempPwd = Math.random().toString(36).slice(-8) + 'X9@!';
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email: formData.email.trim(),
                    password: tempPwd
                });

                if (signUpError) {
                    const msg = signUpError.message.toLowerCase();
                    if (msg.includes('already registered') || msg.includes('user already exists')) {
                        setErrors({ email: 'Este email já está registado. Faça login ou recupere a sua conta.' });
                        setIsLoading(false);
                        return;
                    }
                }

                // Supabase security feature: if the email already exists, signUp might SUCCEED 
                // but return a fake user object with an EMPTY identities array to prevent enum attacks.
                if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
                    setErrors({ email: 'Este email já está registado. Faça login ou recupere a sua conta.' });
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Signup check error:", err);
            }

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
                setErrors({ submit: `Aguarde ${cooldown}s antes de tentar novamente.` });
                return;
            }
            setIsLoading(true);
            setErrors({});

            try {
                const fullPhone = (phoneDialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');
                const profileData = {
                    fullName: formData.fullName,
                    nationality: formData.nationality,
                    phone: fullPhone,
                    dateOfBirth: `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`
                };

                // If user is coming from Google OAuth, skip OTP because email is verified
                if (isOAuthFlow) {
                    // Update their profile in Supabase database
                    const { data: sessionData } = await supabase.auth.getSession();
                    if (sessionData?.session?.user) {
                        await supabase.from('profiles').update({
                            phone: fullPhone,
                            nationality: formData.nationality
                        }).eq('id', sessionData.session.user.id);
                    }

                    localStorage.setItem('pendingProfileData', JSON.stringify(profileData));
                    setStep(4);
                    setIsLoading(false);
                    return;
                }

                // Normal OTP Flow ...
                const { error } = await supabase.auth.signInWithOtp({
                    email: formData.email
                });

                if (error) {
                    const msg = error.message || '';
                    if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
                        setErrors({ submit: 'Você tentou muitas vezes. Aguarde alguns minutos e tente novamente.' });
                        startCooldown();
                    } else if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already exists')) {
                        setErrors({ submit: 'Este email já está registado. Faça login ou recupere a sua conta.' });
                    } else {
                        setErrors({ submit: error.message || 'Erro ao enviar verificação. Tente novamente.' });
                    }
                    setIsLoading(false);
                    return;
                }

                startCooldown();
                localStorage.setItem('pendingProfileData', JSON.stringify(profileData));
                setStep(3); // Move to Magic Link Check Email Step
            } catch (err) {
                setErrors({ submit: err.message || 'Erro ao criar conta. Tente novamente.' });
            } finally {
                setIsLoading(false);
            }
        }

        if (step === 3) {
            setIsLoading(true);
            setErrors({});

            try {
                // If called directly from input change, use the passed otp array, else use state
                let code = otp.join('');
                if (explicitOtp && Array.isArray(explicitOtp)) {
                    code = explicitOtp.join('');
                } else if (explicitOtp && typeof explicitOtp === 'string') {
                    code = explicitOtp;
                }

                const { data, error } = await supabase.auth.verifyOtp({
                    email: formData.email,
                    token: code,
                    type: 'signup'
                });

                if (error) {
                    const errorMsg = error.message ? error.message.toLowerCase() : '';
                    const isLimit = errorMsg.includes('rate limit');
                    if (isLimit) {
                        setErrors({ submit: 'Você tentou inúmeras vezes. Volte a tentar mais tarde.' });
                    } else if (errorMsg.includes('expired')) {
                        setErrors({ submit: 'O código expirou. Solicite um novo código.' });
                    } else {
                        setErrors({ submit: 'Código incorreto. Por favor verifique e tente novamente.' });
                    }
                    setIsLoading(false);
                    return;
                }

                // Success! 
                const stored = localStorage.getItem('pendingProfileData');
                const dataToPass = stored ? JSON.parse(stored) : null;

                setStep(4);
            } catch (err) {
                setErrors({ submit: 'Erro interno ao verificar código.' });
            } finally {
                setIsLoading(false);
            }
        }

        if (step === 4) {
            // Password Creation logic
            setIsLoading(true);
            // Simulate saving password
            await new Promise(resolve => setTimeout(resolve, 800));
            setIsLoading(false);
            setStep(5); // Move to Country Selection
        }

        if (step === 5) {
            // Final Select Country Submission
            setIsLoading(true);
            try {
                // Mark registration as complete in Supabase metadata
                await supabase.auth.updateUser({
                    data: { full_signup_completed: true }
                });
                
                // Clear local storage
                localStorage.removeItem('pendingProfileData');
                localStorage.removeItem('signupStep');

                await new Promise(resolve => setTimeout(resolve, 1000));
                navigateForward('/home');
            } catch (err) {
                console.error('Error completing registration:', err);
                navigateForward('/home'); // Still go home if possible
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleBackStep = () => {
        setIsClosing(true);
        setTimeout(() => {
            if (step > 1 && step < 5) {
                setStep(prev => prev - 1);
                setIsClosing(false);
            } else if (step === 1) {
                onBack();
            }
        }, 1500);
    };

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
                setErrors({ submit: error.message });
                setIsLoading(false);
            }
        } catch (err) {
            setErrors({ submit: 'Erro ao ligar ao Google.' });
            setIsLoading(false);
        }
    };

    const handleDiscordSignup = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
                options: {
                    redirectTo: `${window.location.origin}/oauth-callback`,
                },
            });

            if (error) {
                setErrors({ submit: error.message });
                setIsLoading(false);
            }
        } catch (err) {
            setErrors({ submit: 'Erro ao ligar ao Discord.' });
            setIsLoading(false);
        }
    };

    const handleOpenEmail = () => {
        const emailDomain = formData.email.split('@')[1]?.toLowerCase();
        let mailUrl = 'https://mail.google.com';

        if (emailDomain === 'yahoo.com' || emailDomain === 'yahoo.com.br') {
            mailUrl = 'https://mail.yahoo.com';
        } else if (emailDomain === 'outlook.com' || emailDomain === 'hotmail.com' || emailDomain === 'live.com') {
            mailUrl = 'https://outlook.live.com';
        }

        window.open(mailUrl, '_blank');
    };

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
        if (errors.submit) setErrors(prev => ({ ...prev, submit: '' }));

        // Move to next input if value is entered
        if (value && index < 7) {
            otpRefs.current[index + 1].focus();
        }

        // Auto-verify when 8 digits are entered
        const isComplete = newOtp.join('').length === 8;
        if (isComplete && value) {
            // Give React a tick to update the state before submitting
            setTimeout(() => {
                handleNext(newOtp);
            }, 50);
        }
    };

    const handleOtpKeyDown = (index, e) => {
        // Move to previous on Backspace if empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleResendCode = async () => {
        if (isCoolingDown) {
            setErrors({ submit: `Aguarde ${cooldown}s antes de tentar novamente.` });
            return;
        }
        setIsLoading(true);
        setErrors({});

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: formData.email
            });
            if (error) throw error;
            startCooldown();
            // show subtle success message if desired, or let cooldown be the indicator
        } catch (err) {
            setErrors({ submit: 'Erro ao reenviar código. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="form-step fade-in-up">
                        <div className="da-input-group">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Nome Completo"
                                className="da-input"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.fullName && <span className="error-msg-ds">{errors.fullName}</span>}

                        <div className="da-input-group" style={{ marginTop: '20px' }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Endereço de Email"
                                className="da-input"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <span className="error-msg-ds">{errors.email}</span>}

                        <button type="button" className="da-btn-primary" style={{ marginTop: '32px', width: '100%' }} onClick={handleNext} disabled={isLoading || !(formData.fullName.trim().length > 0 && formData.email.trim().length > 0)}>
                            {isLoading ? 'Processing...' : 'Next Step'}
                        </button>
                    </div>
                );
            case 2: {
                const isDialCodeValid = /^\+\d{1,3}$/.test(phoneDialCode);
                return (
                    <div className="form-step fade-in-up">
                        <div className="da-input-group" style={{ zIndex: 100, position: 'relative' }}>
                            <CustomDropdown
                                options={countries}
                                value={formData.nationality}
                                onChange={handleNationalityChange}
                                placeholder="Nacionalidade"
                            />
                        </div>
                        {errors.nationality && <span className="error-msg-ds">{errors.nationality}</span>}

                        <div className="da-input-group" style={{ marginTop: '18px' }}>
                            <div className={`da-input-phone ${phoneError ? 'invalid' : ''}`}>
                                <div className="da-phone-prefix">
                                    <CountryCodeDropdown
                                        value={phoneDialCode}
                                        onChange={handleDialCodeChange}
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Número de telefone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                />
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

                        <button type="button" className="da-btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={() => handleNext()} disabled={isLoading || !(formData.nationality || formData.phone.trim().length > 0 || phoneDialCode.trim().length > 0 || formData.dobDay || formData.dobMonth || formData.dobYear)}>
                            {isLoading ? 'Processing...' : 'Next Step'}
                        </button>

                        <button
                            type="button"
                            onClick={handleSkipStep2}
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
                    </div>
                );
            }
            case 3:
                const isOtpComplete = otp.join('').length === 8;
                return (
                    <div className="form-step fade-in-up">
                        <div className={`dl-otp-container ${isLoading ? 'is-verifying' : ''}`} style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => (otpRefs.current[idx] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                    autoFocus={idx === 0}
                                    className="da-otp-input"
                                />
                            ))}
                        </div>
                        {errors.otp && <span className="error-msg-ds" style={{ textAlign: 'center' }}>{errors.otp}</span>}
                        {errors.submit && <span className="error-msg-ds" style={{ textAlign: 'center' }}>{errors.submit}</span>}

                        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
                            <span
                                className={`dl-link-text ${isCoolingDown ? 'disabled' : ''}`}
                                onClick={!isCoolingDown ? handleResendCode : undefined}
                                style={{ cursor: isCoolingDown ? 'not-allowed' : 'pointer', color: isCoolingDown ? '#9CA3AF' : 'var(--primary)', fontWeight: '500', fontSize: '14px' }}
                            >
                                {isCoolingDown ? `Aguarde ${cooldown}s para reenviar` : "Didn't get a code?"}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="da-btn-primary"
                            style={{ width: '100%' }}
                            onClick={() => handleNext()}
                            disabled={!isOtpComplete || isLoading}
                        >
                            {isLoading ? 'Verificando...' : 'Verify'}
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="form-step fade-in-up">
                        <div className="da-input-group">
                            <input
                                type={showPasswords ? "text" : "password"}
                                name="password"
                                placeholder="Criar palavra-passe"
                                className="da-input dl-input-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="dl-password-toggle"
                                onClick={() => setShowPasswords(!showPasswords)}
                                aria-label={showPasswords ? "Hide password" : "Show password"}
                            >
                                {showPasswords ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.password && <span className="error-msg-ds">{errors.password}</span>}

                        <div className="da-input-group" style={{ marginTop: '20px' }}>
                            <input
                                type={showPasswords ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirmar palavra-passe"
                                className="da-input dl-input-password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="dl-password-toggle"
                                onClick={() => setShowPasswords(!showPasswords)}
                                aria-label={showPasswords ? "Hide password" : "Show password"}
                            >
                                {showPasswords ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="error-msg-ds">{errors.confirmPassword}</span>}

                        <div className="da-form-options" style={{ marginTop: '16px' }}>
                            <label className="da-checkbox-group">
                                <input type="checkbox" className="da-checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); if (errors.terms) setErrors(prev => ({ ...prev, terms: '' })) }} />
                                <span className="da-checkbox-label">Eu concordo com os Termos e Políticas</span>
                            </label>
                        </div>
                        {errors.terms && <span className="error-msg-ds">{errors.terms}</span>}

                        <button type="button" className="da-btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={() => handleNext()} disabled={isLoading || formData.password.length < 6 || !termsAccepted}>
                            {isLoading ? 'Processing...' : 'Next Step'}
                        </button>
                    </div>
                );
            case 5:
                const sortedFiltered = [...countries]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
                return (
                    <div className="form-step fade-in-up">
                        <div style={{ marginBottom: '24px' }}>
                            <input
                                type="text"
                                className="da-glass-search-bar"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="da-country-list-wrapper">
                            <div className="da-country-list-scroll">
                                {sortedFiltered.map(c => (
                                    <div key={c.code} className="da-country-list-item" onClick={handleNext}>
                                        <img src={c.flagUrl} alt={c.code} className="da-country-flag-img" />
                                        <span className="name">{c.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="da-country-list-bottom-bracket"></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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

    return (
        <div className="da-screen-wrapper">
            <div className="da-card-stack">
                <div className="da-card">
                    {/* Left Pane: 3D Illustration & Text + AuthSocialButtons */}
                    <AuthLeftPanel onGoogleClick={step === 1 ? handleGoogleSignup : undefined} onDiscordClick={step === 1 ? handleDiscordSignup : undefined} onBack={handleBackStep} />

                    {/* Right Pane: Form */}
                    <div className="da-right-pane">
                        <AnimatePresence mode="wait">
                            {(step === 1 || step === 2) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <AuthTabs activeTab="register" onLoginClick={onNavigateLogin} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="da-form-content"
                                style={{ marginTop: step === 5 ? '40px' : '0' }}
                            >
                                <h1 className="dl-title">{getTitle()}</h1>

                                {(step === 3 || step === 5) && (
                                    <p className="ds-subtitle" style={{ color: '#A0AAB3', fontSize: '15px', marginBottom: step === 5 ? '24px' : '32px' }}>
                                        {getSubtitle()}
                                    </p>
                                )}

                                <div className="da-form">
                                    {renderStepContent()}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopSignup;
