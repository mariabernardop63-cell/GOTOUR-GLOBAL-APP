import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigation } from '../../App';
import { supabase } from '../../lib/supabase';
import './LoginForm.css';

const LoginForm = ({ onSuccess, onForgotPassword }) => {
    const { navigateForward } = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Validation helpers
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Preencha todos os campos');
            return;
        }

        if (!isValidEmail(formData.email)) {
            setError('Email inválido');
            return;
        }

        setIsLoading(true);

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            });

            if (loginError) {
                const msg = loginError.message || '';

                if (msg.includes('Invalid login credentials')) {
                    setError('Email ou palavra-passe incorretos. Verifique os seus dados ou crie uma nova conta.');
                } else if (msg.includes('Email not confirmed')) {
                    setError('O seu email ainda não foi confirmado. Verifique a sua caixa de entrada.');
                } else {
                    setError(loginError.message || 'Não foi possível iniciar sessão. Tente novamente.');
                }
                setIsLoading(false);
                return;
            }

            // Success
            if (onSuccess) {
                onSuccess();
            } else {
                navigateForward('/home');
            }
        } catch (err) {
            setError('Erro de conexão. Verifique a sua ligação à internet.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="login-form-content" onSubmit={handleLogin}>
            <div className="input-field">
                <Mail size={18} />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
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
                    disabled={isLoading}
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="forgot-password-link">
                <button type="button" onClick={onForgotPassword || (() => navigateForward('/forgot-password'))}>
                    Esqueceu a palavra-passe?
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? <span className="btn-loader"></span> : 'Entrar'}
            </button>
        </form>
    );
};

export default LoginForm;
