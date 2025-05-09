<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Ensure user is authenticated
        if (!Auth::check()) {
            Log::warning('Admin access denied: Not authenticated');
            return redirect()->route('login'); // Using named route for flexibility
        }

        // Ensure user is admin
        if (!Auth::user()->is_admin) {
            Log::warning('Admin access denied: Not admin', ['user' => Auth::user()->email]);
            return redirect()->route('dashboard'); // Using named route for flexibility
        }

        // Log access for admins
        Log::info('Admin access granted', ['user' => Auth::user()->email]);

        return $next($request);
    }
}
