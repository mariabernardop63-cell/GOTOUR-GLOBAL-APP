import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, User, Mail, Globe, Phone, Calendar, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useNavigation } from '../../App';
import { countries } from '../../data/countries';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import exploreMundoLocal from '../../assets/images/explore_mundo.jpg';
// We import login css for the left pane layout, and signup css for the right pane form
import '../DesktopLogin/DesktopLogin.css';
import './DesktopSignup.css';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import CountryCodeDropdown from '../../components/CountryCodeDropdown/CountryCodeDropdown';
import SkeletonAuth from '../../components/SkeletonAuth/SkeletonAuth';

const DesktopSignup = ({ onBack, onNavigateLogin }) => {
    const location = useLocation();
    const { navigateForward, navigateBack } = useNavigation();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

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

            const phoneVal = checkPhoneValidity(formData.phone, phoneDialCode);
            if (!phoneVal.isValid) {
                newErrors.phone = phoneVal.error;
                setPhoneError(phoneVal.error);
                setIsPhoneTouched(true);
            }

            if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) newErrors.dob = 'Data de nascimento obrigatória';
        }
        if (currentStep === 3) {
            if (otp.join('').length < 8) newErrors.otp = 'Insira o código de 8 dígitos completo';
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
        navigateForward('/create-password', {
            state: {
                email: formData.email,
                flow: 'signup-test-bypass',
                profileData: profileData
            }
        });
    };

    const handleNext = async (explicitOtp) => {
        const stepErrors = validateStep(step);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        if (step === 1) {
            setIsLoading(true);
            setErrors({});

            try {
                // Check if email already exists using OTP with shouldCreateUser: false
                // If user exists, Supabase will send OTP successfully (no error)
                // If user does NOT exist, Supabase will return an error
                const { error: checkError } = await supabase.auth.signInWithOtp({
                    email: formData.email.trim(),
                    options: { shouldCreateUser: false }
                });

                if (!checkError) {
                    // No error = user EXISTS (OTP was sent successfully)
                    // Sign them out to clear any session
                    await supabase.auth.signOut();
                    setErrors({ email: 'Este email já está registado. Faça login ou recupere a sua conta.' });
                    setIsLoading(false);
                    return;
                }

                // Error means user does NOT exist - they can proceed with registration
                // (error is usually "Signups not allowed for otp" or "User not found")
            } catch (err) {
                // Network error - let them proceed anyway
                console.error('Email check error:', err);
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
                    type: 'email'
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

                navigateForward('/create-password', {
                    state: {
                        email: formData.email,
                        flow: 'signup-test-bypass',
                        profileData: dataToPass
                    }
                });
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
            await new Promise(resolve => setTimeout(resolve, 2000));
            onBack(); // Simulate redirect to Home
            setIsLoading(false);
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
                        <div className="dl-input-group">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Nome Completo"
                                className={`dl-input${formData.fullName ? ' has-value' : ''}`}
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <label className="dl-floating-label">Nome Completo</label>
                        </div>
                        {errors.fullName && <span className="error-msg-ds">{errors.fullName}</span>}

                        <div className="dl-input-group" style={{ marginTop: '18px' }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Endereço de Email"
                                className={`dl-input${formData.email ? ' has-value' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label className="dl-floating-label">Endereço de Email</label>
                        </div>
                        {errors.email && <span className="error-msg-ds">{errors.email}</span>}

                        <button type="button" className={`dl-submit-btn ${(formData.fullName.trim().length > 0 || formData.email.trim().length > 0) ? 'is-active' : ''}`} style={{ marginTop: '24px' }} onClick={handleNext} disabled={isLoading}>
                            {isLoading ? 'Processando...' : 'Próximo'}
                        </button>
                    </div>
                );
            case 2: {
                const isDialCodeValid = /^\+\d{1,3}$/.test(phoneDialCode);
                return (
                    <div className="form-step fade-in-up">
                        <div className="dl-input-group" style={{ zIndex: 100, position: 'relative' }}>
                            <CustomDropdown
                                options={countries}
                                value={formData.nationality}
                                onChange={handleNationalityChange}
                                placeholder="Nacionalidade"
                            />
                        </div>
                        {errors.nationality && <span className="error-msg-ds">{errors.nationality}</span>}

                        <div className="dl-input-group" style={{ marginTop: '18px' }}>
                            <div className={`ds-phone-container ${phoneError ? 'invalid' : (isPhoneTouched && !phoneError && formData.phone.length > 0 ? 'valid' : '')}`}>
                                {/* Country Selector Component */}
                                <CountryCodeDropdown
                                    value={phoneDialCode}
                                    onChange={handleDialCodeChange}
                                />

                                {/* Divider */}
                                <div className="ds-phone-divider"></div>

                                {/* Phone Input */}
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Número de telefone"
                                    className="ds-phone-input"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    onBlur={handlePhoneBlur}
                                />
                            </div>
                        </div>
                        {(errors.phone || phoneError) && <span className="error-msg-ds">{errors.phone || phoneError}</span>}

                        <div className="dl-input-group" style={{ marginTop: '18px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <select name="dobDay" className="dl-input" value={formData.dobDay} onChange={handleChange}>
                                        <option value="">Dia</option>
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <label className="dl-floating-label">Dia</label>
                                </div>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <select name="dobMonth" className="dl-input" value={formData.dobMonth} onChange={handleChange}>
                                        <option value="">Mês</option>
                                        {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                    </select>
                                    <label className="dl-floating-label">Mês</label>
                                </div>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <select name="dobYear" className="dl-input" value={formData.dobYear} onChange={handleChange}>
                                        <option value="">Ano</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    <label className="dl-floating-label">Ano</label>
                                </div>
                            </div>
                        </div>
                        {errors.dob && <span className="error-msg-ds">{errors.dob}</span>}

                        {errors.submit && <span className="error-msg-ds" style={{ marginTop: '8px', display: 'block' }}>{errors.submit}</span>}

                        <button type="button" className={`dl-submit-btn ${(formData.nationality || formData.phone.trim().length > 0 || phoneDialCode.trim().length > 0 || formData.dobDay || formData.dobMonth || formData.dobYear) ? 'is-active' : ''}`} style={{ marginTop: '24px' }} onClick={handleNext} disabled={isLoading}>
                            {isLoading ? 'Processando...' : 'Próximo'}
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
                                    className={`dl-otp-input ${digit ? 'has-value' : ''}`}
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
                            className={`dl-submit-btn ${isOtpComplete ? 'is-active' : ''}`}
                            onClick={() => handleNext()}
                            disabled={!isOtpComplete || isLoading}
                        >
                            {isLoading ? 'Verificando...' : 'Verify'}
                        </button>
                    </div>
                );
            case 4:
                return null; // Step 4 logic moved to DesktopCreatePassword
            case 5:
                return (
                    <div className="form-step fade-in-up" style={{ textAlign: 'center' }}>
                        <Globe size={48} color="var(--primary)" style={{ margin: '0 auto 24px auto', opacity: 0.9 }} />
                        <p style={{ color: '#5F6368', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' }}>
                            Qual país gostaria de explorar primeiro?
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                            {countries.slice(0, 4).map(c => (
                                <div key={c.code} style={{
                                    padding: '16px', border: '1px solid #E5E7EB', borderRadius: '12px',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                                    transition: 'all 0.2s'
                                }} className="hover-scale">
                                    <span style={{ fontSize: '24px' }}>{c.flag}</span>
                                    <span style={{ fontWeight: '500', color: '#202124' }}>{c.name}</span>
                                </div>
                            ))}
                        </div>

                        <button type="button" className="dl-submit-btn is-active" onClick={handleNext} disabled={isLoading}>
                            {isLoading ? 'A preparar Dashboard...' : 'Concluir e Explorar'}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    const getTitle = () => {
        if (step === 1) return 'Crie sua Conta';
        if (step === 2) return 'Quase lá';
        if (step === 3) return 'Enter your verification code';
        if (step === 4) return 'Segurança';
        if (step === 5) return 'Escolha um País';
        return 'Bem-vindo';
    };

    const getSubtitle = () => {
        if (step === 1) return 'Preencha seus dados básicos para começar.';
        if (step === 2) return 'Precisamos de mais detalhes para sua experiência.';
        if (step === 3) return 'Please enter the 8-digit code sent to your email.';
        if (step === 4) return 'Crie uma palavra-passe forte para proteger sua conta.';
        if (step === 5) return '';
        return '';
    };

    return (
        <div className="desktop-login-container desktop-signup-container">
            {/* Left Image Pane: 35% Width (Reused from DL) */}
            <div className="dl-left-pane">
                {/* Back Button */}
                <button className={`dl-back-button ${isClosing ? 'is-closing' : ''}`} onClick={handleBackStep} aria-label="Voltar">
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
                    src={exploreMundoLocal}
                    alt="Explore o mundo como um local"
                    className={`dl-cover-image ${imageLoaded ? 'content-fade-in' : ''}`}
                    onLoad={() => setImageLoaded(true)}
                    fetchpriority="high"
                    style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
                />
            </div>

            {/* Right Content Pane: 65% Width */}
            <div className="dl-right-pane" style={step === 3 ? { paddingLeft: 0, justifyContent: 'center' } : {}}>
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
                    <div className="dl-form-section" style={step === 3 ? { margin: '0 auto' } : {}}>
                        <h1 className="dl-title" style={step === 3 ? { textAlign: 'center' } : {}}>{getTitle()}</h1>

                        {step === 3 && (
                            <p className="ds-subtitle" style={{ color: '#5F6368', fontSize: '15px', marginBottom: '32px', textAlign: 'center' }}>
                                {getSubtitle()}
                            </p>
                        )}

                        {/* Dynamic Step Content */}
                        <div className="dl-form">
                            {renderStepContent()}
                        </div>

                        {step === 1 && (
                            <div className="dl-social-section">
                                <div className="dl-divider">
                                    <div className="dl-divider-line"></div>
                                    <div className="dl-divider-text">ou continuar com</div>
                                    <div className="dl-divider-line"></div>
                                </div>
                                <div className="dl-social-row">
                                    {/* Google */}
                                    <button className="dl-social-icon-btn" onClick={handleGoogleSignup} aria-label="Continuar com Google">
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
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DesktopSignup;
