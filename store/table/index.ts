import { defineStore } from 'pinia'

export const useTableStore = defineStore('table', {
  state: () => ({
    bRefresh: false,
  }),
  actions: {

    setRefresh(bRefresh: boolean) {
      this.bRefresh = bRefresh;
    }
  },
})
