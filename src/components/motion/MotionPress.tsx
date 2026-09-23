"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionPressProps = {
  children: ReactNode;
  className?: string;
};

// Wraps a non-motion element (e.g. next/link) to give it hover/tap feedback
// without touching its own transform-based CSS classes.
const MotionPress = ({ children, className }: MotionPressProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default MotionPress;
