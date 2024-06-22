import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
    state: () => ({
        bDialog: false,
        sTitle: "",
        sMessage: "",
        sType: ""
    }),
    actions: {
        success(sMessage: string, sTitle: string) {
            this.bDialog = true;
            this.sTitle = sTitle;
            this.sMessage = sMessage;
            this.sType = "success"
        },
        error(sMessage: string, sTitle: string) {
            this.bDialog = true;
            this.sTitle = sTitle;
            this.sMessage = sMessage;
            this.sType = "error"
        },
        close() {
            this.bDialog = false;
            this.sTitle = "";
            this.sMessage = "";
            this.sType = ""
        }
    },
})