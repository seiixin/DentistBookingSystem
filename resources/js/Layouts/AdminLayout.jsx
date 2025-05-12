// resources/js/Layouts/AdminLayout.jsx
import Sidebar from '@/Components/Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#e0e5ec]">
            <Sidebar />

            <main className="flex-1 p-6">
                <div className="bg-[#e0e5ec] p-6 rounded-xl shadow-[8px_8px_15px_#a3b1c6,-8px_-8px_15px_#ffffff]">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
