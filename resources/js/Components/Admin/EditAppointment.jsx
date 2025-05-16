import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const EditAppointment = ({ appointment, onClose, onUpdate, treatmentOptions }) => {
    const { data, setData, put, processing, errors: serverErrors } = useForm({
        date: appointment.date || '',
        time: appointment.time || '',
        patient_name: appointment.patient_name || '',
        email: appointment.email || '',
        number: appointment.number || '',
        treatment: appointment.treatment || '',
        notes: appointment.notes || '',
        status: appointment.status || 'Pending',
    });

    // Local validation errors
    const [localErrors, setLocalErrors] = useState({});

    const validate = () => {
        const errors = {};

        // Better email regex that handles most valid email formats
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // More flexible phone regex that accepts international formats
        const numberRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

        if (data.email && !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (data.number && !numberRegex.test(data.number)) {
            errors.number = 'Please enter a valid phone number.';
        }

        setLocalErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        // Clear error when user edits
        setLocalErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        put(`/admin/appointments/${appointment.id}`, {
            onSuccess: () => {
                onUpdate({ ...appointment, ...data });
                setTimeout(onClose, 1000);
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    const statusOptions = ['Upcoming', 'Pending', 'Approved', 'Completed', 'Cancelled'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md max-h-[80vh] flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-pink-600">Edit Appointment</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                {(Object.keys(localErrors).length > 0 || Object.keys(serverErrors).length > 0) && (
                    <div className="mb-3 p-2 rounded bg-red-100 text-red-800 border border-red-300 text-xs">
                        {Object.values({ ...localErrors, ...serverErrors }).map((msg, i) => (
                            <p key={i}>{msg}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow">
                    <div className="space-y-3 pr-1"> {/* Added right padding for scrollbar */}
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Date">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={data.date}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </Field>

                            <Field label="Time">
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    value={data.time}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                />
                            </Field>
                        </div>

                        <Field label="Patient Name">
                            <input
                                type="text"
                                id="patient_name"
                                name="patient_name"
                                value={data.patient_name}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Email" error={localErrors.email}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className={`input-field ${localErrors.email ? 'border-red-500' : ''}`}
                                    required
                                />
                            </Field>

                            <Field label="Contact Number" error={localErrors.number}>
                                <input
                                    type="text"
                                    id="number"
                                    name="number"
                                    value={data.number}
                                    onChange={handleChange}
                                    className={`input-field ${localErrors.number ? 'border-red-500' : ''}`}
                                    required
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Treatment">
                                <select
                                    id="treatment"
                                    name="treatment"
                                    value={data.treatment}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                >
                                    {treatmentOptions.map((treatment, index) => (
                                        <option key={index} value={treatment}>
                                            {treatment}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Status">
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <Field label="Notes">
                            <textarea
                                id="notes"
                                name="notes"
                                value={data.notes}
                                onChange={handleChange}
                                className="input-field"
                                rows="2"
                            />
                        </Field>
                    </div>
                </form>

                <div className="flex justify-end mt-3 pt-2 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 text-sm rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-3 text-sm rounded"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper component for form fields
const Field = ({ label, error, children }) => (
    <div className="mb-1">
        <label className="block text-gray-700 text-xs font-bold mb-1">{label}</label>
        {children}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

// Add global styles at the top of your CSS or in your component
// These styles are referenced by className="input-field"
/*
.input-field {
    @apply shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline;
}
*/

export default EditAppointment;
