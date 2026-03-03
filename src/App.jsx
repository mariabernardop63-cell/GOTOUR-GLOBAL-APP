import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useCallback, useRef, useEffect, useState } from 'react';
import GoTourSplashScreen from './pages/GoTourSplashScreen/GoTourSplashScreen';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import OtpVerification from './pages/OtpVerification/OtpVerification';
import CreatePassword from './pages/CreatePassword/CreatePassword';
import HomeScreen from './pages/Home/HomeScreen';
import CategoriesScreen from './pages/Categories/CategoriesScreen';
import MapScreen from './pages/Map/MapScreen';
import ProfileScreen from './pages/Profile/ProfileScreen';
import UserProfileScreen from './pages/UserProfile/UserProfileScreen';
import FeedScreen from './pages/Feed/FeedScreen';
import DestinoDetalhes from './pages/DestinoDetalhes/DestinoDetalhes';
import SelectCountryScreen from './pages/SelectCountry/SelectCountryScreen';
import EditProfile from './pages/EditProfile/EditProfile';
import MessagesScreen from './pages/Messages/MessagesScreen';
import StoryViewer from './pages/StoryViewer/StoryViewer';
import ChatScreen from './pages/Chat/ChatScreen';
import MessageSettings from './pages/MessageSettings/MessageSettings';
import SettingsScreen from './pages/Settings/SettingsScreen';
import NotificationsScreen from './pages/Notifications/NotificationsScreen';
import FriendsScreen from './pages/Friends/FriendsScreen';
import OAuthCallback from './pages/OAuthCallback/OAuthCallback';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import PageTransition from './components/PageTransition/PageTransition';
import './App.css';

// Navigation context for direction tracking
const NavigationContext = createContext();

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    return context;
};

// Navigation provider component
const NavigationProvider = ({ children }) => {
    const directionRef = useRef('forward');
    const navigate = useNavigate();
    const isNavigatingRef = useRef(false);

    // Listen for browser/phone back button
    useEffect(() => {
        const handlePopState = () => {
            // Browser back button was pressed
            if (!isNavigatingRef.current) {
                directionRef.current = 'back';
            }
            isNavigatingRef.current = false;
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigateForward = useCallback((path, options) => {
        directionRef.current = 'forward';
        isNavigatingRef.current = true;
        navigate(path, options);
    }, [navigate]);

    const navigateBack = useCallback((path) => {
        directionRef.current = 'back';
        isNavigatingRef.current = true;
        if (path) {
            navigate(path);
        } else {
            navigate(-1);
        }
    }, [navigate]);

    const getDirection = useCallback(() => {
        return directionRef.current;
    }, []);

    return (
        <NavigationContext.Provider value={{ getDirection, navigateForward, navigateBack }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Splash wrapper — shows splash once per session, then Welcome
const SplashWrapper = () => {
    // FORCE WELCOME SCREEN IMMEDIATELY FOR GOOGLE OAUTH VALIDATION CRAWLERS
    return <Welcome />;
};

// Animated routes wrapper
const AnimatedRoutes = () => {
    const location = useLocation();
    const { getDirection } = useNavigation();
    const direction = getDirection();

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            overflowX: 'hidden',
            background: '#F0F9FF',
            // Ensure proper stacking context
            isolation: 'isolate'
        }}>
            <AnimatePresence mode="popLayout" initial={false}>
                <PageTransition key={location.pathname} direction={direction}>
                    <Routes location={location}>
                        {/* Welcome screen detached from AuthLayout for full-bleed hero */}
                        <Route path="/" element={<SplashWrapper />} />
                        <Route path="/oauth-callback" element={<OAuthCallback />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/select-country" element={<SelectCountryScreen />} />
                        <Route path="/email-confirmation" element={<EmailConfirmation />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/otp-verification" element={<OtpVerification />} />
                        <Route path="/create-password" element={<CreatePassword />} />
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/categories" element={<CategoriesScreen />} />
                        <Route path="/feed" element={<FeedScreen />} />
                        <Route path="/map" element={<MapScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/user/:id" element={<UserProfileScreen />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/messages" element={<MessagesScreen />} />
                        <Route path="/story-viewer" element={<StoryViewer />} />
                        <Route path="/chat" element={<ChatScreen />} />
                        <Route path="/message-settings" element={<MessageSettings />} />
                        <Route path="/destino-detalhes" element={<DestinoDetalhes />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/settings" element={<SettingsScreen />} />
                        <Route path="/notifications" element={<NotificationsScreen />} />
                        <Route path="/friends" element={<FriendsScreen />} />
                    </Routes>
                </PageTransition>
            </AnimatePresence>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <AppProvider>
                <NavigationProvider>
                    <AnimatedRoutes />
                </NavigationProvider>
            </AppProvider>
        </AuthProvider>
    );
}

export default App;
