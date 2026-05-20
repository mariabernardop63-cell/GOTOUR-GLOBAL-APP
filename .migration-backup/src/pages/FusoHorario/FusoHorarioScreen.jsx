import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Globe2, Clock, Plus } from 'lucide-react';
import './FusoHorarioScreen.css';

const WORLD_CITIES = [
    { id: '1', name: 'Nova Iorque', tz: 'America/New_York' },
    { id: '2', name: 'Londres', tz: 'Europe/London' },
    { id: '3', name: 'Tóquio', tz: 'Asia/Tokyo' },
    { id: '4', name: 'Maputo', tz: 'Africa/Maputo' },
    { id: '5', name: 'Lisboa', tz: 'Europe/Lisbon' },
    { id: '6', name: 'Sydney', tz: 'Australia/Sydney' },
];

const FusoHorarioScreen = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Local Time
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localCityName = localTz.split('/')[1]?.replace('_', ' ') || 'Local';
    
    const localTimeString = time.toLocaleTimeString('pt-MZ', { hour: '2-digit', minute: '2-digit' });
    const localSeconds = time.toLocaleTimeString('pt-MZ', { second: '2-digit' });
    const localDateString = time.toLocaleDateString('pt-MZ', { weekday: 'long', day: 'numeric', month: 'long' });

    // Format world clocks
    const formatWorldTime = (tz) => {
        return time.toLocaleTimeString('pt-MZ', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    };

    const formatWorldDate = (tz) => {
        return time.toLocaleDateString('pt-MZ', { timeZone: tz, day: 'numeric', month: 'short' });
    };

    // Calculate difference
    const getDiffHours = (tz) => {
        // Obter offset local em minutos (ex: UTC+2 = -120)
        const localOffset = new Date().getTimezoneOffset(); 
        
        // Obter offset da cidade em minutos
        // Criamos uma data no fuso de destino e subtraímos da data local
        const targetTime = new Date(time.toLocaleString("en-US", { timeZone: tz }));
        const localTimeForCalc = new Date(time.toLocaleString("en-US", { timeZone: localTz }));
        
        const diffInMinutes = (targetTime.getTime() - localTimeForCalc.getTime()) / 60000;
        const diffInHours = Math.round(diffInMinutes / 60);

        if (diffInHours === 0) return { text: 'Mesmo horário', type: 'same' };
        if (diffInHours > 0) return { text: `+${diffInHours} horas`, type: 'ahead' };
        return { text: `${diffInHours} horas`, type: 'behind' };
    };

    return (
        <div className="fh-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Header */}
            <div className="fh-header">
                <div className="fh-title-group">
                    <div className="fh-icon-wrapper">
                        <Globe2 size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="fh-title">Fuso Horário</h2>
                        <p className="fh-subtitle">Horas no mundo</p>
                    </div>
                </div>
                <button className="fh-close-btn" onClick={() => navigate(-1)} aria-label="Fechar">
                    <X size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Content Split */}
            <div className="fh-content">
                
                {/* Left Sidebar - Local */}
                <div className="fh-sidebar">
                    <div className="fh-local-label">
                        <Clock size={14} />
                        Sua Localização
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                        <div className="fh-local-time">{localTimeString}</div>
                        <div className="fh-local-seconds">{localSeconds}</div>
                    </div>
                    
                    <div className="fh-local-date" style={{ textTransform: 'capitalize' }}>
                        {localDateString}
                    </div>
                    <div className="fh-local-city">
                        {localCityName} ({localTz})
                    </div>
                </div>

                {/* Right Area - World */}
                <div className="fh-main-area">
                    <div className="fh-world-header">
                        <h3 className="fh-section-title">Cidades Globais</h3>
                        <button className="fh-add-btn">
                            <Plus size={16} strokeWidth={2.5} />
                            Adicionar
                        </button>
                    </div>

                    <div className="fh-clocks-list">
                        {WORLD_CITIES.map((city) => {
                            const diff = getDiffHours(city.tz);
                            return (
                                <div key={city.id} className="fh-clock-card">
                                    <div className="fh-card-left">
                                        <div className="fh-card-city">{city.name}</div>
                                        <div className="fh-card-diff">
                                            <span className={`fh-diff-indicator fh-diff-${diff.type}`}></span>
                                            {diff.text}
                                        </div>
                                    </div>
                                    <div className="fh-card-right">
                                        <div className="fh-card-time">{formatWorldTime(city.tz)}</div>
                                        <div className="fh-card-date">{formatWorldDate(city.tz)}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FusoHorarioScreen;
