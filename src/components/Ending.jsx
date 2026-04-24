import React from 'react';
import { motion } from 'framer-motion';

export default function Ending() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.2 }}
<<<<<<< HEAD
      className="text-center pb-32 z-10"
    >
      <div className="w-[1px] h-32 bg-gradient-to-b from-text-muted/30 to-transparent mx-auto mb-16"></div>
      <h3 className="text-3xl md:text-4xl font-cursive text-deep-warm leading-relaxed opacity-90">
        No matter how your days go,<br className="hidden md:block" /> I'm always by your side.
      </h3>
=======
      className="text-center pb-20 z-10"
    >
      <div className="w-[1px] h-32 bg-gradient-to-b from-text-muted/30 to-transparent mx-auto mb-16"></div>
      
      <h3 className="text-3xl md:text-4xl font-cursive text-deep-warm leading-relaxed opacity-90">
        No matter how your days go,<br className="hidden md:block" /> I'm always by your side.
      </h3>
      
>>>>>>> b19eae2 (Initial commit)
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="text-4xl md:text-5xl font-cursive text-love-rose mt-8"
      >
<<<<<<< HEAD
        I love you, Zubiya.
      </motion.p>
=======
        I simply adore you, Zubiya.
      </motion.p>

      {/* Hammad's subtle sign-off */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="mt-32 text-text-muted/50 font-outfit font-light text-xs md:text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2"
      >
        Developed with love by Hammad
      </motion.div>
>>>>>>> b19eae2 (Initial commit)
    </motion.footer>
  );
}
