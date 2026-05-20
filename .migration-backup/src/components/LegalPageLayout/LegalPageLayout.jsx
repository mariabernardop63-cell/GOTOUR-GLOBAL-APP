import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle, X } from 'lucide-react';
import DesktopNavbar from '../DesktopNavbar/DesktopNavbar';
import './LegalPageLayout.css';

const LegalPageLayout = ({ title, lastUpdated, children, onSearch }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className="legal-page-container">
            {/* Reusing the desktop navbar for consistency */}
            <DesktopNavbar
                onLoginClick={() => navigate('/login')}
                onSignupClick={() => navigate('/signup')}
            />

            <div className="legal-page-content-wrapper">
                <main className="legal-page-main">
                    <header className="legal-page-header">
                        <h1 className="legal-page-title">{title}</h1>
                        <p className="legal-page-date">Última atualização: {lastUpdated}</p>

                        <div className="legal-page-search">
                            <Search className="legal-search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar tópicos (Ex: Cookies, Reembolsos)..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="legal-search-input"
                            />
                            {searchQuery && (
                                <button className="legal-search-clear" onClick={() => handleSearchChange({ target: { value: '' } })}>
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </header>

                    <article className="legal-page-article fade-in-up">
                        {children}
                    </article>

                    <footer className="legal-page-footer">
                        <div className="legal-footer-links">
                            <button onClick={() => navigate('/privacy-policy')}>Política de Privacidade</button>
                            <span className="legal-footer-dot">•</span>
                            <button onClick={() => navigate('/terms-of-service')}>Termos de Serviço</button>
                            <span className="legal-footer-dot">•</span>
                            <button onClick={() => window.location.href = 'mailto:suporte@gotour.com'}>Contato</button>
                        </div>
                        <p className="legal-footer-copyright">© {new Date().getFullYear()} GOTOUR. Todos os direitos reservados.</p>
                    </footer>
                </main>
            </div>

            {/* Floating Support Widget */}
            <div className={`legal-support-widget ${isChatOpen ? 'open' : ''}`}>
                <button
                    className="legal-support-fab"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    aria-label="Atendimento Online"
                >
                    {isChatOpen ? <X size={24} color="#FFF" /> : <MessageCircle size={24} color="#FFF" />}
                </button>

                {isChatOpen && (
                    <div className="legal-support-chat fade-in-up-fast">
                        <div className="legal-chat-header">
                            <span className="legal-chat-title">Atendimento GOTOUR</span>
                            <span className="legal-chat-status">Online agora</span>
                        </div>
                        <div className="legal-chat-body">
                            <p className="legal-chat-greeting">
                                Olá! 👋 Tem alguma dúvida sobre os nossos termos ou políticas? Estou aqui para ajudar!
                            </p>
                            <button className="legal-chat-action-btn" onClick={() => window.location.href = 'mailto:suporte@gotour.com'}>
                                Enviar Email para o Suporte
                            </button>
                            <p className="legal-chat-note">Tempo de resposta: geralmente em algumas horas.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegalPageLayout;
