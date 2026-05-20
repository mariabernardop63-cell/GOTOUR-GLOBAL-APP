import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../App';
import {
    Bell, Check, Trash2, Archive, Search, ChevronDown, X,
    MessageCircle, UserPlus, UserCheck, AlertCircle, PhoneMissed, AtSign
} from 'lucide-react';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './NotificationsScreenStyles.css';

// --- MOCK DATA ---
const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'message_individual',
        title: 'Ana Silva enviou uma mensagem',
        subtitle: 'Olá! Como estão os preparativos para a viagem?',
        time: 'Agora mesmo',
        group: 'Hoje',
        unread: true,
        avatar: 'https://i.pravatar.cc/150?u=ana',
        icon: MessageCircle,
        iconColor: '#3b82f6',
        details: { fullMessage: 'Olá! Como estão os preparativos para a viagem? Estava a pensar se devíamos alugar carro ou se confiávamos nos comboios por lá. O que achas?' }
    },
    {
        id: 2,
        type: 'friend_request',
        title: 'Novo pedido de amizade',
        subtitle: 'Carlos Mendes quer conectar-se.',
        time: 'Há 2 horas',
        group: 'Hoje',
        unread: true,
        avatar: 'https://i.pravatar.cc/150?u=carlos',
        icon: UserPlus,
        iconColor: '#8b5cf6',
        details: { bio: 'Viajante solo. 45 países visitados. Fotógrafo aficionado.', mutualFriends: 12 }
    },
    {
        id: 3,
        type: 'mention',
        title: 'Foste mencionado num comentário',
        subtitle: 'Sofia comentou: "@gotour_user tens de ver este roteiro!"',
        time: 'Há 5 horas',
        group: 'Hoje',
        unread: false,
        avatar: 'https://i.pravatar.cc/150?u=sofia',
        icon: AtSign,
        iconColor: '#f59e0b',
        details: { destination: 'Kyoto, Japão', comment: '@gotour_user tens de ver este roteiro! Acho que se encaixa perfeitamente na nossa viagem de Outono.' }
    },
    {
        id: 4,
        type: 'missed_call',
        title: 'Chamada perdida',
        subtitle: 'Tentativa de chamada de João Paulo',
        time: 'Ontem, 18:30',
        group: 'Ontem',
        unread: false,
        avatar: 'https://i.pravatar.cc/150?u=joao',
        icon: PhoneMissed,
        iconColor: '#ef4444',
        details: { duration: '0s', caller: 'João Paulo' }
    },
    {
        id: 5,
        type: 'system',
        title: 'Actualização do Sistema',
        subtitle: 'A versão 2.4 com Novos Mapas Offline já está disponível!',
        time: 'Ontem, 09:00',
        group: 'Ontem',
        unread: false,
        avatar: null,
        icon: AlertCircle,
        iconColor: '#10b981',
        details: { releaseNotes: 'Novidades:\n- Suporte total a mapas offline em HD\n- Correção de bugs no roteador VIP\n- Maior velocidade no carregamento de fotos.' }
    },
    {
        id: 6,
        type: 'friend_accepted',
        title: 'Pedido de amizade aceite',
        subtitle: 'Mariana Costa é agora tua amiga.',
        time: 'Segunda-feira',
        group: 'Esta semana',
        unread: false,
        avatar: 'https://i.pravatar.cc/150?u=mariana',
        icon: UserCheck,
        iconColor: '#10b981',
        details: { action: 'Começar a partilhar roteiros com Mariana!' }
    }
];

const FILTERS = ['Todas', 'Não lidas', 'Mensagens', 'Amizades', 'Sistema', 'Chamadas', 'Menções'];

const NotificationsScreen = () => {
    const navigate = useNavigate();
    const { navigateBack } = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todas');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Simulate fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotifications(MOCK_NOTIFICATIONS);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const deleteNotification = (id, e) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const archiveNotification = (id, e) => {
        e.stopPropagation();
        // In a real app this might move it to a different tab, here we just remove it for visual simplicity
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleNotificationClick = (notif) => {
        if (notif.unread) markAsRead(notif.id);
    };

    // Filter Logic
    const filteredNotifications = notifications.filter(notif => {
        const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notif.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesFilter = true;
        switch (activeFilter) {
            case 'Não lidas': matchesFilter = notif.unread; break;
            case 'Mensagens': matchesFilter = notif.type.includes('message'); break;
            case 'Amizades': matchesFilter = notif.type.includes('friend'); break;
            case 'Sistema': matchesFilter = notif.type === 'system'; break;
            case 'Chamadas': matchesFilter = notif.type === 'missed_call'; break;
            case 'Menções': matchesFilter = notif.type === 'mention'; break;
            default: matchesFilter = true; break;
        }

        return matchesSearch && matchesFilter;
    });

    // Grouping
    const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
        if (!acc[notif.group]) acc[notif.group] = [];
        acc[notif.group].push(notif);
        return acc;
    }, {});

    const groups = ['Hoje', 'Ontem', 'Esta semana', 'Anteriores'].filter(g => groupedNotifications[g]);


    return (
        <div className="notifications-layout-root">
            <button className="notif-close-btn desktop-only" onClick={() => navigateBack()} aria-label="Fechar">
                <X size={24} />
            </button>
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            {/* Mobile/Tablet Fixed Header (Hidden on large desktop by layout) */}
            <div className="home-fixed-header mobile-only">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigate('/home')}
                    isDrawerOpen={isDrawerOpen}
                />
            </div>

            <main className="notifications-main-content">
                {/* COLUMN 1: NOTIFICATIONS LIST */}
                <section className="notif-list-column">
                    <header className="notif-list-header">
                        <div className="notif-title-row">
                            <div>
                                <h1><Bell size={24} className="title-icon" /> Notificações</h1>
                                <p className="notif-subtitle">Gerencie e acompanhe todas as atividades da sua conta.</p>
                            </div>
                            <button className="mark-read-btn" onClick={markAllAsRead}>
                                <Check size={16} /> Marcar todas como lidas
                            </button>
                        </div>

                        <div className="notif-controls-row">
                            <div className="notif-search-wrapper">
                                <Search size={18} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="🔎 Pesquisar notificações"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="notif-filter-dropdown-wrapper">
                                <button
                                    className="notif-filter-trigger"
                                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                                >
                                    {activeFilter} <ChevronDown size={16} className={isFilterDropdownOpen ? 'rotated' : ''} />
                                </button>

                                {isFilterDropdownOpen && (
                                    <div className="notif-filter-dropdown-menu blur-backdrop">
                                        {FILTERS.map(filter => (
                                            <button
                                                key={filter}
                                                className={`notif-filter-option ${activeFilter === filter ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setActiveFilter(filter);
                                                    setIsFilterDropdownOpen(false);
                                                }}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    <div className="notif-scroll-area premium-scroll">
                        {isLoading ? (
                            <div className="notif-skeleton-loader">
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n} className="skeleton-notif-item">
                                        <div className="skeleton-avatar"></div>
                                        <div className="skeleton-lines">
                                            <div className="skeleton-line short"></div>
                                            <div className="skeleton-line long"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="notif-empty-state">
                                <div className="empty-icon-circle"><Bell size={32} color="#94a3b8" /></div>
                                <h3>Você ainda não possui notificações.</h3>
                                <p>As suas interações, mensagens e alertas aparecerão aqui.</p>
                            </div>
                        ) : (
                            <div className="notif-grouped-list">
                                {groups.map(group => (
                                    <div key={group} className="notif-group">
                                        <h4 className="notif-group-header">{group}</h4>
                                        <div className="notif-group-items">
                                            {groupedNotifications[group].map(notif => {
                                                const NotifIcon = notif.icon;

                                                return (
                                                    <div
                                                        key={notif.id}
                                                        className={`notif-item-card ${notif.unread ? 'unread' : ''}`}
                                                        onClick={() => handleNotificationClick(notif)}
                                                    >
                                                        {notif.unread && <div className="notif-unread-indicator"></div>}

                                                        <button 
                                                            className="notif-item-avatar-wrapper clickable"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (notif.avatar) {
                                                                    navigate('/profile', { 
                                                                        state: { 
                                                                            user: { 
                                                                                name: notif.title.split(' ')[0], // Best effort name
                                                                                avatar: notif.avatar,
                                                                                username: `@${notif.title.split(' ')[0].toLowerCase()}`
                                                                            } 
                                                                        } 
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            {notif.avatar ? (
                                                                <img src={notif.avatar} alt="Avatar" className="notif-item-avatar" />
                                                            ) : (
                                                                <div className="notif-item-icon-circle" style={{ backgroundColor: `${notif.iconColor}15`, color: notif.iconColor }}>
                                                                    <NotifIcon size={20} strokeWidth={2} />
                                                                </div>
                                                            )}
                                                            {notif.avatar && (
                                                                <div className="notif-item-small-badge" style={{ backgroundColor: notif.iconColor }}>
                                                                    <NotifIcon size={10} color="#fff" strokeWidth={3} />
                                                                </div>
                                                            )}
                                                        </button>

                                                        <div className="notif-item-content">
                                                            <div className="notif-item-title-row">
                                                                <h4 className="notif-item-title">{notif.title}</h4>
                                                                <span className="notif-item-time">{notif.time}</span>
                                                            </div>
                                                            <p className="notif-item-subtitle">{notif.subtitle}</p>
                                                        </div>

                                                        <div className="notif-quick-actions">
                                                            {notif.unread && (
                                                                <button
                                                                    className="quick-action-btn"
                                                                    title="Marcar como lida"
                                                                    onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}
                                                                >
                                                                    <Check size={16} />
                                                                </button>
                                                            )}
                                                            <button
                                                                className="quick-action-btn"
                                                                title="Arquivar"
                                                                onClick={(e) => archiveNotification(notif.id, e)}
                                                            >
                                                                <Archive size={16} />
                                                            </button>
                                                            <button
                                                                className="quick-action-btn danger"
                                                                title="Apagar"
                                                                onClick={(e) => deleteNotification(notif.id, e)}
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <BottomNavBar />
        </div>
    );
};

export default NotificationsScreen;
