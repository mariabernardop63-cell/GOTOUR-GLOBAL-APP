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
const getCachedData = (countryCode) => {
    try {
        const cached = sessionStorage.getItem(`${CACHE_KEY}_${countryCode || 'default'}`);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (e) {
        // sessionStorage not available or corrupt
    }
    return null;
};

const setCachedData = (countryCode, data) => {
    try {
        sessionStorage.setItem(`${CACHE_KEY}_${countryCode || 'default'}`, JSON.stringify(data));
    } catch (e) {
        // Storage full or not available
    }
};

const useHomeData = (selectedCountryCode) => {
    const cached = getCachedData(selectedCountryCode);
    const hasCachedData = cached !== null;

    // Section loading states — always start as false to guarantee skeleton shows
    const [chipsLoaded, setChipsLoaded] = useState(false);
    const [mustSeeLoaded, setMustSeeLoaded] = useState(false);
    const [nearYouLoaded, setNearYouLoaded] = useState(false);
    const [recommendationsLoaded, setRecommendationsLoaded] = useState(false);
    const [searchBarLoaded, setSearchBarLoaded] = useState(false);

    useEffect(() => {
        // Enforce a minimum 500ms loading state for smooth UX
        const MIN_DELAY = 500;

        // If already cached, we still wait 500ms before showing
        if (hasCachedData) {
            const tCached = setTimeout(() => {
                setSearchBarLoaded(true);
                setChipsLoaded(true);
                setMustSeeLoaded(true);
                setNearYouLoaded(true);
                setRecommendationsLoaded(true);
            }, MIN_DELAY);
            return () => clearTimeout(tCached);
        }

        // Simulate progressive loading with realistic staggered timing (starting after MIN_DELAY)
        const t1 = setTimeout(() => setSearchBarLoaded(true), MIN_DELAY);
        const t2 = setTimeout(() => setChipsLoaded(true), MIN_DELAY + 200);
        const t3 = setTimeout(() => setMustSeeLoaded(true), MIN_DELAY + 400);
        const t4 = setTimeout(() => setNearYouLoaded(true), MIN_DELAY + 700);
        const t5 = setTimeout(() => {
            setRecommendationsLoaded(true);
            setCachedData(selectedCountryCode, { loaded: true, timestamp: Date.now() });
        }, MIN_DELAY + 1000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, [hasCachedData, selectedCountryCode]);

    // Force refresh (clears cache and reloads)
    const refresh = useCallback(() => {
        try {
            sessionStorage.removeItem(`${CACHE_KEY}_${selectedCountryCode || 'default'}`);
        } catch (e) { }
        setChipsLoaded(false);
        setMustSeeLoaded(false);
        setNearYouLoaded(false);
        setRecommendationsLoaded(false);
        setSearchBarLoaded(false);

        const MIN_DELAY = 500;

        // Re-trigger progressive load
        setTimeout(() => setSearchBarLoaded(true), MIN_DELAY);
        setTimeout(() => setChipsLoaded(true), MIN_DELAY + 200);
        setTimeout(() => setMustSeeLoaded(true), MIN_DELAY + 400);
        setTimeout(() => setNearYouLoaded(true), MIN_DELAY + 700);
        setTimeout(() => {
            setRecommendationsLoaded(true);
            setCachedData(selectedCountryCode, { loaded: true, timestamp: Date.now() });
        }, MIN_DELAY + 1000);
    }, [selectedCountryCode]);

    // Reset state and trigger loading if selectedCountryCode changes
    useEffect(() => {
        setChipsLoaded(false);
        setMustSeeLoaded(false);
        setNearYouLoaded(false);
        setRecommendationsLoaded(false);
        setSearchBarLoaded(false);
    }, [selectedCountryCode]);

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
