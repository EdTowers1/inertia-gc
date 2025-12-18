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

            return response()->json(
                array_merge(
                    ['status' => 'success'],
                    $cilindros
                ),
                200
            );
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener la lista de cilindros.',
                // 'exception_detail' => $e->getMessage() // Útil para debug
            ], 500);
        }
    }
}
