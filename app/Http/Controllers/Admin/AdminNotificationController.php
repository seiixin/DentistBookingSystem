<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Appointment;
use App\Models\ContactMessage;
use Inertia\Inertia;

class AdminNotificationController extends Controller
{
    public function index()
    {
        // Generate custom alert messages based on appointments
        $alerts = Appointment::latest()
            ->take(10)
            ->get()
            ->map(function ($appointment) {
                return [
                    'message' => "New appointment with {$appointment->full_name} on " . date('F d, Y', strtotime($appointment->date)),
                    'date' => $appointment->created_at,
                    'read' => false, // Placeholder for read status
                ];
            });

        // Fetch contact messages (inbox)
        $inbox = ContactMessage::orderBy('created_at', 'desc')->take(10)->get();

        return Inertia::render('Admin/Notifications', [
            'alerts' => $alerts,
            'inbox' => $inbox,
        ]);
    }
}
