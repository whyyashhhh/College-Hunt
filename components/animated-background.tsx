"use client";

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_22%),radial-gradient(circle_at_top_right,rgba(191,219,254,0.2),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.88))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.6)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-8rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-sky-300/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -16, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-8rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-amber-200/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, 14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-7rem] left-[20%] h-[20rem] w-[20rem] rounded-full bg-cyan-200/30 blur-3xl"
      />
    </div>
  );
}
