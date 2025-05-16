import React from 'react';
import { useForm } from '@inertiajs/react';

const AddAppointmentModal = ({ onClose, onCreate }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        time: '',
        patient_name: '',
        treatment: '',
        notes: '',
        status: 'Pending',
        number: '',    // Added phone number
        email: '',     // Added email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/admin/appointments', {
            onSuccess: (response) => {
                if (onCreate) onCreate(response?.props?.appointment);
                reset();
                setTimeout(onClose, 1000);
            },
            onError: (err) => {
                console.error('Error creating appointment:', err);
            },
        });
    };

    const treatmentOptions = [
        'Teeth Cleaning',
        'Whitening',
        'Tooth Extraction',
        'Dental Filling',
        'Root Canal',
    ];

    const statusOptions = ['Pending', 'Upcoming', 'Approved', 'Completed', 'Cancelled'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-pink-600">Add Appointment</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 bg-red-100 text-red-700 p-2 rounded border border-red-300 text-sm">
                        {Object.entries(errors).map(([field, msg]) => (
                            <p key={field}>{msg}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Existing fields */}

                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Date</span>
                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Time</span>
                        <input
                            type="time"
                            name="time"
                            value={data.time}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Patient Name</span>
                        <input
                            type="text"
                            name="patient_name"
                            value={data.patient_name}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        />
                    </label>

                    {/* New Number field */}
                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Phone Number</span>
                        <input
                            type="tel"
                            name="number"
                            value={data.number}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="09xxxxxxxxx"
                            required
                        />
                    </label>

                    {/* New Email field */}
                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="example@example.com"
                            required
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Treatment</span>
                        <select
                            name="treatment"
                            value={data.treatment}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            required
                        >
                            <option value="">Select a treatment</option>
                            {treatmentOptions.map((treatment, index) => (
                                <option key={index} value={treatment}>
                                    {treatment}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block mb-2">
                        <span className="text-sm font-semibold">Status</span>
                        <select
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="block mb-4">
                        <span className="text-sm font-semibold">Notes</span>
                        <textarea
                            name="notes"
                            value={data.notes}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded"
                            rows="3"
                        />
                    </label>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {processing ? 'Saving...' : 'Add Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAppointmentModal;
