// resources/js/Components/Sidebar.jsx
import { Link, useForm } from '@inertiajs/react';

const Sidebar = () => {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <div className="w-64 h-screen bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <nav className="flex flex-col space-y-4">
                <Link href="/admin/dashboard" className="hover:bg-blue-500 p-3 rounded-lg">Admin Dashboard</Link>
                <Link href="/admin/appointments" className="hover:bg-blue-500 p-3 rounded-lg">Management Appointments</Link>
                <Link href="/admin/patients" className="hover:bg-blue-500 p-3 rounded-lg">Patient Records</Link>
                <Link href="/admin/schedule" className="hover:bg-blue-500 p-3 rounded-lg">Schedule Management</Link>
                <Link href="/admin/notifications" className="hover:bg-blue-500 p-3 rounded-lg">Notifications</Link>
                <Link href="/admin/settings" className="hover:bg-blue-500 p-3 rounded-lg">Settings</Link>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="hover:bg-red-500 p-3 rounded-lg text-left"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
