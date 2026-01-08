'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { Language, languages } from '@/i18n/config';
import { getDictionarySync } from '@/lib/getDictionary';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dict = getDictionarySync(language);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-red-700 shadow-lg border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white">
              A.B Maler
            </Link>
            <p className="text-xs text-red-100">Fassadenbau & Gipser GmbH</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {dict.navbar.home}
              </Link>
              <Link
                href="#services"
                className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {dict.navbar.services}
              </Link>
              <Link
                href="#about"
                className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {dict.navbar.about}
              </Link>
              <Link
                href="#contact"
                className="text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {dict.navbar.contact}
              </Link>
            </div>
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition">
                <Globe size={18} className="mr-2" />
                {language.toUpperCase()}
              </button>
              <div className="absolute right-0 mt-0 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {Object.entries(languages).map(([lang, label]) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as Language)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === lang
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    } first:rounded-t-md last:rounded-b-md transition`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:bg-red-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              href="/"
              className="block text-white hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium transition"
            >
              {dict.navbar.home}
            </Link>
            <Link
              href="#services"
              className="block text-white hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium transition"
            >
              {dict.navbar.services}
            </Link>
            <Link
              href="#about"
              className="block text-white hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium transition"
            >
              {dict.navbar.about}
            </Link>
            <Link
              href="#contact"
              className="block text-white hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium transition"
            >
              {dict.navbar.contact}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
