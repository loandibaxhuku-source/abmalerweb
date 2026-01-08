import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'A.B Maler Fassadenbau & Gipser GmbH - Professional Painting, Facade & Plastering',
  description: 'Professional painting, facade work, and plastering services in English, German, and Albanian',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen bg-white">
            {/* Sticky Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
