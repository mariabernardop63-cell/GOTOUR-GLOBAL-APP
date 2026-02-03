import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children, direction = 'forward' }) => {
    const location = useLocation();

    // Stack navigation variants
    const variants = {
        // Forward: new page enters from right
        enterFromRight: {
            x: '100%',
            zIndex: 2,
        },
        // Back: new page enters from left
        enterFromLeft: {
            x: '-30%',
            zIndex: 1,
        },
        // Center (visible)
        center: {
            x: 0,
            zIndex: 2,
        },
        // Forward exit: current page exits to left (behind)
        exitToLeft: {
            x: '-30%',
            zIndex: 1,
        },
        // Back exit: current page exits to right
        exitToRight: {
            x: '100%',
            zIndex: 2,
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
                ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                minHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
