import React from 'react';
import { Bot } from 'lucide-react';
import './SearchBarAI.css';

const SearchBarAI = () => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <Bot className="ai-icon" size={20} />
                <input
                    type="text"
                    placeholder="Pesquisar destinos, hotéis, restaurantes e experiências..."
                    className="search-input"
                />
            </div>
            <div className="header-separator"></div>
        </div>
    );
};

export default SearchBarAI;
