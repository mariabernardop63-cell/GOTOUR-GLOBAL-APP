import { motion } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';

const variants = {
    initial: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 1,
        position: 'absolute',
        zIndex: 0 // Default
    }),
    animate: {
        x: 0,
        opacity: 1,
        zIndex: 1,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 1,
        position: 'absolute',
        zIndex: 0,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    })
};

const PageTransition = ({ children }) => {
    const { direction } = useNavigation();

    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%', // Ensure full height overlap
                top: 0,
                left: 0,
                overflowX: 'hidden',
                backgroundColor: 'var(--bg-gradient)' // Ensure background persists during slide
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
