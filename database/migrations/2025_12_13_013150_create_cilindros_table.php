<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cilindros', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique()->index();
            $table->string('sucursal', 2);
            $table->decimal('capacidad', 7, 2);
            $table->decimal('ultima_capacidad', 7, 2)->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cilindros');
    }
};
