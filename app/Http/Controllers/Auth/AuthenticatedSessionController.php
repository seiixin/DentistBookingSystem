<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');

        // Attempt to log the user in
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::user();

            // Make sure user is not null before accessing properties
            if (!$user) {
                Auth::logout(); // Just in case
                return redirect()->route('login')->withErrors([
                    'email' => 'Authentication failed. Please try again.',
                ]);
            }

            // Check for is_admin property
            if (property_exists($user, 'is_admin') || isset($user->is_admin)) {
                return $user->is_admin
                    ? redirect()->intended('/admin/dashboard')
                    : redirect()->intended('/dashboard');
            }

            // If is_admin is missing, log out and report error
            Auth::logout();
            return redirect()->route('login')->withErrors([
                'email' => 'User role is undefined.',
            ]);
        }

        // Invalid credentials
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
