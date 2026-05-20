import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ExploreCTA.css';

const ExploreCTA = () => {
    const navigate = useNavigate();

    return (
        <div className="explore-cta-wrapper">
            <button 
                className="explore-cta-btn-premium" 
                onClick={() => navigate('/categories')}
            >
                <div className="explore-cta-content">
                    <span className="explore-cta-text">Explorar Todas Categorias</span>
                    <div className="explore-cta-icon-pill">
                        <ArrowRight size={18} strokeWidth={2.5} className="explore-cta-arrow" />
                    </div>
                </div>
            </button>
            <p className="explore-cta-subtitle">
                Acesse centenas de opções e encontre exatamente o que procura
            </p>
        </div>
    );
};

export default ExploreCTA;
