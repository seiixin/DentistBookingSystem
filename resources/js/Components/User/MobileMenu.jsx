import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

const MobileMenu = ({ isOpen, closeMenu }) => {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto');
    }, [isOpen]);

    const menuItems = [
        { label: '📊 Dashboard', href: '/dashboard' },
        { label: '📅 Appointments', href: '/user/appointments' },
        { label: '⚙️ Account Settings', href: '/user/settings' },
        { label: '📘 Book Appointment', href: '/user/book-appointment' },
        { label: '📞 Contact Clinic', href: '/user/contact' },
    ];

    return (
        <div
            className={`fixed inset-0 z-50 bg-white flex flex-col transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex justify-between items-center p-4 border-b">
                <span className="ml-2 text-xl font-semibold text-pink-600">User Menu</span>
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
                {menuItems.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="py-4 text-xl text-gray-800 hover:text-pink-600 border-b border-gray-100"
                        onClick={closeMenu}
                    >
                        {label}
                    </Link>
                ))}

                <button
                    onClick={handleLogout}
                    className="py-4 text-xl text-gray-800 hover:text-pink-600 border-b border-gray-100"
                >
                    🚪 Logout
                </button>
            </nav>
        </div>
    );
};

export default MobileMenu;
