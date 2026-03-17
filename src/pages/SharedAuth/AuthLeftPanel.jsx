import React from 'react';
import { Play, ArrowLeft } from 'lucide-react';
import AuthSocialButtons from './AuthSocialButtons';

const AuthLeftPanel = ({ onGoogleClick, onDiscordClick, onBack }) => {
    return (
        <div className="da-left-pane">
            {onBack && (
                <button className="da-back-btn-corner" onClick={onBack} aria-label="Voltar">
                    <ArrowLeft size={20} />
                </button>
            )}
            <div className="da-left-content">
                <h1 className="da-welcome-title">
                    Welcome to our <br />
                    <span className="da-welcome-title-alt">Community</span>
                </h1>
                <p className="da-welcome-subtitle">
                    A whole new productive journey starts right here
                </p>
                <div className="da-social-container-centered">
                    <AuthSocialButtons onGoogleClick={onGoogleClick} onDiscordClick={onDiscordClick} />
                </div>
            </div>
        </div>
    );
};

export default AuthLeftPanel;
