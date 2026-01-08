'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  try {
    const { language } = useLanguage();
    const dict = getDictionarySync(language);
    const currentYear = new Date().getFullYear();

    return (
      <footer className="bg-red-700 text-white mt-12 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                {dict.footer.company}
              </h3>
              <p className="text-sm text-red-100">
                {dict.footer.description}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-4">{dict.footer.contactHeading}</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-red-100" />
                  <span className="text-sm text-red-100">+1 (234) 567-8900</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-red-100" />
                  <a
                    href="mailto:info@abmaler.com"
                    className="text-sm text-red-100 hover:text-white transition"
                  >
                    info@abmaler.com
                  </a>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin size={16} className="text-red-100 flex-shrink-0 mt-1" />
                  <span className="text-sm text-red-100">123 Business Street, City, Country</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-bold mb-4">{dict.footer.followUs}</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-red-100 hover:text-white transition"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-red-100 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-red-100 hover:text-white transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-red-600 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-red-100">
                &copy; {currentYear} {dict.footer.company}. {dict.footer.copyright}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="text-sm text-red-100 hover:text-white transition"
                >
                  {dict.footer.privacyPolicy}
                </Link>
                <Link
                  href="#"
                  className="text-sm text-red-100 hover:text-white transition"
                >
                  {dict.footer.termsOfService}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    // Fallback during static generation
    return (
      <footer className="bg-red-700 text-white mt-12 border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">A.B Maler Fassadenbau & Gipser GmbH</h3>
              <p className="text-sm text-red-100">Professional painting and renovation services with years of expertise.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-red-100" />
                  <span className="text-sm text-red-100">+1 (234) 567-8900</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-red-100" />
                  <a href="mailto:info@abmaler.com" className="text-sm text-red-100 hover:text-white transition">info@abmaler.com</a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-red-100 hover:text-white transition"><Facebook size={20} /></a>
                <a href="#" className="text-red-100 hover:text-white transition"><Instagram size={20} /></a>
                <a href="#" className="text-red-100 hover:text-white transition"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
