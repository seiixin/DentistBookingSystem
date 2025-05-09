// resources/js/Pages/Admin/Dashboard.jsx
import AdminLayout from '@/Layouts/AdminLayout';

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">Choose an action from the sidebar.</p>
        </div>
    );
};

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
