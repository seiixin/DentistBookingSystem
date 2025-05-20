<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    /**
     * Store a new contact message.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name'  => ['required', 'string', 'max:255'],
            'email'      => ['required', 'email', 'max:255'],
            'number'     => ['nullable', 'string', 'max:20'],
            'subject'    => ['required', 'string', 'max:255'],
            'message'    => ['required', 'string'],
        ]);

        ContactMessage::create($validated);

        return redirect()->back()->with('success', 'Message sent successfully!');
    }

    /**
     * Display a list of all contact messages (admin view).
     */
    public function index()
    {
        $messages = ContactMessage::latest()->get();

        return Inertia::render('Admin/Notifications', [
            'alerts' => [], // optionally add system alerts
            'inbox'  => $messages,
        ]);
    }
}
