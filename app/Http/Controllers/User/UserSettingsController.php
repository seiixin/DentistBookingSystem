<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserSettingsController extends Controller
{
    // Show the account settings page with the current user data
    public function index()
    {
        $user = auth()->user();

        if ($user) {
            $userData = $user->only('first_name', 'last_name', 'email', 'number', 'address');

            return Inertia::render('User/AccountSettings', [
                'user' => $userData,
            ]);
        }

        return redirect()->route('login')->with('error', 'You must be logged in to access this page');
    }

    // Update the contact info of the authenticated user
    public function updateContact(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
        ]);

        $user = auth()->user();

        if ($user) {
            $user->update($request->only('first_name', 'last_name', 'email', 'number', 'address'));

            return redirect()->back()->with('success', 'Profile updated successfully');
        }

        return redirect()->route('login')->with('error', 'You must be logged in to update your profile');
    }

    // Update the password of the authenticated user
    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = auth()->user();

        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();

            return redirect()->back()->with('success', 'Password updated successfully');
        }

        return redirect()->route('login')->with('error', 'You must be logged in to update your password');
    }
}
