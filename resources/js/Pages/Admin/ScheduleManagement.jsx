import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

export default function ScheduleManagement({ schedules }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '', 
        date: '',
        start_time: '',
        end_time: '',
        breaks: [],
        is_day_off: false,
    });



    const [breakInput, setBreakInput] = useState({ start: '', end: '' });

    function formatTimeTo12Hour(time24) {
        if (!time24) return '';
        const [hourStr, minute] = time24.split(':');
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // If it's a day off, make start_time, end_time, and breaks null
        if (data.is_day_off) {
            setData('start_time', null);
            setData('end_time', null);
            setData('breaks', []);
        }

        console.log(data); // Optional: see what you're sending

        post(route('admin.schedule.store'), {
            onSuccess: () => {
                alert('Schedule saved!');
                setData({
                    date: '',
                    start_time: '',
                    end_time: '',
                    breaks: [],
                    is_day_off: false,
                });
            }
        });
    };

    const addBreak = () => {
        if (breakInput.start && breakInput.end) {
            setData('breaks', [...data.breaks, { ...breakInput }]);
            setBreakInput({ start: '', end: '' });
        }
    };

    const removeBreak = (index) => {
        setData('breaks', data.breaks.filter((_, i) => i !== index));
    };

    return (
        <AdminLayout>
            <div className="max-w-xl mx-auto">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Schedule</h2>

                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            value={data.date}
                            onChange={e => setData('date', e.target.value)}
                        />
                        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                    </div>

                    {/* Conditionally render time and break inputs */}
                    {!data.is_day_off && (
                        <>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm">Start</label>
                                    <input
                                        type="time"
                                        className="w-full border p-2 rounded"
                                        value={data.start_time}
                                        onChange={e => setData('start_time', e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm">End</label>
                                    <input
                                        type="time"
                                        className="w-full border p-2 rounded"
                                        value={data.end_time}
                                        onChange={e => setData('end_time', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Breaks</label>
                                <div className="flex gap-2">
                                    <input
                                        type="time"
                                        value={breakInput.start}
                                        onChange={e => setBreakInput({ ...breakInput, start: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        placeholder="Start"
                                    />
                                    <input
                                        type="time"
                                        value={breakInput.end}
                                        onChange={e => setBreakInput({ ...breakInput, end: e.target.value })}
                                        className="border p-2 rounded w-full"
                                        placeholder="End"
                                    />
                                    <button
                                        type="button"
                                        onClick={addBreak}
                                        className="bg-gray-200 px-3 py-2 rounded text-sm hover:bg-gray-300"
                                    >
                                        Add
                                    </button>
                                </div>
                                <ul className="mt-2 space-y-1 text-sm">
                                    {data.breaks.map((b, i) => (
                                        <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                            {formatTimeTo12Hour(b.start)} – {formatTimeTo12Hour(b.end)}
                                            <button
                                                type="button"
                                                onClick={() => removeBreak(i)}
                                                className="text-red-500 text-xs ml-2"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Day Off Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.is_day_off}
                            onChange={e => setData('is_day_off', e.target.checked)}
                        />
                        <label className="text-sm">Mark as Day Off</label>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        disabled={processing}
                    >
                        Save
                    </button>
                </form>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Schedules</h3>
                    <ul className="space-y-3 text-sm">
                        {schedules.map(s => (
                            <li key={s.id} className="bg-gray-100 p-3 rounded">
                                <div><strong>{s.date}</strong>: {s.is_day_off
                                    ? 'Day Off'
                                    : `${formatTimeTo12Hour(s.start_time)} - ${formatTimeTo12Hour(s.end_time)}`}</div>
                                {s.breaks && (
                                    <div className="text-xs text-gray-600">
                                        Breaks:{' '}
                                        {JSON.parse(s.breaks).map((b, i) => (
                                            <span key={i}>
                                                {formatTimeTo12Hour(b.start)}–{formatTimeTo12Hour(b.end)}{i < s.breaks.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
