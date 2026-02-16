import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import { useNavigation } from '../../App';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import gotourIcon from '../../assets/images/gotour_icon.png';
import './CreatePassword.css';

const CreatePassword = () => {
    const { navigateForward, navigateBack } = useNavigation();
    const location = useLocation();
    const profileData = location.state?.profileData || {};

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Password strength checks
    const hasMinLength = password.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
    const isValid = hasMinLength && hasLetter && hasNumber && passwordsMatch;

    const handleSave = async () => {
        setError('');

        if (!hasMinLength) {
            setError('A senha deve ter no mínimo 8 caracteres');
            return;
        }
        if (!hasLetter) {
            setError('A senha deve conter pelo menos uma letra');
            return;
        }
        if (!hasNumber) {
            setError('A senha deve conter pelo menos um número');
            return;
        }
        if (!passwordsMatch) {
            setError('As senhas não coincidem');
            return;
        }

        setIsLoading(true);

        try {
            // Update user password in Supabase
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) {
                setError(updateError.message || 'Erro ao salvar senha');
                setIsLoading(false);
                return;
            }

            // Save profile data
            const { data: { user } } = await supabase.auth.getUser();
            if (user && profileData) {
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

            // Success — redirect to home
            navigateForward('/select-country');
        } catch (err) {
            setError('Ocorreu um erro inesperado. Tente novamente.');
            console.error('Create password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const PasswordCheck = ({ passed, label }) => (
        <div className={`pwd-check ${passed ? 'passed' : ''}`}>
            {passed ? <Check size={14} /> : <X size={14} />}
            <span>{label}</span>
        </div>
    );

    return (
        <div className="create-pwd-page">
            {/* Logo */}
            <div className="create-pwd-logo">
                <img src={gotourIcon} alt="GoTour" className="create-pwd-logo-img" />
                <span className="create-pwd-logo-text">GOTOUR</span>
            </div>

            <div className="create-pwd-container fade-in-up">
                <button className="create-pwd-back-btn" onClick={() => navigateBack()}>
                    <ArrowLeft size={24} />
                </button>

                <div className="create-pwd-header">
                    <h1>Crie sua senha</h1>
                    <p>Escolha uma senha segura para proteger sua conta GoTour.</p>
                </div>

                <div className="create-pwd-form">
                    {/* Password */}
                    <div className="create-pwd-field">
                        <Lock size={18} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nova senha"
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
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                        />
                        <div className="create-pwd-eye" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                    </div>

                    {/* Strength indicators */}
                    <div className="pwd-checks">
                        <PasswordCheck passed={hasMinLength} label="Mínimo 8 caracteres" />
                        <PasswordCheck passed={hasLetter} label="Pelo menos uma letra" />
                        <PasswordCheck passed={hasNumber} label="Pelo menos um número" />
                        <PasswordCheck passed={passwordsMatch} label="Senhas coincidem" />
                    </div>

                    {error && <p className="create-pwd-error">{error}</p>}

                    <button
                        className="create-pwd-btn"
                        onClick={handleSave}
                        disabled={!isValid || isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Salvar Senha'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePassword;
