import type { Transition, Variants } from "framer-motion";

export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const fieldTransition: Transition = {
  duration: 0.35,
  ease: easeOut,
};
