import React, { useState } from 'react';
import { User, Mail, Globe, Phone, Calendar, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigation } from '../../App';
import { countries } from '../../data/countries';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import useCooldown from '../../hooks/useCooldown';
import '../LoginForm/LoginForm.css';
import './SignupForm.css';

const SignupForm = ({ onLoginClick }) => {
    const { navigateForward } = useNavigation();
    const { nationality, setNationality } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showPasswords, setShowPasswords] = useState(false);
    const { cooldown, startCooldown, isCoolingDown } = useCooldown('gotour_signup_cooldown');

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

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email === '111111111111';
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

        // Use Supabase magic link flow (same as mobile)
        if (step === 1) {
            setStep(2);
            return;
        }

        if (step === 2) {
            const fullPhone = (activeCountry?.dialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');
            const profileData = {
                fullName: formData.fullName,
                nationality: formData.nationality,
                phone: fullPhone,
                dateOfBirth: formData.dobYear && formData.dobMonth && formData.dobDay
                    ? `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`
                    : null
            };

            // Test User Bypass
            if (formData.email === '111111111111') {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                    localStorage.setItem('pendingProfileData', JSON.stringify(profileData));
                    navigateForward('/create-password', {
                        state: {
                            email: formData.email,
                            flow: 'signup-test-bypass',
                            profileData: profileData
                        }
                    });
                }, 1000);
                return;
            }

            if (isCoolingDown) {
                setErrors({ email: `Aguarde ${cooldown}s antes de tentar novamente.` });
                return;
            }
            setIsLoading(true);
            setErrors({});
            try {
                const redirectUrl = window.location.origin + '/create-password';
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
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const getButtonText = () => {
        if (isLoading) return step === 2 ? 'A enviar...' : 'Processando...';
        if (step === 2 && isCoolingDown) return `Aguarde ${cooldown}s`;
        if (step === 2) return 'Verificar';
        return 'Continuar';
    };

    return (
        <div className="signup-form-panel">
            {/* Step indicator */}
            <div className="signup-steps-indicator">
                {[1, 2].map(s => (
                    <div key={s} className={`step-dot ${step >= s ? 'active' : ''}`} />
                ))}
            </div>

            {step > 1 && (
                <button className="signup-form-back" onClick={handleBack}>
                    ← Voltar ao passo anterior
                </button>
            )}

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
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}

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
                    {errors.email && <span className="error-message">{errors.email}</span>}
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
                    {errors.nationality && <span className="error-message">{errors.nationality}</span>}

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
                    {errors.phone && <span className="error-message">{errors.phone}</span>}

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
                    {errors.dob && <span className="error-message">{errors.dob}</span>}

                    {errors.email && (
                        <div className="error-message" style={{ marginTop: '12px', textAlign: 'center' }}>
                            {errors.email}
                        </div>
                    )}
                </div>
            )}

            <button
                className="login-btn"
                onClick={handleNext}
                disabled={isLoading || (step === 2 && isCoolingDown)}
            >
                {getButtonText()}
            </button>

            {step === 1 && onLoginClick && (
                <p className="signup-login-link">
                    Já tem conta? <button onClick={onLoginClick}>Iniciar sessão</button>
                </p>
            )}
        </div>
    );
};

export default SignupForm;
