<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
    Schema::create('appointments', function (Blueprint $table) {
        $table->id();
        $table->date('date');
        $table->string('time'); 
        $table->string('patient_name');
        $table->string('treatment');
        $table->enum('status', ['Upcoming', 'Pending', 'Approved', 'Completed', 'Cancelled']);
        $table->timestamps();
    });

    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
