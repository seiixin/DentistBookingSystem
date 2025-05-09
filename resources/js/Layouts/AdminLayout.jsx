// resources/js/Layouts/AdminLayout.jsx
import Sidebar from '@/Components/Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Page Content */}
            <main className="flex-1 bg-white p-6">
                {children} {/* ← This must be included or the page will appear empty */}
            </main>
        </div>
    );
};

export default AdminLayout;
