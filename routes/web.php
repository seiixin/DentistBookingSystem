<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\PatientController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\AdminDashboardController;
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
| Web Routes
|---------------------------------------------------------------------------
*/

/**
 * Admin Routes (Only for admin users)
 */
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    // Admin dashboard
    Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/dashboard-data', [AdminDashboardController::class, 'dashboardData'])->name('admin.dashboardData');
    /**
     * Appointment Routes - use controller for logic
     */
    Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');
    Route::post('/appointments/{id}/status', [AppointmentController::class, 'updateStatus'])->name('appointments.updateStatus');
    Route::post('/appointments/{id}/cancel', [AppointmentController::class, 'cancel'])->name('appointments.cancel');
    Route::get('/appointments/{id}/edit', [AppointmentController::class, 'edit'])->name('appointments.edit');

    // appointments CRUD
    Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::put('/appointments/{appointment}', [AppointmentController::class, 'update'])->name('appointments.update');
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');

    // Patient Records Controller
    Route::get('/patients/data', [PatientController::class, 'index'])->name('patients.data');
    Route::get('/admin/patients/json', [PatientController::class, 'json']);
    Route::resource('schedules', ScheduleController::class);
    // View route for the page
    Route::get('/patients', fn () => Inertia::render('Admin/PatientRecords'))->name('admin.patients');
    Route::post('/admin/schedule', [ScheduleController::class, 'store'])->name('admin.schedule.store');

    // Break time/day Scheduler Controller
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('admin.schedule');
    Route::post('/schedule', [ScheduleController::class, 'store'])->name('admin.schedule.store');

    // Notifications and inbox Controller
    Route::get('/notifications', fn () => Inertia::render('Admin/Notifications'))->name('admin.notifications');
    Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('admin.notifications');

    // Settings Controller
    Route::get('/settings', fn () => Inertia::render('Admin/Settings'))->name('admin.settings');
    Route::get('/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('admin.settings.updatePassword');
    Route::put('/settings/contact', [SettingsController::class, 'updateContact'])->name('admin.settings.updateContact');
});
/*
|---------------------------------------------------------------------------
| Auth scaffolding routes (login, logout, register, etc.)
|---------------------------------------------------------------------------
*/

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
     ->name('logout');

require __DIR__ . '/auth.php';
