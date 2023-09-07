<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up()
    {
        Schema::create('envio_changes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('envio_id');
            $table->string('field_name'); // Nombre del campo que se modificó
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->timestamps();
            
            // Definir relaciones
            $table->foreign('envio_id')->references('id')->on('envios')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('envio_changes');
    }
};
