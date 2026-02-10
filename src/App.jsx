import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { createContext, useContext, useCallback, useRef, useEffect } from 'react';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import HomeScreen from './pages/Home/HomeScreen';
import CategoriesScreen from './pages/Categories/CategoriesScreen';
import MapScreen from './pages/Map/MapScreen';
import ProfileScreen from './pages/Profile/ProfileScreen';
import FeedScreen from './pages/Feed/FeedScreen';
import DestinoDetalhes from './pages/DestinoDetalhes/DestinoDetalhes';
import EditProfile from './pages/EditProfile/EditProfile';
import MessagesScreen from './pages/Messages/MessagesScreen';
import StoryViewer from './pages/StoryViewer/StoryViewer';
import ChatScreen from './pages/Chat/ChatScreen';
import MessageSettings from './pages/MessageSettings/MessageSettings';
import { AppProvider } from './context/AppContext';
import PageTransition from './components/PageTransition/PageTransition';
import VideoBackground from './components/VideoBackground/VideoBackground';
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

    const navigateForward = useCallback((path) => {
        directionRef.current = 'forward';
        isNavigatingRef.current = true;
        navigate(path);
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

// Animated routes wrapper
const AnimatedRoutes = () => {
    const location = useLocation();
    const { getDirection } = useNavigation();
    const direction = getDirection();

    // Routes where video background should be active
    const videoRoutes = ['/', '/login', '/signup', '/forgot-password', '/email-confirmation'];
    const showVideo = videoRoutes.includes(location.pathname);

    useEffect(() => {
        if (showVideo) {
            document.body.classList.add('video-active');
        } else {
            document.body.classList.remove('video-active');
        }
        return () => {
            document.body.classList.remove('video-active');
        };
    }, [showVideo]);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            overflowX: 'hidden',
            // Make background transparent when video is showing so video is visible
            background: showVideo ? 'transparent' : '#F0F9FF',
            // Ensure proper stacking context
            isolation: 'isolate'
        }}>
            {/* Global Video Background for Auth Pages */}
            {showVideo && <VideoBackground />}

            <AnimatePresence mode="popLayout" initial={false}>
                <PageTransition key={location.pathname} direction={direction}>
                    <Routes location={location}>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/login" element={<Login />} />
                        import EmailConfirmation from './pages/EmailConfirmation/EmailConfirmation';
                        // ... existing imports ...

                        // ... inside App component ...
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/email-confirmation" element={<EmailConfirmation />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/home" element={<HomeScreen />} />
                        <Route path="/categories" element={<CategoriesScreen />} />
                        <Route path="/feed" element={<FeedScreen />} />
                        <Route path="/map" element={<MapScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route path="/messages" element={<MessagesScreen />} />
                        <Route path="/story-viewer" element={<StoryViewer />} />
                        <Route path="/chat" element={<ChatScreen />} />
                        <Route path="/message-settings" element={<MessageSettings />} />
                        <Route path="/destino-detalhes" element={<DestinoDetalhes />} />
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
