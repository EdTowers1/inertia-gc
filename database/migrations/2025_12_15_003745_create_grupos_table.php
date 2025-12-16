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
        Schema::create('grupos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clase_id')->nullable()->constrained('clases')->onDelete('set null');
            $table->string('codigo',3)->unique()->index();
            $table->string('nombre', 45);
            $table->string('nombre_corto', 10)->nullable();
            $table->string('nombre_sticker', 10)->nullable();
            $table->double('dias_rotacion')->default(0)->nullable();
            $table->boolean('is_inactive')->default(true);
            $table->softDeletes();
            $table->timestamps();

            // Relaciones con otras tablas

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupos');
    }
};
