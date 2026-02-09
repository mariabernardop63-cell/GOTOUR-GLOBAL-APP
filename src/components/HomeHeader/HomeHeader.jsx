import React from 'react';

import gotourLogo from '../../assets/images/gotour_icon.png';
import './HomeHeader.css';



const HomeHeader = ({ onMenuClick, onLogoClick, isDrawerOpen }) => {
    return (
        <header className="home-header">
            <button className="logo-button" onClick={onLogoClick} aria-label="Go to Home">
                <img src={gotourLogo} alt="GoTour" className="home-header-logo" />
            </button>
            <button className="menu-button" onClick={onMenuClick} aria-label="Toggle menu" aria-expanded={isDrawerOpen}>
                <div className={`hamburger-icon ${isDrawerOpen ? 'open' : ''}`}>
                    <span className="bar top"></span>
                    <span className="bar middle"></span>
                    <span className="bar bottom"></span>
                </div>
            </button>
        </header>
    );
};

export default HomeHeader;
