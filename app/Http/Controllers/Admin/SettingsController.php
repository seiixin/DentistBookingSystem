<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SettingsController extends Controller
{
    // Show the settings page with the current user data
    public function index()
    {
        // Fetch the authenticated user
        $user = auth()->user();

        // Ensure the authenticated user exists
        if ($user) {
            // Fetch only the necessary fields for the logged-in user
            $userData = $user->only('first_name', 'last_name', 'email', 'number', 'address');

            // Return the settings page with the user's data
            return inertia('Admin/Settings', [
                'user' => $userData,
            ]);
        }

        // Optionally, return a redirect or error if the user is not authenticated
        return redirect()->route('login')->with('error', 'You must be logged in to access this page');
    }

    // Update the contact info of the authenticated user
    public function updateContact(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
        ]);

        // Fetch the authenticated user
        $user = auth()->user();

        // Ensure the authenticated user exists
        if ($user) {
            // Update the user's contact info
            $user->update($request->only('first_name', 'last_name', 'email', 'number', 'address'));

            // Redirect with success message
            return redirect()->route('admin.settings')->with('success', 'Profile updated successfully');
        }

        // Optionally, return a redirect or error if the user is not authenticated
        return redirect()->route('login')->with('error', 'You must be logged in to update your profile');
    }

    // Update the password of the authenticated user
    public function updatePassword(Request $request)
    {
        // Validate the incoming password change request
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Fetch the authenticated user
        $user = auth()->user();

        // Ensure the authenticated user exists
        if ($user) {
            // Update the password
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            // Redirect with success message
            return redirect()->route('admin.settings')->with('success', 'Password updated successfully');
        }

        // Optionally, return a redirect or error if the user is not authenticated
        return redirect()->route('login')->with('error', 'You must be logged in to update your password');
    }
}
