"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { easeOut } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
};

const Reveal = ({ children, className, delay = 0, y = 20, id }: RevealProps) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, ease: easeOut, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
