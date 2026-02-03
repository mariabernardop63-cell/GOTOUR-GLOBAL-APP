import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useState, useCallback } from 'react';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import OtpVerification from './pages/OtpVerification/OtpVerification';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { AppProvider } from './context/AppContext';
import PageTransition from './components/PageTransition/PageTransition';
import './App.css';

// Navigation context for direction tracking
const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

// Navigation provider component
const NavigationProvider = ({ children }) => {
    const [direction, setDirection] = useState('forward');
    const navigate = useNavigate();

    const navigateForward = useCallback((path) => {
        setDirection('forward');
        navigate(path);
    }, [navigate]);

    const navigateBack = useCallback((path) => {
        setDirection('back');
        if (path) {
            navigate(path);
        } else {
            navigate(-1);
        }
    }, [navigate]);

    return (
        <NavigationContext.Provider value={{ direction, navigateForward, navigateBack }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Animated routes wrapper
const AnimatedRoutes = () => {
    const location = useLocation();
    const { direction } = useNavigation();

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            overflow: 'hidden',
            background: '#F0F9FF'
        }}>
            <AnimatePresence mode="sync" initial={false}>
                <PageTransition key={location.pathname} direction={direction}>
                    <Routes location={location}>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/otp-verification" element={<OtpVerification />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Routes>
                </PageTransition>
            </AnimatePresence>
        </div>
    );
};

function App() {
    return (
        <AppProvider>
            <NavigationProvider>
                <AnimatedRoutes />
            </NavigationProvider>
        </AppProvider>
    );
}

export default App;
