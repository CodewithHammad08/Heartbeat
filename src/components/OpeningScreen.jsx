import React from 'react';
import { motion } from 'framer-motion';

export default function OpeningScreen() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6"
    >
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-cursive text-deep-warm leading-tight mt-10">
        For Zubiya <br /> <span className="text-3xl md:text-4xl text-text-muted font-outfit font-light mt-6 block">— on the days that feel heavy</span>
      </h1>
      <p className="text-xl md:text-2xl text-text-muted font-light mt-6 tracking-wide opacity-80">
        This is your little space to pause.
      </p>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-20 opacity-50 absolute bottom-10"
      >
        <div className="w-[1px] h-16 bg-text-muted/40 mx-auto"></div>
      </motion.div>
    </motion.section>
  );
}
