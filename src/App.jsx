import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import OpeningScreen from './components/OpeningScreen';
import ISeeYou from './components/ISeeYou';
import HowMuchILoveYou from './components/HowMuchILoveYou';
import ThingsIAdmire from './components/ThingsIAdmire';
import QuietSupport from './components/QuietSupport';
import PhotoAlbum from './components/PhotoAlbum';
import PlansBoard from './components/PlansBoard';
import HiddenMessage from './components/HiddenMessage';
import Ending from './components/Ending';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      top: Math.random() * 100 + 'vh',
      size: Math.random() * 18 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 4
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-soft-cream">
      <div className="ambient-background">
        <div className="blur-glow w-96 h-96 bg-soft-pink top-[-10%] left-[-10%] animate-float"></div>
        <div className="blur-glow w-[30rem] h-[30rem] bg-soft-lavender bottom-[-20%] right-[-10%] animate-float-slow"></div>
        <div className="blur-glow w-80 h-80 bg-blush-pink top-[40%] left-[60%] animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-love-rose"
            style={{ left: heart.left, top: heart.top }}
            animate={{
              y: [0, -100, -200, -400],
              x: [0, 30, -30, 0],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear"
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <MusicPlayer />

      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-20 flex flex-col space-y-32 md:space-y-48 relative z-10 w-full animate-heartbeat overflow-x-hidden">
        <div className="max-w-3xl mx-auto flex flex-col space-y-32 md:space-y-48 w-full">
          <OpeningScreen />
          <ISeeYou />
          <HowMuchILoveYou />
        </div>
        
        <ThingsIAdmire />
        
        <div className="max-w-3xl mx-auto flex flex-col space-y-32 md:space-y-48 w-full">
          <QuietSupport />
          <PhotoAlbum />
          <PlansBoard />
          <HiddenMessage />
          <Ending />
        </div>
      </main>
    </div>
  );
}
