import { motion } from 'framer-motion';

const PageTransition = ({ children, direction = 'forward' }) => {
    const isAuth = direction === 'auth';

    const getInitialX = () => {
        if (direction === 'fade' || isAuth) return 0;
        return direction === 'forward' ? '100%' : '-100%';
    };

    const getExitX = () => {
        if (direction === 'fade' || isAuth) return 0;
        return direction === 'forward' ? '-100%' : '100%';
    };

    return (
        <motion.div
            initial={{
                x: getInitialX(),
                opacity: (direction === 'fade' || isAuth) ? 0 : 1,
                scale: isAuth ? 0.97 : (direction === 'fade' ? 0.98 : 1),
                y: isAuth ? 12 : 0
            }}
            animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                y: 0,
                transitionEnd: {
                    transform: 'none',
                    position: 'relative'
                }
            }}
            exit={{
                x: getExitX(),
                opacity: (direction === 'fade' || isAuth) ? 0 : 1,
                scale: isAuth ? 0.97 : (direction === 'fade' ? 0.98 : 1),
                y: isAuth ? 12 : 0
            }}
            transition={{
                type: 'tween',
                duration: isAuth ? 0.35 : (direction === 'fade' ? 0.25 : 0.5),
                ease: isAuth ? [0.34, 1.56, 0.64, 1] : [0.33, 1, 0.68, 1],
            }}
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
