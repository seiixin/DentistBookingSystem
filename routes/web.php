<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\PatientController;
use App\Http\Controllers\Admin\ScheduleController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Guest\GuestAppointmentController;
use App\Http\Controllers\User\UserSettingsController;
use App\Http\Controllers\User\AppointmentController as UserAppointmentController;
use App\Http\Controllers\User\ContactMessageController;
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
})->name('welcome');

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

    // Appointment for guests - using a different route name to avoid conflicts
    Route::post('/guest-appointments', [GuestAppointmentController::class, 'store'])->name('guest.appointments.store');
});

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('User/Dashboard'))->name('dashboard');
    Route::get('/user/book-appointment', fn () => Inertia::render('User/BookAppointment'))->name('bookappointment');
    Route::post('/user-appointments', [UserAppointmentController::class, 'store'])->name('user.appointments.store');
    Route::get('/user/contact', fn () => Inertia::render('User/ContactClinic'))->name('contactclinic');
    Route::post('/user/contact', [ContactMessageController::class, 'store'])->name('contact.store');
    Route::get('/user/appointments', [UserAppointmentController::class, 'index'])->name('appointment.history');

    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('user/settings')->name('user.settings.')->group(function () {
        Route::get('/', [UserSettingsController::class, 'index'])->name('index');
        Route::put('/contact', [UserSettingsController::class, 'updateContact'])->name('updateContact');
        Route::put('/password', [UserSettingsController::class, 'updatePassword'])->name('updatePassword');
    });
});
/*
|---------------------------------------------------------------------------
| Web Routes
|---------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'))->name('admin.dashboard');
    Route::get('/dashboard-data', [AdminDashboardController::class, 'dashboardData'])->name('admin.dashboardData');

    // Appointments
    Route::prefix('appointments')->controller(AppointmentController::class)->name('appointments.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}/edit', 'edit')->name('edit');
        Route::put('/{appointment}', 'update')->name('update');
        Route::post('/{id}/status', 'updateStatus')->name('updateStatus');
        Route::post('/{id}/cancel', 'cancel')->name('cancel');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });

    // Patients
    Route::get('/patients/data', [PatientController::class, 'index'])->name('patients.data');
    Route::get('/patients/json', [PatientController::class, 'json']);
    Route::get('/patients', fn () => Inertia::render('Admin/PatientRecords'))->name('admin.patients');

    // Schedule
    Route::resource('schedules', ScheduleController::class);
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('admin.schedule');
    Route::post('/schedule', [ScheduleController::class, 'store'])->name('admin.schedule.store');

    // Notifications
    Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('admin.notifications');

    // Admin Inbox (Contact Messages)
    Route::get('/messages', [ContactMessageController::class, 'index'])->name('admin.inbox');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('admin.settings');
    Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('admin.settings.updatePassword');
    Route::put('/settings/contact', [SettingsController::class, 'updateContact'])->name('admin.settings.updateContact');
});

/*
|--------------------------------------------------------------------------
| Logout and Auth Routes
|--------------------------------------------------------------------------
*/
/*
|---------------------------------------------------------------------------
| Auth scaffolding routes (login, logout, register, etc.)
|---------------------------------------------------------------------------
*/

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
     ->name('logout');

require __DIR__ . '/auth.php';
