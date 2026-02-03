import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import loginHeaderImg from '../../assets/images/login_header.jpg';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

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

        // Mock login API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Logged in:', formData, 'Remember:', rememberMe);
            alert("Login Successful! (Mock)");
        }, 1500);
    };

    return (
        <div className="login-page">
            {isLoading && <LoadingSpinner fullScreen text="Entrando..." />}

            <div className="login-card">
                {/* Header Image */}
                <div className="login-header-image">
                    <img src={loginHeaderImg} alt="Travel" />
                </div>

                {/* Welcome */}
                <h1 className="login-title">Seja Bem-vindo(a)!</h1>

                {/* Form */}
                <form className="login-form" onSubmit={handleLogin}>
                    {/* Email Input */}
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

                    {/* Password Input */}
                    <div className="login-input-group">
                        <Lock className="login-input-icon" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="login-input"
                        />
                    </div>

                    {/* Options Row */}
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
                            onClick={() => navigate('/forgot-password')}
                        >
                            Esqueci a Senha?
                        </span>
                    </div>

                    {/* Error Message */}
                    {error && <p className="login-error">{error}</p>}

                    {/* Submit Button */}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                {/* Divider */}
                <p className="login-divider">Ou faça login com</p>

                {/* Social Icons */}
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

                {/* Footer */}
                <p className="login-footer">
                    Não tem conta? <span onClick={() => navigate('/signup')}>Registre-se</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
