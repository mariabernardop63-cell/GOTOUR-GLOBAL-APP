import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        x: '100%',
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: '-100%',
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3,
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{
                position: 'absolute',
                width: '100%',
                minHeight: '100vh',
                top: 0,
                left: 0,
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
