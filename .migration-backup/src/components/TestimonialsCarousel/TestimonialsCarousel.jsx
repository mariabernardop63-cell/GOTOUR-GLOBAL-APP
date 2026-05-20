import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import './TestimonialsCarousel.css';

// Mock Data for 20 Reviews
const REVIEWS = [
    { id: 1, name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?img=1', rating: 5, text: 'A GoTour mudou completamente a forma como exploro o país. Recomendo muito!' },
    { id: 2, name: 'Pedro Santos', avatar: 'https://i.pravatar.cc/150?img=11', rating: 5, text: 'Experiência fantástica. Os guias locais são incríveis e super atenciosos.' },
    { id: 3, name: 'Mariana Costa', avatar: 'https://i.pravatar.cc/150?img=5', rating: 4, text: 'Ótima plataforma! Encontrei lugares que nem sabia que existiam.' },
    { id: 4, name: 'João Miguel', avatar: 'https://i.pravatar.cc/150?img=12', rating: 5, text: 'Design lindo e super fácil de usar. Já planejei 3 viagens por aqui.' },
    { id: 5, name: 'Sofia Lauren', avatar: 'https://i.pravatar.cc/150?img=9', rating: 5, text: 'O melhor app de turismo que já usei na vida. Simplesmente perfeito.' },
    { id: 6, name: 'Carlos Ribeiro', avatar: 'https://i.pravatar.cc/150?img=15', rating: 4, text: 'Muito útil para viagens de fim de semana. Boas recomendações.' },
    { id: 7, name: 'Beatriz Almeida', avatar: 'https://i.pravatar.cc/150?img=20', rating: 5, text: 'Consegui reservar passeios exclusivos que não acharia em outro lugar.' },
    { id: 8, name: 'Tiago Mendes', avatar: 'https://i.pravatar.cc/150?img=33', rating: 5, text: 'Atendimento nota 10 e roteiros maravilhosos. Recomendo a todos.' },
    { id: 9, name: 'Laura Dias', avatar: 'https://i.pravatar.cc/150?img=24', rating: 4, text: 'Uma forma autêntica de viajar. Adorei a interação com a comunidade.' },
    { id: 10, name: 'Rui Ferreira', avatar: 'https://i.pravatar.cc/150?img=51', rating: 5, text: 'Tudo funcionou perfeitamente. Nenhuma dor de cabeça durante a viagem.' },
    { id: 11, name: 'Inês Rocha', avatar: 'https://i.pravatar.cc/150?img=42', rating: 5, text: 'Amei as dicas de restaurantes locais. Foram refeições inesquecíveis.' },
    { id: 12, name: 'Hugo Bruno', avatar: 'https://i.pravatar.cc/150?img=53', rating: 4, text: 'Bom aplicativo, interface fluida. Vou usar na minha próxima aventura.' },
    { id: 13, name: 'Catarina luz', avatar: 'https://i.pravatar.cc/150?img=44', rating: 5, text: 'A integração de mapas é excelente. Não me perdi nenhuma vez!' },
    { id: 14, name: 'André Neves', avatar: 'https://i.pravatar.cc/150?img=55', rating: 5, text: 'As avaliações de outros usuários ajudam muito na hora de decidir.' },
    { id: 15, name: 'Marta Pinto', avatar: 'https://i.pravatar.cc/150?img=46', rating: 4, text: 'Muito bom para descobrir a história e cultura de cada província.' },
    { id: 16, name: 'Diogo Freitas', avatar: 'https://i.pravatar.cc/150?img=57', rating: 5, text: 'Top! Vale cada minuto investido no planejamento. Viagens sem stress.' },
    { id: 17, name: 'Rita Sousa', avatar: 'https://i.pravatar.cc/150?img=48', rating: 5, text: 'Já recomendei para todos os meus amigos. A plataforma é excepcional.' },
    { id: 18, name: 'Nuno Cruz', avatar: 'https://i.pravatar.cc/150?img=59', rating: 4, text: 'Gostei bastante das funcionalidades de criação de roteiro customizado.' },
    { id: 19, name: 'Joana Martins', avatar: 'https://i.pravatar.cc/150?img=32', rating: 5, text: 'Descobri praias paradisíacas que não aparecem nos guias normais.' },
    { id: 20, name: 'Filipe Gomes', avatar: 'https://i.pravatar.cc/150?img=61', rating: 5, text: 'Serviço impecável do início ao fim. 5 estrelas sem dúvidas!' }
];

// Secondary Array for Left Side (20 completely different reviews)
const REVIEWS_LEFT = [
    { id: 21, name: 'Lucas Costa', avatar: 'https://i.pravatar.cc/150?img=13', rating: 5, text: 'A reserva foi super rápida. Fiquei muito satisfeito com as opções de hospedagem.' },
    { id: 22, name: 'Clara Nunes', avatar: 'https://i.pravatar.cc/150?img=14', rating: 4, text: 'O suporte ao cliente é muito atencioso, resolveram minha dúvida na hora.' },
    { id: 23, name: 'Gabriel Lima', avatar: 'https://i.pravatar.cc/150?img=16', rating: 5, text: 'Gostei muito das fotos e descrições dos lugares. Realmente ajuda a decidir o destino.' },
    { id: 24, name: 'Isabela Vieira', avatar: 'https://i.pravatar.cc/150?img=17', rating: 5, text: 'Excelente sistema de filtros, consegui achar passeios baratos bem rápido.' },
    { id: 25, name: 'Fernando Alves', avatar: 'https://i.pravatar.cc/150?img=18', rating: 4, text: 'Valeu a pena usar para minha viagem de férias. Com certeza recomendo.' },
    { id: 26, name: 'Mariana Duarte', avatar: 'https://i.pravatar.cc/150?img=19', rating: 5, text: 'Plataforma muito bonita. A organização dos mapas é a melhor parte!' },
    { id: 27, name: 'Thiago Pereira', avatar: 'https://i.pravatar.cc/150?img=21', rating: 5, text: 'Usei para alugar guias locais e a experiência foi imersiva e segura.' },
    { id: 28, name: 'Carolina Marques', avatar: 'https://i.pravatar.cc/150?img=22', rating: 5, text: 'Nunca pensei que a minha província natal tivesse lugares tão belos.' },
    { id: 29, name: 'Ricardo Mendes', avatar: 'https://i.pravatar.cc/150?img=23', rating: 4, text: 'Ótima diversidade de opções culturais e restaurantes autênticos cadastrados.' },
    { id: 30, name: 'Patricia Lopes', avatar: 'https://i.pravatar.cc/150?img=25', rating: 5, text: 'Recomendo demais! A melhor forma de descobrir o país sem dor de cabeça.' },
    { id: 31, name: 'Diogo Pires', avatar: 'https://i.pravatar.cc/150?img=26', rating: 5, text: 'As avaliações da comunidade bateram exatamente com a realidade dos locais.' },
    { id: 32, name: 'Camila Fernandes', avatar: 'https://i.pravatar.cc/150?img=27', rating: 4, text: 'Gostei da facilidade para montar o roteiro e enviar aos meus amigos.' },
    { id: 33, name: 'Eduardo Correia', avatar: 'https://i.pravatar.cc/150?img=28', rating: 5, text: 'Aplicativo rápido e sem bugs. Deixou minha trip mil vezes mais fácil.' },
    { id: 34, name: 'Sara Teixeira', avatar: 'https://i.pravatar.cc/150?img=29', rating: 5, text: 'A variedade de roteiros na categoria de natureza superou as minhas expectativas.' },
    { id: 35, name: 'Leonardo Batista', avatar: 'https://i.pravatar.cc/150?img=30', rating: 5, text: 'Foi graças à GoTour que achei meu restaurante favorito em outra cidade.' },
    { id: 36, name: 'Júlia Moreira', avatar: 'https://i.pravatar.cc/150?img=31', rating: 4, text: 'Bom para quem planeja viajar de carro pelas estradas nacionais, muitas dicas úteis.' },
    { id: 37, name: 'Arthur Carvalho', avatar: 'https://i.pravatar.cc/150?img=34', rating: 5, text: 'Design limpo e objetivo. Fiz minha primeira viagem a solo muito tranquilo.' },
    { id: 38, name: 'Vitória Ribeiro', avatar: 'https://i.pravatar.cc/150?img=35', rating: 5, text: 'Simplesmente o melhor catálogo de turismo que temos hoje. Parabéns à equipa!' },
    { id: 39, name: 'Matheus Faria', avatar: 'https://i.pravatar.cc/150?img=36', rating: 4, text: 'Prático e eficiente. Achei o destino perfeito para o feriadão em minutos.' },
    { id: 40, name: 'Renata Castro', avatar: 'https://i.pravatar.cc/150?img=37', rating: 5, text: 'Incrível! Todos os lugares que fui pela recomendação pareciam cenário de filme.' }
];

const TestimonialsCarousel = ({ position = 'right' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const currentReviews = position === 'left' ? REVIEWS_LEFT : REVIEWS;

    useEffect(() => {
        resetTimeout();
        if (!isPaused) {
            timeoutRef.current = setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % currentReviews.length);
            }, 5000);
        }
        return () => resetTimeout();
    }, [currentIndex, isPaused]);

    const handleCardClick = (index) => {
        setCurrentIndex(index);
    };

    const getCardStateClass = (index) => {
        const diff = index - currentIndex;
        const total = currentReviews.length;

        // Handle wrapping difference
        let wrappedDiff = diff;
        if (diff < -1) wrappedDiff = diff + total;
        if (diff > 1) wrappedDiff = diff - total;

        if (wrappedDiff === 0) return 'state-active';
        if (wrappedDiff === -1) return 'state-prev';
        if (wrappedDiff === 1) return 'state-next';

        // Items further away
        if (wrappedDiff < -1) return 'state-hidden-top';
        return 'state-hidden-bottom';
    };

    return (
        <div
            className={`testimonials-container position-${position}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {currentReviews.map((review, index) => {
                const stateClass = getCardStateClass(index);

                return (
                    <div
                        key={review.id}
                        className={`testimonial-card position-${position} ${stateClass}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="testi-header">
                            <img src={review.avatar} alt={review.name} className="testi-avatar" />
                            <div className="testi-info">
                                <span className="testi-name">{review.name}</span>
                                <div className="testi-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? "currentColor" : "none"}
                                            strokeWidth={i < review.rating ? 0 : 2}
                                            color={i >= review.rating ? "rgba(255,255,255,0.3)" : "inherit"}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="testi-text">{review.text}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TestimonialsCarousel;
