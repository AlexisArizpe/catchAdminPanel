<template>
  <div class="content-global-table">
    <p class="txt-title-table-global">
      <span class="font-weight-bold">Historial</span> de beneficios regulares
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
      <!-- <template v-slot:aHeader.idx="{ column }">
        {{ column.title.toUpperCase() }} aqui
      </template> -->
      <template v-slot:item.sName="{ item }">
        <p class="txt-one-line-global">{{ item.sName }}</p>
      </template>
      <template v-slot:item.sStatus="{ item }">
        <div
          :style="item.sColorStatus"
          class="status-info-general content-status-all text-uppercase font-weight-bold"
        >
          {{ item.sNameStatus }}
        </div>
      </template>
      <template v-slot:item.sActions="{ item }">
        <table-card-column-actions-content
          :aActionsTableCard="aActionsTableCard"
          :oItem="item"
          @setAccessItem="setAccessItem"
          @setDetailItem="setDetailItem"
          @setDeleteItem="setDeleteItem"
        />
      </template>
    </v-data-table-virtual>
    <!-- <v-table class="global-table" density="comfortable">
      <thead>
        <tr>
          <th
            :class="'text-' + oItem.align + ' ' + oItem.sClass"
            v-for="(oItem, i) in aHeader"
            :key="oItem.sText"
          >
            {{ oItem.sText }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="bLoadingItems">
          <td :colspan="aHeader.length">
            <table-card-loading-items />
          </td>
        </tr>
        <tr v-else-if="aItems.length === 0">
          <td :colspan="aHeader.length">
            <table-card-empty-items />
          </td>
        </tr>

        <tr v-for="(oItem, i) in aItems" :key="oItem.sFolio">
          <td
            v-for="(oItemHeader, ii) in aHeader"
            :key="oItemHeader.sValue"
            :class="oItemHeader.sCellClass"
          >
            <span
              v-if="
                oItemHeader.sValue !== 'sActions' &&
                oItemHeader.sValue !== 'bPlatformAccess'
              "
            >
              {{ oItem[oItemHeader.sValue] }}
            </span>
            <div v-else-if="oItemHeader.sValue === 'bPlatformAccess'">
              <div
                :class="
                  oItem[oItemHeader.sValue]
                    ? 'content-visibility-true'
                    : 'content-visibility-false'
                "
              >
                {{ oItem[oItemHeader.sValue] ? "Permitido" : "Restringido" }}
              </div>
            </div>
            <div v-else-if="oItemHeader.sValue === 'sActions'">
              <table-card-column-actions-content
                :aActionsTableCard="aActionsTableCard"
                :oItem="oItem"
                @setAccessItem="setAccessItem"
                @setDetailItem="setDetailItem"
                @setDeleteItem="setDeleteItem"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </v-table> -->
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
