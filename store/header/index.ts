import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useHeaderStore = defineStore('header', {
    state: () => ({
        sNameItemHeader: useLocalStorage<string>('sNameItemHeader', ""),
        sExtraInfo: useLocalStorage<string>('sExtraInfo', ""),
    }),
    actions: {
        setNameItemHeader(sNameItemHeader: string) {
            this.sNameItemHeader = sNameItemHeader;
        },
        setExtraInfo(sExtraInfo: string) {
            this.sExtraInfo = sExtraInfo;
        }
    },
})