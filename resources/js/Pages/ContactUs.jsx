import React from 'react';
import MainLayout from '@/Layouts/MainLayout';

const ContactUs = () => {
  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Get in Touch</h2>
      <form className="flex flex-col gap-4">
        <input className="border border-gray-300 p-2 rounded" placeholder="First Name" />
        <input className="border border-gray-300 p-2 rounded" placeholder="Last Name" />
        <input className="border border-gray-300 p-2 rounded" type="email" placeholder="Email" />
        <input className="border border-gray-300 p-2 rounded" placeholder="Phone Number" />
        <textarea className="border border-gray-300 p-2 rounded resize-none" placeholder="Message" rows={4}></textarea>
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send</button>
      </form>
    </div>
  );
};
ContactUs.layout = (page) => <MainLayout>{page}</MainLayout>;
export default ContactUs;
