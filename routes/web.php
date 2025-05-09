<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|---------------------------------------------------------------------------
| Public Routes (No authentication required)
|---------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/appointment', fn () => Inertia::render('Appointment'));
Route::get('/about', fn () => Inertia::render('About'));
Route::get('/contact', fn () => Inertia::render('ContactUs'));


/*
|---------------------------------------------------------------------------
| Guest Routes (Only for unauthenticated users)
|---------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', fn () => Inertia::render('Auth/Login'))->name('login');
    Route::get('/register', fn () => Inertia::render('Auth/Register'))->name('register');
});


/*
|---------------------------------------------------------------------------
| Authenticated User Routes (Email verified users)
|---------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard route for authenticated users
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Profile management routes
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});


/*
|---------------------------------------------------------------------------
| Admin Routes (Only for admin users)
|---------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    });

    Route::get('/appointments', function () {
        return Inertia::render('Admin/ManagementAppointments');
    });

    Route::get('/patients', function () {
        return Inertia::render('Admin/PatientRecords');
    });

    Route::get('/schedule', function () {
        return Inertia::render('Admin/ScheduleManagement');
    });

    Route::get('/treatments', function () {
        return Inertia::render('Admin/TreatmentNotes');
    });

    Route::get('/notifications', function () {
        return Inertia::render('Admin/Notifications');
    });

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    });
});


/*
|---------------------------------------------------------------------------
| Auth scaffolding routes (login, logout, register, etc.)
|---------------------------------------------------------------------------
*/

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
     ->name('logout');


require __DIR__ . '/auth.php';
