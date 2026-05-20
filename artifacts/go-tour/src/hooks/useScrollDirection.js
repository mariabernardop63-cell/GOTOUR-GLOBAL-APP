import { useState, useEffect, useRef } from 'react';

const useScrollDirection = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const lastY = lastScrollY.current;
                    const delta = Math.abs(currentScrollY - lastY);

                    // Always show at top
                    if (currentScrollY < 10) {
                        setIsVisible(true);
                    } else if (delta > 8) { // Ignore small scrolls (jitter)
                        if (currentScrollY > lastY && currentScrollY > 60) {
                            // Scrolling DOWN -> Hide
                            setIsVisible(false);
                        } else if (currentScrollY < lastY) {
                            // Scrolling UP -> Show
                            setIsVisible(true);
                        }
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });

                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isVisible;
};

export default useScrollDirection;
