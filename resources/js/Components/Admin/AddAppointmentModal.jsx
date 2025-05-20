import React from 'react';
import { useForm, router } from '@inertiajs/react';

const AddAppointmentModal = ({ onClose, onCreate, user_id = '' }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: '',
        time: '',
        patient_name: '',
        number: '',
        email: '',
        treatment: '',
        status: 'Pending',
        notes: '',
        user_id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/admin/appointments', {
            onSuccess: () => {
                alert('Appointment successfully added!');
                router.visit('/admin/appointments'); // redirect to refresh the page fully
                onClose();
                reset();
            },
            onError: (err) => {
                console.error('Failed to add appointment:', err);
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
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-pink-600">Add Appointment</h2>
                    <button onClick={onClose} className="text-gray-600 text-2xl font-bold hover:text-red-500">
                        &times;
                    </button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-4 bg-red-100 border border-red-300 text-red-700 p-3 rounded">
                        {Object.entries(errors).map(([field, message]) => (
                            <p key={field} className="text-sm">{message}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={data.date}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={data.time}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Patient Name</label>
                        <input
                            type="text"
                            name="patient_name"
                            value={data.patient_name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="number"
                            value={data.number}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                            placeholder="09xxxxxxxxx"
                            pattern="09\d{9}"
                            title="Must start with 09 and contain 11 digits"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Treatment</label>
                        <select
                            name="treatment"
                            value={data.treatment}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        >
                            <option value="">Select a treatment</option>
                            {treatmentOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={data.status}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Notes</label>
                        <textarea
                            name="notes"
                            value={data.notes}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded"
                            rows="3"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded"
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
