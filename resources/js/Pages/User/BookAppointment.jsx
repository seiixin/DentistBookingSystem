import React from "react";
import UserLayout from '@/Layouts/UserLayout';
import AppointmentForm from "@/Components/AppointmentForm"; // Adjust path if needed
import { Head, useForm } from "@inertiajs/react";

export default function BookAppointment({ flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        patient_name: '',
        email: '',
        number: '',
        date: '',
        time: '',
        treatment: '',
        // No status field needed - controller will set it
    });

    // This function will be called when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting appointment:', data);

        // Use the named route to submit the form
        post(route('user.appointments.store'), {
            onSuccess: () => {
                console.log('Appointment submitted successfully');
                // Reset form after successful submission
                reset();
            },
            onError: (errors) => {
                // Log errors for debugging
                console.error('Submission errors:', errors);
            }
        });
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
                    <div className="overflow-hidden bg-transparent sm:rounded-lg p-6">
                        {/* Flash messages from server */}
                        {flash?.success && (
                            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                                {flash.error}
                            </div>
                        )}

                        {/* Pass props to AppointmentForm component */}
                        <AppointmentForm
                            data={data}
                            setData={setData}
                            submit={handleSubmit}
                            processing={processing}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
