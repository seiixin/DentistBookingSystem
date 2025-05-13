// resources/js/Components/Sidebar.jsx
import { Link, usePage } from '@inertiajs/react';
import { Home, Calendar, Users, Clock, Bell, Settings, LogOut } from 'lucide-react';
import { useForm } from '@inertiajs/react';

const Sidebar = () => {
    const { post } = useForm();
    const { url } = usePage();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const links = [
        { href: '/admin/dashboard', label: 'Admin Dashboard', icon: <Home size={20} /> },
        { href: '/admin/appointments', label: 'Management Appointments', icon: <Calendar size={20} /> },
        { href: '/admin/patients', label: 'Patient Records', icon: <Users size={20} /> },
        { href: '/admin/schedule', label: 'Schedule Management', icon: <Clock size={20} /> },
        { href: '/admin/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        { href: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="w-64 h-screen sticky top-0 bg-[#e0e5ec] p-6 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
            <nav className="flex flex-col space-y-4">
                {links.map(({ href, label, icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                            ${
                                url.startsWith(href)
                                    ? 'bg-[#d1d9e6] shadow-inner text-gray-800'
                                    : 'bg-[#e0e5ec] text-gray-700 shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff]'
                            } hover:shadow-inner`}
                    >
                        {icon}
                        <span className="font-medium">{label}</span>
                    </Link>
                ))}

                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff] hover:shadow-inner transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
