export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

export const revealText = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

export const glassIn = {
  hidden: { opacity: 0, scale: 0.95, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    scale: 1,
    backdropFilter: "blur(20px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
