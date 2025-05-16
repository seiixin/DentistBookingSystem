<?php

namespace App\Http\Controllers\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        // Validate the registration data
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'number' => 'required|string|max:15', // Adjust this based on your needs
            'address' => 'required|string|max:255',
            'password' => 'required|string|confirmed|min:8', // password confirmation rule
        ]);

        // Create the user in the database
        User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'number' => $validated['number'],
            'address' => $validated['address'],
            'password' => Hash::make($validated['password']),
        ]);

        // Redirect to the login page after successful registration
        return redirect()->route('login')->with('success', 'Registration successful. Please log in.');
    }
}
