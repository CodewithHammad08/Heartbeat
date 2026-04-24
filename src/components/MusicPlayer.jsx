import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio ref={audioRef} loop preload="auto">
        <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3" type="audio/mp3" />
      </audio>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center text-text-muted hover:text-deep-warm transition-colors"
        aria-label="Toggle ambient music"
      >
        {isPlaying ? <Volume2 size={20} strokeWidth={1.5} /> : <VolumeX size={20} strokeWidth={1.5} />}
      </motion.button>
    </div>
  );
}
