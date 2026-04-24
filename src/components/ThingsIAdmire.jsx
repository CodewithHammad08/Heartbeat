import React from 'react';
import { motion } from 'framer-motion';

const items = [
  {
    title: "How hard you work",
    text: "I watch you give so much to your work and your responsibilities. I just want you to know that your effort doesn't go unnoticed. I see how tired you get, and I just want to hold you close and let you rest.",
    caption: "My hardworking girl.",
    image: "https://images.pexels.com/photos/1963056/pexels-photo-1963056.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Your gentle heart",
    text: "Even when your own day is entirely overwhelming, you still find a way to be kind to the people around you. Let me be the one who takes care of you for a change. You deserve it.",
    caption: "Let me take care of you.",
    image: "https://images.pexels.com/photos/1826084/pexels-photo-1826084.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    title: "Just being you",
    text: "You don't need to try so hard when you're with me. Just sitting next to you, hearing about your day, or sitting in completely peaceful silence together... it's my favorite part of any day.",
    caption: "My favorite place is with you.",
    image: "https://images.pexels.com/photos/2085527/pexels-photo-2085527.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export default function ThingsIAdmire() {
  return (
    <section className="max-w-5xl mx-auto w-full z-10 pt-10">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-cursive text-center text-deep-warm mb-20 md:mb-32 drop-shadow-sm"
      >
        I Just Want You To Know...
      </motion.h2>

      <div className="flex flex-col space-y-32 lg:space-y-48">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              {/* Aesthetic Polaroid Setup */}
              <div className="w-full md:w-1/2 flex justify-center relative">
                {/* Washi Tape Accent */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-white/60 backdrop-blur-md rotate-[-3deg] z-20 shadow-sm border border-white/40 opacity-80"></div>
                
                <div className={`bg-[#FFFAFA] p-5 pb-16 md:p-6 md:pb-20 rounded-sm shadow-[0_20px_50px_rgba(255,142,158,0.15)] transform transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(255,142,158,0.25)] ${isEven ? 'rotate-3 hover:rotate-1' : '-rotate-3 hover:-rotate-1'} border border-[#F4E1E1] max-w-sm w-full relative z-10`}>
                  
                  {/* Photo Container */}
                  <div className="w-full aspect-[4/5] overflow-hidden relative rounded-[2px] shadow-inner bg-gray-100 flex items-center justify-center">
                    {/* Add her actual picture here later! */}
                    <img 
                      src={item.image} 
                      alt="Aesthetic memory placeholder" 
                      className="w-full h-full object-cover filter contrast-[0.95] saturate-[0.85] hover:contrast-100 hover:saturate-[1.1] transition-all duration-700"
                    />
                  </div>
                  
                  {/* Handwritten Romantic Caption */}
                  <p className="font-cursive text-deep-warm/90 mt-8 text-center text-3xl md:text-4xl tracking-wide opacity-90 drop-shadow-sm">
                     {item.caption}
                  </p>
                </div>
              </div>

              {/* Sophisticated Text Area */}
              <div className={`w-full md:w-1/2 flex flex-col justify-center px-4 ${isEven ? 'md:items-start text-center md:text-left' : 'md:items-end text-center md:text-right'}`}>
                <span className="text-love-rose/40 text-4xl mb-6 font-cursive animate-pulse">{"♡"}</span>
                <h3 className="text-3xl md:text-4xl font-outfit font-medium text-deep-warm mb-6 tracking-wider">{item.title}</h3>
                <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed max-w-md">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
