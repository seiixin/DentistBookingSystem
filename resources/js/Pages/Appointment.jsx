import React from "react";
import MainLayout from '@/Layouts/MainLayout';
import AppointmentForm from "../Components/AppointmentForm";

const Appointment = () => {
  return (
    <div className="bg-transparent min-h-screen flex justify-center items-center px-4">
      <section className="w-full  max-w-4xl"> {/* Center section */}

        <AppointmentForm className="mx-auto" />
      </section>
    </div>
  );
};

Appointment.layout = (page) => <MainLayout>{page}</MainLayout>;
export default Appointment;
