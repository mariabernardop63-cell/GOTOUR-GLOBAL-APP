import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Eye, Heart, Settings, User } from 'lucide-react';
import dubaiImage from '../../assets/images/dubai_city.png';
import './StoryViewer.css';

const StoryViewer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const story = location.state?.story;

    // Determine if this is the user's own story
    const isOwnStory = story?.id === 'user' || false;
    const authorName = story?.name || 'GoTour';
    const authorAvatar = story?.avatar || null;

    return (
        <div className="story-viewer-page">
            {/* Progress Bar */}
            <div className="story-progress-bar">
                <div className="story-progress-segment">
                    <div className="story-progress-fill" />
                </div>
            </div>

            {/* Header */}
            <div className="story-header">
                <button className="story-back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                    <ArrowLeft size={20} />
                </button>
                <div className="story-author-avatar">
                    {authorAvatar ? (
                        <img src={authorAvatar} alt={authorName} />
                    ) : (
                        <User size={22} color="rgba(255,255,255,0.6)" />
                    )}
                </div>
                <span className="story-author-name">{authorName}</span>
                <button className="story-more-btn" aria-label="Mais opções">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="story-content">
                {story?.id === 'dubai' ? (
                    <img src={dubaiImage} alt="Dubai à noite" />
                ) : (
                    <div className="story-content-placeholder">
                        <User size={64} />
                        <p>História do {authorName}</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            {isOwnStory ? (
                <div className="story-footer own-story">
                    <div className="story-views">
                        <Eye size={18} /> 0 visualizações
                    </div>
                    <button className="story-settings-btn">
                        <Settings size={14} /> Definições
                    </button>
                </div>
            ) : (
                <div className="story-footer">
                    <input className="story-comment-input" placeholder="Enviar comentário..." />
                    <button className="story-react-btn" aria-label="Reagir">
                        <Heart size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default StoryViewer;
