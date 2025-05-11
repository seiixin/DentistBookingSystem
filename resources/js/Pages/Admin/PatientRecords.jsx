// resources/js/Pages/Admin/PatientRecords.jsx

import { useEffect, useState } from 'react';
import AdminLayout from "@/Layouts/AdminLayout";
import axios from 'axios';

const PatientRecords = () => {
    const [patients, setPatients] = useState([]); // Ensure patients is an array
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchPatients();
    }, [search]);


    /**
     * Alternative Fix - Add Accept header to axios call in React
     */
    const fetchPatients = async () => {
        try {
            const response = await axios.get('/admin/patients/data', {

                params: { search },
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (Array.isArray(response.data)) {
                setPatients(response.data);
            } else {
                console.error("Expected an array of patients, but got:", response.data);
                setPatients([]);
            }
        } catch (error) {
            console.error("Failed to fetch patients:", error);
            setPatients([]);
        }
    };


    return (
        <AdminLayout>
            <div>
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Patient Records</h2>

                <input
                    type="text"
                    placeholder="Search patients..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-4 py-2 mb-4 w-full max-w-md"
                />

                <table className="min-w-full bg-white border border-gray-200 shadow rounded">
                    <thead className="bg-blue-100">
                        <tr className="text-left">
                            <th className="px-4 py-2 border-b">Name</th>
                            <th className="px-4 py-2 border-b">Age</th>
                            <th className="px-4 py-2 border-b">Last Visit</th>
                            <th className="px-4 py-2 border-b">Medical Concerns</th>
                            <th className="px-4 py-2 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.length > 0 ? (
                            patients.map((patient, index) => (
                                <tr key={index} className="text-center border-t">
                                    <td className="px-4 py-2">{patient.first_name} {patient.last_name}</td>
                                    <td className="px-4 py-2">{patient.age ?? '-'}</td>
                                    <td className="px-4 py-2">{patient.last_visit ?? '-'}</td>
                                    <td className="px-4 py-2">{patient.medical_concerns ?? '-'}</td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={`/admin/patients/${patient.id}`}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            View Profile
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-4">No patients found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default PatientRecords;
