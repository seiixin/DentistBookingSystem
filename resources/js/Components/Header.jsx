import React from 'react';
import { Link } from '@inertiajs/react';
import Logo from './Logo';

const Header = ({ toggleMenu }) => {
    return (
        <header
            className="sticky top-0 z-50 bg-[#0b2545] rounded-b-2xl
                       shadow-neu-inset px-6 py-4"
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <Logo size={42} />
                        <span className="ml-3 text-lg font-semibold text-[#a3c4f3] drop-shadow-sm">
                            Dr. Wang's Clinic
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium">
                    {["Home", "Appointment", "About", "Contact", "Login"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="text-[#cbd5e1] hover:text-[#a3c4f3] transition
                                       shadow-neu-button px-3 py-1 rounded-xl"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-xl
                               bg-[#0b2545] shadow-neu-button text-[#a3c4f3]
                               hover:shadow-neu-button-hover transition"
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
