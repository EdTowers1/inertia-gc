<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('clientes', function () {
        return Inertia::render('clientes');
    })->name('clientes');

    Route::get('cilindros', function () {
        return Inertia::render('cilindros');
    })->name('cilindros');
});

require __DIR__ . '/settings.php';
