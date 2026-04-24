import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Pin } from 'lucide-react';

export default function PlansBoard() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('zubiya_plans_board');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: '1', text: "Just a quiet coffee together ☕", color: "bg-[#FFF9C4]" },
      { id: '2', text: "Sitting in absolute silence 🍿", color: "bg-[#FCE4EC]" }
    ];
  });
  
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem('zubiya_plans_board', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    const colors = ["bg-[#FFF9C4]", "bg-[#FCE4EC]", "bg-[#E1BEE7]", "bg-[#E8F5E9]", "bg-[#FFF0F5]"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const note = {
      id: Date.now().toString(),
      text: newNote.trim(),
      color: randomColor
    };
    
    setNotes([...notes, note]);
    setNewNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <section className="w-full relative z-10 bg-[#FAF3E0]/90 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[#E8DCC4] shadow-[inset_0_4px_12px_rgba(0,0,0,0.02),0_8px_30px_rgba(255,142,158,0.1)]">
      
      <div className="absolute top-6 left-6 text-love-rose opacity-80"><Pin size={24} fill="#FF8E9E" /></div>
      <div className="absolute top-6 right-6 text-love-rose opacity-80"><Pin size={24} fill="#FF8E9E" /></div>

      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-cursive text-deep-warm">Little Things We Could Do</h2>
        <p className="text-text-muted font-light mt-3 max-w-md mx-auto">Bookmark tiny ideas here for when you have the energy. Even if it's literally just sitting in silence together.</p>
      </div>

      <form onSubmit={addNote} className="flex gap-3 mb-12 max-w-md mx-auto relative z-20">
        <input 
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="E.g. Ice cream date..."
          className="flex-1 px-5 py-3.5 rounded-2xl bg-white border border-[#E8DCC4] focus:outline-none focus:ring-2 focus:ring-love-rose/50 transition-all placeholder:text-text-muted/50 text-deep-warm shadow-sm"
        />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-love-rose text-white px-5 py-3.5 rounded-2xl shadow-md flex items-center justify-center hover:bg-[#E8A3A8] transition-colors"
          aria-label="Add plan"
        >
          <Plus size={20} className="stroke-[3px]" />
        </motion.button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              key={note.id}
              className={`${note.color} p-5 md:p-6 shadow-md relative group min-h-[140px] flex items-center justify-center transform hover:scale-[1.02] transition-transform before:content-[''] before:absolute before:-top-3 before:left-1/2 before:-translate-x-1/2 before:w-8 before:h-3 before:bg-white/60 before:rotate-[-2deg] before:shadow-sm`}
              style={{ borderRadius: '2px 20px 5px 20px' }}
            >
              <button 
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 text-deep-warm/30 hover:text-deep-warm transition-colors opacity-0 group-hover:opacity-100 p-1 bg-white/40 rounded-full"
                aria-label="Delete plan"
              >
                <X size={14} strokeWidth={3} />
              </button>
              <p className="text-deep-warm font-cursive text-2xl md:text-3xl text-center leading-tight">
                {note.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
