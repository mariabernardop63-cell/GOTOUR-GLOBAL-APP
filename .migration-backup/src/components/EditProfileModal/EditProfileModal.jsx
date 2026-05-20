import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Check, AlertCircle, Loader2, ChevronDown, ArrowLeft, Search, Map, Compass, Plane, Briefcase, Tent, BookOpen, Laptop, Video } from 'lucide-react';
import './EditProfileModal.css';
import sashaLogo from '../../assets/sasha_logo.png';
import ProfilePictureCropper from '../ProfilePictureCropper/ProfilePictureCropper';

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

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [profileType, setProfileType] = useState('');
    const [isSelectingType, setIsSelectingType] = useState(false);
    const [isWebImagesView, setIsWebImagesView] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [imagePrompt, setImagePrompt] = useState('');
    const [cropPhotoUrl, setCropPhotoUrl] = useState(null);
    const [searchTypeQuery, setSearchTypeQuery] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(null); // true, false, or null
    const [isSaving, setIsSaving] = useState(false);

    // Derived state to check if any field has been modified
    const hasChanges = name.trim() !== (userData?.name || '') ||
        username.trim() !== (userData?.username || '') ||
        avatar !== (userData?.avatar || '') ||
        bio !== (userData?.bio || '') ||
        profileType !== (userData?.profileType || 'Explorador');

    const fileInputRef = useRef(null);
    const modalRef = useRef(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen && userData) {
            setName(userData.name || '');
            setUsername(userData.username || '');
            setAvatar(userData.avatar || '');
            setBio(userData.bio || '');
            setProfileType(userData.profileType || 'Explorador');
            setIsUsernameValid(null);
            setIsCheckingUsername(false);
            setIsSelectingType(false);
            setIsWebImagesView(false);
            setIsEditingBio(false);
            setIsGeneratingImage(false);
            setImagePrompt('');
            setSearchTypeQuery('');
        }
    }, [isOpen, userData]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Lock body scroll to prevent interacting with the Home screen underneath
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    // Mock real-time username validation
    useEffect(() => {
        if (!isOpen) return;

        // Skip checking if it's the user's current username
        if (username === userData?.username) {
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
            // Simulate API call delay
            setTimeout(() => {
                setIsCheckingUsername(false);
                // Mock logic: 'admin' and 'gotour' are taken
                const takenUsernames = ['admin', 'gotour', 'test'];
                setIsUsernameValid(!takenUsernames.includes(username.toLowerCase()));
            }, 600);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [username, isOpen, userData]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCropPhotoUrl(URL.createObjectURL(file));
        }
        e.target.value = '';
    };

    const handleCropperSave = (croppedBlobUrl) => {
        setAvatar(croppedBlobUrl);
        setCropPhotoUrl(null);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isUsernameValid === false || !hasChanges) return; // Prevent saving if invalid or untouched

        setIsSaving(true);

        // Simulate API save
        setTimeout(() => {
            setIsSaving(false);
            onSave({
                name,
                username,
                avatar,
                bio,
                profileType
            });
            onClose();
        }, 1200);
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
                    {isWebImagesView ? (
                        <div className="web-images-gallery-view scale-in">
                            <div className="gallery-header">
                                <button type="button" className="back-btn-icon" onClick={() => {
                                    if(isGeneratingImage) {
                                        setIsGeneratingImage(false);
                                        setImagePrompt('');
                                    } else {
                                        setIsWebImagesView(false);
                                    }
                                }}>
                                    <ArrowLeft size={24} color="#0f172a" />
                                </button>
                                
                                {!isGeneratingImage && (
                                    <>
                                        <div className="selector-search-bar" style={{ flex: 1, marginRight: '16px' }}>
                                            <Search size={20} color="#64748b" className="search-icon-left" />
                                            <input 
                                                type="text" 
                                                placeholder="Pesquisar imagens..." 
                                                className="selector-search-input"
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn-generate-trigger" 
                                            onClick={() => setIsGeneratingImage(true)}
                                        >
                                            <Camera size={18} />
                                            <span>Gerar Imagem</span>
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {isGeneratingImage ? (
                                <div className="image-generator-view scale-in">
                                    <div className="generator-title-area">
                                        <div className="sasha-logo-crop" style={{ backgroundImage: `url(${sashaLogo})` }}></div>
                                        <h1 className="sasha-title">Sasha IA</h1>
                                    </div>
                                    <p className="sasha-subtitle">
                                        A sua assistente pessoal de viagens por Inteligência Artificial
                                    </p>
                                    
                                    <div className="generator-content">
                                        <div className="chatgpt-prompt-container">
                                            <input 
                                                type="text" 
                                                placeholder="Descreva a imagem pretendida..."
                                                className="chatgpt-prompt-input"
                                                maxLength={100}
                                                value={imagePrompt}
                                                onChange={(e) => setImagePrompt(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="prompt-actions-row">
                                            <div className="prompt-chars-count">
                                                {imagePrompt.length}/100
                                            </div>
                                            <button 
                                                className="btn-chatgpt-generate" 
                                                type="button"
                                                disabled={!imagePrompt.trim()}
                                            >
                                                Gerar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="gallery-chips-row">
                                        <button className="gallery-chip active">Tudo</button>
                                        {PROFILE_TYPES.map(pt => (
                                            <button key={pt.id} className="gallery-chip">
                                                <pt.icon size={16} />
                                                <span>{pt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div className="gallery-grid">
                                        {/* Map 100 mockup squares */}
                                        {Array.from({ length: 100 }).map((_, i) => (
                                            <div key={i} className="gallery-image-mockup"></div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Left Column: Avatar */}
                            <div className="edit-profile-left">
                                <div className="avatar-edit-container">
                                    <div className="avatar-preview">
                                        {avatar ? (
                                            <img src={avatar} alt="Avatar" />
                                        ) : (
                                            <div className="avatar-placeholder">
                                                {name ? name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="avatar-upload-btn"
                                        onClick={triggerFileInput}
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
                                {isSelectingType ? (
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
                                            <textarea
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                                placeholder="Sua biografia (Max 60 caracteres)..."
                                                className="modal-input modal-textarea"
                                                maxLength={60}
                                                autoFocus
                                            />
                                            <div className="bio-chars-count">
                                                {bio.length}/60
                                            </div>
                                        </div>
                                        <div className="bio-edit-actions">
                                            <button 
                                                type="button" 
                                                className="btn-bio-save"
                                                disabled={bio === (userData?.bio || '')}
                                                onClick={() => setIsEditingBio(false)}
                                            >
                                                Salvar
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn-bio-cancel"
                                                onClick={() => {
                                                    setBio(userData?.bio || '');
                                                    setIsEditingBio(false);
                                                }}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form id="editProfileForm" onSubmit={handleSubmit}>
                                        {/* Name Input */}
                                        <div className="modal-input-group">
                                            <label htmlFor="profileName">Nome Completo</label>
                                            <input
                                                type="text"
                                                id="profileName"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Nome Completo"
                                                className="modal-input"
                                                autoComplete="off"
                                            />
                                        </div>

                                        {/* Username Input */}
                                        <div className={`modal-input-group ${isUsernameValid === false ? 'has-error' : ''} ${isUsernameValid === true && username !== userData?.username ? 'has-success' : ''}`}>
                                            <label htmlFor="profileUsername">Nome de Utilizador</label>
                                            <div className="username-input-wrapper">
                                                <span className="username-prefix">@</span>
                                                <input
                                                    type="text"
                                                    id="profileUsername"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value.replace(/\s+/g, '').toLowerCase())}
                                                    placeholder="Nome de Utilizador"
                                                    className="modal-input with-prefix"
                                                    autoComplete="off"
                                                />

                                                {/* Validation Icons Status */}
                                                <div className="validation-status">
                                                    {isCheckingUsername && <Loader2 size={16} className="status-icon loading-spin" />}
                                                    {!isCheckingUsername && isUsernameValid === true && username !== userData?.username && (
                                                        <Check size={16} className="status-icon success slide-in-icon" />
                                                    )}
                                                    {!isCheckingUsername && isUsernameValid === false && (
                                                        <AlertCircle size={16} className="status-icon error shake-icon" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Validation Feedback Text */}
                                            <div className="validation-feedback">
                                                {isUsernameValid === false && <span className="error-text fade-in">Este nome não está disponível.</span>}
                                                {isUsernameValid === true && username !== userData?.username && <span className="success-text fade-in">Nome de utilizador disponível!</span>}
                                            </div>
                                        </div>
                                        
                                        {/* Bio Edit Button trigger replacing standard text-area */}
                                        <div className="edit-bio-wrapper">
                                            <button 
                                                type="button" 
                                                className="btn-edit-bio" 
                                                onClick={() => setIsEditingBio(true)}
                                            >
                                                Editar Biografia
                                            </button>
                                        </div>
                                        
                                        {/* Profile Type Fake Input */}
                                        <div className="modal-input-group">
                                            <label>Tipo de Perfil</label>
                                            <div 
                                                className="modal-input profile-type-trigger" 
                                                onClick={() => setIsSelectingType(true)}
                                            >
                                                <span className={profileType ? 'value-set' : 'placeholder'}>
                                                    {profileType || 'Tipo de perfil'}
                                                </span>
                                                <ChevronDown size={20} color="#64748b" />
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer Actions */}
                {(!isWebImagesView && !isSelectingType && !isEditingBio) && (
                    <div className="edit-profile-footer">
                        <div className="footer-left-actions">
                            <button type="submit" form="editProfileForm" className="modal-btn-save" disabled={isSaving || isUsernameValid === false || !name.trim() || !hasChanges}>
                                {isSaving ? (
                                    <>
                                        <Loader2 size={16} className="loading-spin" />
                                        A guardar...
                                    </>
                                ) : (
                                    'Salvar Alterações'
                                )}
                            </button>
                            <button 
                                className="web-images-btn-footer" 
                                type="button"
                                onClick={() => setIsWebImagesView(true)}
                            >
                                Imagens da Web
                            </button>
                        </div>
                        <button type="button" className="modal-btn-cancel" onClick={onClose} disabled={isSaving}>
                            Cancelar
                        </button>
                    </div>
                )}
                </>)}
            </div>
        </div>
    );
};

export default EditProfileModal;
