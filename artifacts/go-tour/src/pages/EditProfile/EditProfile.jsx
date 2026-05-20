import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Search, Camera, ImagePlus, User, AtSign,
    Mail, Phone, Globe, Calendar, Users, Languages,
    Lock, Eye, MessageCircle, Heart, Shield, Smartphone,
    Key, Bell, Moon, ChevronRight
} from 'lucide-react';
import './EditProfile.css';

const SettingsRow = ({ icon: Icon, label, value, onClick }) => (
    <button className="settings-row" onClick={onClick}>
        <span className="settings-row-icon"><Icon size={20} /></span>
        <span className="settings-row-content">
            <span className="settings-row-label">{label}</span>
            {value && <span className="settings-row-value">{value}</span>}
        </span>
        <ChevronRight size={18} className="settings-row-arrow" />
    </button>
);

const SwitchRow = ({ icon: Icon, label, active, onToggle }) => (
    <div className="switch-row">
        <span className="switch-row-icon"><Icon size={20} /></span>
        <span className="switch-row-label">{label}</span>
        <button className={`custom-toggle ${active ? 'active' : ''}`} onClick={onToggle} aria-label={label} />
    </div>
);

const EditProfile = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isPublicProfile, setIsPublicProfile] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    return (
        <div className="edit-profile-page">
            {/* TOP BAR */}
            <div className="edit-profile-topbar">
                <button className="edit-profile-back" onClick={() => navigate(-1)} aria-label="Voltar">
                    <ArrowLeft size={20} />
                </button>
                <span className="edit-profile-topbar-title">Editar Perfil</span>
            </div>

            {/* SEARCH */}
            <div className="edit-profile-search">
                <Search size={18} />
                <input
                    type="text" placeholder="Procurar configurações..."
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* PROFILE & APPEARANCE */}
            <div className="edit-section">
                <h3 className="edit-section-title">Perfil e Aparência</h3>
                <SettingsRow icon={Camera} label="Editar foto de perfil" value="Alterar ou adicionar foto" />
                <SettingsRow icon={ImagePlus} label="Editar foto de capa" value="Personalizar a capa do perfil" />
                <SettingsRow icon={User} label="Editar nome do perfil" value="Nome do Usuário" />
                <SettingsRow icon={AtSign} label="Editar nome de utilizador" value="@gotour_user" />
            </div>
            <div className="edit-section-divider" />

            {/* ACCOUNT & PERSONAL DATA */}
            <div className="edit-section">
                <h3 className="edit-section-title">Conta e Dados Pessoais</h3>
                <SettingsRow icon={Mail} label="Editar email" value="usuario@email.com" />
                <SettingsRow icon={Phone} label="Editar número de telefone" value="+258 84 000 0000" />
                <SettingsRow icon={Globe} label="Nacionalidade" value="Moçambique" />
                <SettingsRow icon={Calendar} label="Data de nascimento" value="01/01/2000" />
                <SettingsRow icon={Users} label="Género" value="Não especificado" />
                <SettingsRow icon={Languages} label="Idioma preferido" value="Português" />
            </div>
            <div className="edit-section-divider" />

            {/* PRIVACY */}
            <div className="edit-section">
                <h3 className="edit-section-title">Privacidade</h3>
                <SwitchRow icon={Eye} label="Perfil público" active={isPublicProfile} onToggle={() => setIsPublicProfile(!isPublicProfile)} />
                <SettingsRow icon={MessageCircle} label="Quem pode enviar mensagens" value="Todos" />
                <SettingsRow icon={MessageCircle} label="Quem pode comentar posts" value="Todos" />
                <SettingsRow icon={Heart} label="Quem pode ver stories" value="Todos" />
            </div>
            <div className="edit-section-divider" />

            {/* SECURITY */}
            <div className="edit-section">
                <h3 className="edit-section-title">Segurança</h3>
                <SettingsRow icon={Key} label="Alterar senha" value="••••••••" />
                <SwitchRow icon={Shield} label="Autenticação em 2 passos" active={twoFactorEnabled} onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)} />
                <SettingsRow icon={Smartphone} label="Dispositivos conectados" value="1 dispositivo ativo" />
            </div>
            <div className="edit-section-divider" />

            {/* PREFERENCES */}
            <div className="edit-section">
                <h3 className="edit-section-title">Preferências</h3>
                <SwitchRow icon={Bell} label="Notificações" active={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} />
                <SwitchRow icon={Moon} label="Modo escuro" active={darkMode} onToggle={() => setDarkMode(!darkMode)} />
                <SettingsRow icon={Languages} label="Idioma" value="Português" />
            </div>

            {/* BOTTOM BUTTONS */}
            <div className="edit-profile-bottom-btns">
                <button className="edit-btn-cancel" onClick={() => navigate(-1)}>Cancelar</button>
                <button className="edit-btn-save" onClick={() => navigate(-1)}>Salvar Alterações</button>
            </div>
        </div>
    );
};

export default EditProfile;
