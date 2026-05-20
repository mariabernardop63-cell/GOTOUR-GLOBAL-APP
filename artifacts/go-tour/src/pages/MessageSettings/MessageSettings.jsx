import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Settings, Shield, Ban, Archive,
    Bell, Clock, Database, Lock, ChevronRight
} from 'lucide-react';
import './MessageSettings.css';

const SettingsItem = ({ icon: Icon, label, onClick }) => (
    <button className="msg-settings-row" onClick={onClick}>
        <span className="msg-settings-row-icon"><Icon size={20} /></span>
        <span className="msg-settings-row-label">{label}</span>
        <ChevronRight size={18} className="msg-settings-row-arrow" />
    </button>
);

const MessageSettings = () => {
    const navigate = useNavigate();

    return (
        <div className="msg-settings-page">
            {/* TOP BAR */}
            <div className="msg-settings-topbar">
                <button className="msg-settings-back" onClick={() => navigate(-1)} aria-label="Voltar">
                    <ArrowLeft size={20} />
                </button>
                <span className="msg-settings-title">Definições de Mensagens</span>
            </div>

            {/* GENERAL */}
            <div className="msg-settings-section">
                <h3 className="msg-settings-section-title">Geral</h3>
                <SettingsItem icon={Settings} label="Definições de mensagens" />
                <SettingsItem icon={Shield} label="Privacidade de mensagens" />
                <SettingsItem icon={Ban} label="Bloqueados" />
            </div>
            <div className="msg-settings-divider" />

            {/* ORGANIZATION */}
            <div className="msg-settings-section">
                <h3 className="msg-settings-section-title">Organização</h3>
                <SettingsItem icon={Archive} label="Arquivadas" />
                <SettingsItem icon={Bell} label="Notificações" />
                <SettingsItem icon={Clock} label="Mensagens temporárias" />
            </div>
            <div className="msg-settings-divider" />

            {/* SECURITY */}
            <div className="msg-settings-section">
                <h3 className="msg-settings-section-title">Segurança</h3>
                <SettingsItem icon={Database} label="Backup" />
                <SettingsItem icon={Lock} label="Segurança do chat" />
            </div>
        </div>
    );
};

export default MessageSettings;
