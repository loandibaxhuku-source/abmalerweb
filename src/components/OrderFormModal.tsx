'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string | null;
}

export default function OrderFormModal({ isOpen, onClose, selectedService }: OrderFormModalProps) {
  const { language } = useLanguage();
  const dict = getDictionarySync(language);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'maler',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  // Reset form when modal opens or selectedService changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: selectedService ? selectedService.toLowerCase() : 'maler',
        message: '',
      });
      setError(null);
      setSubmitted(false);
      setReferenceNumber(null);
    }
  }, [isOpen, selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? data.errors.join(', ') : data.error || 'Failed to submit form');
      }

      // Success
      setReferenceNumber(data.referenceNumber);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
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
          <h2 className="text-2xl font-bold">{dict.form.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-800 p-1 rounded-full transition"
            aria-label="Close form"
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
              <p className="text-center text-gray-700 text-lg font-medium">{dict.form.success}</p>
              {referenceNumber && (
                <div className="mt-4 bg-red-50 border-2 border-black rounded p-4 w-full">
                  <p className="text-sm text-gray-600 mb-2">Reference Number:</p>
                  <p className="text-lg font-mono font-bold text-red-700">{referenceNumber}</p>
                  <p className="text-xs text-gray-500 mt-2">Please save this for your records</p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={dict.form.placeholder.name}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={dict.form.placeholder.email}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.form.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={dict.form.placeholder.phone}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.form.service}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2 border-2 border-black rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
                >
                  <option value="maler">{dict.services.maler.name}</option>
                  <option value="fassadenbau">{dict.services.fassadenbau.name}</option>
                  <option value="renovationen">{dict.services.renovationen.name}</option>
                  <option value="trockenbau">{dict.services.trockenbau.name}</option>
                  <option value="gipsarbeiten">{dict.services.gipsarbeiten.name}</option>
                  <option value="bodenbelag">{dict.services.bodenbelag.name}</option>
                  <option value="other">{dict.form.services[5]}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={dict.form.placeholder.message}
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
                    Sending...
                  </>
                ) : (
                  dict.form.submit
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
