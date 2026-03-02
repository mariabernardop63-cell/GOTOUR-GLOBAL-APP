import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Check, AlertCircle, Loader2 } from 'lucide-react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(null); // true, false, or null
    const [isSaving, setIsSaving] = useState(false);

    const fileInputRef = useRef(null);
    const modalRef = useRef(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen && userData) {
            setName(userData.name || '');
            setUsername(userData.username || '');
            setAvatar(userData.avatar || '');
            setIsUsernameValid(null);
            setIsCheckingUsername(false);
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
            // Mock file read - in a real app, upload to server or read as data URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isUsernameValid === false) return; // Prevent saving if invalid

        setIsSaving(true);

        // Simulate API save
        setTimeout(() => {
            setIsSaving(false);
            onSave({
                name,
                username,
                avatar
            });
            onClose();
        }, 1200);
    };

    if (!isOpen) return null;

    return (
        <div className="edit-profile-overlay active" onClick={handleBackdropClick}>
            <div className="edit-profile-modal scale-in" ref={modalRef}>

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
                        <form id="editProfileForm" onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="modal-input-group">
                                <label htmlFor="profileName">Nome Completo</label>
                                <input
                                    type="text"
                                    id="profileName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="O seu nome visível"
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
                                        placeholder="seunome"
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
                        </form>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="edit-profile-footer">
                    <button type="button" className="modal-btn-cancel" onClick={onClose} disabled={isSaving}>
                        Cancelar
                    </button>
                    <button type="submit" form="editProfileForm" className="modal-btn-save" disabled={isSaving || isUsernameValid === false || !name.trim()}>
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

            </div>
        </div>
    );
};

export default EditProfileModal;
