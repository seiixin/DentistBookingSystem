import React from "react";
import MainLayout from '@/Layouts/MainLayout';
import AppointmentForm from "../Components/AppointmentForm";

const Appointment = ({ data, setData, submit, processing, errors }) => {
  return (
    <div className="bg-transparent min-h-screen flex justify-center items-center px-4">
      <section className="w-full max-w-4xl">
        {/* Pass props down to the form */}
        <AppointmentForm
          data={data}
          setData={setData}
          submit={submit}
          processing={processing}
          errors={errors}
          className="mx-auto"
        />
      </section>
    </div>
  );
};

Appointment.layout = (page) => <MainLayout>{page}</MainLayout>;

export default Appointment;
