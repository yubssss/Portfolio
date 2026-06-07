import React from 'react';
import type { ScreenItem } from '../data/mockupData';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  screens: ScreenItem[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

// Inalis ang React.FC at direktang ginamit ang props structure para sa cleaner build type checking
export const GalleryModal = ({
  isOpen,
  onClose,
  screens,
  currentIndex,
  setCurrentIndex,
}: GalleryModalProps) => {
  // Safe validation check: Siguraduhing may laman ang array bago mag-render para iwas runtime errors
  if (!isOpen || !screens || screens.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      {/* Backdrop Overlay Dismiss Trigger */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 flex flex-col items-center gap-4">
        
        {/* Modal Header Controls */}
        <div className="w-full flex justify-between items-center border-b border-white/5 pb-3">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white font-sans">
              {screens[currentIndex]?.title || "Untitled Screen"}
            </h4>
            <p className="text-[10px] font-mono text-slate-500">
              Screen {currentIndex + 1} of {screens.length}
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all"
          >
            ✕ Close
          </button>
        </div>

        {/* Main Carousel Screen Frame */}
        <div className="relative max-h-[60vh] w-full flex items-center justify-center bg-black/40 rounded-2xl p-2 group/nav">
          <img 
            src={screens[currentIndex]?.src || ""} 
            alt={screens[currentIndex]?.title || "Screen Preview"}
            className="max-h-[55vh] object-contain rounded-xl shadow-md border border-white/5"
          />

          {/* Navigation Left Arrow */}
          <button 
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1))}
            className="absolute left-2 p-3 rounded-full bg-black/70 border border-white/10 text-white hover:bg-purple-600 transition-all duration-200"
          >
            ◀
          </button>

          {/* Navigation Right Arrow */}
          <button 
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1))}
            className="absolute right-2 p-3 rounded-full bg-black/70 border border-white/10 text-white hover:bg-purple-600 transition-all duration-200"
          >
            ▶
          </button>
        </div>

        {/* Dot Micro-indicators Navigation Grid */}
        <div className="w-full flex justify-center gap-2 py-1">
          {screens.map((screen, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-purple-500 scale-125' 
                  : 'bg-zinc-700 hover:bg-zinc-500'
              }`}
              title={screen.title}
            />
          ))}
        </div>

      </div>
    </div>
  );
};