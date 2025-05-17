<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    // Show appointment history with formatted_date and user_name added
    public function index()
    {
        $appointments = Appointment::with('user') // eager load user relationship
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')
            ->get(['id', 'date', 'time', 'treatment', 'status', 'patient_name', 'user_id'])
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->date,
                    'formatted_date' => $appointment->date->format('F j, Y'), // e.g. May 17, 2025
                    'time' => $appointment->time,
                    'treatment' => $appointment->treatment,
                    'status' => $appointment->status,
                    'patient_name' => $appointment->patient_name,
                    'user_name' => $appointment->user ? $appointment->user->name : 'Unknown', // add user name here
                ];
            });

        return Inertia::render('User/AppointmentHistory', [
            'appointments' => $appointments
        ]);
    }

    // Store new appointment with corrected validation rules
    public function store(Request $request)
    {
        Log::info('Appointment create request received', [
            'user_id' => Auth::id(),
            'data' => $request->all() // Log all input data
        ]);

        try {
            // Update validation rules - removed status requirement
            $validated = $request->validate([
                'patient_name' => 'required|string|max:255',
                'date' => 'required|date',
                'time' => 'required|string',
                'treatment' => 'required|string|max:255',
                'number' => 'required|string|max:20',
                'email' => 'required|email|max:255',
                // Status is removed from validation since it's set by the controller
            ]);

            Log::info('Validation passed', ['validated' => $validated]);

            // Create and save the appointment
            $appointment = new Appointment();
            $appointment->user_id = Auth::id();
            $appointment->patient_name = $validated['patient_name'];
            $appointment->date = $validated['date'];
            $appointment->time = $validated['time'];
            $appointment->treatment = $validated['treatment'];
            $appointment->number = $validated['number'];
            $appointment->email = $validated['email'];
            $appointment->status = 'Pending'; // Set status explicitly here

            $result = $appointment->save();

            Log::info('Appointment save result', [
                'success' => $result,
                'appointment_id' => $appointment->id ?? 'none'
            ]);

            if ($result) {
                // Return success response
                return redirect()->route('bookappointment')
                    ->with('success', 'Appointment booked successfully!');
            } else {
                throw new \Exception('Failed to save appointment to database');
            }

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);

            // Return with validation errors
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput();

        } catch (\Exception $e) {
            Log::error('Exception when creating appointment', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);

            // Return with generic error message
            return redirect()->back()
                ->with('error', 'Failed to book appointment: ' . $e->getMessage())
                ->withInput();
        }
    }
}
