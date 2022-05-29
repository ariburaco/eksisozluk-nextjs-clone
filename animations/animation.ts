const fadeBack = {
    name: "Fade Back",
    variants: {
        initial: {
            opacity: 0,
            top: "100vh",
            scale: 0.6
        },
        animate: {
            opacity: 1,
            scale: 1,
            top: "0vh",
        },
        exit: {
            opacity: 0,
            scale: 0.6,
            top: "100vh",
        }
    },
    transition: {
        duration: 0.5
    }
};


export const animations = [
    fadeBack
];