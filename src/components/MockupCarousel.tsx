import React, { useState } from 'react';
import type { MockupItem } from '../data/mockupData';

interface MockupCarouselProps {
  data: MockupItem[]; // Dito natin ipapasa kung ecoTrack o furniView
}

export const MockupCarousel: React.FC<MockupCarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      {/* Phone Mockup Frame Container */}
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        {/* Phone Notch/Buttons (Design elements) */}
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 absolute rounded-b-xl z-20"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black flex items-center justify-center">
          <img 
            src={data[currentIndex].imageUrl} 
            alt={data[currentIndex].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Buttons */}
        <button onClick={prevSlide} className="absolute -left-12 top-1/2 -translate-y-1/2 bg-purple-600/20 hover:bg-purple-600/40 p-3 rounded-full text-white z-30">❮</button>
        <button onClick={nextSlide} className="absolute -right-12 top-1/2 -translate-y-1/2 bg-purple-600/20 hover:bg-purple-600/40 p-3 rounded-full text-white z-30">❯</button>
      </div>

      {/* Info */}
      <div className="text-center mt-6 max-w-sm px-4">
        <h4 className="text-purple-400 font-semibold text-lg">{data[currentIndex].title}</h4>
        <p className="text-gray-400 text-sm mt-1 min-h-[40px]">{data[currentIndex].description}</p>
        
        <div className="flex justify-center gap-2 mt-4">
          {data.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all ${currentIndex === index ? 'bg-purple-500 w-6' : 'bg-gray-700 w-2'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};