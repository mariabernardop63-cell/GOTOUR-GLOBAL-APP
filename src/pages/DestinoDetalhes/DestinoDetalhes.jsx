import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star } from 'lucide-react';

const DestinoDetalhes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    // Fallback if accessed directly without state
    const destination = state || {
        name: 'Destino Desconhecido',
        location: 'Moçambique',
        distance: '?? km',
        rating: '0.0',
        image: null
    };

    return (
        <div style={{ padding: '20px', minHeight: '100vh', background: '#fff' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    color: '#7c3aed'
                }}
            >
                <ArrowLeft size={24} />
            </button>

            {destination.image && (
                <div style={{
                    width: '100%',
                    height: '250px',
                    borderRadius: '20px',
                    backgroundImage: `url(${destination.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}></div>
            )}

            <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                {destination.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', marginBottom: '16px' }}>
                <MapPin size={18} />
                <span>{destination.location}</span>
                <span>•</span>
                <span>{destination.distance}</span>
            </div>

            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fef3c7',
                padding: '6px 12px',
                borderRadius: '8px',
                color: '#b45309',
                fontWeight: '600',
                fontSize: '14px'
            }}>
                <Star size={16} fill="#b45309" stroke="none" />
                {destination.rating}
            </div>

            <p style={{ marginTop: '24px', lineHeight: '1.6', color: '#334155' }}>
                Detalhes completos sobre {destination.name} em breve. Esta é uma tela de visualização do destino selecionado.
            </p>
        </div>
    );
};

export default DestinoDetalhes;
