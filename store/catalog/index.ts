import { defineStore } from 'pinia'

export const useCatalogStore = defineStore('catalog', {
    state: () => ({
        bOverlay: false,

    }),
    actions: {
        setOverlay(bOverlay: boolean) {
            this.bOverlay = bOverlay
        },

    },
})