import React from "react";
import UserLayout from '@/Layouts/UserLayout';
import Appointment from "@/Pages/Appointment";
import { Head } from "@inertiajs/react";

export default function BookAppointment() {
    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Book Appointment
                </h2>
            }
        >
            <Head title="Book Appointment" />
            <div className="py-12 ">
                <div className=" mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Embed your appointment form/page inside user layout */}
                    <div className="overflow-hidden bg-transparent shadow-sm sm:rounded-lg p-6">
                        <Appointment />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
