'use client';

import { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

interface TestimonialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialsModal({ isOpen, onClose }: TestimonialsModalProps) {
  const { language } = useLanguage();
  const dict = getDictionarySync(language);

  const [formData, setFormData] = useState({
    referenceCode: '',
    name: '',
    email: '',
    testimonial: '',
    rating: 5,
    service: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug log
  useEffect(() => {
    console.log('TestimonialsModal isOpen:', isOpen);
  }, [isOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        referenceCode: '',
        name: '',
        email: '',
        testimonial: '',
        rating: 5,
        service: '',
      });
      setError(null);
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? data.errors.join(', ') : data.error || 'Failed to submit testimonial');
      }

      // Success
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border-4 border-black">
        {/* Header */}
        <div className="sticky top-0 bg-red-700 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{dict.testimonials?.form.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-800 p-1 rounded-full transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-green-100 text-green-700 rounded-full p-4 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-center text-gray-700 text-lg font-medium">{dict.testimonials?.form.success}</p>
              <p className="text-center text-gray-600 text-sm mt-2">Your testimonial will appear shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Reference Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.testimonials?.form.referenceCode} *
                </label>
                <input
                  type="text"
                  name="referenceCode"
                  value={formData.referenceCode}
                  onChange={handleChange}
                  placeholder={dict.testimonials?.form.referenceCodePlaceholder}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">{dict.testimonials?.form.referenceCodeHint}</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.testimonials?.form.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={dict.testimonials?.form.namePlaceholder}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.testimonials?.form.email} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={dict.testimonials?.form.emailPlaceholder}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.testimonials?.form.rating} *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      disabled={loading}
                      className="transition disabled:opacity-50"
                    >
                      <Star
                        size={32}
                        className={`${
                          star <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        } cursor-pointer hover:text-yellow-400`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Service (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.testimonials?.form.service}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                >
                  <option value="">Select a service</option>
                  <option value="maler">Painting</option>
                  <option value="fassadenbau">Facade Work</option>
                  <option value="renovationen">Renovations</option>
                  <option value="trockenbau">Drywall</option>
                  <option value="gipsarbeiten">Plastering</option>
                  <option value="bodenbelag">Flooring</option>
                </select>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.testimonials?.form.testimonial} *
                </label>
                <textarea
                  name="testimonial"
                  value={formData.testimonial}
                  onChange={handleChange}
                  placeholder={dict.testimonials?.form.testimonialPlaceholder}
                  rows={4}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-black"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {dict.testimonials?.form.submitting}
                  </>
                ) : (
                  dict.testimonials?.form.submit
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
