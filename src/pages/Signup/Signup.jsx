import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { countries } from '../../data/countries';
import { useApp } from '../../context/AppContext';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { nationality, setNationality } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [showPasswords, setShowPasswords] = useState(false); // Single toggle for both passwords

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
        if (step < 3) {
            setStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        } else {
            navigate('/');
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/otp-verification', { state: { email: formData.email } });
        }, 2000);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const getStepTitle = () => {
        switch (step) {
            case 1: return <>Junte-se à<br />Comunidade</>;
            case 2: return <>Informações<br />Pessoais</>;
            case 3: return <>Crie sua<br />Senha</>;
            default: return '';
        }
    };

    return (
        <div className="signup-page">
            {isLoading && <LoadingSpinner fullScreen text="Criando conta..." />}

            {/* Decorative Blurs */}
            <div className="blur-pink"></div>
            <div className="blur-blue"></div>

            {/* Back Arrow (visible on steps 2-3) */}
            {step > 1 && (
                <button className="back-arrow" onClick={handleBack}>
                    <ArrowLeft size={20} />
                </button>
            )}

            {/* Title */}
            <h1 className="signup-title">{getStepTitle()}</h1>

            {/* Step 1: Name + Email */}
            {step === 1 && (
                <div className="signup-fields">
                    <div className="signup-input-group">
                        <span className="signup-label">Nome</span>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        <div className="signup-line"></div>
                        {errors.fullName && <span className="signup-error">{errors.fullName}</span>}
                    </div>
                    <div className="signup-input-group">
                        <span className="signup-label">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="signup-input"
                        />
                        <div className="signup-line"></div>
                        {errors.email && <span className="signup-error">{errors.email}</span>}
                    </div>

                    {/* Social Login */}
                    <div className="social-section">
                        <p className="social-divider">Ou registre-se com</p>
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
                </div>
            )}

            {/* Step 2: Nationality + Phone + DOB */}
            {step === 2 && (
                <div className="signup-fields">
                    <div className="signup-input-group">
                        <span className="signup-label">Nacionalidade</span>
                        <select
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleNationalityChange}
                            className="signup-input signup-select"
                        >
                            <option value="">Selecione...</option>
                            {countries.map(c => (
                                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                            ))}
                        </select>
                        <div className="signup-line"></div>
                        {errors.nationality && <span className="signup-error">{errors.nationality}</span>}
                    </div>
                    <div className="signup-input-group">
                        <span className="signup-label">Telefone</span>
                        <div className="phone-row">
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
                        <div className="signup-line"></div>
                        {errors.phone && <span className="signup-error">{errors.phone}</span>}
                    </div>
                    <div className="signup-input-group">
                        <span className="signup-label">Data de Nascimento</span>
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
                        <div className="signup-line"></div>
                        {errors.dob && <span className="signup-error">{errors.dob}</span>}
                    </div>
                </div>
            )}

            {/* Step 3: Password + Confirm + Terms */}
            {step === 3 && (
                <div className="signup-fields">
                    <div className="signup-input-group">
                        <span className="signup-label">Senha</span>
                        <div className="password-row">
                            <input
                                type={showPasswords ? "text" : "password"}
                                name="password"
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
                        <div className="signup-line"></div>
                        {errors.password && <span className="signup-error">{errors.password}</span>}
                    </div>
                    <div className="signup-input-group">
                        <span className="signup-label">Confirmar Senha</span>
                        <div className="password-row">
                            <input
                                type={showPasswords ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="signup-input"
                            />
                        </div>
                        <div className="signup-line"></div>
                        {errors.confirmPassword && <span className="signup-error">{errors.confirmPassword}</span>}
                    </div>
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
                </div>
            )}

            {/* Next Arrow Button */}
            <button className="next-arrow" onClick={handleNext}>
                <ArrowRight size={24} />
            </button>

            {/* Footer */}
            <p className="signup-footer">
                Já tem conta? <span onClick={() => navigate('/login')}>Entrar</span>
            </p>
        </div>
    );
};

export default Signup;
