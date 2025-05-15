import React from "react";
import UserLayout from '@/Layouts/UserLayout';
import ContactForm from "@/Pages/ContactUs";
import { Head } from "@inertiajs/react";

export default function ContactClinic() {
    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contact Clinic
                </h2>
            }
        >
            <Head title="Contact Clinic" />
            <div className="py-12 ">
                <div className=" mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Embed your appointment form/page inside user layout */}
                    <div className="overflow-hidden bg-transparent shadow-sm sm:rounded-lg p-6">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
