<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard using Inertia.js.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'message' => 'Welcome to the Admin Dashboard!',
        ]);
    }
}
