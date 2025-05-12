// resources/js/Pages/Admin/Dashboard.jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [summary, setSummary] = useState({});
    const [todayAppointments, setTodayAppointments] = useState([]);

    useEffect(() => {
        fetch('/admin/dashboard-data')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setSummary(data.summary);
                setTodayAppointments(data.todayAppointments);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }, []);


    // Common neuromorphic class
    const neuromorphicBox = "bg-gray-100 rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]";

    return (
        <div className="space-y-8 p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to Admin Dashboard</h1>

            {/* Summary Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className={`${neuromorphicBox} text-blue-700 p-5 text-center font-semibold`}>
                    📅 Upcoming<br /><span className="text-2xl">{summary.upcoming || 0}</span>
                </div>
                <div className={`${neuromorphicBox} text-green-700 p-5 text-center font-semibold`}>
                    ✅ Completed<br /><span className="text-2xl">{summary.completed || 0}</span>
                </div>
                <div className={`${neuromorphicBox} text-red-700 p-5 text-center font-semibold`}>
                    ❌ Cancelled<br /><span className="text-2xl">{summary.cancelled || 0}</span>
                </div>
                <div className={`${neuromorphicBox} text-yellow-700 p-5 text-center font-semibold`}>
                    ⏳ Pending<br /><span className="text-2xl">{summary.pending || 0}</span>
                </div>
            </div>

            {/* Today's Schedule */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700">📆 Today’s Schedule</h2>
                <div className={`${neuromorphicBox} overflow-x-auto`}>
                    <table className="min-w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-600 text-sm">
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Patient Name</th>
                                <th className="px-4 py-2">Treatment</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAppointments.length > 0 ? (
                                todayAppointments.map((appt) => (
                                    <tr key={appt.id} className="bg-gray-100 rounded-lg shadow-inner hover:shadow-md transition">
                                        <td className="px-4 py-3">{appt.time}</td>
                                        <td className="px-4 py-3">{appt.patient_name || '—'}</td>
                                        <td className="px-4 py-3">{appt.treatment || '—'}</td>
                                        <td className="px-4 py-3">{appt.status}</td>
                                        <td className="px-4 py-3">
                                            {appt.status === 'Upcoming' ? (
                                                <button className="text-blue-600 hover:underline">Start</button>
                                            ) : appt.status === 'Completed' ? (
                                                <button className="text-green-600 hover:underline">View Notes</button>
                                            ) : (
                                                <button className="text-gray-400 cursor-not-allowed">Book Slot</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">No appointments for today.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
