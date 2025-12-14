<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datos_externos = DB::connection('external_mariadb')
            ->table('m_clase')
            ->get();

        foreach ($datos_externos as $dato) {
            DB::table('clases')->insert([
                'codigo' => $dato->codigo_clase,
                'nombre' => $dato->nombre_clase,
                'is_inactive' => $dato->linhabilitado == 1 ? true : false,
                'created_at' => now(),
                'updated_at' => now(),
                'deleted_at' => null,
            ]);

    }
}
}
