import React, { createContext, useContext, useState } from 'react';
import { useNavigate as useRouterNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};

export const NavigationProvider = ({ children }) => {
    const navigate = useRouterNavigate();
    const [direction, setDirection] = useState(0); // 1 = forward, -1 = back

    const goForward = (to, state) => {
        setDirection(1);
        navigate(to, { state });
    };

    const goBack = () => {
        setDirection(-1);
        navigate(-1);
    };

    const goTo = (to, dir = 1) => {
        setDirection(dir);
        navigate(to);
    }

    return (
        <NavigationContext.Provider value={{ direction, goForward, goBack, goTo }}>
            {children}
        </NavigationContext.Provider>
    );
};
