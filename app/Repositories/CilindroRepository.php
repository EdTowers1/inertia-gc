<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class CilindroRepository
{
    public function obtenerCilindrosPaginados(
        int $perPage,
        int $page,
        string $sucursal,
        string $search,
        int $searchExact,
        string $sortBy,
        string $sortDirection
    ) {
        // preparar parametros para el SP
        $procedureParams = [$perPage, $page, $sucursal, $search, $searchExact, $sortBy, $sortDirection];

        // llamar al SP
        $results = DB::select('CALL usp_cilindros_lista(?,?,?,?,?,?,?, @pageCount)', $procedureParams);

        // obtener el valor del parametro de salida(cantidad de paginas)
        $pageCountResult = DB::select('SELECT @PageCount as page_count');
        $totalPages = $pageCountResult[0]->page_count ?? 1;

        return [
            'data' => $results,
            'total_pages' => (int) $totalPages,
            'per_page' => $perPage,
            'page' => $page,
        ];
    }
}
