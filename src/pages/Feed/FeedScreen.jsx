import React from 'react';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import './FeedScreen.css';

const FeedScreen = () => {
    return (
        <div className="feed-page">
            <header className="feed-header">
                <h1>Feed de Publicações</h1>
            </header>

            <div className="feed-content">
                <div className="feed-placeholder">
                    <h2>Em breve</h2>
                    <p>Aqui você verá as melhores publicações e novidades.</p>
                </div>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default FeedScreen;
