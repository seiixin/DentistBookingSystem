import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const Notifications = ({ alerts, inbox }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 h-full">
                {/* System Alerts Section */}
                <section className="flex flex-col bg-gray-50 p-4 rounded shadow h-[85vh]">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">System Alerts</h2>
                    <div className="overflow-y-auto space-y-4 pr-2 border rounded p-2 flex-1">
                        {alerts.map((alert, idx) => (
                            <div key={idx} className="border p-4 rounded bg-white shadow">
                                <p className="text-sm text-gray-500">
                                    {new Date(alert.date).toLocaleDateString()}
                                </p>
                                <p className="text-lg">{alert.message}</p>
                                <span className={`text-sm ${alert.read ? 'text-green-600' : 'text-red-500'}`}>
                                    {alert.read ? 'Read' : 'Unread'}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inbox Messages Section */}
                <section className="flex flex-col bg-gray-50 p-4 rounded shadow h-[85vh]">
                    <h2 className="text-3xl font-bold text-pink-600 mb-4">Inbox Messages</h2>
                    <div className="overflow-y-auto space-y-4 pr-2 border rounded p-2 flex-1">
                        {inbox.map((msg, idx) => (
                            <div key={idx} className="border p-4 rounded bg-white shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{msg.first_name} {msg.last_name}</p>
                                        <p className="italic text-gray-600">{msg.subject}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            className="text-blue-500 underline"
                                            onClick={() => setSelectedMessage(selectedMessage === idx ? null : idx)}
                                        >
                                            {selectedMessage === idx ? 'Hide' : 'View'}
                                        </button>
                                        <a
                                            href={`https://mail.google.com/mail/?view=cm&to=${msg.email}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                        >
                                            Reply
                                        </a>
                                    </div>
                                </div>
                                {selectedMessage === idx && (
                                    <div className="mt-2 text-sm text-gray-700">
                                        <p><strong>Email:</strong> {msg.email}</p>
                                        <p><strong>Number:</strong> {msg.number}</p>
                                        <p><strong>Message:</strong> {msg.message}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default Notifications;
