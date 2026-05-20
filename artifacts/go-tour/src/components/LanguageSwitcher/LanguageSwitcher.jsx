import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { languages } from '../../data/translations';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { langCode, setLangCode } = useApp();
    const [showLangMenu, setShowLangMenu] = useState(false);
    const currentLang = languages.find(l => l.code === langCode);

    const handleLanguageSelect = (code) => {
        setLangCode(code);
        setShowLangMenu(false);
    };

    return (
        <div className={`lang-switcher ${showLangMenu ? 'active' : ''}`}>
            <button className="lang-btn" onClick={() => setShowLangMenu(!showLangMenu)} type="button">
                <span className="lang-flag">{currentLang?.flag}</span>
                <span className="lang-name">{currentLang?.code.toUpperCase()}</span>
                <ChevronDown size={14} className={`lang-arrow ${showLangMenu ? 'rotate' : ''}`} />
            </button>

            {showLangMenu && (
                <div className="lang-menu scale-in">
                    {languages.map(l => (
                        <div key={l.code} className="lang-option" onClick={() => handleLanguageSelect(l.code)}>
                            <span className="lang-flag">{l.flag}</span>
                            {l.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
