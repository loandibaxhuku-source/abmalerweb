'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getDictionary } from '@/lib/getDictionary';

interface Testimonial {
  id: string;
  name: string;
  testimonial: string;
  rating: number;
  service?: string;
  createdAt: string;
}

interface TestimonialsSectionProps {
  onAddTestimonial: () => void;
}

export default function TestimonialsSection({ onAddTestimonial }: TestimonialsSectionProps) {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dict, setDict] = useState<any>({});

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDictionary(language);
      setDict(dictionary);
    };
    loadDictionary();
  }, [language]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="text-center text-gray-600">Loading testimonials...</div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">{dict.testimonials?.heading}</h2>
        <p className="text-gray-600 mb-6">
          {dict.testimonials?.description}
        </p>
        <button
          onClick={() => {
            console.log('Share Your Experience clicked!');
            onAddTestimonial();
          }}
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg transition transform hover:scale-105 duration-300 border-2 border-red-700"
        >
          {dict.testimonials?.submitButton}
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No testimonials yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border-4 border-black p-6 hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="mb-3">{renderStars(testimonial.rating)}</div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial}"</p>

              {/* Customer Name */}
              <p className="font-bold text-gray-900">{testimonial.name}</p>

              {/* Service (if provided) */}
              {testimonial.service && (
                <p className="text-sm text-gray-600 mt-2">
                  Service: <span className="capitalize font-medium">{testimonial.service.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
