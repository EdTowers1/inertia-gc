<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grupo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'codigo',
        'nombre',
        'nombre_corto',
        'nombre_sticker',
        'dias_rotacion',
        'is_inactive',
        'clase_id',
    ];

    protected $casts = [
        'is_inactive' => 'boolean',
        'dias_rotacion' => 'float',
        'deleted_at' => 'datetime',
    ];

    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }
}
