import { useState, useEffect, useCallback } from 'react';

/**
 * useHomeData — Progressive data loading with session caching
 * 
 * Each section loads independently. If cached (sessionStorage), data appears instantly.
 * Otherwise, simulates network fetch with realistic timing.
 * 
 * Returns per-section: { data, isLoading }
 */

const CACHE_KEY = 'gotour_home_data';

// Check if data is already cached in this session
const getCachedData = () => {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (e) {
        // sessionStorage not available or corrupt
    }
    return null;
};

const setCachedData = (data) => {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (e) {
        // Storage full or not available
    }
};

const useHomeData = () => {
    const cached = getCachedData();
    const hasCachedData = cached !== null;

    // Section loading states — instant if cached
    const [chipsLoaded, setChipsLoaded] = useState(hasCachedData);
    const [mustSeeLoaded, setMustSeeLoaded] = useState(hasCachedData);
    const [nearYouLoaded, setNearYouLoaded] = useState(hasCachedData);
    const [recommendationsLoaded, setRecommendationsLoaded] = useState(hasCachedData);
    const [searchBarLoaded, setSearchBarLoaded] = useState(hasCachedData);

    useEffect(() => {
        // If already cached, everything is instant — no skeletons
        if (hasCachedData) return;

        // Simulate progressive loading with realistic staggered timing
        // Search bar loads first (smallest payload)
        const t1 = setTimeout(() => setSearchBarLoaded(true), 300);
        // Chips load next
        const t2 = setTimeout(() => setChipsLoaded(true), 500);
        // MustSee section (images take longer)
        const t3 = setTimeout(() => setMustSeeLoaded(true), 900);
        // Near You section
        const t4 = setTimeout(() => setNearYouLoaded(true), 1200);
        // Recommendations (last)
        const t5 = setTimeout(() => {
            setRecommendationsLoaded(true);
            // Cache after all loaded
            setCachedData({ loaded: true, timestamp: Date.now() });
        }, 1500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, [hasCachedData]);

    // Force refresh (clears cache and reloads)
    const refresh = useCallback(() => {
        try {
            sessionStorage.removeItem(CACHE_KEY);
        } catch (e) { }
        setChipsLoaded(false);
        setMustSeeLoaded(false);
        setNearYouLoaded(false);
        setRecommendationsLoaded(false);
        setSearchBarLoaded(false);

        // Re-trigger progressive load
        setTimeout(() => setSearchBarLoaded(true), 300);
        setTimeout(() => setChipsLoaded(true), 500);
        setTimeout(() => setMustSeeLoaded(true), 900);
        setTimeout(() => setNearYouLoaded(true), 1200);
        setTimeout(() => {
            setRecommendationsLoaded(true);
            setCachedData({ loaded: true, timestamp: Date.now() });
        }, 1500);
    }, []);

    return {
        searchBar: { isLoading: !searchBarLoaded },
        chips: { isLoading: !chipsLoaded },
        mustSee: { isLoading: !mustSeeLoaded },
        nearYou: { isLoading: !nearYouLoaded },
        recommendations: { isLoading: !recommendationsLoaded },
        isFullyLoaded: chipsLoaded && mustSeeLoaded && nearYouLoaded && recommendationsLoaded && searchBarLoaded,
        refresh,
    };
};

export default useHomeData;
