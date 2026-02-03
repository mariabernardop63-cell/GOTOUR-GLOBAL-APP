import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import OtpVerification from './pages/OtpVerification/OtpVerification';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { AppProvider } from './context/AppContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import './App.css';

function AnimatedRoutes() {
    const location = useLocation();
    const { direction } = useNavigation();

    return (
        <AnimatePresence initial={false} custom={direction}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <NavigationProvider>
                    <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', width: '100vw' }}>
                        <AnimatedRoutes />
                    </div>
                </NavigationProvider>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
