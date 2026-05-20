import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import DesktopCreatePassword from '../DesktopCreatePassword/DesktopCreatePassword';
import './CreatePassword.css';

const CreatePassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();

    // Profile data may come from location state OR localStorage (after redirect)
    const [profileData, setProfileData] = useState(location.state?.profileData || {});

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isReady, setIsReady] = useState(false);

    // Responsive check
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 1024);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine if this is a signup flow or forgot password flow
    const isSignup = Object.keys(profileData).length > 0;

    // On mount: recover profile data from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('pendingProfileData');
        if (stored && Object.keys(profileData).length === 0) {
            try {
                const parsed = JSON.parse(stored);
                setProfileData(parsed);
            } catch (e) {
                console.error('Failed to parse pendingProfileData:', e);
            }
        }

        // Check that user is authenticated
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsReady(true);
            } else {
                setTimeout(async () => {
                    const { data: { session: retrySession } } = await supabase.auth.getSession();
                    setIsReady(true);
                }, 2000);
            }
        };
        checkSession();
    }, []);

    // Password validation
    const hasMinLength = password.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(password);
    const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
    const isValid = hasMinLength && hasLetter && passwordsMatch;

    const handleSave = async () => {
        setError('');

        if (!hasMinLength || !hasLetter) {
            setError('A palavra-passe deve ter no mínimo 6 caracteres e incluir uma letra');
            return;
        }
        if (!passwordsMatch) {
            setError('As palavras-passe não coincidem');
            return;
        }

        setIsLoading(true);

        try {
            // Test User Bypass
            if (location.state?.email === '111111111111') {
                setTimeout(() => {
                    localStorage.removeItem('pendingProfileData');
                    setIsLoading(false);
                    const hasProfile = Object.keys(profileData).length > 0;
                    navigateForward(hasProfile ? '/select-country' : '/home');
                }, 1000);
                return;
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) {
                setError(updateError.message || 'Erro ao guardar a palavra-passe');
                setIsLoading(false);
                return;
            }

            // Save profile data if available (only for signup)
            if (profileData && Object.keys(profileData).length > 0) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .upsert({
                            id: user.id,
                            full_name: profileData.fullName || null,
                            nationality: profileData.nationality || null,
                            phone: profileData.phone || user.phone || null,
                            date_of_birth: profileData.dateOfBirth || null,
                            created_at: new Date().toISOString()
                        });

                    if (profileError) {
                        console.error('Profile save error:', profileError);
                    }
                }

                localStorage.removeItem('pendingProfileData');
            }

            // Redirect based on flow
            const hasProfile = Object.keys(profileData).length > 0;
            navigateForward(hasProfile ? '/select-country' : '/home');
        } catch (err) {
            setError('Ocorreu um erro inesperado. Tente novamente.');
            console.error('Create password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Dynamic header and button text based on flow
    const headerTitle = isSignup ? 'Crie a sua palavra-passe' : 'Redefinir palavra-passe';
    const headerDesc = isSignup
        ? 'Escolha uma palavra-passe segura para proteger a sua conta GoTour.'
        : 'Introduza a sua nova palavra-passe para recuperar o acesso à sua conta.';
    const buttonText = isSignup ? 'Registar' : 'Alterar Senha';

    if (!isMobile) {
        return <DesktopCreatePassword />;
    }

    return (
        <div className="create-pwd-container fade-in-up">
            <button className="create-pwd-back-btn" onClick={() => navigateBack()}>
                <ArrowLeft size={24} />
            </button>

            <div className="create-pwd-header">
                <h1>Criar nova senha</h1>
                <p>Crie uma senha forte e segura para proteger a sua conta GoTour.</p>
            </div>

            <div className="create-pwd-form">
                {/* Password */}
                <div className="create-pwd-field">
                    <Lock size={18} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nova palavra-passe"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    />
                    <div className="create-pwd-eye" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="create-pwd-field">
                    <Lock size={18} />
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Confirmar palavra-passe"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                    />
                    <div className="create-pwd-eye" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                </div>

                {error && <p className="create-pwd-error">{error}</p>}

                <button
                    className={`create-pwd-btn ${password.length >= 1 ? 'has-input' : ''}`}
                    style={password.length >= 1 ? { backgroundColor: '#000000', color: '#FFFFFF' } : {}}
                    onClick={handleSave}
                    disabled={!isValid || isLoading}
                >
                    {isLoading ? 'A processar...' : buttonText}
                </button>
            </div>
        </div>
    );
};

export default CreatePassword;
