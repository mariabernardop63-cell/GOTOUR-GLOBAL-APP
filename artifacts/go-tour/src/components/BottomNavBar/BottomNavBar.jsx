import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutGrid, MapPinned, User, Rss } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';
import homeIcon from '../../assets/images/home_icon.png';
import './BottomNavBar.css';

const CustomIcon = ({ iconSrc, size, className }) => (
    <div
        className={`${className} custom-nav-icon`}
        style={{
            width: size,
            height: size,
            maskImage: `url(${iconSrc})`,
            WebkitMaskImage: `url(${iconSrc})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            backgroundColor: 'currentColor',
        }}
    />
);

const BottomNavBar = () => {
    const location = useLocation();
    const { setModalBackground, navigateFade } = useNavigation();
    const navRef = useRef(null);
    const itemRefs = useRef([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    const navItems = [
        { id: 'home',       label: 'Home',      icon: (props) => <CustomIcon iconSrc={homeIcon} {...props} />, path: '/home', customSize: 40 },
        { id: 'categories', label: 'Categorias', icon: LayoutGrid, path: '/categories' },
        { id: 'feed',       label: 'Feed',       icon: Rss, path: '/feed' },
        { id: 'map',        label: 'Mapa',       icon: MapPinned, path: '/map' },
        { id: 'profile',    label: 'Perfil',     icon: User, path: '/profile', customSize: 30 },
    ];

    const isActive = (path) => location.pathname === path || (path === '/home' && location.pathname === '/');
    const activeIndex = navItems.findIndex(item => isActive(item.path));

    // Compute sliding indicator position from the active item's DOM position
    useEffect(() => {
        const nav = navRef.current;
        const el = itemRefs.current[activeIndex];
        if (!nav || !el) return;

        const navRect = nav.getBoundingClientRect();
        const itemRect = el.getBoundingClientRect();
        const left = itemRect.left - navRect.left + itemRect.width / 2;
        const width = 28;

        setIndicatorStyle({ left: left - width / 2, width });
    }, [activeIndex, location.pathname]);

    const isMapPage = location.pathname === '/map';

    return (
        <nav className="bottom-nav" ref={navRef}>
            {/* Sliding indicator line — always rendered, slides between tabs */}
            <motion.div
                className="nav-slide-bar"
                animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                transition={{ type: 'spring', stiffness: 500, damping: 38, mass: 0.7 }}
            />

            {navItems.map((item, index) => (
                <button
                    key={item.id}
                    ref={el => itemRefs.current[index] = el}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => {
                        if (item.id === 'profile') {
                            setModalBackground(location);
                        } else {
                            setModalBackground(null);
                        }
                        navigateFade(item.path);
                    }}
                    aria-label={item.label}
                >
                    <div className="icon-container">
                        <item.icon
                            size={item.customSize || 26}
                            className="nav-icon"
                            strokeWidth={isActive(item.path) ? 2.5 : 1.5}
                        />
                    </div>
                </button>
            ))}
        </nav>
    );
};

export default BottomNavBar;
