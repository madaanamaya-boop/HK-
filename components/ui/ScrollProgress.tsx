"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="grad-fill fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      aria-hidden="true"
    />
  );
}
