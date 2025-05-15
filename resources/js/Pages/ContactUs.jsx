import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import ContactForm from "../Components/ContactForm";

const ContactUs = () => {
  return (
    <div className="bg-transparent min-h-screen flex justify-center items-center px-4">
      <section className="w-full  max-w-4xl"> {/* Center section */}

        <ContactForm className="mx-auto" />
      </section>
    </div>
  );
};
ContactUs.layout = (page) => <MainLayout>{page}</MainLayout>;
export default ContactUs;
