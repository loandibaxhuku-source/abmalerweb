'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { serviceGalleries } from '@/config/serviceGalleries';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceKey: string | null;
}

export default function GalleryModal({ isOpen, onClose, serviceKey }: GalleryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();
  const dict = getDictionarySync(language);

  // Reset image index when modal opens or service changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [isOpen, serviceKey]);

  if (!isOpen || !serviceKey || !serviceGalleries[serviceKey]) return null;

  const gallery = serviceGalleries[serviceKey];
  const service = dict.services[serviceKey as keyof typeof dict.services];
  
  // Generate array of image indices
  const imageIndices = Array.from({ length: gallery.photoCount }, (_, i) => i + 1);
  const currentImageNumber = imageIndices[currentImageIndex];
  const currentImagePath = `/images/${gallery.folderName}/${gallery.folderName}-${currentImageNumber}.jpg`;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageIndices.length) % imageIndices.length);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageIndices.length);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-4 border-black flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-red-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{service?.name} Gallery</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-800 p-1 rounded-full transition"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={currentImagePath}
            alt={`${service?.name} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              // Fallback for missing images
              const img = e.target as HTMLImageElement;
              img.src = '/images/placeholder.jpg';
            }}
          />

          {/* Left Arrow */}
          {imageIndices.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Right Arrow */}
          {imageIndices.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Footer with Counter */}
        <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-medium">
            Image {currentImageIndex + 1} of {imageIndices.length}
          </span>
          {imageIndices.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={goToPrevious}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg transition font-medium"
              >
                Previous
              </button>
              <button
                onClick={goToNext}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg transition font-medium"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
