import React, { useEffect, useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Appointment from './Appointment';
import About from './About';
import ContactUs from './ContactUs';
import { motion } from 'framer-motion';

const Welcome = () => {
  // Track which section is active, default to 'welcome'
  const [activeSection, setActiveSection] = useState('welcome');

  // Refs for each section
  const welcomeRef = useRef(null);
  const appointmentRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: 'welcome', ref: welcomeRef },
      { id: 'appointment', ref: appointmentRef },
      { id: 'about', ref: aboutRef },
      { id: 'contact', ref: contactRef },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // middle of viewport

      for (const section of sections) {
        const el = section.ref.current;
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        // Check if the middle of viewport is inside this section
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to decide class for blur based on active section
  const getBlurClass = (sectionId) =>
    activeSection === sectionId
      ? 'blur-0 scale-100 opacity-100'
      : 'blur-sm scale-[0.98] opacity-70';

  return (
    <div className="min-h-screen w-full text-center">
      {/* Welcome Section */}
      <section
        ref={welcomeRef}
        className="flex flex-col justify-center items-center h-screen px-4 relative transition-all duration-500"
      >
        <motion.div
          className={`bg-white bg-opacity-70 rounded-xl shadow-lg p-10 max-w-2xl w-full transition-all duration-500 ${getBlurClass(
            'welcome'
          )}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
            Welcome to Dr. Wang's Clinic!
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Your journey to better dental health starts here.
          </p>
          <Link
            href="/appointment"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
          >
            Book an Appointment
          </Link>
        </motion.div>
      </section>

      {/* Appointment Section */}
      <section
        ref={appointmentRef}
        className="py-12 px-4 max-w-5xl mx-auto transition-all duration-500"
      >
        <motion.div className={getBlurClass('appointment')}>
          <Appointment />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="py-12 px-4 max-w-5xl mx-auto transition-all duration-500"
      >
        <motion.div className={getBlurClass('about')}>
          <About />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="py-12 px-4 max-w-2xl mx-auto transition-all duration-500"
      >
        <motion.div className={getBlurClass('contact')}>
          <ContactUs />
        </motion.div>
      </section>
    </div>
  );
};

Welcome.layout = (page) => <MainLayout children={page} />;
export default Welcome;
