import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, Newspaper, Map, User } from 'lucide-react'; // Using requested icons
import './BottomNavBar.css';

const BottomNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/home' },
        { id: 'categories', label: 'Categorias', icon: LayoutGrid, path: '/categories' },
        { id: 'feed', label: 'Feed', icon: Newspaper, path: '/feed', isSpecial: true },
        { id: 'map', label: 'Mapa', icon: Map, path: '/map' },
        { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''} ${item.isSpecial ? 'nav-item-special' : ''}`}
                    onClick={() => navigate(item.path)}
                >
                    <div className="icon-container">
                        <item.icon
                            size={item.isSpecial ? 32 : 26}
                            className="nav-icon"
                            strokeWidth={isActive(item.path) ? 2.5 : 1.5}
                        />
                        {isActive(item.path) && !item.isSpecial && <div className="active-indicator"></div>}
                    </div>
                    {!item.isSpecial && <span className="nav-label">{item.label}</span>}
                </button>
            ))}
        </nav>
    );
};

export default BottomNavBar;
