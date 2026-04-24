import React from 'react';
import { motion } from 'framer-motion';

export default function ISeeYou() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="max-w-2xl mx-auto text-center z-10"
    >
      <h2 className="text-3xl md:text-4xl font-cursive text-deep-warm mb-8">Hey you... I see you.</h2>
      <div className="space-y-6 text-lg md:text-xl text-text-muted font-light leading-relaxed text-center">
        <p>
          I know how incredibly draining the office can be. I see the tiredness in you after a long, stressful day, and I see how much you push yourself anyway. 
        </p>
        <p>
          You give so much energy to everyone and everything else. You forget to give yourself a break. 
        </p>
        <p>
          This is just a little reminder that when you're with me, you don't have to try. You can just drop your bags, exhale, and rest. I'm here to take care of you.
        </p>
      </div>
    </motion.section>
  );
}
