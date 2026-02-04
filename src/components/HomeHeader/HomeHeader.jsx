import React from 'react';
import { Menu } from 'lucide-react';
import gotourLogo from '../../assets/images/gotour_icon.png';
import './HomeHeader.css';

const HomeHeader = ({ onMenuClick }) => {
    return (
        <header className="home-header">
            <img src={gotourLogo} alt="GoTour" className="home-logo" />
            <button className="menu-button" onClick={onMenuClick}>
                <Menu size={24} />
            </button>
        </header>
    );
};

export default HomeHeader;
