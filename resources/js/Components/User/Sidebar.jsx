import { Link, usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    CalendarDays,
    FileText,
    ReceiptText,
    Settings,
    BookOpen,
    PhoneCall,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const { post } = useForm();
    const { url } = usePage();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const links = [
        { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { href: '/user/appointments', label: 'Appointments', icon: <CalendarDays size={20} /> },
        { href: '/user/medical-history', label: 'Medical History', icon: <FileText size={20} /> },
        { href: '/user/receipts', label: 'Receipts', icon: <ReceiptText size={20} /> },
        { href: '/user/account-settings', label: 'Account Settings', icon: <Settings size={20} /> },
        { href: '/user/book-appointment', label: 'Book Appointment', icon: <BookOpen size={20} /> },
        { href: '/user/contact', label: 'Contact Clinic', icon: <PhoneCall size={20} /> },
    ];

    return (
        <div className="w-64 h-screen sticky top-0 bg-[#ffe5ec] p-6 shadow-inner">
            <h2 className="text-2xl font-bold text-pink-700 mb-8">User Dashboard</h2>
            <nav className="flex flex-col space-y-4">
                {links.map(({ href, label, icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                            ${
                                url.startsWith(href)
                                    ? 'bg-[#fbcfe8] shadow-inner text-gray-800'
                                    : 'bg-[#ffe5ec] text-gray-700 shadow-[8px_8px_15px_#f0c7d4,-8px_-8px_15px_#ffffff]'
                            } hover:shadow-inner`}
                    >
                        {icon}
                        <span className="font-medium">{label}</span>
                    </Link>
                ))}

                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#ffe5ec] text-gray-700 shadow-[8px_8px_15px_#f0c7d4,-8px_-8px_15px_#ffffff] hover:shadow-inner transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
