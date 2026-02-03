import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Page order for determining slide direction
const routeOrder = ['/', '/login', '/signup', '/otp-verification', '/forgot-password'];

const PageTransition = ({ children, direction = 'forward' }) => {
    const location = useLocation();

    // Variants for stack navigation
    const variants = {
        // Forward navigation: new page slides in from right
        enterFromRight: {
            x: '100%',
            opacity: 1,
        },
        // Back navigation: new page slides in from left
        enterFromLeft: {
            x: '-100%',
            opacity: 1,
        },
        // Center position (visible)
        center: {
            x: 0,
            opacity: 1,
        },
        // Forward navigation exit: current page slides out to left
        exitToLeft: {
            x: '-100%',
            opacity: 1,
        },
        // Back navigation exit: current page slides out to right
        exitToRight: {
            x: '100%',
            opacity: 1,
        },
    };

    return (
        <motion.div
            key={location.pathname}
            initial={direction === 'forward' ? 'enterFromRight' : 'enterFromLeft'}
            animate="center"
            exit={direction === 'forward' ? 'exitToLeft' : 'exitToRight'}
            variants={variants}
            transition={{
                type: 'tween',
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1], // Smooth easing
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                minHeight: '100vh',
                background: '#F0F9FF',
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
