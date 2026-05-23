import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { upsertProfile, uploadAvatar } from '../../lib/profileService';
import { supabase } from '../../lib/supabase';
import {
    User, Shield, Lock, Bell, Settings as SettingsIcon,
    Globe, HelpCircle, Briefcase, Search, ChevronRight,
    Camera, ImagePlus, CheckCircle2, AlertCircle, Eye,
    EyeOff, MoreHorizontal, ArrowLeft,
    Compass, MapPinned, Tent, GraduationCap, Laptop,
    Phone, Calendar, Users, Languages,
    MessageCircle, Play, Smartphone, History, ShieldAlert, Database,
    Check, Loader2
} from 'lucide-react';
import './SettingsScreen.css';

const SETTINGS_CATEGORIES = [
    { id: 'profile', icon: User, label: 'Perfil e Aparência' },
    { id: 'account', icon: SettingsIcon, label: 'Conta e Dados Pessoais' },
    { id: 'privacy', icon: Lock, label: 'Privacidade' },
    { id: 'security', icon: Shield, label: 'Segurança' },
    { id: 'notifications', icon: Bell, label: 'Notificações' },
    { id: 'travel', icon: Globe, label: 'Pagamentos & Moeda' },
    { id: 'support', icon: HelpCircle, label: 'Centro de Suporte' }
];

const SETTINGS_OPTIONS = [
    { id: 'edit_avatar', label: 'Foto de Perfil', category: 'profile', keywords: ['foto', 'imagem', 'avatar', 'rosto', 'picture', 'profile'] },
    { id: 'edit_username', label: 'Nome de Utilizador', category: 'profile', keywords: ['nome', 'username', 'utilizador', 'arroba', '@', 'id'] },
    { id: 'edit_name', label: 'Nome Exibido', category: 'profile', keywords: ['nome', 'exibido', 'nome completo', 'apelido', 'identificação'] },
    { id: 'edit_profile_type', label: 'Tipo de Perfil', category: 'profile', keywords: ['tipo', 'perfil', 'turista', 'explorador', 'viagem', 'viajante', 'estudante', 'mochileiro'] },
    { id: 'edit_nationality', label: 'Nacionalidade', category: 'profile', keywords: ['nacionalidade', 'país', 'origem', 'nação', 'estado', 'pátria'] },

    { id: 'edit_email', label: 'Endereço de Email', category: 'account', keywords: ['email', 'e-mail', 'correio', 'eletrónico', 'contato', 'mail'] },
    { id: 'edit_phone', label: 'Número de Celular', category: 'account', keywords: ['número', 'celular', 'telemóvel', 'telefone', 'sms', 'contacto'] },
    { id: 'edit_dob', label: 'Data de Nascimento', category: 'account', keywords: ['data', 'nascimento', 'idade', 'aniversário', 'ano', 'mês', 'dia'] },
    { id: 'edit_gender', label: 'Género', category: 'account', keywords: ['género', 'sexo', 'identidade', 'masculino', 'feminino'] },
    { id: 'edit_language', label: 'Idioma Preferido', category: 'account', keywords: ['idioma', 'língua', 'tradução', 'português', 'inglês', 'language'] },

    { id: 'privacy_profile', label: 'Privacidade da Conta', category: 'privacy', keywords: ['privacidade', 'privado', 'público', 'conta', 'esconder', 'mostrar'] },
    { id: 'privacy_messages', label: 'Quem pode enviar mensagens', category: 'privacy', keywords: ['mensagens', 'chat', 'direct', 'dm', 'amigos', 'enviar', 'receber'] },
    { id: 'privacy_stories', label: 'Quem pode ver as minhas Histórias', category: 'privacy', keywords: ['histórias', 'stories', 'ver', 'visualizar', 'status'] },
    { id: 'privacy_blocked', label: 'Contas Bloqueadas', category: 'privacy', keywords: ['bloquear', 'bloqueado', 'contas', 'restrição', 'impedir'] },

    { id: 'security_password', label: 'Palavra-passe', category: 'security', keywords: ['palavra-passe', 'senha', 'password', 'código', 'mudar senha'] },
    { id: 'security_2fa', label: 'Autenticação em 2 Passos', category: 'security', keywords: ['autenticação', '2fa', 'passos', 'segurança extra', 'sms', 'código'] },
    { id: 'security_devices', label: 'Dispositivos e Sessões', category: 'security', keywords: ['dispositivos', 'sessões', 'login', 'aparelhos', 'computador', 'celular', 'encerrar'] },
    { id: 'security_history', label: 'Histórico de Logins Recentes', category: 'security', keywords: ['histórico', 'logins', 'recentes', 'atividade', 'acessos', 'quando'] },
    { id: 'security_alerts', label: 'Alertas e Notificações de Segurança', category: 'security', keywords: ['alertas', 'notificações', 'segurança', 'aviso', 'suspeito', 'tentativa'] },
    { id: 'security_backup', label: 'Backup & Recuperação', category: 'security', keywords: ['backup', 'recuperação', 'cópia', 'dados', 'baixar', 'zip', 'email alternativo'] },

    { id: 'notif_push', label: 'Preferências de Notificação', category: 'notifications', keywords: ['notificações', 'push', 'alertas', 'aviso', 'receber', 'som', 'vibração'] },

    { id: 'travel_currency', label: 'Moeda e Pagamentos', category: 'travel', keywords: ['moeda', 'pagamentos', 'dinheiro', 'câmbio', 'metical', 'dólar', 'euro'] }
];

const SettingsScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user: authUser, profile, refreshProfile } = useAuth();

    const [activeCategory, setActiveCategory] = useState('profile');
    const [activeSetting, setActiveSetting] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [editName, setEditName] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editNationality, setEditNationality] = useState('');
    const [editProfileType, setEditProfileType] = useState('');
    const [editDob, setEditDob] = useState('');
    const [pwdNew, setPwdNew] = useState('');
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [showPwd, setShowPwd] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState('');
    const [saveError, setSaveError] = useState('');

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (profile) {
            setEditName(profile.name || '');
            setEditUsername(profile.username || '');
            setEditPhone(profile.phone || '');
            setEditNationality(profile.nationality || '');
            setEditProfileType(profile.category || '');
            setEditDob(profile.date_of_birth || '');
        }
    }, [profile]);

    useEffect(() => {
        if (location.state?.openSetting) {
            const s = location.state.openSetting;
            setActiveSetting(s);
            const opt = SETTINGS_OPTIONS.find(o => o.id === s);
            if (opt) setActiveCategory(opt.category);
        }
    }, [location.state]);

    const showFeedback = (msg, isError = false) => {
        if (isError) { setSaveError(msg); setTimeout(() => setSaveError(''), 3500); }
        else { setSaveSuccess(msg); setTimeout(() => setSaveSuccess(''), 3500); }
    };

    const saveField = async (updates, successMsg) => {
        if (!authUser?.id) return;
        setIsSaving(true);
        try {
            await upsertProfile(authUser.id, updates);
            await refreshProfile();
            showFeedback(successMsg);
        } catch (err) {
            console.error('Settings save error:', err);
            showFeedback('Erro ao guardar. Tente novamente.', true);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSavePassword = async () => {
        if (pwdNew.length < 6) { showFeedback('Mínimo 6 caracteres.', true); return; }
        if (pwdNew !== pwdConfirm) { showFeedback('As senhas não coincidem.', true); return; }
        setIsSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: pwdNew });
            if (error) throw error;
            setPwdNew(''); setPwdConfirm('');
            showFeedback('Senha atualizada com sucesso!');
        } catch (err) {
            showFeedback('Erro ao atualizar senha.', true);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !authUser?.id) return;
        e.target.value = '';
        setIsSaving(true);
        try {
            const url = await uploadAvatar(authUser.id, file);
            await upsertProfile(authUser.id, { avatar_url: url });
            await refreshProfile();
            showFeedback('Foto atualizada!');
        } catch (err) {
            showFeedback('Erro ao carregar foto.', true);
        } finally {
            setIsSaving(false);
        }
    };

    const displayName = profile?.name || authUser?.email?.split('@')[0] || 'Utilizador';
    const displayUsername = profile?.username ? `@${profile.username}` : (authUser?.email ? `@${authUser.email.split('@')[0]}` : '@utilizador');
    const displayEmail = authUser?.email || 'email@exemplo.com';
    const displayPhone = profile?.phone || 'Sem número';
    const displayCategory = profile?.category || 'Seleciona o teu perfil';
    const displayNationality = profile?.nationality || 'De onde és?';
    const displayDob = profile?.date_of_birth || '—';

    const isSearching = searchTerm.trim().length > 0;
    const searchResults = isSearching
        ? SETTINGS_OPTIONS.filter(opt => {
            const term = searchTerm.toLowerCase();
            return opt.label.toLowerCase().includes(term) || opt.keywords.some(k => k.includes(term));
        })
        : [];

    const filteredCategories = isSearching
        ? SETTINGS_CATEGORIES.filter(category =>
            category.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            searchResults.some(result => result.category === category.id)
        )
        : SETTINGS_CATEGORIES;

    const SaveFeedback = () => (
        <>
            {saveSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', marginBottom: '16px', color: '#166534', fontSize: '14px' }}>
                    <Check size={16} /> {saveSuccess}
                </div>
            )}
            {saveError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', marginBottom: '16px', color: '#991b1b', fontSize: '14px' }}>
                    <AlertCircle size={16} /> {saveError}
                </div>
            )}
        </>
    );

    const SaveBtn = ({ onClick, label = 'Guardar Alterações' }) => (
        <button className="btn-primary" onClick={onClick} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isSaving ? <Loader2 size={16} className="spin-icon" /> : null}
            {isSaving ? 'A guardar...' : label}
        </button>
    );

    const renderCentralContent = () => {
        switch (activeCategory) {
            case 'profile':
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>Perfil e Aparência</h2>
                            <p>Gerencie como seu perfil é exibido para outros usuarios</p>
                        </div>

                        <div className="settings-card-group">
                            <div
                                className={`settings-option-card ${activeSetting === 'edit_avatar' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_avatar')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon">
                                        {profile?.avatar_url
                                            ? <img src={profile.avatar_url} alt="Avatar" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                                            : <Camera size={20} />}
                                    </div>
                                    <div className="settings-option-text">
                                        <h3>Foto de Perfil</h3>
                                        <p>Atualiza a foto de identificação da tua conta.</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_username' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_username')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon">
                                        <span style={{ fontWeight: 700, fontSize: '18px' }}>@</span>
                                    </div>
                                    <div className="settings-option-text">
                                        <h3>Nome de Utilizador</h3>
                                        <p>{displayUsername}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_name' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_name')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><User size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Nome Exibido</h3>
                                        <p>{displayName}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_profile_type' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_profile_type')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Briefcase size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Tipo de Perfil</h3>
                                        <p>{displayCategory}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_nationality' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_nationality')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Globe size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Nacionalidade</h3>
                                        <p>{displayNationality}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>
                        </div>
                    </div>
                );

            case 'account':
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>Conta e Dados Pessoais</h2>
                            <p>Gerencia as tuas informações privadas e definições regionais.</p>
                        </div>
                        <div className="settings-card-group">
                            <div
                                className={`settings-option-card ${activeSetting === 'edit_email' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_email')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><SettingsIcon size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Endereço de Email</h3>
                                        <p>{displayEmail}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_phone' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_phone')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Phone size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Número de Celular</h3>
                                        <p>{displayPhone}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_dob' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_dob')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Calendar size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Data de Nascimento</h3>
                                        <p>{displayDob}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_gender' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_gender')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Users size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Género</h3>
                                        <p>{profile?.gender || 'Não especificado'}</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'edit_language' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('edit_language')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Languages size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Idioma Preferido</h3>
                                        <p>Português (PT)</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>
                        </div>
                    </div>
                );

            case 'privacy':
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>Privacidade</h2>
                            <p>Controla quem pode ver e interagir com o teu conteúdo.</p>
                        </div>
                        <div className="settings-card-group">
                            <div
                                className={`settings-option-card ${activeSetting === 'privacy_profile' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('privacy_profile')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Lock size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Privacidade da Conta</h3>
                                        <p>Pública</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'privacy_messages' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('privacy_messages')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><MessageCircle size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Quem pode enviar mensagens</h3>
                                        <p>Amigos</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'privacy_stories' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('privacy_stories')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Play size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Quem pode ver as minhas Histórias</h3>
                                        <p>Público</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'privacy_blocked' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('privacy_blocked')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><AlertCircle size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Contas Bloqueadas</h3>
                                        <p>0 contas bloqueadas</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>Segurança</h2>
                            <p>Protege a tua conta GoTour contra acessos não autorizados.</p>
                        </div>
                        <div className="settings-card-group">
                            <div
                                className={`settings-option-card ${activeSetting === 'security_password' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('security_password')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Shield size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Palavra-passe</h3>
                                        <p>Alterar senha da conta</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'security_2fa' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('security_2fa')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><CheckCircle2 size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Autenticação em 2 Passos</h3>
                                        <p>Desativada</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'security_devices' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('security_devices')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Smartphone size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Dispositivos e Sessões</h3>
                                        <p>Gerir onde tens sessão iniciada</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'security_history' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('security_history')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><History size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Histórico de Logins Recentes</h3>
                                        <p>Verifica acessos à tua conta</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'security_alerts' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('security_alerts')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><ShieldAlert size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Alertas e Notificações de Segurança</h3>
                                        <p>Ativar avisos de segurança</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>

                            <div
                                className={`settings-option-card ${activeSetting === 'security_backup' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('security_backup')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Database size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Backup & Recuperação</h3>
                                        <p>Opções para recuperar o acesso</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>Notificações</h2>
                            <p>Gere os alertas que recebes na plataforma e no email.</p>
                        </div>
                        <div className="settings-card-group">
                            <div
                                className={`settings-option-card ${activeSetting === 'notif_push' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('notif_push')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Bell size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Preferências de Notificação</h3>
                                        <p>Ajustar o que recebes</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>
                        </div>
                    </div>
                );

            case 'travel':
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>Pagamentos</h2>
                            <p>Personaliza como descobres e agendas as tuas viagens.</p>
                        </div>
                        <div className="settings-card-group">
                            <div
                                className={`settings-option-card ${activeSetting === 'travel_currency' ? 'active' : ''}`}
                                onClick={() => setActiveSetting('travel_currency')}
                            >
                                <div className="settings-option-info">
                                    <div className="settings-option-icon"><Briefcase size={20} /></div>
                                    <div className="settings-option-text">
                                        <h3>Moeda e Pagamentos</h3>
                                        <p>MZN (Metical)</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="settings-chevron" />
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="settings-central-content animated-fade">
                        <div className="settings-header">
                            <h2>{SETTINGS_CATEGORIES.find(c => c.id === activeCategory)?.label}</h2>
                            <p>Opções para esta categoria.</p>
                        </div>
                    </div>
                );
        }
    };

    const renderRightPanelContent = () => {
        if (!activeSetting) {
            return (
                <div className="settings-right-empty">
                    <SettingsIcon size={48} className="empty-icon placeholder-spin" />
                    <h3>Selecione uma configuração</h3>
                    <p>Escolhe uma opção no painel central para editares os detalhes aqui.</p>
                </div>
            );
        }

        switch (activeSetting) {
            case 'edit_avatar':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Editar Foto de Perfil</h3>
                        <p className="editor-subtitle">Carrega uma imagem em alta resolução (min 400x400).</p>

                        <SaveFeedback />

                        <div className="editor-avatar-preview-container">
                            <div className="editor-avatar-preview">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                ) : (
                                    <User size={64} className="editor-avatar-placeholder" />
                                )}
                            </div>
                            <button className="editor-avatar-upload-btn" onClick={() => fileInputRef.current?.click()} disabled={isSaving}>
                                {isSaving ? <Loader2 size={18} className="spin-icon" /> : <Camera size={18} />}
                            </button>
                            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary" onClick={() => fileInputRef.current?.click()} disabled={isSaving}>
                                {isSaving ? 'A carregar...' : 'Carregar Nova Foto'}
                            </button>
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'edit_name':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Nome Exibido</h3>
                        <p className="editor-subtitle">Altera o nome visível no teu perfil GoTour.</p>

                        <SaveFeedback />

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    className="settings-input"
                                    placeholder="O seu nome completo"
                                />
                            </div>
                        </div>

                        <div className="editor-actions">
                            <SaveBtn onClick={() => saveField({ name: editName.trim() }, 'Nome atualizado!')} />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'edit_username':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Nome de Utilizador</h3>
                        <p className="editor-subtitle">Este é o teu identificador único na plataforma.</p>

                        <SaveFeedback />

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Username (@)</label>
                                <input
                                    type="text"
                                    value={editUsername}
                                    onChange={e => setEditUsername(e.target.value.replace(/\s+/g, '').toLowerCase())}
                                    className="settings-input"
                                    placeholder="nome_utilizador"
                                />
                                <span className="input-hint">Pode ser alterado 1 vez a cada 30 dias.</span>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <SaveBtn onClick={() => saveField({ username: editUsername.trim() }, 'Username atualizado!')} label="Verificar e Guardar" />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'edit_profile_type': {
                const profileTypes = [
                    { id: 'turista', label: 'Turista', icon: <User size={18} /> },
                    { id: 'explorador', label: 'Explorador', icon: <Compass size={18} /> },
                    { id: 'viajante', label: 'Viajante', icon: <MapPinned size={18} /> },
                    { id: 'mochileiro', label: 'Mochileiro', icon: <Briefcase size={18} /> },
                    { id: 'aventureiro', label: 'Aventureiro', icon: <Tent size={18} /> },
                    { id: 'estudante', label: 'Estudante', icon: <GraduationCap size={18} /> },
                    { id: 'nomada_digital', label: 'Nómada Digital', icon: <Laptop size={18} /> },
                    { id: 'criador_conteudo', label: 'Criador de Conteúdo', icon: <Camera size={18} /> }
                ];

                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Tipo de Perfil</h3>
                        <p className="editor-subtitle">Como te identificas na tua jornada GoTour?</p>

                        <SaveFeedback />

                        <div className="editor-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {profileTypes.map((type) => (
                                <button
                                    key={type.id}
                                    className={`profile-type-btn ${editProfileType === type.label ? 'active' : ''}`}
                                    onClick={() => setEditProfileType(type.label)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px', padding: '14px',
                                        borderRadius: '12px', border: editProfileType === type.label ? '2px solid #0d9488' : '1px solid #e2e8f0',
                                        background: editProfileType === type.label ? '#f0fdfa' : '#fff',
                                        color: editProfileType === type.label ? '#0d9488' : '#475569',
                                        cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontWeight: '500'
                                    }}
                                >
                                    {type.icon}
                                    {type.label}
                                </button>
                            ))}
                        </div>

                        <div className="editor-actions" style={{ marginTop: '24px' }}>
                            <SaveBtn onClick={() => saveField({ category: editProfileType }, 'Tipo de perfil guardado!')} label="Guardar Perfil" />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );
            }

            case 'edit_nationality': {
                const popularCountries = [
                    "Moçambique", "Angola", "Portugal", "Brasil", "Cabo Verde",
                    "São Tomé e Príncipe", "Guiné-Bissau", "África do Sul", "Espanha", "Estados Unidos",
                    "Reino Unido", "França", "Alemanha", "Itália", "Canadá", "Austrália"
                ];

                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Nacionalidade</h3>
                        <p className="editor-subtitle">De onde és? Ajudamos-te a conectar com viajantes da tua região.</p>

                        <SaveFeedback />

                        <div className="editor-form">
                            <div className="form-group">
                                <label>País de Origem</label>
                                <select
                                    className="settings-input"
                                    value={editNationality}
                                    style={{ appearance: 'auto', paddingRight: '16px', cursor: 'pointer' }}
                                    onChange={(e) => setEditNationality(e.target.value)}
                                >
                                    <option value="">Selecionar país...</option>
                                    {popularCountries.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <SaveBtn onClick={() => saveField({ nationality: editNationality }, 'Nacionalidade atualizada!')} label="Guardar Nacionalidade" />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );
            }

            case 'edit_email':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Endereço de Email</h3>
                        <p className="editor-subtitle">O email atual da tua conta.</p>

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Email Atual</label>
                                <input
                                    type="email"
                                    value={displayEmail}
                                    className="settings-input"
                                    readOnly
                                    style={{ background: '#f8fafc', color: '#64748b' }}
                                />
                                <span className="input-hint">O email é gerido pela autenticação Supabase. Para alterar, contacte o suporte.</span>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Fechar</button>
                        </div>
                    </div>
                );

            case 'edit_phone':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Número de Celular</h3>
                        <p className="editor-subtitle">Mantém o teu número de contacto atualizado.</p>

                        <SaveFeedback />

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Número de Telefone</label>
                                <input
                                    type="tel"
                                    value={editPhone}
                                    onChange={e => setEditPhone(e.target.value)}
                                    className="settings-input"
                                    placeholder="+258 84 000 0000"
                                />
                            </div>
                        </div>

                        <div className="editor-actions">
                            <SaveBtn onClick={() => saveField({ phone: editPhone.trim() }, 'Número atualizado!')} label="Guardar Número" />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'edit_dob':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Data de Nascimento</h3>
                        <p className="editor-subtitle">Garante que tens a idade adequada para aceder a certas funcionalidades.</p>

                        <SaveFeedback />

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Dia / Mês / Ano</label>
                                <input
                                    type="date"
                                    value={editDob}
                                    onChange={e => setEditDob(e.target.value)}
                                    className="settings-input"
                                    style={{ cursor: 'pointer' }}
                                />
                                <span className="input-hint">A tua data de nascimento não será exibida publicamente.</span>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <SaveBtn onClick={() => saveField({ date_of_birth: editDob }, 'Data de nascimento guardada!')} label="Guardar Alteração" />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'edit_gender':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Género</h3>
                        <p className="editor-subtitle">Esta informação ajuda-nos a personalizar a tua experiência GoTour.</p>

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Como te identificas?</label>
                                <select className="settings-input" defaultValue={profile?.gender || ''} style={{ appearance: 'auto', cursor: 'pointer' }}>
                                    <option value="">Selecionar...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                    <option value="Não binário">Não binário</option>
                                    <option value="Prefiro não dizer">Prefiro não dizer</option>
                                    <option value="Outro">Outro (especificar)</option>
                                </select>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Atualizar Registo</button>
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'edit_language':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Idioma Preferido</h3>
                        <p className="editor-subtitle">Em que idioma pretendes navegar na GoTour?</p>

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Idioma Base</label>
                                <select className="settings-input" defaultValue="PT" style={{ appearance: 'auto', cursor: 'pointer' }}>
                                    <option value="PT">Português (Moçambique/Portugal)</option>
                                    <option value="EN">English (US/UK)</option>
                                    <option value="FR">Français (France)</option>
                                    <option value="ES">Español (España/América Latina)</option>
                                </select>
                                <span className="input-hint">Algumas avaliações de locais serão traduzidas automaticamente para o teu idioma.</span>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Aplicar Idioma</button>
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'privacy_profile':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Privacidade da Conta</h3>
                        <p className="editor-subtitle">Define como a comunidade interage contigo.</p>

                        <div className="editor-form">
                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>Conta Privada</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                                        Apenas seguidores aprovados poderão ver as tuas publicações.
                                    </p>
                                </div>
                                <div className="settings-toggle false">
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>

                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>Mostrar Online</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                                        Pessoas que segues podem ver quando estás ativo.
                                    </p>
                                </div>
                                <div className="settings-toggle true">
                                    <div className="toggle-knob"></div>
                                </div>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Guardar Alterações</button>
                        </div>
                    </div>
                );

            case 'privacy_messages':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Quem pode enviar mensagens</h3>
                        <p className="editor-subtitle">Controla quem te pode enviar mensagens diretas na plataforma.</p>

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Permissões de Mensagem</label>
                                <select className="settings-input" defaultValue="Amigos" style={{ appearance: 'auto', cursor: 'pointer' }}>
                                    <option value="Amigos">Apenas Amigos</option>
                                    <option value="Público">Público (Qualquer pessoa)</option>
                                    <option value="Ninguém">Ninguém</option>
                                </select>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Atualizar Preferência</button>
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'privacy_stories':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Quem pode ver as minhas Histórias</h3>
                        <p className="editor-subtitle">Define as permissões de visualização para o teu conteúdo de 24 horas.</p>

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Privacidade das Histórias</label>
                                <select className="settings-input" defaultValue="Amigos" style={{ appearance: 'auto', cursor: 'pointer' }}>
                                    <option value="Amigos">Apenas Amigos</option>
                                    <option value="Público">Público (Qualquer pessoa)</option>
                                </select>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Guardar Definições</button>
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'security_password':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Palavra-passe</h3>
                        <p className="editor-subtitle">Assegura que a tua conta utiliza uma palavra-passe complexa de pelo menos 6 caracteres.</p>

                        <SaveFeedback />

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Nova Palavra-passe</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        value={pwdNew}
                                        onChange={e => setPwdNew(e.target.value)}
                                        placeholder="No mínimo 6 caracteres"
                                        className="settings-input"
                                        style={{ paddingRight: '44px' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd(!showPwd)}
                                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                                    >
                                        {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Confirmar Nova Palavra-passe</label>
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    value={pwdConfirm}
                                    onChange={e => setPwdConfirm(e.target.value)}
                                    placeholder="Repetir nova senha"
                                    className="settings-input"
                                />
                            </div>
                        </div>

                        <div className="editor-actions">
                            <SaveBtn onClick={handleSavePassword} label="Atualizar Palavra-passe" />
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Cancelar</button>
                        </div>
                    </div>
                );

            case 'security_2fa':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Autenticação em 2 Passos</h3>
                        <p className="editor-subtitle">Adiciona uma camada extra de segurança à tua conta. Em breve disponível.</p>

                        <div className="editor-form">
                            <div style={{ padding: '20px', background: '#f0fdfa', borderRadius: '12px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
                                <CheckCircle2 size={32} color="#0d9488" style={{ marginBottom: '8px' }} />
                                <p style={{ margin: 0, color: '#0d9488', fontWeight: '600' }}>Funcionalidade em Breve</p>
                                <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '13px' }}>A autenticação 2FA estará disponível numa próxima atualização.</p>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Fechar</button>
                        </div>
                    </div>
                );

            case 'security_devices':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Dispositivos e Sessões</h3>
                        <p className="editor-subtitle">Vê onde tens uma sessão ativa e encerra acessos não reconhecidos.</p>

                        <div className="editor-form">
                            <div className="settings-toggle-row" style={{ alignItems: 'flex-start' }}>
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Laptop size={16} /> Sessão Atual
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Sessão ativa agora</p>
                                </div>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-secondary" style={{ color: '#ef4444' }} onClick={async () => {
                                await supabase.auth.signOut({ scope: 'others' });
                                showFeedback('Outras sessões encerradas!');
                            }}>Encerrar Outras Sessões</button>
                        </div>
                    </div>
                );

            case 'security_history':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Histórico de Logins Recentes</h3>
                        <p className="editor-subtitle">Verifica se houve alguma atividade suspeita na tua conta.</p>

                        <div className="editor-form" style={{ gap: '12px' }}>
                            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>Sucesso</span>
                                    <span style={{ color: '#64748b', fontSize: '13px' }}>Agora</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Sessão atual</p>
                            </div>
                        </div>
                    </div>
                );

            case 'security_alerts':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Alertas de Segurança</h3>
                        <p className="editor-subtitle">Gere os avisos que recebes sobre compromissos de conta.</p>

                        <div className="editor-form">
                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>Logins Suspeitos</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Receber email se detetarmos um dispositivo novo.</p>
                                </div>
                                <div className="settings-toggle true"><div className="toggle-knob"></div></div>
                            </div>

                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b' }}>Alterações de Palavra-passe</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Avisos quando a tua senha é mudada.</p>
                                </div>
                                <div className="settings-toggle true"><div className="toggle-knob"></div></div>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Guardar Alertas</button>
                        </div>
                    </div>
                );

            case 'security_backup':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Backup & Recuperação</h3>
                        <p className="editor-subtitle">Garante que não perdes o acesso à tua conta e dados.</p>

                        <div className="editor-form">
                            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#f8fafc' }}>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1e293b' }}>Cópia de Dados Pessoais</h4>
                                <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b' }}>Podes descarregar um ficheiro com os teus dados de perfil.</p>
                                <button className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Database size={16} /> Baixar Cópia
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'notif_push':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Preferências de Notificação</h3>
                        <p className="editor-subtitle">Gere os alertas que recebes na plataforma e no email.</p>

                        <div className="editor-form">
                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MessageCircle size={16} /> Mensagens e chats
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Notificações quando recebes novas mensagens ou chats diretos.</p>
                                </div>
                                <div className="settings-toggle true"><div className="toggle-knob"></div></div>
                            </div>

                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircle2 size={16} /> Comentários e curtidas
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Alertas quando alguém comenta ou reage às tuas publicações.</p>
                                </div>
                                <div className="settings-toggle true"><div className="toggle-knob"></div></div>
                            </div>

                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Users size={16} /> Amigos
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Notificações sobre atividades ou interações dos teus amigos na plataforma.</p>
                                </div>
                                <div className="settings-toggle true"><div className="toggle-knob"></div></div>
                            </div>

                            <div className="settings-toggle-row">
                                <div className="toggle-info">
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <ShieldAlert size={16} /> Alertas do sistema
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Notificações de atualizações da app, segurança e login suspeito.</p>
                                </div>
                                <div className="settings-toggle true"><div className="toggle-knob"></div></div>
                            </div>
                        </div>
                        <div className="editor-actions">
                            <button className="btn-primary">Atualizar Notificações</button>
                        </div>
                    </div>
                );

            case 'travel_currency':
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Moeda e Pagamentos</h3>
                        <p className="editor-subtitle">Sabe exatamente quanto vais pagar escolhendo a tua moeda local.</p>

                        <div className="editor-form">
                            <div className="form-group">
                                <label>Moeda Principal</label>
                                <select className="settings-input">
                                    <option value="MZN">Metical (MZN)</option>
                                    <option value="USD">Dólar Americano (USD)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                    <option value="ZAR">Rand (ZAR)</option>
                                </select>
                            </div>
                        </div>

                        <div className="editor-actions">
                            <button className="btn-primary">Confirmar Preferência</button>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="settings-dynamic-editor animated-slide-left">
                        <h3>Editor Ativo</h3>
                        <p className="editor-subtitle">Configurando a opção selecionada.</p>
                        <div className="editor-actions">
                            <button className="btn-secondary" onClick={() => setActiveSetting(null)}>Fechar</button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="settings-screen">

            <div className="settings-back-bar">
                <button className="settings-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                </button>
            </div>

            <main className="settings-main-container">
                {/* 1. LEFT SIDEBAR */}
                <aside className="settings-sidebar">
                    <div className="settings-sidebar-header">
                        <h2>Definições</h2>
                        <div className="settings-search-bar">
                            <Search size={16} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Procurar configurações..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <nav className="settings-nav-list">
                        {filteredCategories.map(category => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    className={`settings-nav-item ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setActiveSetting(null);
                                    }}
                                >
                                    <Icon size={20} className="nav-item-icon" />
                                    <span>{category.label}</span>
                                </button>
                            );
                        })}
                        {filteredCategories.length === 0 && (
                            <div className="settings-nav-empty">
                                <p>Nenhum resultado.</p>
                            </div>
                        )}
                    </nav>
                </aside>

                {/* 2. CENTRAL PANEL */}
                <section className="settings-central-panel">
                    {isSearching ? (
                        <div className="settings-central-content animated-fade">
                            <div className="settings-header">
                                <h2>Resultados da Pesquisa</h2>
                                <p>Encontrámos {searchResults.length} {searchResults.length === 1 ? 'opção' : 'opções'} para "{searchTerm}".</p>
                            </div>

                            <div className="settings-card-group">
                                {searchResults.length > 0 ? (
                                    searchResults.map(result => (
                                        <div
                                            key={result.id}
                                            className={`settings-option-card ${activeSetting === result.id ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveCategory(result.category);
                                                setActiveSetting(result.id);
                                            }}
                                        >
                                            <div className="settings-option-info">
                                                <div className="settings-option-icon"><Search size={20} /></div>
                                                <div className="settings-option-text">
                                                    <h3>{result.label}</h3>
                                                    <p style={{ textTransform: 'capitalize' }}>{
                                                        SETTINGS_CATEGORIES.find(c => c.id === result.category)?.label
                                                    }</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="settings-chevron" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="settings-right-empty" style={{ padding: '40px 0' }}>
                                        <Search size={48} className="empty-icon" style={{ opacity: 0.5 }} />
                                        <h3>Sem resultados</h3>
                                        <p>Tente usar outros termos relacionados com definições.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        renderCentralContent()
                    )}
                </section>

                {/* 3. RIGHT DYNAMIC PANEL */}
                <aside className="settings-dynamic-panel">
                    {renderRightPanelContent()}
                </aside>
            </main>
        </div>
    );
};

export default SettingsScreen;
