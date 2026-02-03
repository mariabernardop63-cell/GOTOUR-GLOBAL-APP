import { motion } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';

const variants = {
    initial: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0, // optional, keeping opacity for smoother feel if requested
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        }
    },
    exit: (direction) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
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
                top: 0,
                left: 0,
                minHeight: '100vh',
                overflowX: 'hidden'
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
