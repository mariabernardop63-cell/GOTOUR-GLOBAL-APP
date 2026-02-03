import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { useNavigation } from '../../App';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import loginHeaderImg from '../../assets/images/login_header_hd.png';
import './Login.css';

const Login = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            console.log('Logged in:', formData, 'Remember:', rememberMe);
            alert("Login Successful! (Mock)");
        }, 2000);
    };

    return (
        <div className="login-page">
            {/* Decorative Blurs */}
            <div className="blur-pink"></div>
            <div className="blur-blue"></div>

            {/* Header Image */}
            <div className="login-header-image">
                <img src={loginHeaderImg} alt="Travel" />
                <button className="back-button" onClick={() => navigateBack('/')}>
                    <X size={24} color="#fff" />
                </button>
                <div className="lang-switcher-container">
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Card Content */}
            <div className="login-content">
                <h1 className="login-title">Iniciar Sessão</h1>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-input-group">
                        <Mail className="login-input-icon" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email/Telefone"
                            value={formData.email}
                            onChange={handleChange}
                            className="login-input"
                        />
                    </div>

                    <div className="login-input-group">
                        <Lock className="login-input-icon" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            className="login-input"
                        />
                        <div
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {formData.password.length > 0 && (
                                showPassword ? <EyeOff size={18} /> : <Eye size={18} />
                            )}
                        </div>
                    </div>

                    <div className="login-options">
                        <label className="login-remember">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Lembrar-me</span>
                        </label>
                        <span
                            className="login-forgot"
                            onClick={() => navigateForward('/forgot-password')}
                        >
                            Esqueci a Senha?
                        </span>
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <button
                        type="submit"
                        className={`login-button ${isLoading ? 'btn-loading' : ''}`}
                        disabled={isLoading}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '52px' }}
                    >
                        {isLoading ? <div className="btn-spinner"></div> : "Login"}
                    </button>
                </form>

                <p className="login-divider">Ou faça login com</p>

                <div className="login-social">
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

                <p className="login-footer">
                    Não tem conta? <span onClick={() => navigateForward('/signup')}>Registre-se</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
