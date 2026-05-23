import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { getDisplayName, getUsername } from '../../lib/profileService';
import { supabase } from '../../lib/supabase';
import {
    X, User, ChevronRight, Star, Crown,
    MessageCircle, Users, Bell, Heart,
    MapPin, Compass, BookOpen, Layers,
    Calendar, Briefcase, Clock, Ticket,
    SlidersHorizontal, Globe, Palette, BellRing, ShieldCheck,
    Lock, UserX, Smartphone, FileText,
    LifeBuoy, AlertTriangle, Headphones, Info,
    LogOut, ChevronDown
} from 'lucide-react';
import './DrawerMenu.css';

const DrawerMenu = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isPlanOpen, setIsPlanOpen] = useState(false);
    const { user: authUser, profile, signOut } = useAuth();

    const displayName = getDisplayName(profile, authUser);
    const username = getUsername(profile, authUser);
    const avatarUrl = profile?.avatar_url || null;

    // Badge counts
    const [pendingFriends, setPendingFriends] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [unreadNotifs, setUnreadNotifs] = useState(0);

    const loadCounts = useCallback(async () => {
        if (!authUser?.id) return;
        try {
            const [
                { count: pf },
                { count: un },
                { data: msgs },
            ] = await Promise.all([
                // Pending friend requests
                supabase
                    .from('friendships')
                    .select('id', { count: 'exact', head: true })
                    .eq('friend_id', authUser.id)
                    .eq('status', 'pending'),
                // Unread notifications
                supabase
                    .from('notifications')
                    .select('id', { count: 'exact', head: true })
                    .eq('user_id', authUser.id)
                    .eq('is_read', false),
                // Conversations for unread messages
                supabase
                    .from('conversation_participants')
                    .select('conversation_id, last_read_at')
                    .eq('user_id', authUser.id),
            ]);
            setPendingFriends(pf || 0);
            setUnreadNotifs(un || 0);

            // Count unread messages across all conversations
            if (msgs?.length) {
                let totalUnread = 0;
                await Promise.all(msgs.map(async (p) => {
                    const { count } = await supabase
                        .from('messages')
                        .select('id', { count: 'exact', head: true })
                        .eq('conversation_id', p.conversation_id)
                        .neq('sender_id', authUser.id)
                        .gt('created_at', p.last_read_at || '1970-01-01T00:00:00Z');
                    totalUnread += count || 0;
                }));
                setUnreadMessages(totalUnread);
            }
        } catch {
            // Silently ignore if tables don't exist yet
        }
    }, [authUser?.id]);

    useEffect(() => {
        if (isOpen && authUser?.id) {
            loadCounts();
        }
    }, [isOpen, loadCounts]);

    // Real-time subscription for new messages when drawer is open
    useEffect(() => {
        if (!authUser?.id || !isOpen) return;
        const channel = supabase
            .channel(`drawer-msgs-${authUser.id}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `sender_id=neq.${authUser.id}`,
            }, () => {
                loadCounts();
            })
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [authUser?.id, isOpen, loadCounts]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsPlanOpen(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const location = useLocation();
    const { setModalBackground } = useNavigation();

    const handleNav = (path) => {
        if (path === '/notifications' || path === '/profile' || path === '/friends' || path === '/messages') {
            setModalBackground(location);
        } else {
            setModalBackground(null);
        }
        onClose();
        setTimeout(() => navigate(path), 250);
    };

    const handleSignOut = async () => {
        onClose();
        await signOut();
        setTimeout(() => navigate('/home'), 300);
    };

    const totalDot = pendingFriends + unreadMessages + unreadNotifs;

    return (
        <>
            <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

            <div className={`drawer-panel ${isOpen ? 'open' : ''}`}>

                {/* HEADER */}
                <div className="drawer-head">
                    <button className="drawer-close" onClick={onClose} aria-label="Fechar menu">
                        <X size={22} strokeWidth={2.5} />
                    </button>

                    <div className="drawer-profile" onClick={() => handleNav('/profile')}>
                        <div className="drawer-avatar" style={{ position: 'relative' }}>
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Perfil" className="drawer-avatar-img" />
                            ) : (
                                <User size={26} />
                            )}
                            {totalDot > 0 && (
                                <span className="drawer-avatar-dot" />
                            )}
                        </div>
                        <div className="drawer-user-info">
                            <span className="drawer-user-name">{displayName}</span>
                            <span className="drawer-user-email">{authUser?.email || username}</span>
                        </div>
                        <ChevronRight size={20} className="drawer-profile-arrow" />
                    </div>

                    {/* Plan Badge */}
                    <div className="drawer-plan-area">
                        <button className="drawer-plan-badge" onClick={() => setIsPlanOpen(!isPlanOpen)}>
                            <Crown size={14} />
                            <span>Plano Free</span>
                            <ChevronDown size={14} className={`drawer-plan-chevron ${isPlanOpen ? 'rotated' : ''}`} />
                        </button>

                        {isPlanOpen && (
                            <div className="drawer-plan-dropdown">
                                <button className="drawer-plan-option" onClick={() => setIsPlanOpen(false)}>
                                    <span>Plano Básico</span>
                                </button>
                                <button className="drawer-plan-option drawer-plan-premium" onClick={() => setIsPlanOpen(false)}>
                                    <span>Plano Premium</span>
                                    <Star size={14} />
                                </button>
                                <button className="drawer-plan-upgrade" onClick={() => setIsPlanOpen(false)}>
                                    Atualizar Plano
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* SCROLLABLE BODY */}
                <div className="drawer-body">

                    <div className="drawer-shortcuts">
                        <button className="drawer-shortcut" onClick={() => handleNav('/messages')}>
                            <div className="drawer-shortcut-icon" style={{ position: 'relative' }}>
                                <MessageCircle size={20} />
                            </div>
                            <span>Mensagens</span>
                            {unreadMessages > 0 && (
                                <span className="drawer-shortcut-count drawer-count-active">{unreadMessages}</span>
                            )}
                        </button>
                        <button className="drawer-shortcut" onClick={() => handleNav('/friends')}>
                            <div className="drawer-shortcut-icon">
                                <Users size={20} />
                            </div>
                            <span>Amigos</span>
                            {pendingFriends > 0 && (
                                <span className="drawer-shortcut-count drawer-count-active">{pendingFriends}</span>
                            )}
                        </button>
                        <button className="drawer-shortcut" onClick={() => handleNav('/notifications')}>
                            <div className="drawer-shortcut-icon">
                                <Bell size={20} />
                            </div>
                            <span>Notificações</span>
                            {unreadNotifs > 0 && (
                                <span className="drawer-shortcut-count drawer-count-active">{unreadNotifs}</span>
                            )}
                        </button>
                        <button className="drawer-shortcut">
                            <div className="drawer-shortcut-icon"><Heart size={20} /></div>
                            <span>Favoritos</span>
                        </button>
                    </div>

                    <div className="drawer-sep" />

                    <p className="drawer-section-label">Ferramentas</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={MessageCircle} label="Mensagens" onClick={() => handleNav('/messages')} badge={unreadMessages} />
                        <DrawerItem icon={BellRing} label="Notificações" onClick={() => handleNav('/notifications')} badge={unreadNotifs} />
                        <DrawerItem icon={Users} label="Amigos" onClick={() => handleNav('/friends')} badge={pendingFriends} />
                        <DrawerItem icon={Compass} label="Interesses" />
                        <DrawerItem icon={Layers} label="Coleções" />
                        <DrawerItem icon={MapPin} label="Notas de Viagem" />
                        <DrawerItem icon={Calendar} label="Visitar Depois" />
                        <DrawerItem icon={BookOpen} label="Minhas Publicações" />
                        <DrawerItem icon={Briefcase} label="Meus Comentários" />
                        <DrawerItem icon={Clock} label="Histórico" />
                        <DrawerItem icon={Ticket} label="Minhas Reservas" />
                        <DrawerItem icon={Star} label="Eventos Próximos" />
                        <DrawerItem icon={Crown} label="Planos & Assinatura" />
                    </nav>

                    <div className="drawer-sep" />

                    <p className="drawer-section-label">Definições</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={SlidersHorizontal} label="Conta" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Globe} label="Idioma & País" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Palette} label="Aparência" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Bell} label="Notificações" onClick={() => handleNav('/notifications')} />
                        <DrawerItem icon={ShieldCheck} label="Segurança" onClick={() => handleNav('/settings')} />
                    </nav>

                    <div className="drawer-sep" />

                    <p className="drawer-section-label">Privacidade</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={Lock} label="Privacidade da Conta" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={UserX} label="Bloqueados" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={Smartphone} label="Permissões do App" onClick={() => handleNav('/settings')} />
                        <DrawerItem icon={FileText} label="Termos e Políticas" onClick={() => handleNav('/settings')} />
                    </nav>

                    <div className="drawer-sep" />

                    <p className="drawer-section-label">Suporte</p>
                    <nav className="drawer-nav">
                        <DrawerItem icon={LifeBuoy} label="Central de Ajuda" />
                        <DrawerItem icon={AlertTriangle} label="Reportar Problema" />
                        <DrawerItem icon={Headphones} label="Contactar Suporte" />
                        <DrawerItem icon={Info} label="Sobre a GoTour" />
                    </nav>
                </div>

                {/* FOOTER */}
                <div className="drawer-foot">
                    <button className="drawer-logout" onClick={handleSignOut}>
                        <LogOut size={20} />
                        <span>Terminar Sessão</span>
                    </button>
                </div>
            </div>
        </>
    );
};

const DrawerItem = ({ icon: Icon, label, onClick, badge }) => (
    <button className="drawer-item" onClick={onClick}>
        <Icon size={20} strokeWidth={1.8} />
        <span>{label}</span>
        {badge > 0 && (
            <span className="drawer-item-badge">{badge > 99 ? '99+' : badge}</span>
        )}
    </button>
);

export default DrawerMenu;
