import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import EditAppointment from "@/Components/Admin/EditAppointment";
import AddAppointmentModal from "@/Components/Admin/AddAppointmentModal";  // Assuming you have an AddAppointmentModal
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";

const ManagementAppointments = ({ appointments: initialAppointments }) => {
    const [appointments, setAppointments] = useState(Array.isArray(initialAppointments?.data) ? initialAppointments.data : []);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [addingAppointment, setAddingAppointment] = useState(false); // State for the Add Appointment modal
    const { post, delete: destroy } = useForm();
    const [flashMessage, setFlashMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [treatmentFilter, setTreatmentFilter] = useState('');

    const formatTimeTo12Hour = (time) => {
    if (!time) return "";
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr);
    const minute = minuteStr.padStart(2, '0');
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert '0' to '12'
    return `${hour}:${minute} ${ampm}`;
    };

    const handleSuccess = (message) => {
        setFlashMessage({ type: 'success', text: message });
        setTimeout(() => setFlashMessage(null), 3000);
    };

    const handleError = (error) => {
        setFlashMessage({ type: 'error', text: error || "An error occurred" });
        setTimeout(() => setFlashMessage(null), 3000);
    };

    const handleAddAppointment = (newAppointment) => {
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
            destroy(`/admin/appointments/${id}`, {
                onSuccess: () => {
                    handleSuccess("Appointment deleted successfully");
                    setAppointments(appointments.filter(app => app.id !== id));
                },
                onError: (errors) => handleError(errors.message)
            });
        }
    };

    const handleAppointmentUpdate = (updatedAppointment) => {
        setAppointments(appointments.map(app =>
            app.id === updatedAppointment.id ? updatedAppointment : app
        ));
        setEditingAppointment(null);
    };

    const filteredAppointments = appointments.filter(appointment => {
        return (
            (appointment.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appointment.treatment.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (statusFilter ? appointment.status === statusFilter : true) &&
            (treatmentFilter ? appointment.treatment === treatmentFilter : true)
        );
    });

    const treatmentOptions = [
        'Teeth Cleaning',
        'Root Canal',
        'Whitening Treatment',
        'Fillings',
        'Cavity Check',
        'Dental Checkup',
    ];

    const statusOptions = ['Approved', 'Pending', 'Cancelled', 'Completed', 'Upcoming'];

    if (appointments.length === 0) {
        return (
            <AdminLayout>
                <div className="p-6">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6">Manage Appointments</h2>
                    <div className="bg-white shadow-md rounded p-6 text-center">
                        No appointments available.
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Manage Appointments</h2>

                {/* Filters and Search */}
                <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search by name or treatment"
                        className="px-4 py-2 border rounded-md w-1/3"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className="px-4 py-2 border rounded-md"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Filter by Status</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <select
                        className="px-4 py-2 border rounded-md"
                        value={treatmentFilter}
                        onChange={(e) => setTreatmentFilter(e.target.value)}
                    >
                        <option value="">Filter by Treatment</option>
                        {treatmentOptions.map((treatment) => (
                            <option key={treatment} value={treatment}>{treatment}</option>
                        ))}
                    </select>

                    {/* Add Appointment Button */}
                    <button
                        onClick={() => setAddingAppointment(true)}  // Open the Add Appointment modal
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Appointment
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-pink-100 text-pink-800">
                            <tr>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Time</th>
                                <th className="px-4 py-2 text-left">Patient</th>
                                <th className="px-4 py-2 text-left">Treatment</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id} className="border-b hover:bg-pink-50">
                                    <td className="px-4 py-2">{appointment.date}</td>
                                    <td className="px-4 py-2">{formatTimeTo12Hour(appointment.time)}</td>
                                    <td className="px-4 py-2">{appointment.patient_name}</td>
                                    <td className="px-4 py-2">{appointment.treatment}</td>
                                    <td className="px-4 py-2 capitalize">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${appointment.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                                            ${appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${appointment.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' : ''}
                                            ${appointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' : ''}
                                            ${appointment.status === 'Upcoming' ? 'bg-purple-100 text-purple-800' : ''}`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex space-x-2">
                                            <EditButton onClick={() => setEditingAppointment(appointment)} />
                                            <DeleteButton onClick={() => handleDelete(appointment.id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Appointment Modal */}
            {editingAppointment && (
                <EditAppointment
                    appointment={editingAppointment}
                    onClose={() => setEditingAppointment(null)}
                    onUpdate={handleAppointmentUpdate}
                    treatmentOptions={treatmentOptions}
                />
            )}

            {/* Add Appointment Modal */}
            {addingAppointment && (
            <AddAppointmentModal
            onClose={() => setAddingAppointment(false)}
            onAdd={(newAppointment) => handleAddAppointment(newAppointment)}
            treatmentOptions={treatmentOptions}
            />

            )}

            {/* Flash Message Display */}
            {flashMessage && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${flashMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {flashMessage.text}
                </div>
            )}
        </AdminLayout>
    );
};

export default ManagementAppointments;
