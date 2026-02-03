import React, { useState } from 'react';
import { User, Mail, Globe, Phone, Calendar, Lock, Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import { countries } from '../../data/countries';
import { useApp } from '../../context/AppContext';
import signupHeaderImg from '../../assets/images/signup_header.png';
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

    const getCurrentCountry = () => countries.find(c => c.code === nationality) || countries[0];
    const activeCountry = getCurrentCountry();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleNationalityChange = (e) => {
        setNationality(e.target.value);
        setFormData(prev => ({ ...prev, nationality: e.target.value }));
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Nome é obrigatório';
            if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
        }

        if (currentStep === 2) {
            if (!formData.nationality) newErrors.nationality = 'Nacionalidade é obrigatória';
            if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
            if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
                newErrors.dob = 'Data de nascimento é obrigatória';
            }
        }

        if (currentStep === 3) {
            if (!formData.password) newErrors.password = 'Senha é obrigatória';
            if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Senhas não coincidem';
            }
            if (!termsAccepted) newErrors.terms = 'Aceite os termos';
        }

        return newErrors;
    };

    const handleNext = () => {
        const stepErrors = validateStep(step);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            if (step < 3) {
                setStep(prev => prev + 1);
            } else {
                handleSubmit();
            }
        }, 2000);
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        } else {
            navigateBack('/');
        }
    };

    const handleSubmit = () => {
        // Validation already done in handleNext
        navigateForward('/otp-verification');
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const getButtonText = () => {
        switch (step) {
            case 1: return 'Continuar';
            case 2: return 'Continuar';
            case 3: return 'Registrar';
            default: return 'Continuar';
        }
    };

    return (
        <div className="signup-page">
            {/* Removed fullScreen Loader as per user request */}

            {/* Header Image */}
            <div className="signup-header-image">
                <img src={signupHeaderImg} alt="Travel" />
                <button className="back-button" onClick={handleBack}>
                    {step > 1 ? <ArrowLeft size={24} color="#fff" /> : <X size={24} color="#fff" />}
                </button>
                <div className="lang-switcher-container">
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Decorative Blurs */}
            <div className="blur-pink"></div>
            <div className="blur-blue"></div>

            {/* Content */}
            <div className="signup-content">
                <h1 className="signup-title">Registe-se Já!</h1>

                {/* Step 1: Name + Email */}
                {step === 1 && (
                    <div className="signup-fields">
                        <div className="signup-input-group">
                            <User className="signup-input-icon" size={18} />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Nome Completo"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="signup-input"
                            />
                        </div>
                        {errors.fullName && <span className="signup-error">{errors.fullName}</span>}

                        <div className="signup-input-group">
                            <Mail className="signup-input-icon" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="signup-input"
                            />
                        </div>
                        {errors.email && <span className="signup-error">{errors.email}</span>}

                        <button
                            type="button"
                            className={`signup-button ${isLoading ? 'btn-loading' : ''}`}
                            onClick={handleNext}
                            disabled={isLoading}
                        >
                            {isLoading ? <div className="btn-spinner"></div> : getButtonText()}
                        </button>

                        <p className="signup-divider">Ou registre-se com</p>
                        <div className="social-icons">
                            <button className="social-circle facebook" onClick={() => { }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                            </button>
                            <button className="social-circle instagram" onClick={() => { }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" />
                            </button>
                            <button className="social-circle google" onClick={() => { }}>
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Nationality + Phone + DOB */}
                {step === 2 && (
                    <div className="signup-fields">
                        <div className="signup-input-group">
                            <Globe className="signup-input-icon" size={18} />
                            <select
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleNationalityChange}
                                className="signup-input signup-select"
                            >
                                <option value="">Nacionalidade</option>
                                {countries.map(c => (
                                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.nationality && <span className="signup-error">{errors.nationality}</span>}

                        <div className="signup-input-group">
                            <Phone className="signup-input-icon" size={18} />
                            <span className="phone-prefix">{activeCountry?.dialCode || '+00'}</span>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                                    setFormData(prev => ({ ...prev, phone: val }));
                                }}
                                className="signup-input"
                                placeholder="000 000 000"
                            />
                        </div>
                        {errors.phone && <span className="signup-error">{errors.phone}</span>}

                        <div className="signup-input-group">
                            <Calendar className="signup-input-icon" size={18} />
                            <div className="dob-row">
                                <select name="dobDay" value={formData.dobDay} onChange={handleChange} className="signup-input dob-select">
                                    <option value="">DD</option>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <select name="dobMonth" value={formData.dobMonth} onChange={handleChange} className="signup-input dob-select">
                                    <option value="">MM</option>
                                    {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                </select>
                                <select name="dobYear" value={formData.dobYear} onChange={handleChange} className="signup-input dob-select">
                                    <option value="">AAAA</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>
                        {errors.dob && <span className="signup-error">{errors.dob}</span>}

                        <button
                            type="button"
                            className={`signup-button ${isLoading ? 'btn-loading' : ''}`}
                            onClick={handleNext}
                            disabled={isLoading}
                        >
                            {isLoading ? <div className="btn-spinner"></div> : getButtonText()}
                        </button>
                    </div>
                )}

                {/* Step 3: Password + Confirm + Terms */}
                {step === 3 && (
                    <div className="signup-fields">
                        <div className="signup-input-group">
                            <Lock className="signup-input-icon" size={18} />
                            <input
                                type={showPasswords ? "text" : "password"}
                                name="password"
                                placeholder="Senha"
                                value={formData.password}
                                onChange={handleChange}
                                className="signup-input"
                            />
                            {(formData.password.length > 0 || formData.confirmPassword.length > 0) && (
                                <button type="button" className="eye-toggle" onClick={() => setShowPasswords(!showPasswords)}>
                                    {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            )}
                        </div>
                        {errors.password && <span className="signup-error">{errors.password}</span>}

                        <div className="signup-input-group">
                            <Lock className="signup-input-icon" size={18} />
                            <input
                                type={showPasswords ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirmar Senha"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="signup-input"
                            />
                        </div>
                        {errors.confirmPassword && <span className="signup-error">{errors.confirmPassword}</span>}

                        <div className="terms-group">
                            <label className="terms-label">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="terms-checkbox"
                                />
                                <span className="terms-checkmark"></span>
                                <span className="terms-text">
                                    Eu concordo com os <a href="#" className="terms-link">Termos & Condições</a>
                                </span>
                            </label>
                            {errors.terms && <span className="signup-error">{errors.terms}</span>}
                        </div>

                        <button
                            type="button"
                            className={`signup-button ${isLoading ? 'btn-loading' : ''}`}
                            onClick={handleNext}
                            disabled={isLoading}
                        >
                            {isLoading ? <div className="btn-spinner"></div> : getButtonText()}
                        </button>
                    </div>
                )}

                <p className="signup-footer">
                    Já tem conta? <span onClick={() => navigateForward('/login')}>Entrar</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
