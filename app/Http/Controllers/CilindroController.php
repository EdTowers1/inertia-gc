<?php

namespace App\Http\Controllers;

use App\Services\CilindroService;
use Illuminate\Http\Request;

class CilindroController extends Controller
{
    protected $cilindroService;

    public function __construct(CilindroService $cilindroService)
    {
        $this->cilindroService = $cilindroService;
    }

    public function index(Request $request)
    {
        // Pasamos todos los parámetros relevantes al servicio.
        $params = $request->only(['page', 'per_page', 'sucursal', 'search', 'search_exact', 'sort_by', 'sort_dir']);

        // 💡 NOTA: Las validaciones de los parámetros (como si 'page' es un entero)
        // pueden ir aquí o en una Request Class separada para mayor orden.

        try {
            $cilindros = $this->cilindroService->obtenerListaCilindros($params);

            $response = [
                'status' => 'success',
                'data' => $cilindros['data'] ?? [],
                'meta' => [
                    'current_page' => $cilindros['current_page'] ?? (int)($params['page'] ?? 1),
                    'last_page' => $cilindros['last_page'] ?? 1,
                    'per_page' => $cilindros['per_page'] ?? (int)($params['per_page'] ?? 10),
                    'total' => $cilindros['total'] ?? 0,
                    'from' => $cilindros['from'] ?? null,
                    'to' => $cilindros['to'] ?? null,
                ],
            ];

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener la lista de cilindros.',
                // 'exception_detail' => $e->getMessage() // Útil para debug
            ], 500);
        }
    }
}
