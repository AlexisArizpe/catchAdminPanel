<template>
  <div class="content-global-table">
    <p class="txt-title-table-global">
      <span class="font-weight-bold">Historial de pagos</span>
    </p>
    <p class="txt-message">
      Solo se muestra el último año del historial de facturación
    </p>
    <v-data-table-virtual
      class="global-table"
      density="comfortable"
      :loading="bLoadingItems"
      :loading-text="sLoadingTxtGlobal"
      :no-data-text="sEmptyTxtGlobal"
      :headers="aHeader"
      :items="aItems"
      :search="search"
    >
      <template v-slot:item.sDateTime="{ item }">
        <span class="w-s-nowrap">{{ item.sDateTime }}</span>
      </template>
      <template v-slot:item.sPaymentMethod="{ item }">
        <span v-if="item.sPaymentMethod" class="w-s-nowrap">{{
          item.sPaymentMethod
        }}</span>
        <span v-else class="w-s-nowrap txt-empty-global">{{
          sEmptyRowGlobal
        }}</span>
      </template>
      <template v-slot:item.eStatus="{ item }">
        <div
          :style="item.sColorStatus"
          class="status-info-general content-status-all text-uppercase font-weight-bold"
        >
          {{ item.eStatus }}
        </div>
      </template>
      <template v-slot:item.sTotal="{ item }">
        <span class="w-s-nowrap">
          {{ item.sTotal }}
        </span>
      </template>
      <template v-slot:item.sConcept="{ item }">
        <span class="w-s-nowrap">
          {{ item.sConcept }}
        </span>
      </template>
    </v-data-table-virtual>
  </div>
</template>
<script>
export default {
  props: {
    bLoadingItems: {
      type: Boolean,
      default: true,
    },
    aActionsTableCard: Array,
    aHeader: Array,
    aItems: Array,
    iNumPage: {
      type: Number,
      default: 0,
    },
    iTotal: {
      type: Number,
      default: 0,
    },
    bAdminPermission: {
      type: Boolean,
      default: false,
    },
    aItemsBenefitType: {
      type: Array,
      default: [],
    },
    aItemsBenefitStatus: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      iItemsPerPage: 30,
      bSortName: null,
      bSortPosition: null,
    };
  },
  emits: [
    "setItemsPerPage",
    "setPage",
    "setSearch",
    "setDetailItem",
    "setAccessItem",
    "setDeleteItem",
  ],
  methods: {
    setAccessItem(oItem) {
      this.$emit("setAccessItem", oItem);
    },
    setDetailItem(oItem) {
      this.$emit("setDetailItem", oItem);
    },
    setDeleteItem(oItem) {
      this.$emit("setDeleteItem", oItem);
    },
    setItemsPerPage(iItemsPerPage) {
      this.iItemsPerPage = iItemsPerPage;
      this.$emit("setItemsPerPage", iItemsPerPage);
    },
    setPage(iPage) {
      this.$emit("setPage", iPage);
    },
    setSearch(sSearch) {
      this.$emit("setSearch", sSearch);
    },
    setChangeSortName() {
      if (this.bSortName === null) {
        this.bSortName = true;
      } else if (this.bSortName === true) {
        this.bSortName = false;
      } else {
        this.bSortName = null;
      }
      this.$emit("setSortName", this.bSortName);
    },
    setChangeSortPosition() {
      if (this.bSortPosition === null) {
        this.bSortPosition = true;
      } else if (this.bSortPosition === true) {
        this.bSortPosition = false;
      } else {
        this.bSortPosition = null;
      }
      this.$emit("setSortPosition", this.bSortPosition);
    },
    customSort(items, column, isDesc) {
      this.$emit("setSort", column, isDesc);
      return this.aItems;
    },
  },
};
</script>
<style scoped>
.txt-message {
  color: #575757;
  font-size: 0.9rem;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 20px;
}
</style>
