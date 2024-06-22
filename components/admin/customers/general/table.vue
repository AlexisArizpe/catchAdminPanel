<template>
  <div class="content-global-table">
    <p class="txt-title-table-global">
      <span class="font-weight-bold">Historial</span> de Consumidores
    </p>
    <table-card-search-top
      :iTotal="iTotal"
      :iNumPage="iNumPage"
      :aItemsBenefitType="aItemsBenefitType"
      :aItemsBenefitStatus="aItemsBenefitStatus"
      @setItemsPerPage="setItemsPerPage"
      @setPage="setPage"
      @setSearch="setSearch"
    />
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
      <template v-slot:item.sPlatformAccess="{ item }">
        <span :class="!item.bPlatformAccess ? 'color-red-global' : ''">{{
          item.sPlatformAccess
        }}</span>
      </template>
      <template v-slot:item.sActions="{ item }">
        <v-btn
          @click="setDetailItem(item)"
          icon
          class="btn-action-table-black-global"
        >
          <span class="mdi mdi-chevron-right"></span>
        </v-btn>
        <!-- <table-card-column-actions-content
          :aActionsTableCard="aActionsTableCard"
          :oItem="item"
          @setAccessItem="setAccessItem"
          @setDetailItem="setDetailItem"
          @setDeleteItem="setDeleteItem"
        /> -->
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
