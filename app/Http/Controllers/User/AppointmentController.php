<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'patient_name' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|string|max:255',
            'treatment' => 'required|string|max:255',
        ]);

        Appointment::create([
            'patient_name' => $request->patient_name,
            'date' => $request->date,
            'time' => $request->time,
            'treatment' => $request->treatment,
            'status' => 'Pending',
        ]);

        return redirect()->route('bookappointment')->with('success', 'Appointment booked successfully!');
    }
}
