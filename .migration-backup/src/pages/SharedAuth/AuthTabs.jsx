import React from 'react';
import { useNavigation } from '../../App';

const AuthTabs = ({ activeTab, onLoginClick, onSignupClick }) => {
    const { navigateForward } = useNavigation();

    return (
        <div className="da-tabs-wrapper">
            <div className="da-tabs">
                <button
                    className={`da-tab ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => {
                        if (onLoginClick) onLoginClick();
                        else navigateForward('/login');
                    }}
                >
                    Login
                </button>
                <button
                    className={`da-tab ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => {
                        if (onSignupClick) onSignupClick();
                        else navigateForward('/signup');
                    }}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default AuthTabs;
