import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Grid, Map as MapIcon, User } from 'lucide-react';
import './BottomNavBar.css';

const BottomNavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active tab
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/home' },
        { id: 'categories', label: 'Categorias', icon: Grid, path: '/categories' },
        { id: 'map', label: 'Mapa', icon: MapIcon, path: '/map' },
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
                    <item.icon size={24} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default BottomNavBar;
