// resources/js/Pages/Welcome.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Appointment from './Appointment';
import About from './About';
import ContactUs from './ContactUs';

const Welcome = () => {
  return (
    <div className="min-h-screen w-full bg-blue-50 text-center">
      <section className="flex flex-col justify-center items-center h-screen px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Welcome to Dr. Wang's Clinic!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Your journey to better dental health starts here.
        </p>
        <Link
          href="/book"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          Book an Appointment
        </Link>
      </section>

      {/* Below sections with padding */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <Appointment />
      </section>
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <About />
      </section>
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <ContactUs />
      </section>
    </div>
  );
};

Welcome.layout = (page) => <MainLayout children={page} />;
export default Welcome;
