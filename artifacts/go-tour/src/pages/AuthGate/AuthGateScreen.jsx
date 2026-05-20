import React from 'react';
import { X, Globe, Compass, Map, ShieldCheck, Sparkles } from 'lucide-react';
import louvreBg from '../../assets/images/louvre_bg.jpg';
import './AuthGateScreen.css';

const AuthGateScreen = ({ onClose, onNavigateSignup, onNavigateLogin }) => {
    return (
        <div className="ag-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="ag-content">

                {/* Left Sidebar */}
                <div className="ag-sidebar">
                    <div
                        className="ag-sidebar-bg"
                        style={{ backgroundImage: `url(${louvreBg})` }}
                    />
                    <div className="ag-sidebar-overlay" />
                    <div className="ag-glow-accent" />

                    <div className="ag-sidebar-content">
                        <div className="ag-premium-badge">
                            <Globe size={13} className="ag-globe-icon" />
                            <span>EXPERIÊNCIA EXCLUSIVA</span>
                        </div>

                        <div className="ag-brand-section">
                            <h2 className="ag-brand-name">GO TOUR</h2>
                            <p className="ag-brand-tagline">Seu companheiro de viagem global</p>
                        </div>

                        <div className="ag-features-list">
                            <div className="ag-feature-item">
                                <div className="ag-feat-icon-wrap">
                                    <Compass size={18} />
                                </div>
                                <div>
                                    <h4 className="ag-feat-title">Roteiros Inteligentes</h4>
                                    <p className="ag-feat-desc">Planejamento personalizado com IA Sasha</p>
                                </div>
                            </div>

                            <div className="ag-feature-item">
                                <div className="ag-feat-icon-wrap">
                                    <Map size={18} />
                                </div>
                                <div>
                                    <h4 className="ag-feat-title">Guias Locais Credenciados</h4>
                                    <p className="ag-feat-desc">Conexão direta com especialistas locais</p>
                                </div>
                            </div>

                            <div className="ag-feature-item">
                                <div className="ag-feat-icon-wrap">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <h4 className="ag-feat-title">Reserva de Experiências</h4>
                                    <p className="ag-feat-desc">Acesso seguro a atividades exclusivas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Area */}
                <div className="ag-main-area">
                    <button className="ag-close-btn" onClick={onClose} aria-label="Fechar">
                        <X size={20} strokeWidth={2.5} />
                    </button>

                    <div className="ag-main-content">
                        <div className="ag-header">
                            <h3 className="ag-title">Desbloqueie o Mundo</h3>
                            <p className="ag-subtitle">Crie uma conta para continuar sua jornada premium</p>
                        </div>

                        <p className="ag-persuasive-text">
                            Para continuar a explorar destinos fascinantes, comparar as melhores estadias e acessar o ecossistema completo da <strong>GO TOUR</strong>, junte-se à nossa comunidade internacional de viajantes. É rápido, seguro e gratuito.
                        </p>

                        <div className="ag-action-group">
                            <button className="ag-primary-btn" onClick={onNavigateSignup}>
                                <span>Começar Gratuitamente</span>
                                <Sparkles size={16} fill="currentColor" />
                            </button>

                            <p className="ag-login-prompt">
                                Já tem uma conta?{' '}
                                <button className="ag-login-link-btn" onClick={onNavigateLogin}>
                                    Iniciar sessão
                                </button>
                            </p>
                        </div>

                        <div className="ag-footer">
                            <p className="ag-terms-text">
                                Ao continuar, você declara estar de acordo com os nossos <br />
                                <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); onClose(); onNavigateLogin(); }} className="ag-legal-link">Termos de Serviço</a> e{' '}
                                <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onClose(); onNavigateLogin(); }} className="ag-legal-link">Política de Privacidade</a>.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthGateScreen;
