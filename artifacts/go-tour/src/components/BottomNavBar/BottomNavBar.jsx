import React from 'react';
import { useLocation } from 'react-router-dom';
import { LayoutGrid, MapPinned, User, Rss } from 'lucide-react'; // Switched Files to Rss (WiFi style)
import { useNavigation } from '../../App';
import homeIcon from '../../assets/images/home_icon.png';
import './BottomNavBar.css';

import useScrollDirection from '../../hooks/useScrollDirection';

// Custom Icon Component using Mask for color control
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
            backgroundColor: 'currentColor'
        }}
    />
);

const BottomNavBar = () => {
    const location = useLocation();
    const isVisible = useScrollDirection();
    const { setModalBackground, navigateFade } = useNavigation();

    // Determine active tab
    const isActive = (path) => location.pathname === path || (path === '/home' && location.pathname === '/');

    const navItems = [
        { id: 'home', label: 'Home', icon: (props) => <CustomIcon iconSrc={homeIcon} {...props} />, path: '/home', customSize: 40 }, // Increased size aggressively to 40
        { id: 'categories', label: 'Categorias', icon: LayoutGrid, path: '/categories' },
        { id: 'feed', label: 'Feed', icon: Rss, path: '/feed' }, // Switched to Rss (WiFi-like icon)
        { id: 'map', label: 'Mapa', icon: MapPinned, path: '/map' }, // Switched to MapPinned (vector)
        { id: 'profile', label: 'Perfil', icon: User, path: '/profile', customSize: 30 }, // Switched to User vector (no circle)
    ];

    const isMapPage = location.pathname === '/map';

    return (
        <nav className={`bottom-nav ${(!isVisible && !isMapPage) ? 'navbar-hidden' : ''}`}>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => {
                        if (item.id === 'profile') {
                            setModalBackground(location);
                        } else {
                            setModalBackground(null);
                        }
                        navigateFade(item.path);
                    }}
                    aria-label={item.label} // Added aria-label since text is removed
                >
                    <div className="icon-container">
                        <item.icon
                            size={item.customSize || 26}
                            className="nav-icon"
                            strokeWidth={isActive(item.path) ? 2.5 : 1.5}
                        />
                        {isActive(item.path) && <div className="active-indicator"></div>}
                    </div>
                    {/* Label removed as requested */}
                </button>
            ))}
        </nav>
    );
};

export default BottomNavBar;
