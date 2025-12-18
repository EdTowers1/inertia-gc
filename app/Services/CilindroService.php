<?php

namespace App\Services;

use App\Repositories\CilindroRepository;

class CilindroService
{
    protected $cilindroRepository;

    public function __construct(CilindroRepository $cilindroRepository)
    {
        $this->cilindroRepository = $cilindroRepository;
    }

    public function obtenerListaCilindros($params)
    {
        $page = (int) ($params['page'] ?? 1);
        $perPage = (int) ($params['per_page'] ?? 10);
        $sucursal = $params['sucursal'] ?? ''; // cadena vacía = todas las sucursales
        $search = $params['search'] ?? '';
        $searchExact = (int) ($params['search_exact'] ?? 0);
        $sortBy = $params['sort_by'] ?? 'codigo_cilindro';
        $sortBy = in_array($sortBy, ['codigo_cilindro', 'codigo_producto']) ? $sortBy : 'Descripcion_cilindro';
        $sortDirection = strtoupper($params['sort_dir'] ?? 'A');
        $sortDirection = in_array($sortDirection, ['A', 'D']) ? $sortDirection : 'A';

        $results = $this->cilindroRepository->obtenerCilindrosPaginados(
            $perPage,
            $page,
            $sucursal,
            $search,
            $searchExact,
            $sortBy,
            $sortDirection
        );

        $totalPages = $results['total_pages'] ?? 1;
        $totalRecords = $totalPages * $perPage;

        return [
            'data' => $results['data'],
            'last_page' => $totalPages,
            'total' => $totalRecords,
            'current_page' => $page,
        ];
    }
}
