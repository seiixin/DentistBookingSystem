<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\AppointmentSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        // Call the necessary seeders
        $this->call(AdminUserSeeder::class);
        $this->call(AppointmentSeeder::class);  // Ensure the AppointmentSeeder is called correctly

        // Patient User
        User::create([
            'first_name' => 'Jin',
            'last_name' => 'Seok',
            'email' => 'Sidneypagdanganan@gmail.com',
            'password' => Hash::make('Sidney123'),
            'number' => '09946260502', // Adding a phone number
            'address' => '123 Groove Street Los Santos', // Adding address
            'is_admin' => false,
        ]);
    }
}
