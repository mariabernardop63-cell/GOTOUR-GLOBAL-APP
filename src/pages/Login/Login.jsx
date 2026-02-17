import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

const Login = () => {
    const { navigateForward, navigateBack } = useNavigation();

    return (
        <div className="login-page-content">
            <div className="login-glass-container fade-in-up">
                <button className="back-icon-btn" onClick={() => navigateBack('/')}>
                    <ArrowLeft size={24} />
                </button>

                <div className="login-header">
                    <h1>Bem-vindo de volta</h1>
                    <p>Entre na sua conta e continue explorando destinos incríveis. A sua próxima viagem começa aqui.</p>
                </div>

                <div style={{ width: '100%' }}>
                    <LoginForm
                        onSuccess={() => navigateForward('/home')}
                        onForgotPassword={() => navigateForward('/forgot-password')}
                    />
                </div>

                <div className="social-login-section">
                    <p>Ou continue com</p>
                    <div className="social-row">
                        <button className="social-btn">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                        </button>
                        <button className="social-btn">
                            <svg viewBox="0 0 24 24" fill="black" width="22" height="22">
                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                            </svg>
                        </button>
                        <button className="social-btn">
                            <svg viewBox="0 0 24 24" fill="#1877F2" width="22" height="22">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="signup-link">
                    Não tem uma conta?
                    <span onClick={() => navigateForward('/signup')}>Registar-se</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
