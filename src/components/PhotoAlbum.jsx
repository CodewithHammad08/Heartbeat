import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Image as ImageIcon, ChevronLeft, ChevronRight, Save } from 'lucide-react';

export default function PhotoAlbum() {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('zubiya_photo_album');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [newDesc, setNewDesc] = useState("");
  const [direction, setDirection] = useState(1);
  
  const fileInputRef = useRef(null);

  const pages = [];
  for (let i = 0; i < photos.length; i += 2) {
    pages.push(photos.slice(i, i + 2));
  }

  useEffect(() => {
    try {
      localStorage.setItem('zubiya_photo_album', JSON.stringify(photos));
    } catch (e) {
      alert("Storage limit reached! Please delete some older photos to add new ones.");
    }
    
    if (currentPageIndex >= pages.length && pages.length > 0) {
      setCurrentPageIndex(pages.length - 1);
    }
  }, [photos, currentPageIndex, pages.length]);

  const processImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const MAX_WIDTH = 500;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.floor((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    e.target.value = null; 
    const base64Image = await processImage(file);
    setTempImage(base64Image);
  };

  const savePhoto = (e) => {
    e.preventDefault();
    if (!tempImage) return;

    const newPhoto = {
      id: Date.now().toString(),
      dataUrl: tempImage,
      description: newDesc.trim() || "",
    };

    setPhotos([newPhoto, ...photos]);
    setTempImage(null);
    setNewDesc("");
    setIsAdding(false);
    setCurrentPageIndex(0); 
  };

  const cancelAdd = () => {
    setTempImage(null);
    setNewDesc("");
    setIsAdding(false);
  };

  const deletePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const nextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setDirection(1);
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setDirection(-1);
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const pageVariants = {
    initial: (direction) => ({
      rotateY: direction === 1 ? 90 : -90,
      opacity: 0,
      originX: direction === 1 ? 1 : 0,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "circOut" }
    },
    exit: (direction) => ({
      rotateY: direction === 1 ? -90 : 90,
      opacity: 0,
      originX: direction === 1 ? 0 : 1,
      transition: { duration: 0.8, ease: "circIn" }
    })
  };

  const Polaroid = ({ photo, rotation }) => (
    <div className={`bg-[#FFFFFE] p-3 pb-10 md:p-4 md:pb-12 rounded-sm shadow-[0_15px_30px_rgba(255,142,158,0.2)] border border-[#f0e6d2] max-w-[16rem] md:max-w-xs relative transform ${rotation}`}>
      
      <button 
        onClick={() => deletePhoto(photo.id)}
        className="absolute -top-4 -right-4 text-love-rose bg-white border border-love-rose/20 hover:bg-love-rose hover:text-white transition-all p-2 rounded-full z-40 shadow-md"
        aria-label="Delete this memory"
      >
        <X size={16} strokeWidth={3} />
      </button>
      
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/70 backdrop-blur-md rotate-[-2deg] z-20 shadow-sm border border-white/40"></div>

      <div className="w-full aspect-square overflow-hidden relative rounded-sm shadow-inner bg-gray-100 flex items-center justify-center p-1.5 md:p-2 border border-gray-100/50">
        <img 
          src={photo.dataUrl} 
          alt="Memory" 
          className="w-full h-full object-contain filter contrast-[0.95] saturate-[0.9]"
        />
      </div>
    </div>
  );

  return (
    <section className="w-full relative z-10 bg-[#FFF5F7]/90 backdrop-blur-md p-6 md:p-12 rounded-[2.5rem] border border-[#F4E1E1] shadow-sm mt-10">
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-cursive text-deep-warm drop-shadow-sm">Little Moments</h2>
        <p className="text-text-muted font-light mt-4 text-lg">Some of my absolute favorite memories of you.</p>
      </div>

      {!isAdding && (
        <div className="flex justify-center mb-10 relative z-20">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="bg-deep-warm text-soft-cream px-8 py-4 rounded-full shadow-lg flex items-center justify-center gap-3 hover:bg-[#521c27] transition-all"
          >
            <Plus size={22} className="stroke-[3px]" />
            <span className="font-semibold tracking-wider text-lg">Add a Memory</span>
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg mx-auto bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-love-rose/30 mb-10 flex flex-col gap-6 relative z-50"
          >
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
            />
            
            {!tempImage ? (
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-full h-48 md:h-64 border-2 border-dashed border-deep-warm/30 rounded-2xl flex flex-col items-center justify-center text-deep-warm/70 hover:bg-deep-warm/5 cursor-pointer transition-colors bg-[#FFF5F7]/30"
              >
                <ImageIcon size={36} className="mb-3" />
                <p className="font-medium text-lg">Tap to select a photo</p>
              </div>
            ) : (
              <div className="w-full relative shadow-inner rounded-xl p-2 md:p-4 bg-gray-50 border border-gray-100">
                <img src={tempImage} alt="Preview" className="w-full h-48 md:h-64 object-contain rounded-md" />
                <button 
                  onClick={() => setTempImage(null)}
                  className="absolute top-4 right-4 bg-deep-warm p-2 rounded-full text-white hover:bg-red-500 shadow-md transition-colors z-40"
                >
                  <X size={20} strokeWidth={3} />
                </button>
              </div>
            )}

            <textarea 
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Write a sweet description for this memory..."
              className="w-full p-4 md:p-5 rounded-xl bg-[#FFF5F7]/30 border border-[#F4E1E1] focus:outline-none focus:border-deep-warm focus:ring-1 focus:ring-deep-warm resize-none h-28 md:h-32 text-deep-warm text-lg placeholder:text-text-muted/50"
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button 
                onClick={cancelAdd}
                className="w-full sm:w-1/3 py-4 font-semibold text-deep-warm bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-lg"
              >
                Cancel
              </button>
              <button 
                onClick={savePhoto}
                disabled={!tempImage}
                className="w-full sm:w-2/3 py-4 font-bold text-soft-cream bg-deep-warm hover:bg-[#521c27] rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-md"
              >
                <Save size={20} />
                Save to Album
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAdding && photos.length === 0 && (
        <div className="text-center text-text-muted/60 py-16 font-cursive text-3xl">
          It's a little empty here. Frame a sweet memory...
        </div>
      )}

      {!isAdding && pages.length > 0 && (
        <div className="w-full max-w-2xl mx-auto mt-4" style={{ perspective: "1500px" }}>
          <div className="relative flex items-center justify-center w-full min-h-[600px] md:min-h-[750px] py-6">
            
            <button 
              onClick={prevPage}
              disabled={currentPageIndex === 0}
              className="absolute left-0 z-40 p-3 bg-white hover:bg-gray-50 text-deep-warm rounded-full shadow-md border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform -translate-x-4 md:-translate-x-12"
              aria-label="Previous Page"
            >
              <ChevronLeft size={32} />
            </button>

            <AnimatePresence custom={direction} mode="wait">
<<<<<<< HEAD
              {pages.map((page, index) => {
                if (index === currentPageIndex) {
                  return (
                    <motion.div
                      key={`page-${index}`}
=======
              {pages.length > 0 && (
                    <motion.div
                      key={`page-${currentPageIndex}`}
>>>>>>> b19eae2 (Initial commit)
                      custom={direction}
                      variants={pageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="w-[90%] md:w-full absolute inset-0 flex flex-col justify-between py-6 md:py-10"
                    >
                      <div 
                        className="bg-[#FFFFFE] w-full h-full rounded-sm shadow-[0_15px_30px_rgba(255,142,158,0.2)] border border-[#f0e6d2] relative p-6 flex flex-col justify-between"
                        style={{ borderLeft: '5px solid #E8A3A8' }} 
                      >
<<<<<<< HEAD
                        {page.length === 2 ? (
                          <div className="w-full flex flex-col h-full items-center">
                            
                            <div className="self-start relative z-10 w-48 md:w-64 -ml-2">
                              <Polaroid photo={page[0]} rotation="-rotate-3" />
                            </div>

                            <div className="flex-grow flex flex-col items-center justify-center z-20 py-8 drop-shadow-sm px-4">
                              {page[0].description && (
                                <p className="font-cursive text-deep-warm text-2xl md:text-3xl text-center leading-snug -rotate-1 opacity-90">
                                  {page[0].description}
=======
                        {pages[currentPageIndex].length === 2 ? (
                          <div className="w-full flex flex-col h-full items-center">
                            
                            <div className="self-start relative z-10 w-48 md:w-64 -ml-2">
                              <Polaroid photo={pages[currentPageIndex][0]} rotation="-rotate-3" />
                            </div>

                            <div className="flex-grow flex flex-col items-center justify-center z-20 py-8 drop-shadow-sm px-4">
                              {pages[currentPageIndex][0].description && (
                                <p className="font-cursive text-deep-warm text-2xl md:text-3xl text-center leading-snug -rotate-1 opacity-90">
                                  {pages[currentPageIndex][0].description}
>>>>>>> b19eae2 (Initial commit)
                                </p>
                              )}
                              
                              <span className="text-love-rose/40 text-xl font-cursive my-3 opacity-70">{"· ♡ ·"}</span>

<<<<<<< HEAD
                              {page[1].description && (
                                <p className="font-cursive text-deep-warm text-2xl md:text-3xl text-center leading-snug rotate-1 opacity-90 mt-2">
                                  {page[1].description}
=======
                              {pages[currentPageIndex][1].description && (
                                <p className="font-cursive text-deep-warm text-2xl md:text-3xl text-center leading-snug rotate-1 opacity-90 mt-2">
                                  {pages[currentPageIndex][1].description}
>>>>>>> b19eae2 (Initial commit)
                                </p>
                              )}
                            </div>

                            <div className="self-end relative z-10 w-48 md:w-64 -mr-2">
<<<<<<< HEAD
                              <Polaroid photo={page[1]} rotation="rotate-2" />
=======
                              <Polaroid photo={pages[currentPageIndex][1]} rotation="rotate-2" />
>>>>>>> b19eae2 (Initial commit)
                            </div>
                            
                          </div>
                        ) : (
                          
                          <div className="w-full flex-grow flex flex-col items-center justify-center space-y-12 h-full">
                            <div className="relative z-10 w-64 md:w-80">
<<<<<<< HEAD
                              <Polaroid photo={page[0]} rotation="rotate-1" />
                            </div>
                            {page[0].description && (
                               <p className="font-cursive text-deep-warm text-3xl md:text-4xl text-center leading-snug drop-shadow-sm px-6">
                                 {page[0].description}
=======
                              <Polaroid photo={pages[currentPageIndex][0]} rotation="rotate-1" />
                            </div>
                            {pages[currentPageIndex][0].description && (
                               <p className="font-cursive text-deep-warm text-3xl md:text-4xl text-center leading-snug drop-shadow-sm px-6">
                                 {pages[currentPageIndex][0].description}
>>>>>>> b19eae2 (Initial commit)
                               </p>
                            )}
                          </div>
                        )}
                        
                        <div className="absolute bottom-3 right-4 md:bottom-4 md:right-6 text-text-muted/40 font-outfit text-sm font-medium">
                          {currentPageIndex + 1} / {pages.length}
                        </div>
                      </div>
                    </motion.div>
<<<<<<< HEAD
                  )
                }
              })}
=======
              )}
>>>>>>> b19eae2 (Initial commit)
            </AnimatePresence>

            <button 
              onClick={nextPage}
              disabled={currentPageIndex === pages.length - 1}
              className="absolute right-0 z-40 p-3 bg-white hover:bg-gray-50 text-deep-warm rounded-full shadow-md border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform translate-x-4 md:translate-x-12"
              aria-label="Next Page"
            >
              <ChevronRight size={32} />
            </button>

          </div>
        </div>
      )}
    </section>
  );
}
