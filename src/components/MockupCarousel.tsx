import React, { useState } from 'react';
import type { MockupItem } from '../data/mockupData';

interface MockupCarouselProps {
  data: MockupItem[];
  type?: 'mobile' | 'web'; // Add type prop to distinguish
}

export const MockupCarousel: React.FC<MockupCarouselProps> = ({ data, type = 'mobile' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const updateFrameMotion = (event: React.PointerEvent<HTMLDivElement>) => {
    if (type !== 'mobile') return; // Only apply 3D tilt for mobile
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;

    event.currentTarget.style.setProperty('--tilt-x', `${y}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x}deg`);
  };

  const resetFrameMotion = (event: React.PointerEvent<HTMLDivElement>) => {
    if (type !== 'mobile') return;
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  // Web/Browser mockup renderer
  if (type === 'web') {
    return (
      <div className="carousel-shell w-full min-w-0 flex flex-col items-center justify-center py-4 sm:py-6">
        {/* Browser Frame Container */}
        <div className="browser-frame relative w-full max-w-4xl mx-auto">
          {/* Browser Chrome */}
          <div className="bg-gray-800 rounded-t-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="min-w-0 flex-1 mx-2 sm:mx-4">
                <div className="truncate bg-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono text-center">
                  localhost:3000/dashboard
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-white text-xs">🔒</button>
              </div>
            </div>
            
            {/* Browser Content */}
            <div className="relative bg-white dark:bg-gray-900">
              <img 
                key={data[currentIndex].id}
                src={data[currentIndex].imageUrl} 
                alt={data[currentIndex].title}
                className="w-full h-auto object-cover"
              />
              
              {/* Navigation Buttons */}
              <button 
                onClick={prevSlide} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all z-30"
                aria-label="Previous mockup"
              >
                ◀
              </button>
              <button 
                onClick={nextSlide} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-all z-30"
                aria-label="Next mockup"
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="text-center mt-6 w-full max-w-sm px-4">
          <h4 className="text-purple-400 font-semibold text-lg">{data[currentIndex].title}</h4>
          <p className="text-gray-400 text-sm mt-1 min-h-[40px]">{data[currentIndex].description}</p>
          
          <div className="flex justify-center gap-2 mt-4">
            {data.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentIndex(index)} 
                className={`carousel-dot h-2 rounded-full transition-all ${currentIndex === index ? 'bg-purple-500 w-6' : 'bg-gray-700 w-2'}`} 
                aria-label={`Show ${data[index].title}`} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile mockup renderer (original)
  return (
    <div className="carousel-shell w-full min-w-0 flex flex-col items-center justify-center py-4 sm:py-6">
      {/* Phone Mockup Frame Container */}
      <div
        className="phone-frame relative mx-auto border-gray-800 bg-gray-800 border-[10px] sm:border-[14px] rounded-[2rem] sm:rounded-[2.5rem] h-[500px] w-[250px] max-h-[68vh] max-w-[calc(100vw-4rem)] sm:h-[600px] sm:w-[300px] shadow-xl"
        onPointerMove={updateFrameMotion}
        onPointerLeave={resetFrameMotion}
        style={{ transform: 'rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))' }}
      >
        {/* Phone Notch/Buttons */}
        <div className="w-[118px] sm:w-[148px] h-[16px] sm:h-[18px] bg-gray-800 top-0 left-1/2 -translate-x-1/2 absolute rounded-b-xl z-20"></div>
        <div className="hidden sm:block h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="hidden sm:block h-[46px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        
        {/* Screen */}
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-black flex items-center justify-center">
          <img 
            key={data[currentIndex].id}
            src={data[currentIndex].imageUrl} 
            alt={data[currentIndex].title}
            className="carousel-screen-image w-full h-full object-cover"
          />
        </div>

        {/* Navigation Buttons */}
        <button onClick={prevSlide} className="carousel-nav absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 bg-purple-600/30 hover:bg-purple-600/50 p-2.5 sm:p-3 rounded-full text-white z-30 backdrop-blur-sm" aria-label="Previous mockup">{'<'}</button>
        <button onClick={nextSlide} className="carousel-nav absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 bg-purple-600/30 hover:bg-purple-600/50 p-2.5 sm:p-3 rounded-full text-white z-30 backdrop-blur-sm" aria-label="Next mockup">{'>'}</button>
      </div>

      {/* Info Section */}
      <div className="text-center mt-6 w-full max-w-sm px-4">
        <h4 className="text-purple-400 font-semibold text-lg">{data[currentIndex].title}</h4>
        <p className="text-gray-400 text-sm mt-1 min-h-[40px]">{data[currentIndex].description}</p>
        
        <div className="flex justify-center gap-2 mt-4">
          {data.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`carousel-dot h-2 rounded-full transition-all ${currentIndex === index ? 'bg-purple-500 w-6' : 'bg-gray-700 w-2'}`} aria-label={`Show ${data[index].title}`} />
          ))}
        </div>
      </div>
    </div>
  );
};
