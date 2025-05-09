import React from "react";
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-gray-100">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div
          className="w-1/2 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: "url('/path/to/your-image.jpg')" }} // Replace with actual image path
        ></div>

        {/* Text Content Section */}
        <div className="w-full md:w-3/5 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600">
            At Dr. Wang’s Clinic, we believe a healthy smile is the foundation of confidence and well-being.
            For over 8 years, our team of compassionate, board-certified dentists and hygienists has been
            dedicated to providing exceptional dental care tailored to your unique needs.
          </p>

          <Link
            href="#"
            className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-center"
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
