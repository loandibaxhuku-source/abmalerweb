'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

const images = [
  {
    src: '/images/handsome-painter-paints-the-wall.webp',
    alt: 'Professional painter working on wall',
  },
  {
    src: '/images/drywall-installers-working-in-kitchen-renovation.webp',
    alt: 'Kitchen renovation work',
  },
  {
    src: '/images/types-of-plastering-2.webp',
    alt: 'Plastering techniques',
  },
];

interface HeroSlideshowProps {
  onOrderClick: () => void;
}

export default function HeroSlideshow({ onOrderClick }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { language } = useLanguage();
  const dict = getDictionarySync(language);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <div className="relative w-full h-screen max-h-[600px] md:max-h-[700px] lg:max-h-[800px] bg-gray-900 overflow-hidden rounded-lg shadow-xl border-4 border-black">
      {/* Slideshow Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center pb-8 md:pb-12 lg:pb-16 px-4 text-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {dict.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 drop-shadow-md">
              {dict.hero.subtitle}
            </p>

            {/* Order Form Button */}
            <button
              onClick={onOrderClick}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-8 md:px-12 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg border-2 border-black"
            >
              {dict.hero.cta}
            </button>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-white w-3 h-3'
                  : 'bg-white/50 hover:bg-white/75 w-2.5 h-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
