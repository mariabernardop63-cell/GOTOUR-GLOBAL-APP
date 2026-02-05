import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Map, User } from 'lucide-react'; // Removing Newspaper, added Map/User
import homeIcon from '../../assets/images/home_icon.png';
import feedIcon from '../../assets/images/feed_icon.jpg';
import './BottomNavBar.css';

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
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { id: 'home', label: 'Home', icon: (props) => <CustomIcon iconSrc={homeIcon} {...props} />, path: '/home' },
        { id: 'categories', label: 'Categorias', icon: LayoutGrid, path: '/categories' },
        { id: 'feed', label: 'Feed', icon: (props) => <CustomIcon iconSrc={feedIcon} {...props} />, path: '/feed' }, // Removed isSpecial
        { id: 'map', label: 'Mapa', icon: Map, path: '/map' },
        { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                >
                    <div className="icon-container">
                        <item.icon
                            size={26}
                            className="nav-icon"
                            strokeWidth={isActive(item.path) ? 2.5 : 1.5}
                        />
                        {isActive(item.path) && <div className="active-indicator"></div>}
                    </div>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNavBar;
