import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import {
    Bell, Check, Trash2, Archive, Search, ChevronDown, X,
    MessageCircle, UserPlus, UserCheck, AlertCircle, PhoneMissed, AtSign
} from 'lucide-react';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import '../../components/HomeHeader/HomeFixedHeaderStyles.css';
import './NotificationsScreenStyles.css';

const FILTERS = ['Todas', 'Não lidas', 'Mensagens', 'Amizades', 'Sistema', 'Chamadas', 'Menções'];

function formatRelativeTime(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Agora mesmo';
    if (diffMin < 60) return `Há ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `Há ${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'Ontem';
    if (diffD < 7) return `Há ${diffD} dias`;
    return d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
}

function getGroup(isoString) {
    if (!isoString) return 'Anteriores';
    const d = new Date(isoString);
    const now = new Date();
    const diffH = (now - d) / 3600000;
    if (diffH < 24) return 'Hoje';
    if (diffH < 48) return 'Ontem';
    if (diffH < 168) return 'Esta semana';
    return 'Anteriores';
}

function getIconForType(type) {
    const map = {
        message: MessageCircle,
        message_individual: MessageCircle,
        message_group: MessageCircle,
        friend_request: UserPlus,
        friend_accepted: UserCheck,
        mention: AtSign,
        missed_call: PhoneMissed,
        system: AlertCircle,
    };
    return map[type] || Bell;
}

function getColorForType(type) {
    const map = {
        message: '#3b82f6',
        message_individual: '#3b82f6',
        message_group: '#3b82f6',
        friend_request: '#8b5cf6',
        friend_accepted: '#10b981',
        mention: '#f59e0b',
        missed_call: '#ef4444',
        system: '#10b981',
    };
    return map[type] || '#6b7280';
}

function mapNotification(n) {
    return {
        id: n.id,
        type: n.type || 'system',
        title: n.title || 'Notificação',
        subtitle: n.body || '',
        time: formatRelativeTime(n.created_at),
        group: getGroup(n.created_at),
        unread: !n.is_read,
        avatar: n.actor?.avatar_url || null,
        actorName: n.actor?.name || n.actor?.username || null,
        icon: getIconForType(n.type),
        iconColor: getColorForType(n.type),
    };
}

const GROUPS_ORDER = ['Hoje', 'Ontem', 'Esta semana', 'Anteriores'];

const NotificationsScreen = () => {
    const navigate = useNavigate();
    const { navigateBack } = useNavigation();
    const { user } = useAuth();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todas');
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [error, setError] = useState(null);

    const loadNotifications = useCallback(async () => {
        if (!user?.id) {
            setNotifications([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const { data, error: fetchError } = await supabase
                .from('notifications')
                .select('*, actor:profiles!notifications_actor_id_fkey(id, name, username, avatar_url)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(80);

            if (fetchError) {
                if (fetchError.message?.includes('relationship') || fetchError.message?.includes('fkey')) {
                    const { data: data2, error: fetchError2 } = await supabase
                        .from('notifications')
                        .select('*')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false })
                        .limit(80);
                    if (fetchError2) throw fetchError2;
                    setNotifications((data2 || []).map(mapNotification));
                } else {
                    throw fetchError;
                }
            } else {
                setNotifications((data || []).map(mapNotification));
            }
        } catch (err) {
            console.error('Notifications fetch error:', err);
            setError('Não foi possível carregar as notificações.');
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const markAllAsRead = async () => {
        if (!user?.id) return;
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
        await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false);
    };

    const markAsRead = async (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
        await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    };

    const deleteNotification = async (id, e) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
        await supabase.from('notifications').delete().eq('id', id);
    };

    const archiveNotification = (id, e) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleNotificationClick = (notif) => {
        if (notif.unread) markAsRead(notif.id);
    };

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

    const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
        if (!acc[notif.group]) acc[notif.group] = [];
        acc[notif.group].push(notif);
        return acc;
    }, {});

    const groups = GROUPS_ORDER.filter(g => groupedNotifications[g]);

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="notifications-layout-root">
            <button className="notif-close-btn desktop-only" onClick={() => navigateBack()} aria-label="Fechar">
                <X size={24} />
            </button>
            <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

            <div className="home-fixed-header mobile-only">
                <HomeHeader
                    onMenuClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    onLogoClick={() => navigate('/home')}
                    isDrawerOpen={isDrawerOpen}
                />
            </div>

            <main className="notifications-main-content">
                <section className="notif-list-column">
                    <header className="notif-list-header">
                        <div className="notif-title-row">
                            <div>
                                <h1>
                                    <Bell size={24} className="title-icon" /> Notificações
                                    {unreadCount > 0 && (
                                        <span style={{ marginLeft: 10, background: '#ef4444', color: '#fff', borderRadius: 20, fontSize: 12, fontWeight: 700, padding: '2px 8px' }}>
                                            {unreadCount}
                                        </span>
                                    )}
                                </h1>
                                <p className="notif-subtitle">Gerencie e acompanhe todas as atividades da sua conta.</p>
                            </div>
                            {unreadCount > 0 && (
                                <button className="mark-read-btn" onClick={markAllAsRead}>
                                    <Check size={16} /> Marcar todas como lidas
                                </button>
                            )}
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
                        ) : error ? (
                            <div className="notif-empty-state">
                                <div className="empty-icon-circle"><AlertCircle size={32} color="#ef4444" /></div>
                                <h3>Erro ao carregar</h3>
                                <p>{error}</p>
                                <button onClick={loadNotifications} style={{ marginTop: 12, padding: '8px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                                    Tentar novamente
                                </button>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="notif-empty-state">
                                <div className="empty-icon-circle"><Bell size={32} color="#94a3b8" /></div>
                                <h3>Nenhuma notificação</h3>
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
                                                                if (notif.avatar || notif.actorName) {
                                                                    navigate('/profile', {
                                                                        state: {
                                                                            user: {
                                                                                name: notif.actorName || notif.title.split(' ')[0],
                                                                                avatar: notif.avatar,
                                                                                username: notif.actorName
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
