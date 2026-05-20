import { useState, useEffect, useCallback } from 'react';

/**
 * useHomeData — Progressive data loading with session caching
 */

const CACHE_KEY = 'gotour_home_data_v2';

// Clear cache on actual page reload (F5) so skeletons show fresh
// This does NOT run during SPA navigation (React Router)
if (performance.navigation?.type === 1 || performance.getEntriesByType?.('navigation')?.[0]?.type === 'reload') {
    try {
        Object.keys(sessionStorage).forEach(key => {
            if (key.startsWith(CACHE_KEY)) sessionStorage.removeItem(key);
        });
    } catch (e) {}
}

const getCachedData = (countryCode) => {
    try {
        const cached = sessionStorage.getItem(`${CACHE_KEY}_${countryCode || 'default'}`);
        if (cached) return JSON.parse(cached);
    } catch (e) {}
    return null;
};

const setCachedData = (countryCode, data) => {
    try {
        sessionStorage.setItem(`${CACHE_KEY}_${countryCode || 'default'}`, JSON.stringify(data));
    } catch (e) {}
};

const useHomeData = (selectedCountryCode) => {
    const cached = getCachedData(selectedCountryCode);
    const hasCachedData = cached !== null;

    // Loading states for every major section
    // CRITICAL: Initialize as TRUE when cached data exists so the FIRST render
    // shows real content (no skeleton flash). This keeps the page at full height
    // immediately, which is essential for scroll restoration to work.
    const [searchBarLoaded, setSearchBarLoaded] = useState(hasCachedData);
    const [chipsLoaded, setChipsLoaded] = useState(hasCachedData);
    const [mustSeeLoaded, setMustSeeLoaded] = useState(hasCachedData);
    const [nearYouLoaded, setNearYouLoaded] = useState(hasCachedData);
    const [regionsLoaded, setRegionsLoaded] = useState(hasCachedData);
    const [mostSearchedLoaded, setMostSearchedLoaded] = useState(hasCachedData);
    const [budgetLoaded, setBudgetLoaded] = useState(hasCachedData);
    const [categoriesLoaded, setCategoriesLoaded] = useState(hasCachedData);

    useEffect(() => {
        const MIN_DELAY = 400;

        // Instant load if cached (no skeletons when going back)
        if (hasCachedData) {
            setSearchBarLoaded(true);
            setChipsLoaded(true);
            setMustSeeLoaded(true);
            setNearYouLoaded(true);
            setRegionsLoaded(true);
            setMostSearchedLoaded(true);
            setBudgetLoaded(true);
            setCategoriesLoaded(true);
            return;
        }

        // Staggered loading for first-time or refresh
        const t1 = setTimeout(() => setSearchBarLoaded(true), MIN_DELAY);
        const t2 = setTimeout(() => setChipsLoaded(true), MIN_DELAY + 150);
        const t3 = setTimeout(() => setMustSeeLoaded(true), MIN_DELAY + 300);
        const t4 = setTimeout(() => setNearYouLoaded(true), MIN_DELAY + 450);
        const t5 = setTimeout(() => setRegionsLoaded(true), MIN_DELAY + 600);
        const t6 = setTimeout(() => setMostSearchedLoaded(true), MIN_DELAY + 750);
        const t7 = setTimeout(() => setBudgetLoaded(true), MIN_DELAY + 900);
        const t8 = setTimeout(() => {
            setCategoriesLoaded(true);
            setCachedData(selectedCountryCode, { loaded: true });
        }, MIN_DELAY + 1100);

        return () => {
            [t1, t2, t3, t4, t5, t6, t7, t8].forEach(t => clearTimeout(t));
        };
    }, [hasCachedData, selectedCountryCode]);

    const refresh = useCallback(() => {
        try {
            sessionStorage.removeItem(`${CACHE_KEY}_${selectedCountryCode || 'default'}`);
        } catch (e) {}
        setSearchBarLoaded(false);
        setChipsLoaded(false);
        setMustSeeLoaded(false);
        setNearYouLoaded(false);
        setRegionsLoaded(false);
        setMostSearchedLoaded(false);
        setBudgetLoaded(false);
        setCategoriesLoaded(false);
    }, [selectedCountryCode]);

    // Tratar reset por mudança de país
    useEffect(() => {
        if (!hasCachedData) {
            setSearchBarLoaded(false);
            setChipsLoaded(false);
            setMustSeeLoaded(false);
            setNearYouLoaded(false);
            setRegionsLoaded(false);
            setMostSearchedLoaded(false);
            setBudgetLoaded(false);
            setCategoriesLoaded(false);
        }
    }, [selectedCountryCode, hasCachedData]);

    return {
        searchBar: { isLoading: !searchBarLoaded },
        chips: { isLoading: !chipsLoaded },
        mustSee: { isLoading: !mustSeeLoaded },
        nearYou: { isLoading: !nearYouLoaded },
        regions: { isLoading: !regionsLoaded },
        mostSearched: { isLoading: !mostSearchedLoaded },
        budget: { isLoading: !budgetLoaded },
        categories: { isLoading: !categoriesLoaded },
        refresh,
    };
};

export default useHomeData;
