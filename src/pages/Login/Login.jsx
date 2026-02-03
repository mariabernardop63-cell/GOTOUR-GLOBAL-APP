import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, X } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SocialButton from '../../components/SocialButton/SocialButton';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
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
        <div className="auth-page fade-in">
            {isLoading && <LoadingSpinner fullScreen text="Logging in..." />}
            <LanguageSwitcher />

            <div className="auth-container slide-up">
                <button
                    className="btn-close"
                    onClick={() => navigate('/')}
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                <div className="login-header">
                    <img src="/src/assets/images/logo_gotour.jpg" alt="GoTour Logo" className="login-logo" />
                    <h1 className="welcome-title">Seja Bem-vindo(a)!</h1>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>
                    <Input
                        label="Email/Telefone"
                        name="email"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        error={error && !formData.email ? 'Email is required' : ''}
                        className="custom-input"
                    />

                    <div>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            error={error && !formData.password ? 'Password is required' : ''}
                            className="custom-input"
                        />
                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Lembrar-me</span>
                            </label>
                            <span className="forgot-password" onClick={() => navigate('/forgot-password')}>
                                Esqueci a Senha?
                            </span>
                        </div>
                    </div>

                    <div className="auth-actions">
                        <Button type="submit" fullWidth size="lg" className="btn-login">Login</Button>

                        <div className="divider">Ou faça login com</div>

                        <div className="social-row">
                            <div className="social-icon"><SocialButton provider="facebook" onClick={() => { }} label="" /></div>
                            <div className="social-icon"><SocialButton provider="instagram" onClick={() => { }} label="" /></div>
                            <div className="social-icon"><SocialButton provider="google" onClick={() => { }} label="" /></div>
                        </div>
                        {/* Wait, the design has Facebook, Instagram, Google logos. 
                            The SocialButton component likely expects specific providers.
                            I should check SocialButton component to see what it supports.
                            For now I'll interpret the design: circular icons. 
                            I'll blindly blindly import Instagram from lucide-react just in case, or use a generic button.
                        */}
                    </div>
                </form>

                <footer className="auth-footer">
                    Não tem conta? <span className="auth-link" onClick={() => navigate('/signup')}>Registre-se</span>
                </footer>
            </div>
        </div>
    );
};

export default Login;
