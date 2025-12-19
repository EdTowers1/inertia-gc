<?php

use App\Http\Controllers\CilindroController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    // rutas para cilindros

});

    Route::prefix('cilindros')->controller(CilindroController::class)->group(function () {
        Route::get('/', 'index')->name('cilindros.index');
    });


require __DIR__ . '/settings.php';
