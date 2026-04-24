import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HiddenMessage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="text-center z-10 flex flex-col items-center w-full">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-8 py-3.5 rounded-full bg-soft-pink/70 border border-love-rose/30 text-text-muted text-sm font-medium tracking-wider uppercase hover:bg-soft-pink transition-all backdrop-blur-sm shadow-sm"
      >
        {isOpen ? "Close message" : "Click if you need this today"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20, transition: { duration: 0.3 } }}
            className="overflow-hidden mt-8 max-w-2xl mx-auto w-full"
          >
            <div className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-[2rem] border border-love-rose/20 shadow-[0_8px_30px_rgb(255,142,158,0.1)] text-lg md:text-xl text-text-muted font-light leading-relaxed text-center">
              <p>
                Whatever happens, whatever you are feeling, I am here. You don't have to carry every burden alone, and you don't have to figure everything out right this second. 
              </p>
              <p className="mt-6">
                Take it one step at a time. I am proud of the person you are—not just because of what you achieve or how hard you work, but because of your beautiful heart. I'm always on your side. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
