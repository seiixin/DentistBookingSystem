<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // Adding user_id to fillable to allow mass assignment
        'date',
        'start_time',
        'end_time',
        'breaks',
        'is_day_off',
    ];

    protected $casts = [
        'breaks' => 'array', // Automatically cast the 'breaks' column to an array
    ];

    /**
     * Define the relationship between Schedule and User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
