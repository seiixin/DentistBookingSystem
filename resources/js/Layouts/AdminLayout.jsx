import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import MobileMenu from '@/Components/Admin/MobileMenu';

const AdminLayout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="flex min-h-screen bg-[#e0e5ec]">
            {/* Sidebar: Hide on smaller screens and show on larger ones */}
            <div className="lg:block hidden">
                <Sidebar />
            </div>

            {/* Main content */}
            <main className="flex-1 p-6">
                <div className="bg-[#e0e5ec] p-6 rounded-xl shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff]">
                    {children}
                </div>
            </main>

            {/* Mobile Menu Trigger: Visible only on smaller screens */}
            <button
                onClick={toggleMenu}
                className="lg:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full"
                aria-label="Open mobile menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMenuOpen} closeMenu={closeMenu} />
        </div>
    );
};

export default AdminLayout;
