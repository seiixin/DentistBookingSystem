<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Carbon;
use App\Models\Appointment;

class AdminDashboardController extends Controller
{
    public function dashboardData()
    {
        $today = Carbon::today()->toDateString();

        $appointments = Appointment::whereDate('date', $today)->orderBy('time')->get();

        $summary = [
            'upcoming' => Appointment::where('status', 'Upcoming')->count(),
            'completed' => Appointment::where('status', 'Completed')->count(),
            'cancelled' => Appointment::where('status', 'Cancelled')->count(),
            'pending' => Appointment::where('status', 'Pending')->count(),
        ];

        return response()->json([
            'summary' => $summary,
            'todayAppointments' => $appointments,
        ]);
    }
}
