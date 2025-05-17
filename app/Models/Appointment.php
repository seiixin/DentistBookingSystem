<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'patient_name',
        'date',
        'time',
        'treatment',
        'number',
        'email',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];
    // Set default attribute values
    protected $attributes = [
        'status' => 'Pending',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
