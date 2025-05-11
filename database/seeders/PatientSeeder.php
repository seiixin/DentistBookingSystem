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
                'medical_concerns' => 'Teeth Cleaning',
            ],
            [
                'first_name' => 'Jane',
                'last_name' => 'Doe',
                'email' => 'janedoe@example.com',
                'number' => '09171234568',
                'address' => '456 Another St, Manila',
                'age' => 34,
                'last_visit' => '2025-05-20',
                'medical_concerns' => 'Root Canal',
            ],
            [
                'first_name' => 'Mary',
                'last_name' => 'Smith',
                'email' => 'marysmith@example.com',
                'number' => '09171234569',
                'address' => '789 Sample Ave, Makati',
                'age' => 45,
                'last_visit' => '2025-04-15',
                'medical_concerns' => 'Whitening Treatment',
            ],
            [
                'first_name' => 'Peter',
                'last_name' => 'Parker',
                'email' => 'peterparker@example.com',
                'number' => '09171234570',
                'address' => '101 Hero St, Quezon City',
                'age' => 26,
                'last_visit' => '2025-03-10',
                'medical_concerns' => 'Fillings',
            ],
            [
                'first_name' => 'Clark',
                'last_name' => 'Kent',
                'email' => 'clarkkent@example.com',
                'number' => '09171234571',
                'address' => '202 Metropolis St, Pasig',
                'age' => 36,
                'last_visit' => '2025-02-05',
                'medical_concerns' => 'Cavity Check',
            ],
            [
                'first_name' => 'Bruce',
                'last_name' => 'Wayne',
                'email' => 'brucewayne@example.com',
                'number' => '09171234572',
                'address' => '303 Gotham St, Makati',
                'age' => 38,
                'last_visit' => '2025-01-25',
                'medical_concerns' => 'Dental Checkup',
            ],
            [
                'first_name' => 'Tony',
                'last_name' => 'Stark',
                'email' => 'tonystark@example.com',
                'number' => '09171234573',
                'address' => '404 Stark Tower, Taguig',
                'age' => 42,
                'last_visit' => '2025-06-10',
                'medical_concerns' => 'Teeth Cleaning',
            ],
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}
