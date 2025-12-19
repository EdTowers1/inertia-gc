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

        // Normalize rows: numeric strings -> numbers, '0000-00-00' -> null, trim strings
        $rawData = $results['data'] ?? [];
        $normalized = array_map(function ($row) {
            $item = (array) $row;

            // floats
            foreach (['capacidad_cilindro', 'ultcapacidad_cilindro', 'presion_cilindro'] as $field) {
                if (array_key_exists($field, $item) && $item[$field] !== null && $item[$field] !== '') {
                    $item[$field] = is_numeric($item[$field]) ? (float) $item[$field] : null;
                } else {
                    $item[$field] = null;
                }
            }

            // ints
            foreach (['row_id', 'linhabilitado', 'ldelete', 'estadolleno_cilindro', 'cil_docant', 'cil_docact', 'cil_dnitan', 'cil_dnitac'] as $field) {
                if (array_key_exists($field, $item) && $item[$field] !== null && $item[$field] !== '') {
                    $item[$field] = is_numeric($item[$field]) ? (int) $item[$field] : $item[$field];
                } else {
                    if ($field === 'row_id') {
                        $item[$field] = isset($item[$field]) ? (int)$item[$field] : null;
                    } else {
                        $item[$field] = $item[$field] ?? null;
                    }
                }
            }

            // dates normalization
            $dateFields = ['fecha_ultcapacidad_cilindro', 'fechaprueba_cilindro', 'fechacodigocliente_cilindro', 'fechafabricacion_cilindro', 'festado_cilindro', 'cil_fecant', 'cil_fecact', 'cil_fnitan', 'fapertura', 'fecha_ultentrada', 'fecha_ultsalida', 'instante'];
            foreach ($dateFields as $field) {
                if (array_key_exists($field, $item)) {
                    $val = $item[$field];
                    if ($val === null || $val === '' || $val === '0000-00-00' || $val === '0000-00-00 00:00:00') {
                        $item[$field] = null;
                    } else {
                        $item[$field] = $val;
                    }
                }
            }

            // trim strings
            foreach ($item as $k => $v) {
                if (is_string($v)) {
                    $item[$k] = trim($v);
                }
            }

            return $item;
        }, $rawData);

        $countOnPage = count($normalized);
        $from = $countOnPage > 0 ? (($page - 1) * $perPage) + 1 : 0;
        $to = $countOnPage > 0 ? $from + $countOnPage - 1 : 0;

        $totalRecords = $totalPages * $perPage; // best-effort when SP doesn't return exact total

        return [
            'data' => $normalized,
            'last_page' => $totalPages,
            'total' => $totalRecords,
            'current_page' => $page,
            'per_page' => $perPage,
            'from' => $from,
            'to' => $to,
        ];
    }
}
