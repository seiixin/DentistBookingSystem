<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query();

        // Search functionality
        if ($request->has('search') && $request->search !== '') {
            $query->where('first_name', 'like', '%' . $request->search . '%')
                ->orWhere('last_name', 'like', '%' . $request->search . '%');
        }

        // Filter functionality (by medical concern, for example)
        if ($request->has('filter') && $request->filter !== '') {
            $query->where('medical_concerns', 'like', '%' . $request->filter . '%');
        }

        return response()->json($query->get());
    }

}
