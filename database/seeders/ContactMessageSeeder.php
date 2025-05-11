<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactMessage;

class ContactMessageSeeder extends Seeder
{
    public function run(): void
    {
        $messages = [
            ['Maria', 'Santos', 'maria@example.com', '09171234567', 'Clinic Inquiry', 'What are your operating hours during holidays?'],
            ['Carlos', 'Reyes', 'carlos@example.com', '09179876543', 'Dental Checkup', 'Can I reschedule my checkup to next week?'],
            ['Angela', 'Lopez', 'angela.lopez@example.com', '09171239876', 'Tooth Extraction', 'Do I need a follow-up after extraction?'],
            ['Luis', 'Fernandez', 'luis.f@example.com', '09172345678', 'Whitening', 'How long does teeth whitening last?'],
            ['Joanna', 'Cruz', 'joanna.cruz@example.com', '09173456789', 'Braces Consultation', 'Is there a free consultation for braces?'],
            ['Michael', 'Tan', 'mike.tan@example.com', '09174567890', 'Payment Option', 'Do you accept credit cards or GCash?'],
            ['Bianca', 'Lim', 'bianca.lim@example.com', '09175678901', 'Pain After Cleaning', 'Is it normal to feel discomfort after a cleaning?'],
            ['Gabriel', 'Morales', 'gab.morales@example.com', '09176789012', 'Schedule Follow-up', 'I want to book a follow-up for my root canal.'],
        ];

        foreach ($messages as $msg) {
            ContactMessage::create([
                'first_name' => $msg[0],
                'last_name' => $msg[1],
                'email' => $msg[2],
                'number' => $msg[3],
                'subject' => $msg[4],
                'message' => $msg[5],
            ]);
        }
    }
}
