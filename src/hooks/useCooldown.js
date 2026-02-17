import { useState, useEffect, useCallback, useRef } from 'react';

const COOLDOWN_DURATION = 90; // seconds

/**
 * Reusable hook for managing email send cooldowns.
 * Persists to localStorage so it survives page reloads.
 *
 * @param {string} storageKey - unique localStorage key for this cooldown
 * @returns {{ cooldown, startCooldown, isCoolingDown }}
 */
const useCooldown = (storageKey) => {
    const [cooldown, setCooldown] = useState(0);
    const intervalRef = useRef(null);

    // On mount: check if there's a saved cooldown in localStorage
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const expiresAt = parseInt(saved, 10);
            const remaining = Math.ceil((expiresAt - Date.now()) / 1000);
            if (remaining > 0) {
                setCooldown(remaining);
            } else {
                localStorage.removeItem(storageKey);
            }
        }
    }, [storageKey]);

    // Tick down the cooldown
    useEffect(() => {
        if (cooldown <= 0) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setCooldown(prev => {
                if (prev <= 1) {
                    localStorage.removeItem(storageKey);
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [cooldown > 0, storageKey]);

    const startCooldown = useCallback(() => {
        const expiresAt = Date.now() + COOLDOWN_DURATION * 1000;
        localStorage.setItem(storageKey, expiresAt.toString());
        setCooldown(COOLDOWN_DURATION);
    }, [storageKey]);

    return {
        cooldown,
        startCooldown,
        isCoolingDown: cooldown > 0
    };
};

export default useCooldown;
