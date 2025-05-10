<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::paginate(10);

        return Inertia::render('Admin/ManagementAppointments', [
            'appointments' => $appointments,
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

    // ✅ Add this method for updating an existing appointment
    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required|in:Pending,Approved,Rejected,Cancelled,Completed,Upcoming',
            'notes' => 'nullable|string|max:1000',
            // Add other fields to validate/update as needed
        ]);

        $appointment->update($validated);

        return redirect()->back()->with('message', 'Appointment updated successfully!');
    }

    // ✅ Add the store method to create a new appointment
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'treatment' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'status' => 'required|in:Pending,Approved,Cancelled,Completed',
        ]);

        // Create the new appointment
        $appointment = Appointment::create($validated);

        // Return a success message
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
