import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const EditAppointment = ({ appointment, onClose, onUpdate, treatmentOptions }) => {
    // Create form with Inertia
    const { data, setData, put, processing, errors } = useForm({
        date: appointment.date || '',
        time: appointment.time || '',
        patient_name: appointment.patient_name || '',
        treatment: appointment.treatment || '',
        notes: appointment.notes || '',
        status: appointment.status || 'Pending',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        put(`/admin/appointments/${appointment.id}`, {
            onSuccess: (response) => {
                onUpdate({
                    ...appointment,
                    ...data
                });

                setTimeout(() => {
                    onClose();
                }, 1000);
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    // Status options for dropdown
    const statusOptions = [
        'Upcoming',
        'Pending',
        'Approved',
        'Completed',
        'Cancelled',
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-pink-600">Edit Appointment</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                {/* Form message */}
                {errors && (
                    <div className={`mb-4 p-3 rounded text-sm ${errors ? 'bg-red-100 text-red-800 border border-red-200' : ''}`}>
                        {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                        {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
                        {errors.patient_name && <p className="text-red-500 text-xs italic">{errors.patient_name}</p>}
                        {errors.treatment && <p className="text-red-500 text-xs italic">{errors.treatment}</p>}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                            Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={data.time}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_name">
                            Patient Name
                        </label>
                        <input
                            type="text"
                            id="patient_name"
                            name="patient_name"
                            value={data.patient_name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatment">
                            Treatment
                        </label>
                        <select
                            id="treatment"
                            name="treatment"
                            value={data.treatment}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            {treatmentOptions.map((treatment, index) => (
                                <option key={index} value={treatment}>
                                    {treatment}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={data.notes}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="3"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAppointment;
