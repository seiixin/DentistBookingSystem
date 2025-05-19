import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function AppointmentHistory({ appointments }) {
    return (
        <UserLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Appointment History</h2>}
        >
            <Head title="Appointment History" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Appointment History</h1>
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 overflow-x-auto">
                        {appointments.length === 0 ? (
                            <p className="text-gray-600">You have no appointment history.</p>
                        ) : (
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-pink-100 text-left">
                                        <th className="border px-4 py-2">Date</th>
                                        <th className="border px-4 py-2">Time</th>
                                        <th className="border px-4 py-2">Treatment</th>
                                        <th className="border px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt, index) => (
                                        <tr key={index} className="hover:bg-pink-50">
                                            <td className="border px-4 py-2">{appt.formatted_date}</td>
                                            <td className="border px-4 py-2">{appt.time}</td>
                                            <td className="border px-4 py-2">{appt.treatment}</td>
                                            <td className="border px-4 py-2">{appt.status || 'Pending'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
