import type { CilindroResponse } from '@/types/cilindro';

export const cilindroService = {
    async getCilindros(
        page: number = 1,
        perPage: number = 10,
        options: {
            sucursal?: string;
            search?: string;
            search_exact?: 0 | 1;
            sort_by?: string;
            sort_dir?: 'A' | 'D';
        } = {},
    ): Promise<CilindroResponse> {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('per_page', String(perPage));
        if (options.sucursal) params.set('sucursal', options.sucursal);
        if (options.search) params.set('search', options.search);
        if (typeof options.search_exact !== 'undefined')
            params.set('search_exact', String(options.search_exact));
        if (options.sort_by) params.set('sort_by', options.sort_by);
        if (options.sort_dir) params.set('sort_dir', options.sort_dir);

        // Ajusta la base si tu endpoint está en /api
        const url = `/cilindros?${params.toString()}`;

        const resp = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
            credentials: 'same-origin', // o 'include' si usas cookies cross-site
        });

        const text = await resp.text();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let json: any = null;
        try {
            json = text ? JSON.parse(text) : null;
        } catch {
            // body no es JSON
        }

        if (!resp.ok) {
            const msg =
                json?.message ?? resp.statusText ?? 'Error en la petición';
            throw new Error(msg);
        }

        if (json && json.status && json.status !== 'success') {
            throw new Error(json.message ?? 'Respuesta de error del servidor');
        }

        return json as CilindroResponse;
    },
};
