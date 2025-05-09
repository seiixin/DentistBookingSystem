<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'WangClinicAdmin@gmail.com'],
            [
                'first_name' => 'Clinic',
                'last_name' => 'Admin',
                'number' => '9876543210',
                'address' => '123 Admin St, City, Country',
                'password' => Hash::make('112803Ss'),
                'is_admin' => true,
            ]
        );

    }
}
