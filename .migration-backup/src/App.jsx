import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, useContext, useCallback, useRef, useEffect, useState } from 'react';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import OtpVerification from './pages/OtpVerification/OtpVerification';
import CreatePassword from './pages/CreatePassword/CreatePassword';
import HomeScreen from './pages/Home/HomeScreen';
import CategoriesScreen from './pages/Categories/CategoriesScreen';
import RadarMeteorologicoScreen from './pages/RadarMeteorologico/RadarMeteorologicoScreen';
import MonitorCambioScreen from './pages/MonitorCambio/MonitorCambioScreen';
import FusoHorarioScreen from './pages/FusoHorario/FusoHorarioScreen';
import CheckpointScreen from './pages/Checkpoint/CheckpointScreen';
import PulsoLocalScreen from './pages/PulsoLocal/PulsoLocalScreen';
import HubFinanceiroScreen from './pages/HubFinanceiro/HubFinanceiroScreen';
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
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthGateScreen from './pages/AuthGate/AuthGateScreen';
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

    const [modalBackground, setModalBackground] = useState(null);

    // Listen for browser/phone back button
    useEffect(() => {
        const handlePopState = () => {
            // Browser back button was pressed
            if (!isNavigatingRef.current) {
                // Use smooth auth transition if leaving an auth route
                const currentPath = window.location.pathname;
                const isFromAuth = AUTH_ROUTES.some(r => currentPath.startsWith(r));
                directionRef.current = isFromAuth ? 'auth' : 'back';
            }
            isNavigatingRef.current = false;
            setModalBackground(null);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Auth routes that should use the smooth scale+fade transition
    const AUTH_ROUTES = ['/login', '/signup', '/welcome', '/email-confirmation', '/forgot-password', '/otp-verification', '/create-password'];

    const navigateForward = useCallback((path, options) => {
        // Auto-detect auth routes for smooth transitions
        const isAuthRoute = AUTH_ROUTES.some(r => path.startsWith(r));
        directionRef.current = isAuthRoute ? 'auth' : 'forward';
        isNavigatingRef.current = true;
        navigate(path, options);
    }, [navigate]);

    const navigateAuth = useCallback((path, options) => {
        directionRef.current = 'auth';
        isNavigatingRef.current = true;
        navigate(path, options);
    }, [navigate]);

    const navigateFade = useCallback((path, options) => {
        directionRef.current = 'fade';
        isNavigatingRef.current = true;
        navigate(path, options);
    }, [navigate]);

    const navigateBack = useCallback((path) => {
        // Use smooth auth transition if currently on an auth route
        const currentPath = window.location.pathname;
        const isFromAuth = AUTH_ROUTES.some(r => currentPath.startsWith(r));
        directionRef.current = isFromAuth ? 'auth' : 'back';
        isNavigatingRef.current = true;
        setModalBackground(null);
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
        <NavigationContext.Provider value={{ getDirection, navigateForward, navigateBack, navigateFade, navigateAuth, modalBackground, setModalBackground }}>
            {children}
        </NavigationContext.Provider>
    );
};



// Animated routes wrapper
const AnimatedRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { getDirection, modalBackground, setModalBackground } = useNavigation();
    const direction = getDirection();
    const { user, loading } = useAuth();
    console.log("GoTour Debug Auth State:", { user, loading, pathname: location.pathname });

    // === Overlay System (Details + Profile + Modals) ===
    const overlayPaths = ['/destino-detalhes', '/profile', '/monitor-cambio', '/fuso-horario', '/pulso-local'];
    const isUserProfilePage = location.pathname.startsWith('/user/');
    const prevLocationRef = useRef(
        !overlayPaths.includes(location.pathname) && !location.pathname.startsWith('/user/') ? location : null
    );

    useEffect(() => {
        if (!overlayPaths.includes(location.pathname) && !location.pathname.startsWith('/user/')) {
            prevLocationRef.current = location;
        }
    }, [location]);

    const isDetailsPage = location.pathname === '/destino-detalhes';
    const isProfilePage = location.pathname === '/profile';
    const isMonitorCambioPage = location.pathname === '/monitor-cambio';
    const isFusoHorarioPage = location.pathname === '/fuso-horario';
    const isPulsoLocalPage = location.pathname === '/pulso-local';
    const isOverlayActive = isDetailsPage || isProfilePage || isMonitorCambioPage || isFusoHorarioPage || isPulsoLocalPage || isUserProfilePage;
    const overlayBackground = isOverlayActive ? prevLocationRef.current : null;

    // Lock background scrolling when any overlay is active
    useEffect(() => {
        if (overlayBackground) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [overlayBackground]);

    // If modalBackground is active and we are at /notifications etc, lock the background location
    const isModalRoute = location.pathname === '/notifications' || location.pathname === '/friends' || location.pathname === '/messages';
    const activeBackgroundPath = (isModalRoute && modalBackground) ? modalBackground : overlayBackground;

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
                <PageTransition key={activeBackgroundPath?.pathname || location.pathname} direction={direction}>
                    <Routes location={activeBackgroundPath || location}>
                        {/* Initial screen is HomeScreen, Welcome screen is moved to /welcome */}
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/welcome" element={<Welcome />} />
                        <Route path="/oauth-callback" element={<OAuthCallback />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/select-country" element={<SelectCountryScreen />} />
                        <Route path="/checkpoint" element={<CheckpointScreen />} />
                        <Route path="/hub-financeiro" element={<HubFinanceiroScreen />} />
                        <Route path="/email-confirmation" element={<EmailConfirmation />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/otp-verification" element={<OtpVerification />} />
                        <Route path="/create-password" element={<CreatePassword />} />
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/categories" element={<CategoriesScreen />} />
                        <Route path="/radar-meteorologico" element={<RadarMeteorologicoScreen />} />
                        <Route path="/feed" element={<FeedScreen />} />
                        <Route path="/map" element={<MapScreen />} />
                        {/* Desktop avoids mapping /profile in main routes when modal is active, but maps it normally for direct links */}
                        {!activeBackgroundPath && (
                            <Route 
                                path="/profile" 
                                element={user ? <ProfileScreen /> : <AuthGateScreen onClose={() => navigate('/home')} onNavigateSignup={() => navigate('/signup')} onNavigateLogin={() => navigate('/login')} />} 
                            />
                        )}
                        <Route path="/user/:id" element={<UserProfileScreen />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/messages" element={<MessagesScreen />} />
                        <Route path="/story-viewer" element={<StoryViewer />} />
                        <Route path="/chat" element={<ChatScreen />} />
                        <Route path="/message-settings" element={<MessageSettings />} />
                        <Route 
                            path="/destino-detalhes" 
                            element={user ? <DestinoDetalhes /> : <AuthGateScreen onClose={() => navigate('/home')} onNavigateSignup={() => navigate('/signup')} onNavigateLogin={() => navigate('/login')} />} 
                        />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/settings" element={<SettingsScreen />} />
                        {!activeBackgroundPath && <Route path="/notifications" element={<NotificationsScreen />} />}
                        {!activeBackgroundPath && <Route path="/friends" element={<FriendsScreen />} />}
                    </Routes>
                </PageTransition>
            </AnimatePresence>

            {/* Details Page Full-Screen Overlay (Fade + Slide) */}
            <AnimatePresence>
                {overlayBackground && isDetailsPage && user && (
                    <motion.div
                        key="details-overlay"
                        className="details-overlay"
                        initial={{ opacity: 0, y: '3%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '3%' }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9999,
                            background: '#ffffff',
                            overflowY: 'auto',
                        }}
                    >
                        <Routes location={location}>
                            <Route path="/destino-detalhes" element={<DestinoDetalhes />} />
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Modal Overlay (Fade + Slide) */}
            <AnimatePresence>
                {overlayBackground && isProfilePage && user && (
                    <motion.div
                        key="profile-overlay"
                        className="profile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9999,
                        }}
                    >
                        {/* Backdrop */}
                        <div
                            className="profile-modal-backdrop"
                            onClick={() => {
                                setModalBackground(null);
                                navigate(overlayBackground.pathname);
                            }}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                zIndex: -1,
                            }}
                        />
                        <Routes location={location}>
                            <Route path="/profile" element={<ProfileScreen isModal />} />
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Auth Gate Modal Overlay (Same style/size as MonitorCambio modal) */}
            <AnimatePresence>
                {overlayBackground && (isDetailsPage || isProfilePage) && !user && (
                    <motion.div
                        key="auth-gate-overlay"
                        className="auth-gate-overlay"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="auth-gate-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => {
                                setModalBackground(null);
                                navigate(overlayBackground.pathname);
                            }}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(8px)',
                                zIndex: -1,
                            }}
                        />
                        <AuthGateScreen 
                            onClose={() => {
                                setModalBackground(null);
                                navigate(overlayBackground.pathname);
                            }}
                            onNavigateSignup={() => {
                                setModalBackground(null);
                                navigate('/signup');
                            }}
                            onNavigateLogin={() => {
                                setModalBackground(null);
                                navigate('/login');
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UserProfile Modal Overlay (Viewing another user) */}
            <AnimatePresence>
                {overlayBackground && isUserProfilePage && (
                    <motion.div
                        key="userprofile-overlay"
                        className="profile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9999,
                        }}
                    >
                        {/* Backdrop */}
                        <div
                            className="profile-modal-backdrop"
                            onClick={() => {
                                setModalBackground(null);
                                navigate(overlayBackground.pathname);
                            }}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                zIndex: -1,
                            }}
                        />
                        <Routes location={location}>
                            <Route path="/user/:id" element={<UserProfileScreen />} />
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Monitor Cambio Modal Overlay (Fade + Slide) */}
            <AnimatePresence>
                {overlayBackground && isMonitorCambioPage && (
                    <motion.div
                        key="monitor-cambio-overlay"
                        className="monitor-cambio-overlay"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="monitor-cambio-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate(overlayBackground.pathname)}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(8px)',
                                zIndex: -1,
                            }}
                        />
                        <Routes location={location}>
                            <Route path="/monitor-cambio" element={<MonitorCambioScreen />} />
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fuso Horario Modal Overlay */}
            <AnimatePresence>
                {overlayBackground && isFusoHorarioPage && (
                    <motion.div
                        key="fuso-horario-overlay"
                        className="fuso-horario-overlay"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <motion.div
                            className="fuso-horario-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => navigate(overlayBackground.pathname)}
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(15, 23, 42, 0.6)',
                                backdropFilter: 'blur(8px)',
                                zIndex: -1,
                            }}
                        />
                        <Routes location={location}>
                            <Route path="/fuso-horario" element={<FusoHorarioScreen />} />
                        </Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pulso Local Modal Overlay */}
            <AnimatePresence>
                {overlayBackground && isPulsoLocalPage && (
                    <motion.div
                        key="pulso-local-overlay"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => navigate(overlayBackground.pathname)} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', zIndex: -1 }} />
                        <Routes location={location}><Route path="/pulso-local" element={<PulsoLocalScreen />} /></Routes>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notifications Desktop Frame Modal Context */}
            {activeBackgroundPath && location.pathname === '/notifications' && (
                <>
                    <div 
                        className="notifications-modal-backdrop"
                        onClick={() => {
                            setModalBackground(null);
                            navigate(activeBackgroundPath.pathname);
                        }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9997,
                        }}
                    />
                    <Routes>
                        <Route path="/notifications" element={<NotificationsScreen />} />
                    </Routes>
                </>
            )}

            {/* Friends Desktop Frame Modal Context */}
            {activeBackgroundPath && location.pathname === '/friends' && (
                <>
                    <div 
                        className="friends-modal-backdrop"
                        onClick={() => {
                            setModalBackground(null);
                            navigate(activeBackgroundPath.pathname);
                        }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9997,
                        }}
                    />
                    <Routes>
                        <Route path="/friends" element={<FriendsScreen />} />
                    </Routes>
                </>
            )}

            {/* Messages Desktop Frame Modal Context */}
            {activeBackgroundPath && location.pathname === '/messages' && (
                <>
                    <div 
                        className="messages-modal-backdrop"
                        onClick={() => {
                            setModalBackground(null);
                            navigate(activeBackgroundPath.pathname);
                        }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 9997,
                        }}
                    />
                    <Routes>
                        <Route path="/messages" element={<MessagesScreen />} />
                    </Routes>
                </>
            )}
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
