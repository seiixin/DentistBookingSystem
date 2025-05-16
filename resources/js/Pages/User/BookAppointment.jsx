import React from "react";
import UserLayout from '@/Layouts/UserLayout';
import Appointment from "@/Pages/Appointment";
import { Head, useForm } from "@inertiajs/react";

export default function BookAppointment() {
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
        post('/appointments');
    };

    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Book Appointment
                </h2>
            }
        >
            <Head title="Book Appointment" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-transparent shadow-sm sm:rounded-lg p-6">
                        {/* Pass props to Appointment component */}
                        <Appointment
                            data={data}
                            setData={setData}
                            submit={submit}
                            processing={processing}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
