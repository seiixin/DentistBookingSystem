import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

const treatmentOptions = [
    "Teeth Cleaning",
    "Root Canal",
    "Whitening Treatment",
    "Fillings",
    "Cavity Check",
    "Dental Checkup",
];

const statusOptions = ["Approved", "Pending", "Cancelled", "Completed", "Upcoming"];

export default function AppointmentHistory({ appointments }) {
    const [statusFilter, setStatusFilter] = useState("");
    const [treatmentFilter, setTreatmentFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Filtered Appointments
    const filteredAppointments = appointments.filter((appt) => {
        const matchesStatus = statusFilter ? appt.status === statusFilter : true;
        const matchesTreatment = treatmentFilter ? appt.treatment === treatmentFilter : true;
        const matchesSearch =
            appt.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appt.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appt.formatted_date.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesTreatment && matchesSearch;
    });

    return (
        <UserLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Appointment History</h2>}
        >
            <Head title="Appointment History" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Appointment History</h1>

                    {/* Filters and Search */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <select
                            className="px-4 py-2 rounded-xl bg-pink-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-pink-200"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2 rounded-xl bg-pink-50 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-pink-200"
                            value={treatmentFilter}
                            onChange={(e) => setTreatmentFilter(e.target.value)}
                        >
                            <option value="">All Treatments</option>
                            {treatmentOptions.map((treatment) => (
                                <option key={treatment} value={treatment}>
                                    {treatment}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="Search by keyword..."
                            className="flex-1 px-4 py-2 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-pink-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6 overflow-x-auto">
                        {filteredAppointments.length === 0 ? (
                            <p className="text-gray-600">No matching appointments found.</p>
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
                                    {filteredAppointments.map((appt, index) => (
                                        <tr key={index} className="hover:bg-pink-50">
                                            <td className="border px-4 py-2">{appt.formatted_date}</td>
                                            <td className="border px-4 py-2">{appt.time}</td>
                                            <td className="border px-4 py-2">{appt.treatment}</td>
                                            <td className="border px-4 py-2">{appt.status || "Pending"}</td>
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
