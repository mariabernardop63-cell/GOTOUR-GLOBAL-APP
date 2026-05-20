import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, MapPinned, User, Rss, Home, Search, Loader2, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../App';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './DesktopSidebar.css';

const DesktopSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground } = useNavigation();

    // Animation States
    const [isExiting, setIsExiting] = useState(false);
    const [clickedItemId, setClickedItemId] = useState(null);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/home' },
        { id: 'categories', label: 'Categorias', icon: LayoutGrid, path: '/categories' },
        { id: 'feed', label: 'Feed', icon: Rss, path: '/feed' },
        { id: 'map', label: 'Mapa', icon: MapPinned, path: '/map' },
        { id: 'notifications', label: 'Notificações', icon: Bell, path: '/notifications' },
        { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
    ];

    // Handle smooth staggered exit before navigating
    const handleNavigation = (item) => {
        if (location.pathname.startsWith(item.path)) return; // Already there

        setIsExiting(true);
        setClickedItemId(item.id);

        // Wait for stagger animation to finish (~400ms) before routing
        setTimeout(() => {
            if (item.path === '/notifications' || item.path === '/profile') {
                setModalBackground(location);
            } else {
                setModalBackground(null);
            }
            navigate(item.path);
        }, 500); // Route after animation finishes
    };

    // Animation Variants for Container (Stagger Config)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                staggerDirection: -1
            }
        }
    };

    // Animation Variants for Items (Slide Up Config)
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 20 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } }
    };

    return (
        <AnimatePresence>
            <motion.aside
                className="desktop-sidebar"
                variants={containerVariants}
                initial="hidden"
                animate={isExiting ? "exit" : "show"}
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
                        const isActive = location.pathname.startsWith(item.path) || (item.path === '/home' && location.pathname === '/');
                        const isClicked = clickedItemId === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                variants={itemVariants}
                                className={`sidebar-nav-item ${isActive && !isExiting ? 'active' : ''} ${isClicked ? 'processing' : ''}`}
                                onClick={() => handleNavigation(item)}
                                aria-label={item.label}
                                disabled={isExiting}
                            >
                                <div className="sidebar-nav-icon-wrapper">
                                    {isClicked ? (
                                        <Loader2 size={26} className="sidebar-loading-spinner" />
                                    ) : (
                                        <item.icon
                                            size={26}
                                            strokeWidth={isActive ? 2.5 : 1.8}
                                            fill={isActive && item.id !== 'home' ? 'currentColor' : 'none'}
                                        />
                                    )}
                                </div>
                                <span className="sidebar-nav-label">
                                    {isClicked ? 'A carregar...' : item.label}
                                </span>
                            </motion.button>
                        )
                    })}
                </motion.nav>
            </motion.aside>
        </AnimatePresence>
    );
};

export default DesktopSidebar;
