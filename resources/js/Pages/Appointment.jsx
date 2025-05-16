import React from "react";
import MainLayout from '@/Layouts/MainLayout';
import AppointmentForm from "../Components/AppointmentForm";
import { useForm } from "@inertiajs/react";

const Appointment = () => {
  const { data, setData, post, processing, errors } = useForm({
    patient_name: '',
    email: '',
    number: '',
    date: '',
    time: '',
    treatment: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/guest-appointments');
  };

  return (
    <div className="bg-transparent min-h-screen flex justify-center items-center px-4">
      <section className="w-full max-w-4xl">
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
