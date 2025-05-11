<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\ContactMessage;
use Inertia\Inertia;

class AdminNotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Notifications', [
            'alerts' => Notification::orderBy('date', 'desc')->get(),
            'inbox' => ContactMessage::orderBy('created_at', 'desc')->get(),
        ]);
    }
}
