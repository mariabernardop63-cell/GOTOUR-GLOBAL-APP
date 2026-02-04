import React from 'react';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import SearchBarAI from '../../components/SearchBarAI/SearchBarAI';
import FilterChipsRow from '../../components/FilterChipsRow/FilterChipsRow';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="home-page">
            <HomeHeader onMenuClick={() => alert('Menu clicked (Placeholder)')} />

            <SearchBarAI />

            <FilterChipsRow />

            <div className="home-content">
                <h2 className="section-title">Recomendações para você</h2>

                <div className="recommendations-list">
                    {/* Placeholder Cards */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="place-card">
                            <div className="place-image-placeholder">
                                {/* Image would go here */}
                            </div>
                            <div className="place-info">
                                <h3 className="place-name">Hotel Paradise View {item}</h3>
                                <p className="place-location">Maldives • 5.0 ★</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default HomeScreen;
