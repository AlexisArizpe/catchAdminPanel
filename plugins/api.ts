// plugins/fetch.ts
import { useUserStore } from '~/store/user'
import type { NuxtApp } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig();
    const apiURL = config.public.apiURL;
    const userStore = useUserStore();

    const apiFetch = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', params: Record<string, any> = {}, body: any = null, token: string = '',) => {
        try {
            // Filtrar parámetros nulos o indefinidos
            const filteredParams = Object.fromEntries(
                Object.entries(params).filter(([_, value]) => value != null)
            );

            // Construcción de la cadena de consulta si el método es GET
            const query = method === 'GET' ? new URLSearchParams(filteredParams).toString() : '';
            const url = `${apiURL}${endpoint}${query ? '?' + query : ''}`;
            const sToken = userStore.sToken ? userStore.sToken : token;


            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',
                    Authorization: `Bearer ${sToken}`,
                },
                body: body && method !== 'GET' ? JSON.stringify(body) : null,
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    useUserStore().setLogout()
                    // Casting de nuxtApp como NuxtApp para que TypeScript reconozca el tipo
                    const router = (nuxtApp as NuxtApp).$router;
                    router.push('/login');
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error('API fetch error:', err);
            throw err;
        }
    };

    nuxtApp.provide('apiFetch', apiFetch);
});
