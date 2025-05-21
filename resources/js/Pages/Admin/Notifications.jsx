import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const LOCAL_STORAGE_ALERTS_KEY = 'notifications_alerts_read_states';
const LOCAL_STORAGE_INBOX_KEY = 'notifications_inbox_read_states';

const Notifications = ({ alerts, inbox: inboxProp }) => {
    // On mount, load from localStorage or fallback to props
    const [alertStates, setAlertStates] = useState(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_ALERTS_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with current alerts in case new alerts are added later
                return alerts.map(alert => {
                    const savedAlert = parsed.find(a => a.id === alert.id);
                    return {
                        ...alert,
                        read: savedAlert ? savedAlert.read : (alert.read ?? false)
                    };
                });
            } catch {
                // Parsing error, fallback to default
                return alerts.map(alert => ({ ...alert, read: alert.read ?? false }));
            }
        }
        return alerts.map(alert => ({ ...alert, read: alert.read ?? false }));
    });

    const [inboxStates, setInboxStates] = useState(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_INBOX_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return inboxProp.map(msg => {
                    const savedMsg = parsed.find(m => m.id === msg.id);
                    return {
                        ...msg,
                        read: savedMsg ? savedMsg.read : (msg.read ?? false)
                    };
                });
            } catch {
                return inboxProp.map(msg => ({ ...msg, read: msg.read ?? false }));
            }
        }
        return inboxProp.map(msg => ({ ...msg, read: msg.read ?? false }));
    });

    const [selectedMessage, setSelectedMessage] = useState(null);

    // Save alerts read state to localStorage when alertStates changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_ALERTS_KEY, JSON.stringify(alertStates));
    }, [alertStates]);

    // Save inbox read state to localStorage when inboxStates changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_INBOX_KEY, JSON.stringify(inboxStates));
    }, [inboxStates]);

    const unreadAlerts = alertStates.filter(a => !a.read).length;
    const unreadInbox = inboxStates.filter(m => !m.read).length;

    const toggleAlertRead = (index) => {
        const updated = [...alertStates];
        updated[index].read = !updated[index].read;
        setAlertStates(updated);
    };

    const handleViewMessage = (index) => {
        const updated = [...inboxStates];
        if (!updated[index].read) {
            updated[index].read = true;
            setInboxStates(updated);
        }
        setSelectedMessage(selectedMessage === index ? null : index);
    };

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 h-full">
                {/* System Alerts Section */}
                <section className="flex flex-col bg-gray-50 p-4 rounded-lg shadow h-[85vh]">
                    <div className="flex items-center gap-2 mb-2">
                        {/* Bell icon SVG */}
                        <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <h2 className="text-3xl font-bold text-blue-600">System Alerts</h2>
                        {/* Unread count circle */}
                        {unreadAlerts > 0 && (
                            <span className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {unreadAlerts}
                            </span>
                        )}
                        {/* Mark all as read button */}
                        {unreadAlerts > 0 && (
                            <button
                                onClick={() => setAlertStates(alertStates.map(a => ({ ...a, read: true })))}
                                className="ml-4 text-sm text-blue-600 underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    <div className="overflow-y-auto space-y-4 pr-2 border rounded-lg p-2 flex-1">
                        {alertStates.map((alert, idx) => (
                            <div key={idx} className="border p-4 rounded-xl bg-white shadow-lg">
                                <p className="text-sm text-gray-500">{new Date(alert.date).toLocaleDateString()}</p>
                                <p className="text-lg">{alert.message}</p>
                                <div className="flex justify-between mt-2 items-center">
                                    <span className={`text-sm ${alert.read ? 'text-green-600' : 'text-red-500'}`}>
                                        {alert.read ? 'Read' : 'Unread'}
                                    </span>
                                    <button
                                        className="text-xs text-blue-500 underline"
                                        onClick={() => toggleAlertRead(idx)}
                                    >
                                        Mark as {alert.read ? 'Unread' : 'Read'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inbox Messages Section */}
                <section className="flex flex-col bg-gray-50 p-4 rounded-lg shadow h-[85vh]">
                    <div className="flex items-center gap-2 mb-4">
                        {/* Envelope icon SVG */}
                        <svg className="w-6 h-6 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-3xl font-bold text-pink-600">Inbox Messages</h2>
                        {/* Unread count circle */}
                        {unreadInbox > 0 && (
                            <span className="ml-auto bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {unreadInbox}
                            </span>
                        )}
                        {/* Mark all as read button */}
                        {unreadInbox > 0 && (
                            <button
                                onClick={() => setInboxStates(inboxStates.map(m => ({ ...m, read: true })))}
                                className="ml-4 text-sm text-pink-600 underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    <div className="overflow-y-auto space-y-4 pr-2 border rounded-lg p-2 flex-1">
                        {inboxStates.map((msg, idx) => (
                            <div key={idx} className="border p-4 rounded-xl bg-white shadow-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{msg.first_name} {msg.last_name}</p>
                                        <p className="italic text-gray-600">{msg.subject}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            className="text-blue-500 underline"
                                            onClick={() => handleViewMessage(idx)}
                                        >
                                            {selectedMessage === idx ? 'Hide' : 'View'}
                                        </button>
                                        <a
                                            href={`https://mail.google.com/mail/?view=cm&to=${msg.email}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-600 transition"
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

                                <div className="mt-2 text-right">
                                    <span className={`text-sm font-semibold px-3 py-1 rounded border ${
                                        msg.read ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {msg.read ? 'Read' : 'Unread'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default Notifications;
