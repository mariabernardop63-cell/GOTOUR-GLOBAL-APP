import React from 'react';
import { SearchX } from 'lucide-react';
import './EmptyResultsComponent.css';

const EmptyResultsComponent = ({ searchQuery }) => {
    return (
        <div className="empty-results-container">
            <div className="empty-icon-wrapper">
                <SearchX size={48} className="empty-icon" />
            </div>
            
            <h3 className="empty-title">Nenhum resultado encontrado</h3>
            
            <p className="empty-message">
                Não encontramos resultados para <span className="highlighted-query">“{searchQuery}”</span>, mas não desista!
            </p>
            
            <p className="empty-suggestion">
                Tente pesquisar com palavras mais simples, verifique a ortografia ou explore as categorias acima para descobrir novas opções incríveis.
            </p>
            
            <p className="empty-footer">
                O GoTour está sempre a crescer e novas recomendações podem aparecer a qualquer momento.
            </p>
        </div>
    );
};

export default EmptyResultsComponent;
