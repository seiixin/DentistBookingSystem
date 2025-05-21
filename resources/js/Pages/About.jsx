import React from "react";
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 rounded-3xl">
      <div
        className="flex max-w-4xl w-full bg-gray-200 rounded-3xl shadow-neu overflow-hidden"
        style={{
          // subtle gradient background for neuromorphism
          background: 'linear-gradient(145deg, #e0e0e0, #ffffff)',
        }}
      >
        {/* Image Section */}
        <div
          className="w-1/2 bg-cover bg-center hidden md:block rounded-l-3xl shadow-inner-neu"
          style={{ backgroundImage: "url('/images/Dentist.png')" }} // Replace with your image path
        ></div>

        {/* Text Content Section */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-700 mb-6 select-none">
            About Us
          </h2>
          <p className="text-gray-600 leading-relaxed select-text">
            At Dr. Wang’s Clinic, we believe a healthy smile is the foundation of confidence and well-being.
            For over 8 years, our team of compassionate, board-certified dentists and hygienists has been
            dedicated to providing exceptional dental care tailored to your unique needs.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-block bg-gray-200 shadow-btn-neu hover:shadow-btn-neu-hover text-gray-700 px-6 py-3 rounded-2xl font-semibold transition duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

About.layout = (page) => <MainLayout>{page}</MainLayout>;
export default About;
