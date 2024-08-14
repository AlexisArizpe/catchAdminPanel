import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const usePermissionsStore = defineStore('permissions', {
    state: () => ({
        sActionPermission: useLocalStorage<any>('sActionPermission', null),
    }),
    actions: {
        async getPermissionsGlobal(sToken: string = '') {
            try {
                const { $apiFetch } = useNuxtApp()
                return await $apiFetch(`auth/me`, 'GET', undefined, sToken)
            } catch (error) {
                console.log(error)
                return error
            }
        },
        setActionPermission(sActionPermission: any) {
            this.sActionPermission = sActionPermission
        }

    },
})
