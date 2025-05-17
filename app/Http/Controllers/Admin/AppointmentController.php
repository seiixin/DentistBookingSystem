<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    // List appointments with formatted_date and user_name added
    public function index()
    {
        // Eager load user and paginate
        $appointments = Appointment::with('user')->paginate(10);

        // Add user_name and formatted_date to each appointment in the collection
        $appointments->getCollection()->transform(function ($appointment) {
            return [
                'id' => $appointment->id,
                'patient_name' => $appointment->patient_name,
                'date' => $appointment->date,
                'formatted_date' => $appointment->date->format('F j, Y'), // e.g. May 17, 2025
                'time' => $appointment->time,
                'treatment' => $appointment->treatment,
                'status' => $appointment->status,
                'number' => $appointment->number,
                'email' => $appointment->email,
                'user_name' => $appointment->user ? $appointment->user->name : 'Unknown', // add user name here
            ];
        });

        return Inertia::render('Admin/ManagementAppointments', [
            'appointments' => $appointments,
        ]);
    }
    public function create()
    {
        $patients = User::select('id', 'name')->get();

        return Inertia::render('Admin/AddAppointmentModal', [
            'user_id' => Auth::id(),
            'patients' => $patients,
        ]);
    }
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Approved,Rejected,Cancelled,Completed,Upcoming',
        ]);

        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->status = $request->status;
            $appointment->save();
        } catch (\Exception $e) {
            return redirect()->route('appointments.index')->with('error', 'Failed to update status!');
        }

        return redirect()->route('appointments.index')->with('success', 'Status updated successfully');
    }

    public function edit($id)
    {
        $appointment = Appointment::findOrFail($id);

        return Inertia::render('Admin/EditAppointment', [
            'appointment' => $appointment,
        ]);
    }

    public function cancel($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'Cancelled';
        $appointment->save();

        return redirect()->route('appointments.index')->with('success', 'Appointment cancelled successfully');
    }

    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required|in:Pending,Approved,Rejected,Cancelled,Completed,Upcoming',
            'notes' => 'nullable|string|max:1000',
            'number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
        ]);

        $appointment->update($validated);

        return redirect()->back()->with('message', 'Appointment updated successfully!');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'treatment' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required|in:Pending,Approved,Cancelled,Completed',
            'number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        $appointment = Appointment::create($validated);

        return redirect()->route('appointments.index')->with('success', 'Appointment created successfully');
    }

    public function destroy($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->delete();
            return redirect()->route('appointments.index')->with('success', 'Appointment deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('appointments.index')->with('error', 'Failed to delete appointment');
        }
    }
}
