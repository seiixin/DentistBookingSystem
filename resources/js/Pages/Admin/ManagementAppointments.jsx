import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react"; // import router for reload

import AdminLayout from "@/Layouts/AdminLayout";
import EditAppointment from "@/Components/Admin/EditAppointment";
import AddAppointmentModal from "@/Components/Admin/AddAppointmentModal";
import EditButton from "@/Components/EditButton";
import DeleteButton from "@/Components/DeleteButton";

const ManagementAppointments = ({ appointments: initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments?.data || []);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [addingAppointment, setAddingAppointment] = useState(false);
  const { post, delete: destroy } = useForm();
  const [flashMessage, setFlashMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState("");

  const formatTimeTo12Hour = (time) => {
    if (!time) return "";
    let [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const showFlashMessage = (type, text) => {
    setFlashMessage({ type, text });
    setTimeout(() => setFlashMessage(null), 3000);
  };

  // New: reload appointments from server after creation instead of manually updating state
  const handleAppointmentCreate = () => {
    router.reload({ only: ['appointments'] }); // reload only appointments prop
    setAddingAppointment(false); // close the modal after reload trigger
    showFlashMessage("success", "Add Appointment Success");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this appointment? This action cannot be undone.")) {
      destroy(`/admin/appointments/${id}`, {
        onSuccess: () => {
          setAppointments((prev) => prev.filter((app) => app.id !== id));
          showFlashMessage("success", "Appointment deleted successfully");
        },
        onError: (errors) => showFlashMessage("error", errors.message || "Failed to delete appointment"),
      });
    }
  };

  const handleAppointmentUpdate = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === updatedAppointment.id ? updatedAppointment : app))
    );
    setEditingAppointment(null);
    showFlashMessage("success", "Appointment updated successfully");
  };

  const filteredAppointments = appointments.filter(({ patient_name, treatment, status }) => {
    const matchesSearch =
      patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter ? status === statusFilter : true;
    const matchesTreatment = treatmentFilter ? treatment === treatmentFilter : true;

    return matchesSearch && matchesStatus && matchesTreatment;
  });

  const treatmentOptions = [
    "Teeth Cleaning",
    "Root Canal",
    "Whitening Treatment",
    "Fillings",
    "Cavity Check",
    "Dental Checkup",
  ];

  const statusOptions = ["Approved", "Pending", "Cancelled", "Completed", "Upcoming"];

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Manage Appointments</h2>

        {/* Filters and Search */}
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by name or treatment"
            className="px-4 py-2 w-1/3 rounded-xl shadow-inner bg-[#f7f7f7] text-gray-900 border-none outline-none focus:ring-2 focus:ring-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-xl shadow-inner bg-[#f7f7f7] text-gray-900 border-none outline-none focus:ring-2 focus:ring-gray-300"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 rounded-xl shadow-inner bg-[#f7f7f7] text-gray-900 border-none outline-none focus:ring-2 focus:ring-gray-300"
            value={treatmentFilter}
            onChange={(e) => setTreatmentFilter(e.target.value)}
          >
            <option value="">Filter by Treatment</option>
            {treatmentOptions.map((treatment) => (
              <option key={treatment} value={treatment}>
                {treatment}
              </option>
            ))}
          </select>
          <button
            onClick={() => setAddingAppointment(true)}
            className="px-4 py-2 rounded-xl bg-blue-300 text-blue-900 font-medium shadow-[5px_5px_15px_#93c5fd,-5px_-5px_15px_#bfdbfe] hover:shadow-inner hover:text-blue-700 transition duration-200"
          >
            + Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white shadow-md rounded p-6 text-center">No appointments available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-pink-100 text-pink-800">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Patient</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Number</th>
                  <th className="px-4 py-2 text-left">Treatment</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b hover:bg-pink-50">
                    <td className="px-4 py-2">{appointment.formatted_date}</td>
                    <td className="px-4 py-2">{formatTimeTo12Hour(appointment.time)}</td>
                    <td className="px-4 py-2">{appointment.patient_name}</td>
                    <td className="px-4 py-2">{appointment.email}</td>
                    <td className="px-4 py-2">{appointment.number}</td>
                    <td className="px-4 py-2">{appointment.treatment}</td>
                    <td className="px-4 py-2 capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${appointment.status === "Approved" ? "bg-green-100 text-green-800" : ""}
                        ${appointment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${appointment.status === "Cancelled" ? "bg-gray-100 text-gray-800" : ""}
                        ${appointment.status === "Completed" ? "bg-blue-100 text-blue-800" : ""}
                        ${appointment.status === "Upcoming" ? "bg-purple-100 text-purple-800" : ""}
                        `}
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
        )}
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
          onCreate={handleAppointmentCreate}  // <-- changed prop from onAdd to onCreate
          treatmentOptions={treatmentOptions}
        />
      )}

      {/* Flash Message */}
      {flashMessage && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
            flashMessage.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {flashMessage.text}
        </div>
      )}
    </AdminLayout>
  );
};

export default ManagementAppointments;
