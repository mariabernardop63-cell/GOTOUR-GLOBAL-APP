import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ChevronLeft, ShieldCheck, MapPin, 
    Phone, Siren, ShieldPlus, CloudRain,
    Navigation, Activity
} from 'lucide-react';
import './CheckpointScreen.css';

const CheckpointScreen = () => {
    const navigate = useNavigate();
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    const [checkinSuccess, setCheckinSuccess] = useState(false);

    const handleCheckin = () => {
        setIsCheckingIn(true);
        setTimeout(() => {
            setIsCheckingIn(false);
            setCheckinSuccess(true);
            setTimeout(() => setCheckinSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="chk-container">
            {/* Soft Premium Background */}
            <div className="chk-mesh-bg" />

            {/* Navigation */}
            <nav className="chk-nav">
                <button className="chk-back-btn" onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <div style={{ width: 40 }} /> {/* Spacer */}
            </nav>

            {/* Main Dashboard */}
            <main className="chk-main">
                
                <header className="chk-header">
                    <h1>A sua segurança em Maputo.</h1>
                    <p>Mantenha-se protegido com inteligência local em tempo real, partilha de localização e acesso rápido a serviços de emergência verificados.</p>
                </header>

                <div className="chk-grid">
                    
                    {/* Left Column: Status & Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Safety Score Card */}
                        <div className="chk-card">
                            <div className="chk-card-header" style={{ justifyContent: 'center', marginBottom: '32px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--stripe-text-sub)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Índice de Segurança Atual
                                </span>
                            </div>
                            
                            <div className="chk-score-circle">
                                <svg className="chk-score-svg" viewBox="0 0 100 100">
                                    <circle className="chk-score-bg" cx="50" cy="50" r="45" />
                                    <circle className="chk-score-progress" cx="50" cy="50" r="45" strokeDasharray="282.7" strokeDashoffset="22.6" />
                                </svg>
                                <div className="chk-score-text">
                                    <div className="chk-score-number">92</div>
                                </div>
                            </div>

                            <div className="chk-status-pill">
                                <ShieldCheck size={16} />
                                Zona Segura (Risco Baixo)
                            </div>
                        </div>

                        {/* Check-in Action */}
                        <div className="chk-card" style={{ padding: '24px' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--stripe-text-main)' }}>Partilha de Localização</h3>
                                <p style={{ margin: 0, fontSize: '14px', color: 'var(--stripe-text-sub)' }}>
                                    Notifique os seus contactos de confiança de que está em segurança.
                                </p>
                            </div>
                            <button 
                                className="chk-action-btn" 
                                onClick={handleCheckin}
                                style={{
                                    background: checkinSuccess ? 'var(--stripe-success)' : 'var(--stripe-accent)'
                                }}
                            >
                                {isCheckingIn ? (
                                    'A verificar coordenadas...'
                                ) : checkinSuccess ? (
                                    <>Localização Partilhada <ShieldCheck size={18} /></>
                                ) : (
                                    <>Fazer Check-in Seguro <MapPin size={18} /></>
                                )}
                            </button>
                        </div>

                    </div>

                    {/* Right Column: Emergency & Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* Emergency Contacts */}
                        <div className="chk-card">
                            <div className="chk-card-header">
                                <div className="chk-card-icon" style={{ background: 'var(--stripe-danger-bg)', color: 'var(--stripe-danger)' }}>
                                    <Phone size={20} />
                                </div>
                                <h2 className="chk-card-title">Contactos Rápidos</h2>
                            </div>
                            
                            <div className="chk-emergency-grid">
                                <button className="chk-contact-btn">
                                    <div className="chk-contact-icon" style={{ background: '#F1F5F9', color: '#0F172A' }}>
                                        <Siren size={16} />
                                    </div>
                                    <div>
                                        <div className="chk-contact-name">Polícia (PRM)</div>
                                        <div className="chk-contact-number">112</div>
                                    </div>
                                </button>
                                
                                <button className="chk-contact-btn">
                                    <div className="chk-contact-icon" style={{ background: '#F1F5F9', color: '#DF1B41' }}>
                                        <ShieldPlus size={16} />
                                    </div>
                                    <div>
                                        <div className="chk-contact-name">Ambulância</div>
                                        <div className="chk-contact-number">117</div>
                                    </div>
                                </button>
                                
                                <button className="chk-contact-btn" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center' }}>
                                    <div className="chk-contact-icon" style={{ background: 'var(--stripe-accent)', color: 'white' }}>
                                        <Navigation size={16} />
                                    </div>
                                    <div>
                                        <div className="chk-contact-name">Embaixada / Consulado</div>
                                        <div className="chk-contact-number">Contactar assistência consular local</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Live Intelligence Feed */}
                        <div className="chk-card">
                            <div className="chk-card-header">
                                <div className="chk-card-icon" style={{ background: '#F1F5F9', color: 'var(--stripe-accent)' }}>
                                    <Activity size={20} />
                                </div>
                                <h2 className="chk-card-title">Inteligência Local</h2>
                            </div>
                            
                            <div className="chk-feed-list">
                                <div className="chk-feed-item">
                                    <div className="chk-feed-icon" style={{ background: 'var(--stripe-warning-bg)', color: 'var(--stripe-warning)' }}>
                                        <CloudRain size={20} />
                                    </div>
                                    <div className="chk-feed-content">
                                        <h4>Previsão de Chuva Forte</h4>
                                        <p>Possibilidade de inundações rápidas nas zonas baixas da cidade. Evite a Avenida Marginal.</p>
                                        <span className="chk-feed-time">Há 15 minutos • Alerta Meteorológico</span>
                                    </div>
                                </div>
                                
                                <div className="chk-feed-item">
                                    <div className="chk-feed-icon" style={{ background: 'var(--stripe-success-bg)', color: 'var(--stripe-success)' }}>
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div className="chk-feed-content">
                                        <h4>Reforço Policial Ativo</h4>
                                        <p>Patrulhamento aumentado na zona da Baixa e zonas turísticas principais para a quadra festiva.</p>
                                        <span className="chk-feed-time">Há 2 horas • Atualização de Segurança</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default CheckpointScreen;
