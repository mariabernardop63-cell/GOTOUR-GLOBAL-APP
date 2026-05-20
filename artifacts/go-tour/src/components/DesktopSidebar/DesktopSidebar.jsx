import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutGrid, MapPinned, User, Rss, Home, Search, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../App';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './DesktopSidebar.css';

const DesktopSidebar = () => {
    const location = useLocation();
    const { navigateFade, setModalBackground } = useNavigation();

    const navItems = [
        { id: 'home',          label: 'Home',         icon: Home,       path: '/home' },
        { id: 'categories',    label: 'Categorias',   icon: LayoutGrid, path: '/categories' },
        { id: 'feed',          label: 'Feed',         icon: Rss,        path: '/feed' },
        { id: 'map',           label: 'Mapa',         icon: MapPinned,  path: '/map' },
        { id: 'notifications', label: 'Notificações', icon: Bell,       path: '/notifications' },
        { id: 'profile',       label: 'Perfil',       icon: User,       path: '/profile' },
    ];

    const handleNavigation = (item) => {
        if (location.pathname.startsWith(item.path)) return;
        if (item.path === '/notifications' || item.path === '/profile') {
            setModalBackground(location);
        } else {
            setModalBackground(null);
        }
        navigateFade(item.path);
    };

    // Entry stagger for sidebar items on first mount
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.05 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -16 },
        show:   { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } },
    };

    return (
        <motion.aside
            className="desktop-sidebar"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <motion.div className="desktop-sidebar-header" variants={itemVariants}>
                <img
                    src={gotourLogo}
                    alt="GoTour Logo"
                    className="desktop-sidebar-logo"
                    onClick={() => handleNavigation({ id: 'logo', path: '/home' })}
                />
            </motion.div>

            <motion.div className="desktop-sidebar-search" variants={itemVariants}>
                <div className="sidebar-search-container">
                    <Search size={18} className="sidebar-search-icon" />
                    <input type="text" placeholder="Pesquisar..." className="sidebar-search-input" />
                </div>
            </motion.div>

            <motion.nav className="desktop-sidebar-nav" variants={containerVariants}>
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path) ||
                        (item.path === '/home' && location.pathname === '/');

                    return (
                        <motion.button
                            key={item.id}
                            variants={itemVariants}
                            className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => handleNavigation(item)}
                            aria-label={item.label}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <div className="sidebar-nav-icon-wrapper">
                                <item.icon
                                    size={26}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                    fill={isActive && item.id !== 'home' ? 'currentColor' : 'none'}
                                />
                            </div>
                            <span className="sidebar-nav-label">{item.label}</span>
                        </motion.button>
                    );
                })}
            </motion.nav>
        </motion.aside>
    );
};

export default DesktopSidebar;
