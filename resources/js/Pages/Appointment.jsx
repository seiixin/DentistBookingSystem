import React from "react";
import MainLayout from '@/Layouts/MainLayout';
import AppointmentForm from "../Components/AppointmentForm";

const Appointment = () => {
  return (
    <div className="bg-[#f0f8ff] min-h-screen flex justify-center items-center px-4">
      <section className="w-full  max-w-4xl"> {/* Center section */}
        <h1 className="text-3xl font-bold mb-6 text-center">Book Your Appointment</h1>
        <AppointmentForm className="mx-auto" />
      </section>
    </div>
  );
};

Appointment.layout = (page) => <MainLayout>{page}</MainLayout>;
export default Appointment;
