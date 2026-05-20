import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CarouselArrows.css';

const CarouselArrows = () => {
    const parentRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    
    useEffect(() => {
        if (!parentRef.current) return;
        const section = parentRef.current.closest('section');
        if (!section) return;
        
        const container = section.querySelector('.hs-scroll-container, .budget-scroll-container, .explore-regions-container, .ms-scroll-container, .near-you-scroll-container, .must-see-scroll-container');
        if (!container) return;
        
        const handleScroll = () => {
            setCanScrollLeft(container.scrollLeft > 20);
        };
        
        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scroll = (dir) => {
        if (!parentRef.current) return;
        const section = parentRef.current.closest('section');
        const container = section?.querySelector('.hs-scroll-container, .budget-scroll-container, .explore-regions-container, .ms-scroll-container, .near-you-scroll-container, .must-see-scroll-container');
        if (container) {
            const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of the visible width
            container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };
    
    return (
        <div ref={parentRef} className="carousel-arrows-wrapper">
            <button 
                onClick={() => scroll('left')} 
                className={`carousel-arrow-btn ${canScrollLeft ? 'visible' : 'hidden'}`}
                aria-label="Scroll left"
            >
                <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button 
                onClick={() => scroll('right')} 
                className="carousel-arrow-btn always-visible"
                aria-label="Scroll right"
            >
                <ChevronRight size={22} strokeWidth={2} />
            </button>
        </div>
    );
};

export default CarouselArrows;
