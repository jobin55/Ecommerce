<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminExists = User::where('email', 'admin@example.com')->first();

        if (!$adminExists) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123456'),
                'role' => 'admin',
            ]);

            $this->command->info('Default admin user created!');
            $this->command->info('Email: admin@example.com');
            $this->command->info('Password: admin123456');
        } else {
            $this->command->info('Admin user already exists.');
        }
    }
}
