import React, { useState, useEffect } from 'react';
import Header from '@/Components/Header';
import MobileMenu from '@/Components/MobileMenu';
import Footer from '@/Components/Footer';

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Background image container */}
      <div
        className={`fixed inset-0 z-[-1] bg-cover bg-center transition duration-500 ${
          isBlurred ? 'blur-sm brightness-90' : ''
        }`}
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      />

      {/* Content */}
      <Header toggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} />

      <main className="flex-grow p-6 text-white">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
