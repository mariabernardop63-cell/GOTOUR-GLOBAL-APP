import { useState, useEffect, useRef } from 'react';

const useScrollDirection = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always show at top (or very minimal scroll)
            if (currentScrollY < 10) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            // Determining direction
            // Hide only after scrolling down a bit (e.g. > 100px total scroll or relative)
            // Here we check if current > last
            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        // Passive listener for performance
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isVisible;
};

export default useScrollDirection;
