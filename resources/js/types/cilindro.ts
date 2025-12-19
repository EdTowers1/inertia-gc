export interface Cilindro {
    row_id: number;
    linhabilitado?: 0 | 1 | number;
    ldelete?: 0 | 1 | number;
    sucursal?: string;
    codigo_cilindro?: string;
    nombre_cilindro?: string | null;
    codigo_producto?: string | null;
    capacidad_cilindro?: number | null;
    ultcapacidad_cilindro?: number | null;
    fecha_ultcapacidad_cilindro?: string | null; // 'YYYY-MM-DD HH:mm:ss' o '0000-00-00'
    fechaprueba_cilindro?: string | null;
    clase_cilindro?: string | null;
    codigopropietario_cilindro?: string | null;
    codigocliente_cilindro?: string | null;
    fechacodigocliente_cilindro?: string | null;
    usuariocodigocliente_cilindro?: string | null;
    nitfabricante_cilindro?: string | null;
    fechafabricacion_cilindro?: string | null;
    presion_cilindro?: number | null;
    oficinaresponsable_cilindro?: string | null;
    oficinaventa_cilindro?: string | null;
    estado_cilindro?: string | null;
    estadolleno_cilindro?: number | null;
    festado_cilindro?: string | null;
    uestado_cilindro?: string | null;
    cil_termo?: string | null;
    cil_almant?: string | null;
    cil_docant?: string | null;
    cil_fecant?: string | null;
    cil_almact?: string | null;
    cil_docact?: string | null;
    cil_fecact?: string | null;
    cil_nitant?: string | null;
    cil_dnitan?: string | null;
    cil_fnitan?: string | null;
    cil_dnitac?: string | null;
    cil_corral?: string | null;
    cil_men1?: string | null;
    cil_men2?: string | null;
    cil_vende?: string | null;
    cil_est?: string | null;
    log_transaccion?: string | null;
    fapertura?: string | null;
    uapertura?: string | null;
    jmoredata?: string | null;
    instante?: string | null;
    ultcodigopropietario_cilindro?: string | null;
    fecha_ultentrada?: string | null;
    ultdocumento_entrada?: string | null;
    fecha_ultsalida?: string | null;
    ultdocumento_salida?: string | null;
    nombre_producto?: string | null;
    nombre_grupo?: string | null;
    nombre_corto_grupo?: string | null;
    nombre_qr_grupo?: string | null;
    Nombre_tercero?: string | null;
}

// interfaz para meta de paginado
export interface PaginatedMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number | null;
    to?: number | null;
}

// interfaz general de respuesta paginada (coincide con el controller)
export interface PaginatedResponse<T> {
    status: 'success' | 'error' | string;
    data: T[];
    meta: PaginatedMeta;
}

// tipo de respuesta para cilindros paginados
export type CilindroResponse = PaginatedResponse<Cilindro>;

// interfaz para datos de cilindros en display (tabla)
export interface CilindroDisplay {
    row_id: number;
    codigo_cilindro: string;
    nombre_producto: string;
    capacidad_cilindro: number;
}
