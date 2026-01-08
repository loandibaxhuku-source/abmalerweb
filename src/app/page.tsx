'use client';

import { useState } from 'react';
import { Paintbrush, Hammer, HomeIcon } from 'lucide-react';
import HeroSlideshow from '@/components/HeroSlideshow';
import OrderFormModal from '@/components/OrderFormModal';
import GalleryModal from '@/components/GalleryModal';
import TestimonialsModal from '@/components/TestimonialsModal';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

const serviceIcons = {
  maler: Paintbrush,
  fassadenbau: HomeIcon,
  renovationen: Hammer,
  trockenbau: Paintbrush,
  gipsarbeiten: HomeIcon,
};

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isTestimonialsModalOpen, setIsTestimonialsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { language } = useLanguage();
  const dict = getDictionarySync(language);

  const services = [
    { key: 'maler', icon: Paintbrush },
    { key: 'fassadenbau', icon: HomeIcon },
    { key: 'renovationen', icon: Hammer },
    { key: 'trockenbau', icon: Paintbrush },
    { key: 'gipsarbeiten', icon: HomeIcon },
    { key: 'bodenbelag', icon: HomeIcon },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Slideshow Section */}
      <section className="rounded-lg overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 mb-12">
        <HeroSlideshow onOrderClick={() => setIsFormOpen(true)} />
      </section>

      {/* Order Form Modal */}
      <OrderFormModal isOpen={isFormOpen} onClose={() => {
        setIsFormOpen(false);
        setSelectedService(null);
      }} selectedService={selectedService} />

      {/* Gallery Modal */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => {
        setIsGalleryOpen(false);
        setSelectedService(null);
      }} serviceKey={selectedService} />

      {/* Testimonials Modal */}
      <TestimonialsModal isOpen={isTestimonialsModalOpen} onClose={() => setIsTestimonialsModalOpen(false)} />

      {/* Services Section */}
      <section id="services" className="py-12 border-4 border-black rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">{dict.services.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ key, icon: Icon }) => {
            const service = dict.services[key as keyof typeof dict.services];
            return (
              <div 
                key={key} 
                onClick={() => {
                  setSelectedService(key);
                  setIsGalleryOpen(true);
                }}
                className="bg-white rounded-lg border-4 border-black p-6 hover:shadow-lg transition cursor-pointer hover:scale-105 transform duration-300"
              >
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 border-2 border-red-700">
                  <Icon className="text-red-700" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.name}</h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white rounded-lg border-4 border-black p-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">{dict.about.heading}</h2>
        <p className="text-gray-700 text-lg leading-8 mb-4">
          {dict.about.paragraph1}
        </p>
        <p className="text-gray-700 text-lg leading-8">
          {dict.about.paragraph2}
        </p>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 border-4 border-black rounded-lg p-6 bg-white">
        <TestimonialsSection onAddTestimonial={() => setIsTestimonialsModalOpen(true)} />
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-white text-gray-900 rounded-lg border-4 border-black p-8 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">{dict.cta.heading}</h2>
        <p className="text-lg mb-6 text-gray-700">
          {dict.cta.text}
        </p>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition transform hover:scale-105 duration-300 border-2 border-red-700"
        >
          {dict.cta.button}
        </button>
      </section>
    </div>
  );
}
