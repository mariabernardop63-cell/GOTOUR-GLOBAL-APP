import { motion } from 'framer-motion';

const EASING_ENTER = [0.22, 1, 0.36, 1];
const EASING_EXIT  = [0.32, 0, 0.67, 0];

const getVariants = (direction) => {
    const isAuth = direction === 'auth';
    const isFade = direction === 'fade';

    if (isAuth) {
        return {
            initial: { opacity: 0, y: 16, scale: 0.985 },
            animate: {
                opacity: 1, y: 0, scale: 1,
                transition: { duration: 0.42, ease: EASING_ENTER },
            },
            exit: {
                opacity: 0, y: 16, scale: 0.985,
                transition: { duration: 0.28, ease: EASING_EXIT },
            },
        };
    }

    if (isFade) {
        return {
            initial: { opacity: 0, y: 10 },
            animate: {
                opacity: 1, y: 0,
                transition: { duration: 0.32, ease: EASING_ENTER },
            },
            exit: {
                opacity: 0, y: 10,
                transition: { duration: 0.22, ease: EASING_EXIT },
            },
        };
    }

    const xIn  = direction === 'forward' ? '100%' : '-100%';
    const xOut = direction === 'forward' ? '-100%' : '100%';

    return {
        initial: { x: xIn, opacity: 1 },
        animate: {
            x: 0, opacity: 1,
            transition: { duration: 0.46, ease: EASING_ENTER },
        },
        exit: {
            x: xOut, opacity: 1,
            transition: { duration: 0.46, ease: EASING_EXIT },
        },
    };
};

const PageTransition = ({ children, direction = 'forward' }) => {
    const variants = getVariants(direction);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                minHeight: '100vh',
                overflowX: 'hidden',
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
