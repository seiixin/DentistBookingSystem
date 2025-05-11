<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notification;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $notifications = [
            ['2025-07-10', '10:00:00', 'New booking: John Cruz at 10:00 AM', 'unread'],
            ['2025-07-09', '14:00:00', 'Anna Reyes canceled her 2PM appointment', 'read'],
            [now()->toDateString(), now()->toTimeString(), 'Time conflict: Dr. Smith has overlapping appointments.', 'unread'],
            ['2025-07-08', '09:30:00', 'Reminder: Follow-up for Maria Santos today', 'read'],
            ['2025-07-07', '13:45:00', 'System update scheduled at 3PM', 'unread'],
            ['2025-07-06', '11:15:00', 'New message received from Carlos Reyes', 'read'],
            ['2025-07-05', '16:00:00', 'Patient survey: Luis Fernandez completed feedback form', 'read'],
            ['2025-07-04', '08:00:00', 'Upcoming appointment: Angela Lopez at 9AM', 'unread'],
        ];

        foreach ($notifications as $notif) {
            Notification::create([
                'date' => $notif[0],
                'time' => $notif[1],
                'message' => $notif[2],
                'status' => $notif[3],
            ]);
        }
    }
}
