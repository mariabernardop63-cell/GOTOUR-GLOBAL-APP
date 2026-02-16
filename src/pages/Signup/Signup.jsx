import React, { useState } from 'react';
import { User, Mail, Globe, Phone, Calendar, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import { countries } from '../../data/countries';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import './Signup.css';

const Signup = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const { nationality, setNationality } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showPasswords, setShowPasswords] = useState(false);

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
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

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

        // ========== MOBILE FLOW (Supabase OTP) ==========
        if (isMobile) {
            if (step === 1) {
                setStep(2);
                return;
            }

            if (step === 2) {
                setIsLoading(true);
                setErrors({});
                try {
                    // Build full phone with dial code
                    const fullPhone = (activeCountry?.dialCode || '') + formData.phone.replace(/[\s\-\(\)]/g, '');

                    // Send OTP via Supabase
                    const { error } = await supabase.auth.signInWithOtp({
                        phone: fullPhone
                    });

                    if (error) {
                        setErrors({ phone: error.message || 'Erro ao enviar OTP. Tente novamente.' });
                        setIsLoading(false);
                        return;
                    }

                    // Navigate to OTP verification with data
                    navigateForward('/otp-verification', {
                        state: {
                            phone: fullPhone,
                            flow: 'signup-mobile',
                            profileData: {
                                fullName: formData.fullName,
                                nationality: formData.nationality,
                                phone: fullPhone,
                                dateOfBirth: formData.dobYear && formData.dobMonth && formData.dobDay
                                    ? `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`
                                    : null
                            }
                        }
                    });
                } catch (err) {
                    setErrors({ phone: 'Erro de conexão. Verifique sua internet.' });
                    console.error('OTP send error:', err);
                } finally {
                    setIsLoading(false);
                }
                return;
            }
        }

        // ========== DESKTOP FLOW (unchanged mock) ==========
        if (step === 2 && !isMobile) {
            // Desktop: Email Confirmation flow (stays the same)
            if (step < 3) {
                setStep(prev => prev + 1);
            }
            return;
        }

        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            // Desktop step 3: mock submit
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                navigateForward('/select-country', { state: { email: formData.email } });
            }, 1500);
        }
    };

    // Handle return from Email Confirmation on mobile (legacy)
    React.useEffect(() => {
        if (location.state?.returnStep === 3 && location.state?.formData) {
            setFormData(prev => ({ ...prev, ...location.state.formData }));
            setStep(3);
        }
    }, [location.state]);

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
        else navigateBack('/');
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const getButtonText = () => {
        if (isLoading) {
            return isMobile && step === 2 ? 'Enviando OTP...' : 'Processando...';
        }
        if (isMobile && step === 2) return 'Enviar Código';
        return step === 3 ? 'Criar Conta' : 'Continuar';
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
                        disabled={isLoading}
                    >
                        {getButtonText()}
                    </button>

                    {step === 1 && (
                        <div className="social-login-section">
                            <p>Ou continue com</p>
                            <div className="social-row">
                                <button className="social-btn google"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" /></button>
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
