<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;

class AppointmentSeeder extends Seeder
{
    public function run()
    {
        Appointment::create([
            'date' => '2025-05-10',
            'time' => '10:00', // Standard time format with AM/PM
            'patient_name' => 'John Doe',
            'treatment' => 'Teeth Cleaning',
            'status' => 'Upcoming',
        ]);

        Appointment::create([
            'date' => '2025-05-12',
            'time' => '2:00', // Standard time format with AM/PM
            'patient_name' => 'Jane Smith',
            'treatment' => 'Root Canal',
            'status' => 'Pending',
        ]);

        Appointment::create([
            'date' => '2025-05-15',
            'time' => '1:00', // Standard time format with AM/PM
            'patient_name' => 'Emily Johnson',
            'treatment' => 'Whitening Treatment',
            'status' => 'Approved',
        ]);
    }
}
