<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    /**
     * Nombre de tabla personalizada y primary key
     */
    protected $table = 'seg_usuarios';
    protected $primaryKey = 'id_user';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false; // la tabla usa 'instante' como timestamp, no 'created_at'/'updated_at'

    /**
     * Nombre de la columna de contraseña para Laravel Auth
     */
    public function getAuthPasswordName(): string
    {
        return 'pwd_user';
    }

    /**
     * Obtener el nombre del usuario para mostrar en la interfaz
     */
    public function getNameAttribute(): string
    {
        return $this->nombre_user ?? $this->login_user;
    }

    /**
     * Email del usuario para notificaciones
     */
    public function routeNotificationForMail(): string
    {
        return $this->email_user ?? '';
    }

    protected $fillable = [
        'tipo',
        'grupo_user',
        'nombre_user',
        'login_user',
        'pwd_user',
        'email_user',
        'cedula_user',
        'telefono_user',
        'cambiapassword_user',
        'fechaultimapassw_user',
        'lestado_user',
        'perfil_user',
        'sede_user',
        'tipo_doctos',
        'VersionUpdate_user',
        'multiplesesion_user',
        'instante',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'pwd_user',
        // 'remember_token' => if your table has this column, add it here
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'cambiapassword_user' => 'boolean',
        'lestado_user' => 'boolean',
        'multiplesesion_user' => 'boolean',
        'fechaultimapassw_user' => 'date',
        'instante' => 'datetime',
    ];
}
