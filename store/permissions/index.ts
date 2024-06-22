import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        sActionPermission: useLocalStorage<any>('sActionPermission', null),
    }),
    actions: {
        async getPermissionsGlobal() {
            const { vueApp } = useNuxtApp()
            const payload = {
                headers: {
                    Authorization: "Bearer " + vueApp.$nuxt.$store.user.sToken,
                },
                params: {},
            };
            return await vueApp.$nuxt.$api
                .get(`auth/me`, payload)

        },
        setActionPermission(sActionPermission: any) {
            this.sActionPermission = sActionPermission
        }

    },
})
