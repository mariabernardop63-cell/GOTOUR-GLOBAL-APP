import React from 'react';
import { Menu } from 'lucide-react';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './HomeHeader.css';

.logo - button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align - items: center;
}

const HomeHeader = ({ onMenuClick, onLogoClick }) => {
    return (
        <header className="home-header">
            <button className="logo-button" onClick={onLogoClick} aria-label="Go to Home">
                <img src={gotourLogo} alt="GoTour" className="home-logo" />
            </button>
            <button className="menu-button" onClick={onMenuClick}>
                <Menu size={24} />
            </button>
        </header>
    );
};

export default HomeHeader;
