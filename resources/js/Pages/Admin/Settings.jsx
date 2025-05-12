import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Settings = ({ user }) => {
    const { data, setData, put, errors } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        number: user.number,
        address: user.address,
    });

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    // NEW: Password update form state
    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        errors: passwordErrors,
        reset,
    } = useForm({
        password: '',
        password_confirmation: '',
    });

    const [isEditingContact, setIsEditingContact] = useState(false);

    if (!user) {
        return (
            <div>
                <p>Error: No user data found.</p>
            </div>
        );
    }

    const handleEditContact = () => {
        setIsEditingContact(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.settings.updateContact'));
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        updatePassword(route('admin.settings.updatePassword'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-8">
                <h1 className="text-3xl font-bold text-pink-600">Settings</h1>

                {/* User Contact Info */}
                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4 text-blue-600">User Contact Info</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block font-medium">Full Name</label>
                            <p>{user?.first_name} {user?.last_name}</p>
                        </div>
                        <div>
                            <label className="block font-medium">Email Address</label>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <label className="block font-medium">Phone Number</label>
                            <p>{user?.number}</p>
                        </div>
                        <div>
                            <label className="block font-medium">Address</label>
                            <p>{user?.address}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleEditContact}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Edit Contact Info
                        </button>
                    </div>
                </section>

                {/* Edit Contact Info Form */}
                {isEditingContact && (
                    <section className="bg-white p-6 rounded shadow mt-8">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">Edit Contact Info</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block font-medium">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                    />
                                    {errors.first_name && (
                                        <span className="text-red-500 text-sm">{errors.first_name}</span>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                    />
                                    {errors.last_name && (
                                        <span className="text-red-500 text-sm">{errors.last_name}</span>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium">Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">{errors.email}</span>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium">Phone Number</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.number}
                                        onChange={(e) => setData('number', e.target.value)}
                                    />
                                    {errors.number && (
                                        <span className="text-red-500 text-sm">{errors.number}</span>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium">Address</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && (
                                        <span className="text-red-500 text-sm">{errors.address}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditingContact(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                {/* Reset Password Section */}
                <section className="bg-white p-6 rounded shadow mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-pink-600">Security</h2>

                    {!showPasswordForm ? (
                        <button
                            onClick={() => setShowPasswordForm(true)}
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                        >
                            Reset Your Password
                        </button>
                    ) : (
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block font-medium">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                    />
                                    {passwordErrors.password && (
                                        <span className="text-red-500 text-sm">{passwordErrors.password}</span>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={passwordData.password_confirmation}
                                        onChange={(e) =>
                                            setPasswordData('password_confirmation', e.target.value)
                                        }
                                    />
                                    {passwordErrors.password_confirmation && (
                                        <span className="text-red-500 text-sm">
                                            {passwordErrors.password_confirmation}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordForm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    )}
                </section>

            </div>
        </AdminLayout>
    );
};

export default Settings;
