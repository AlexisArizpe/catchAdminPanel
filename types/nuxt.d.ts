// types/nuxt.d.ts
import { NuxtApp } from '#app'

declare module '#app' {
  interface NuxtApp {
    $apiFetch: (endpoint: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', params?: Record<string, any>, body?: any, token?: string) => Promise<any>;
  }
}
