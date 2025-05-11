<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $patients = [
            [
                'first_name' => 'John',
                'last_name' => 'Cruz',
                'email' => 'johncruz@example.com',
                'number' => '09171234567',
                'address' => '123 Sample St, Manila',
                'age' => 28,
                'last_visit' => '2025-06-01',
                'medical_concerns' => 'Allergy: Penicillin',
            ],
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}
