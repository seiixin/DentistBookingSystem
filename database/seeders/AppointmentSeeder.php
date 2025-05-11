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
            'time' => '10:00',
            'patient_name' => 'John Doe',
            'treatment' => 'Teeth Cleaning',
            'status' => 'Upcoming',
        ]);

        Appointment::create([
            'date' => '2025-05-12',
            'time' => '2:00',
            'patient_name' => 'Jane Smith',
            'treatment' => 'Root Canal',
            'status' => 'Pending',
        ]);

        Appointment::create([
            'date' => '2025-05-15',
            'time' => '1:00',
            'patient_name' => 'Emily Johnson',
            'treatment' => 'Whitening Treatment',
            'status' => 'Approved',
        ]);

        Appointment::create([
            'date' => '2025-05-16',
            'time' => '9:30',
            'patient_name' => 'Michael Brown',
            'treatment' => 'Dental Checkup',
            'status' => 'Completed',
        ]);

        Appointment::create([
            'date' => '2025-05-17',
            'time' => '3:15',
            'patient_name' => 'Sarah Davis',
            'treatment' => 'Cavity Check',
            'status' => 'Cancelled',
        ]);

        Appointment::create([
            'date' => '2025-05-18',
            'time' => '11:00',
            'patient_name' => 'David Wilson',
            'treatment' => 'Teeth Cleaning',
            'status' => 'Upcoming',
        ]);

        Appointment::create([
            'date' => '2025-05-19',
            'time' => '4:45',
            'patient_name' => 'Laura Martinez',
            'treatment' => 'Fillings',
            'status' => 'Pending',
        ]);

        Appointment::create([
            'date' => '2025-05-20',
            'time' => '10:30',
            'patient_name' => 'James Anderson',
            'treatment' => 'Whitening Treatment',
            'status' => 'Approved',
        ]);

        Appointment::create([
            'date' => '2025-05-21',
            'time' => '2:00',
            'patient_name' => 'Maria Garcia',
            'treatment' => 'Root Canal',
            'status' => 'Upcoming',
        ]);

        Appointment::create([
            'date' => '2025-05-22',
            'time' => '1:30',
            'patient_name' => 'Robert Lee',
            'treatment' => 'Dental Checkup',
            'status' => 'Completed',
        ]);
    }
}
