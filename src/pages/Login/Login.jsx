import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import './Login.css';

const Login = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Preencha todos os campos');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigateForward('/home');
        }, 1500);
    };

    return (
        <div className="login-page-content">
            <div className="login-glass-container fade-in-up">
                <button className="back-icon-btn" onClick={() => navigateBack('/')}>
                    <ArrowLeft size={24} color="#fff" />
                </button>

                <div className="login-header">
                    <h1>Bem-vindo de volta</h1>
                    <p>Entre na sua conta e continue explorando destinos incríveis. A sua próxima viagem começa aqui.</p>
                </div>

                <form className="login-form-content" onSubmit={handleLogin}>
                    <div className="input-field">
                        <Mail size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <Lock size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Palavra-passe"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div onClick={() => setShowPassword(!showPassword)} className="eye-btn">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                    </div>

                    <div className="forgot-password-row">
                        <span onClick={() => navigateForward('/forgot-password')}>Esqueceu a palavra-passe?</span>
                    </div>

                    {error && <p className="error-msg text-center">{error}</p>}

                    <button
                        type="submit"
                        className="login-main-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="social-login-section">
                    <p>Ou continue com</p>
                    <div className="social-row">
                        <button className="social-btn google"><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" /></button>
                        <button className="social-btn facebook"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="F" /></button>
                        <button className="social-btn apple"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg" alt="A" /></button>
                    </div>
                </div>

                <p className="signup-link">
                    Ainda não tem conta? <span onClick={() => navigateForward('/signup')}>Registe-se</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
