import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import authBgNew from '../../assets/images/auth_bg_new.jpg';
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown';
import { countries } from '../../data/countries';
import '../SharedAuth/SharedAuth.css';
import AuthLeftPanel from '../SharedAuth/AuthLeftPanel';
import PreparingScreen from '../../components/PreparingScreen/PreparingScreen';

const DesktopCreatePassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();

    // Profile data may come from location state OR localStorage (after redirect)
    const [profileData, setProfileData] = useState(location.state?.profileData || {});

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [showPreparing, setShowPreparing] = useState(false);

    // Default to true manually if we want to show terms for signup flow
    // A simplistic check: if profileData has keys, it's a signup flow
    // Strict check for password reset to override stale local storage data
    const isPasswordReset = location.state?.flow === 'password-reset-verified';
    // Only treat it as signup if we explicitly didn't arrive via password reset
    const isSignup = Object.keys(profileData).length > 0 && !isPasswordReset;

    const handlePreparingComplete = useCallback(() => {
        navigateForward(isSignup ? '/select-country' : '/home');
    }, [navigateForward, isSignup]);

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

        // Check that user is authenticated by the magic link
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

    const handleSave = async () => {
        setError('');

        const hasLetter = /[a-zA-Z]/.test(password);
        if (password.length < 6 || !hasLetter) {
            setError('A senha deve ter no mínimo 6 caracteres e uma letra');
            return;
        }
        if (password !== confirmPassword) {
            setError('Senhas não coincidem');
            return;
        }
        if (isSignup && !termsAccepted) {
            setError('Aceite os termos para continuar');
            return;
        }

        setIsLoading(true);

        try {
            // Test User Bypass
            if (location.state?.email === '111111111111') {
                setTimeout(() => {
                    localStorage.removeItem('pendingProfileData');
                    setIsLoading(false);
                    setShowPreparing(true);
                }, 1000);
                return;
            }

            // Ensure we don't hang indefinitely if Supabase API or triggers get stuck
            const updateUserPromise = supabase.auth.updateUser({ password: password });
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_UPDATE')), 30000));

            const { error: updateError } = await Promise.race([updateUserPromise, timeoutPromise]);

            if (updateError) {
                setError(updateError.message || 'Erro ao guardar a palavra-passe');
                setIsLoading(false);
                return;
            }

            // Save profile data if available (only for signup)
            // Decoupled as a fire-and-forget promise to prevent UI hanging if the profiles table deadlocks
            if (isSignup && profileData && Object.keys(profileData).length > 0) {
                supabase.auth.getUser().then(({ data: { user } }) => {
                    if (user) {
                        supabase.from('profiles').upsert({
                            id: user.id,
                            name: profileData.fullName || null,
                            nationality: profileData.nationality || null,
                            phone: profileData.phone || user.phone || null,
                            date_of_birth: profileData.dateOfBirth || null,
                            updated_at: new Date().toISOString()
                        }).then(({ error: profileError }) => {
                            if (profileError) console.error('Profile save error:', profileError);
                        }).catch(err => console.error('Profile network err:', err));
                    }
                }).catch(err => console.error('GetUser err:', err));
                
                localStorage.removeItem('pendingProfileData');
            }

            // Trigger preparing screen overlay immediately
            setShowPreparing(true);
        } catch (err) {
            if (err.message === 'TIMEOUT_UPDATE') {
                setError('O servidor demorou muito a responder. Verifique sua conexão e tente novamente.');
            } else {
                setError('Erro: ' + (err.message || 'Falha desconhecida.'));
            }
            console.error('Create password error:', err);
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        // Just clear the pending data and go to the next screen as a bypass
        localStorage.removeItem('pendingProfileData');
        setShowPreparing(true);
    };

    if (showPreparing) {
        return (
            <PreparingScreen
                message={!isPasswordReset ? "A criar a sua conta..." : "A atualizar segurança..."}
                subtitle="A preparar a sua experiência exclusiva."
                onComplete={handlePreparingComplete}
            />
        );
    }

    return (
        <div className="da-screen-wrapper" style={{ zIndex: 99999 }}>
            <div className="da-card-stack">
                <div className="da-card">
                    <AuthLeftPanel
                        title={isSignup ? 'Segurança' : (isPasswordReset ? 'Nova Palavra-passe' : 'Nova Palavra-passe')}
                        subtitle="Crie uma palavra-passe segura para proteger a sua conta e aceder a experiências exclusivas."
                        showLogo={true}
                        illustration={authBgNew}
                        onBack={() => navigateBack('/login')}
                    />

                    <div className="da-right-pane">
                        <div className="da-form-content fade-in-up" style={{ marginTop: '0', textAlign: 'left' }}>
                            <h1 className="dl-title">
                                {isSignup ? 'Segurança' : (isPasswordReset ? 'Nova Palavra-passe' : 'Nova Palavra-passe')}
                            </h1>

                            <div className="da-form">
                                <div className="form-step">
                                    <div className="da-input-group">
                                        <input
                                            type={showPasswords ? "text" : "password"}
                                            name="password"
                                            placeholder="Criar palavra-passe"
                                            className="da-input dl-input-password"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                        />
                                        <button type="button" className="dl-password-toggle" onClick={() => setShowPasswords(!showPasswords)}>
                                            {showPasswords ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </div>

                                    <div className="da-input-group" style={{ marginTop: '20px' }}>
                                        <input
                                            type={showPasswords ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirmar palavra-passe"
                                            className="da-input dl-input-password"
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                                        />
                                        <button type="button" className="dl-password-toggle" onClick={() => setShowPasswords(!showPasswords)}>
                                            {showPasswords ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </div>

                                    <div className="da-form-options" style={{ marginTop: '16px' }}>
                                        <label className="da-checkbox-group">
                                            <input type="checkbox" className="da-checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); if (error === 'Aceite os termos para continuar') setError(''); }} />
                                            <span className="da-checkbox-label">Eu concordo com os Termos e Políticas</span>
                                        </label>
                                    </div>

                                    {error && <span className="error-msg-ds" style={{ display: 'block', marginTop: '12px' }}>{error}</span>}

                                    <button type="button" className="da-btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={handleSave} disabled={isLoading || password.length < 6 || !termsAccepted}>
                                        {isLoading ? 'Processando...' : (isSignup ? 'Registar' : 'Alterar Senha')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopCreatePassword;
