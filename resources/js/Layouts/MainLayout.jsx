import React, { useState } from 'react';
import Header from '@/Components/Header';
import MobileMenu from '@/Components/MobileMenu';
import Footer from '@/Components/Footer';

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Use one consistent Header for both desktop and mobile */}
      <Header toggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} />

      <main className="flex-grow p-6">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
