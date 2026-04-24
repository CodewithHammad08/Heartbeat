import React from 'react';
import { motion } from 'framer-motion';

export default function QuietSupport() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="text-center max-w-xl mx-auto py-10 z-10"
    >
      <div className="w-16 h-[1px] bg-text-muted/30 mx-auto mb-12"></div>
      <p className="text-3xl md:text-4xl font-cursive text-deep-warm leading-relaxed tracking-wide">
        "You don't have to be strong all the time."
      </p>
      <p className="mt-8 text-lg text-text-muted font-light opacity-90">
        It's okay to just breathe, pause, and take a moment for yourself.
      </p>
      <div className="w-16 h-[1px] bg-text-muted/30 mx-auto mt-12"></div>
    </motion.section>
  );
}
