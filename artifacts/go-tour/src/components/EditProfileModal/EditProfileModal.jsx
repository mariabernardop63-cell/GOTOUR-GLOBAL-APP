import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Check, AlertCircle, Loader2, ChevronDown, ArrowLeft, Search, Map, Compass, Plane, Briefcase, Tent, BookOpen, Laptop, Video, Plus } from 'lucide-react';
import './EditProfileModal.css';
import sashaLogo from '../../assets/sasha_logo.png';
import ProfilePictureCropper from '../ProfilePictureCropper/ProfilePictureCropper';
import { useAuth } from '../../context/AuthContext';
import { upsertProfile, uploadAvatarFromBlob } from '../../lib/profileService';

const PROFILE_TYPES = [
    { id: 'turista', label: 'Turista', icon: Map },
    { id: 'explorador', label: 'Explorador', icon: Compass },
    { id: 'viajante', label: 'Viajante', icon: Plane },
    { id: 'mochileiro', label: 'Mochileiro', icon: Briefcase },
    { id: 'aventureiro', label: 'Aventureiro', icon: Tent },
    { id: 'estudante', label: 'Estudante', icon: BookOpen },
    { id: 'nomada', label: 'Nómada Digital', icon: Laptop },
    { id: 'criador', label: 'Criador de Conteúdo', icon: Video },
];

const ALL_INTERESTS = [
    'Natureza', 'Fotografia', 'Culturas', 'Mochilão', 'Gastronomia',
    'Arte', 'Aventura', 'Praias', 'Montanhas', 'Cidades',
    'Museus', 'Festivais', 'Desporto', 'Bem-estar', 'Arquitectura',
    'Vida Selvagem', 'Mergulho', 'Caminhadas', 'Campismo', 'Surf'
];

const EditProfileModal = ({ isOpen, onClose, onSave }) => {
    const { user: authUser, profile, refreshProfile } = useAuth();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [bio, setBio] = useState('');
    const [profileType, setProfileType] = useState('');
    const [interests, setInterests] = useState([]);
    const [isSelectingType, setIsSelectingType] = useState(false);
    const [isSelectingInterests, setIsSelectingInterests] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [cropPhotoUrl, setCropPhotoUrl] = useState(null);
    const [searchTypeQuery, setSearchTypeQuery] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(null);

    const fileInputRef = useRef(null);
    const modalRef = useRef(null);

    const originalUsername = profile?.username || '';

    useEffect(() => {
        if (isOpen && profile) {
            setName(profile.name || '');
            setUsername(profile.username || '');
            setAvatarPreview(profile.avatar_url || '');
            setBio(profile.bio || '');
            setProfileType(profile.category || '');
            setInterests(profile.interests || []);
            setIsUsernameValid(null);
            setIsCheckingUsername(false);
            setIsSelectingType(false);
            setIsSelectingInterests(false);
            setIsEditingBio(false);
            setSearchTypeQuery('');
            setSaveError('');
        } else if (isOpen && !profile && authUser) {
            const emailName = authUser.email ? authUser.email.split('@')[0] : '';
            setName(emailName ? emailName.charAt(0).toUpperCase() + emailName.slice(1) : '');
            setUsername(emailName || '');
            setAvatarPreview('');
            setBio('');
            setProfileType('');
            setInterests([]);
            setIsUsernameValid(null);
            setSaveError('');
        }
    }, [isOpen, profile, authUser]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = original; };
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (username === originalUsername) {
            setIsUsernameValid(true);
            setIsCheckingUsername(false);
            return;
        }
        if (username.length < 3) {
            setIsUsernameValid(null);
            return;
        }
        const timer = setTimeout(() => {
            setIsCheckingUsername(true);
            setTimeout(() => {
                setIsCheckingUsername(false);
                const takenUsernames = ['admin', 'gotour', 'test'];
                setIsUsernameValid(!takenUsernames.includes(username.toLowerCase()));
            }, 600);
        }, 500);
        return () => clearTimeout(timer);
    }, [username, isOpen, originalUsername]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setCropPhotoUrl(URL.createObjectURL(file));
        e.target.value = '';
    };

    const handleCropperSave = (croppedBlobUrl) => {
        setAvatarPreview(croppedBlobUrl);
        setCropPhotoUrl(null);
    };

    const toggleInterest = (interest) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUsernameValid === false || isSaving || !authUser?.id) return;

        setIsSaving(true);
        setSaveError('');

        try {
            let avatarUrl = profile?.avatar_url || null;

            if (avatarPreview && avatarPreview !== profile?.avatar_url && avatarPreview.startsWith('blob:')) {
                avatarUrl = await uploadAvatarFromBlob(authUser.id, avatarPreview);
            }

            await upsertProfile(authUser.id, {
                name: name.trim() || null,
                username: username.trim() || null,
                bio: bio.trim() || null,
                avatar_url: avatarUrl,
                category: profileType || null,
                interests: interests,
            });

            await refreshProfile();
            onSave && onSave();
            onClose();
        } catch (err) {
            console.error('Error saving profile:', err);
            setSaveError('Erro ao guardar. Tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="edit-profile-overlay active" onClick={handleBackdropClick}>
            <div className={`edit-profile-modal scale-in ${cropPhotoUrl ? 'is-cropping' : ''}`} ref={modalRef}>
                {cropPhotoUrl ? (
                    <ProfilePictureCropper
                        photoUrl={cropPhotoUrl}
                        onSave={handleCropperSave}
                        onCancel={() => setCropPhotoUrl(null)}
                    />
                ) : (
                    <>
                        {/* Header */}
                        <div className="edit-profile-header">
                            <div>
                                <h2>Editar Perfil</h2>
                                <p>Atualize as informações visíveis no seu perfil.</p>
                            </div>
                            <button className="close-modal-btn" onClick={onClose} aria-label="Fechar">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="edit-profile-body">
                            {isSelectingInterests ? (
                                <div className="interests-selector-view scale-in">
                                    <div className="selector-header">
                                        <button type="button" className="back-btn-icon" onClick={() => setIsSelectingInterests(false)}>
                                            <ArrowLeft size={24} color="#0f172a" />
                                        </button>
                                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Selecionar Interesses</h3>
                                    </div>
                                    <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
                                        Escolha os seus interesses de viagem:
                                    </p>
                                    <div className="interests-grid-picker">
                                        {ALL_INTERESTS.map(interest => (
                                            <button
                                                key={interest}
                                                type="button"
                                                className={`interest-pick-btn ${interests.includes(interest) ? 'selected' : ''}`}
                                                onClick={() => toggleInterest(interest)}
                                            >
                                                {interests.includes(interest) && <Check size={14} />}
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-bio-save"
                                        style={{ marginTop: 16 }}
                                        onClick={() => setIsSelectingInterests(false)}
                                    >
                                        Confirmar ({interests.length} selecionados)
                                    </button>
                                </div>
                            ) : isSelectingType ? (
                                <div className="profile-type-selector-view scale-in">
                                    <div className="selector-header">
                                        <button type="button" className="back-btn-icon" onClick={() => setIsSelectingType(false)}>
                                            <ArrowLeft size={24} color="#0f172a" />
                                        </button>
                                        <div className="selector-search-bar">
                                            <Search size={20} color="#64748b" className="search-icon-left" />
                                            <input
                                                type="text"
                                                placeholder="Pesquisar tipo de perfil..."
                                                value={searchTypeQuery}
                                                onChange={(e) => setSearchTypeQuery(e.target.value)}
                                                className="selector-search-input"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="selector-list">
                                        {PROFILE_TYPES.filter(pt => pt.label.toLowerCase().includes(searchTypeQuery.toLowerCase())).map(pt => (
                                            <button
                                                key={pt.id}
                                                type="button"
                                                className={`profile-type-option ${profileType === pt.label ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setProfileType(pt.label);
                                                    setIsSelectingType(false);
                                                    setSearchTypeQuery('');
                                                }}
                                            >
                                                <pt.icon size={22} className="pt-icon" strokeWidth={1.8} />
                                                <span className="pt-label">{pt.label}</span>
                                                {profileType === pt.label && <Check size={20} color="#0d9488" className="pt-check" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : isEditingBio ? (
                                <div className="bio-edit-view scale-in">
                                    <div className="modal-input-group">
                                        <label>Biografia</label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Diga mais sobre você... (max 160 caracteres)"
                                            className="modal-input modal-textarea"
                                            maxLength={160}
                                            autoFocus
                                        />
                                        <div className="bio-chars-count">{bio.length}/160</div>
                                    </div>
                                    <div className="bio-edit-actions">
                                        <button
                                            type="button"
                                            className="btn-bio-save"
                                            onClick={() => setIsEditingBio(false)}
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-bio-cancel"
                                            onClick={() => {
                                                setBio(profile?.bio || '');
                                                setIsEditingBio(false);
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Left Column: Avatar */}
                                    <div className="edit-profile-left">
                                        <div className="avatar-edit-container">
                                            <div className="avatar-preview">
                                                {avatarPreview ? (
                                                    <img src={avatarPreview} alt="Avatar" />
                                                ) : (
                                                    <div className="avatar-placeholder">
                                                        {name ? name.charAt(0).toUpperCase() : 'U'}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                className="avatar-upload-btn"
                                                onClick={() => fileInputRef.current?.click()}
                                                title="Alterar foto"
                                            >
                                                <Camera size={20} />
                                            </button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Inputs */}
                                    <div className="edit-profile-right">
                                        <form id="editProfileForm" onSubmit={handleSubmit}>
                                            <div className="modal-input-group">
                                                <label htmlFor="profileName">Nome Completo</label>
                                                <input
                                                    type="text"
                                                    id="profileName"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="O seu nome"
                                                    className="modal-input"
                                                    autoComplete="off"
                                                />
                                            </div>

                                            <div className={`modal-input-group ${isUsernameValid === false ? 'has-error' : ''} ${isUsernameValid === true && username !== originalUsername ? 'has-success' : ''}`}>
                                                <label htmlFor="profileUsername">Nome de Utilizador</label>
                                                <div className="username-input-wrapper">
                                                    <span className="username-prefix">@</span>
                                                    <input
                                                        type="text"
                                                        id="profileUsername"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value.replace(/\s+/g, '').toLowerCase())}
                                                        placeholder="nome_utilizador"
                                                        className="modal-input with-prefix"
                                                        autoComplete="off"
                                                    />
                                                    <div className="validation-status">
                                                        {isCheckingUsername && <Loader2 size={16} className="status-icon loading-spin" />}
                                                        {!isCheckingUsername && isUsernameValid === true && username !== originalUsername && (
                                                            <Check size={16} className="status-icon success slide-in-icon" />
                                                        )}
                                                        {!isCheckingUsername && isUsernameValid === false && (
                                                            <AlertCircle size={16} className="status-icon error shake-icon" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="validation-feedback">
                                                    {isUsernameValid === false && <span className="error-text fade-in">Este nome não está disponível.</span>}
                                                    {isUsernameValid === true && username !== originalUsername && <span className="success-text fade-in">Nome de utilizador disponível!</span>}
                                                </div>
                                            </div>

                                            <div className="edit-bio-wrapper">
                                                <button
                                                    type="button"
                                                    className="btn-edit-bio"
                                                    onClick={() => setIsEditingBio(true)}
                                                >
                                                    {bio ? 'Editar Biografia' : 'Adicionar Biografia'}
                                                </button>
                                                {bio && (
                                                    <p className="bio-preview-text">"{bio}"</p>
                                                )}
                                            </div>

                                            <div className="modal-input-group">
                                                <label>Tipo de Perfil</label>
                                                <div
                                                    className="modal-input profile-type-trigger"
                                                    onClick={() => setIsSelectingType(true)}
                                                >
                                                    <span className={profileType ? 'value-set' : 'placeholder'}>
                                                        {profileType || 'Selecionar tipo de viajante'}
                                                    </span>
                                                    <ChevronDown size={20} color="#64748b" />
                                                </div>
                                            </div>

                                            <div className="modal-input-group">
                                                <label>Interesses</label>
                                                <button
                                                    type="button"
                                                    className="modal-input profile-type-trigger"
                                                    onClick={() => setIsSelectingInterests(true)}
                                                    style={{ textAlign: 'left' }}
                                                >
                                                    <span className={interests.length > 0 ? 'value-set' : 'placeholder'}>
                                                        {interests.length > 0
                                                            ? interests.slice(0, 3).join(', ') + (interests.length > 3 ? ` +${interests.length - 3}` : '')
                                                            : 'Selecionar interesses'}
                                                    </span>
                                                    <ChevronDown size={20} color="#64748b" />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Error message */}
                        {saveError && (
                            <div style={{ padding: '0 24px', marginBottom: 8 }}>
                                <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{saveError}</p>
                            </div>
                        )}

                        {/* Footer */}
                        {(!isSelectingType && !isEditingBio && !isSelectingInterests) && (
                            <div className="edit-profile-footer">
                                <div className="footer-left-actions">
                                    <button
                                        type="submit"
                                        form="editProfileForm"
                                        className="modal-btn-save"
                                        disabled={isSaving || isUsernameValid === false}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={16} className="loading-spin" />
                                                A guardar...
                                            </>
                                        ) : (
                                            'Salvar Alterações'
                                        )}
                                    </button>
                                </div>
                                <button type="button" className="modal-btn-cancel" onClick={onClose} disabled={isSaving}>
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EditProfileModal;
