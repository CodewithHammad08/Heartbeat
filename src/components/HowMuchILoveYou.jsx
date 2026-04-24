import React from 'react';
import { motion } from 'framer-motion';

export default function HowMuchILoveYou() {
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="max-w-3xl mx-auto text-center z-10 py-10"
    >
      <div className="w-16 h-[1px] bg-love-rose/30 mx-auto mb-12"></div>
      
      <h2 className="text-3xl md:text-5xl font-cursive text-deep-warm mb-8 text-center">
        No Pressure. Just Care.
      </h2>
      
      <div className="bg-white/40 backdrop-blur-md p-8 md:p-14 rounded-[3rem] border border-love-rose/20 shadow-sm text-lg md:text-xl text-text-muted font-light leading-relaxed space-y-6 text-center">
        <p>
          Whenever the days feel too long, the tasks feel too heavy, and you just want to curl up and hide from the world, please remember you have a safe place waiting for you right here.
        </p>
        <p>
          I want you to know just how special you are to me. I admire the way your mind works, the warmth of your smile, and every beautiful little piece that makes you who you are.
        </p>
        <p>
          I never expect you to be energetic, perfectly put together, or to have everything figured out. I just adore you, exactly as you are right now.
        </p>
        <p className="font-medium text-love-rose pt-2 text-xl font-outfit tracking-wide">
          Take all the time and space you need. I'm just happy to be in your corner. ❤️
        </p>
      </div>

      <div className="w-16 h-[1px] bg-love-rose/30 mx-auto mt-12"></div>
    </motion.section>
  );
}
