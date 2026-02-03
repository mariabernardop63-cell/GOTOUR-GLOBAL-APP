import { motion } from 'framer-motion';

const PageTransition = ({ children, direction = 'forward' }) => {
    // Determine initial and exit positions based on direction
    // Forward: enter from RIGHT, exit to LEFT
    // Back: enter from LEFT, exit to RIGHT

    const getInitialX = () => {
        return direction === 'forward' ? '100%' : '-100%';
    };

    const getExitX = () => {
        return direction === 'forward' ? '-100%' : '100%';
    };

    return (
        <motion.div
            initial={{
                x: getInitialX(),
                opacity: 1
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            exit={{
                x: getExitX(),
                opacity: 1
            }}
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
