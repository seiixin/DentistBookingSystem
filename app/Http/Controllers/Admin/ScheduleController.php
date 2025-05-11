<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the schedules.
     */
    public function index()
    {
        $schedules = Schedule::where('user_id', auth()->id())->get();
        return Inertia::render('Admin/ScheduleManagement', [
            'schedules' => $schedules
        ]);
    }

    /**
     * Store a newly created schedule in storage.
     */
public function store(Request $request)
{
    $validated = $request->validate([
        'date' => 'required|date',
        'start_time' => 'nullable|string', // Allow nullable if the field is optional
        'end_time' => 'nullable|string', // Allow nullable if the field is optional
        'breaks' => 'nullable|array',
        'breaks.*.start' => 'required_with:breaks|string',
        'breaks.*.end' => 'required_with:breaks|string',
        'is_day_off' => 'boolean',
    ]);

    // Store the schedule with validated data
    Schedule::create([
        'user_id' => auth()->id(),
        'date' => $validated['date'],
        'start_time' => $validated['start_time'] ?? null,  // Make sure start_time is null if not provided
        'end_time' => $validated['end_time'] ?? null,  // Make sure end_time is null if not provided
        'breaks' => json_encode($validated['breaks']), // store as JSON string
        'is_day_off' => $validated['is_day_off'],
    ]);

    return redirect()->back(); // Or Inertia::location() depending on your setup
}



}
