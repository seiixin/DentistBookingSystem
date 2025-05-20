import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Logo from './Logo';

const MobileMenu = ({ isOpen, closeMenu }) => {
    useEffect(() => {
        // Prevent scrolling when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                    <Logo size={36} />
                    <span className="ml-2 text-xl font-semibold text-blue-600">Dr. Wang's Clinic</span>
                </div>
                <button
                    onClick={closeMenu}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <nav className="flex flex-col p-4 text-center">
                <Link
                    href="/"
                    className="py-4 text-xl text-gray-800 hover:text-blue-600 border-b border-gray-100"
                    onClick={closeMenu}
                >
                    Home
                </Link>
                <Link
                    href="/menu"
                    className="py-4 text-xl text-gray-800 hover:text-blue-600 border-b border-gray-100"
                    onClick={closeMenu}
                >
                    Menu
                </Link>
                <Link
                    href="/about"
                    className="py-4 text-xl text-gray-800 hover:text-blue-600 border-b border-gray-100"
                    onClick={closeMenu}
                >
                    About
                </Link>
                <Link
                    href="/contact"
                    className="py-4 text-xl text-gray-800 hover:text-blue-600"
                    onClick={closeMenu}
                >
                    Contact
                </Link>
                <Link
                    href="/AdminPage"
                    className="py-4 text-xl text-gray-800 hover:text-blue-600"
                    onClick={closeMenu}
                    >
                        Login
                </Link>

            </nav>
        </div>
    );
};

export default MobileMenu;
