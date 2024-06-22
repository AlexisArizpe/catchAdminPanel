<template>
  <div>
    <table-card-loading-items v-if="bLoadingItems" />
    <table-card-empty-items v-else-if="aItems.length === 0" />
    <div
      class="content-card-mobile-global"
      v-for="(oItemCard, iCard) in aItems"
      :key="oItemCard.sName"
    >
      <!-- #region Encabezado de la carta -->
      <div class="content-header-card-mobile-global-all">
        <!-- #region Contenido principal el encabezado -->
        <div class="content-header-card-mobile-global">
          <div class="content-txt-header-card-mobile-global">
            <p class="txt-title-header-card-mobile-global">
              {{ oItemCard.sName }}
            </p>
            <p class="txt-grey-header-card-mobile-global">
              {{ oItemCard.sFolio }}
            </p>
          </div>

          <v-spacer></v-spacer>

          <span>
            <core-table-card-column-actions-menu
              :aActionsTableCard="aActionsTableCard"
              :oItem="oItemCard"
              @setAccessItem="setAccessItem"
              @setDetailItem="setDetailItem"
              @setDeleteItem="setDeleteItem"
            ></core-table-card-column-actions-menu>
          </span>
        </div>
        <!-- #endregion Contenido principal el encabezado -->
      </div>
      <!-- #endregion Encabezado de la carta -->

      <!-- #region Cuerpo de la carta -->
      <div
        class="content-body-card-mobile-global-all"
        v-for="(oItem, iItem) in aHeader.filter(
          (e) =>
            e.sValue !== 'sName' &&
            e.sValue !== 'sFolio' &&
            e.sValue !== 'sActions'
        )"
        :key="iItem"
      >
        <!-- #region Contenido derecho de la carta -->
        <div class="content-body-card-right-global">
          <span class="txt-content-body-card-right-global">
            <span
              v-if="oItem.sValue === 'sStatus'"
              class="d-flex justify-start"
            >
              <div
                :style="oItemCard.sColorStatus"
                class="status-info-general content-status-all text-uppercase font-weight-bold"
              >
                {{ oItemCard[oItem.sValue] }}
              </div>
            </span>
            <!-- #region valor por default -->
            <span v-else>
              {{ oItemCard[oItem.sValue] }}
            </span>
            <!-- #endregion valor por default -->
          </span>
        </div>
        <!-- #endregion Contenido derecho de la carta -->
      </div>
      <!-- #endregion Cuerpo de la carta -->
    </div>
    <core-table-card-footer
      v-if="aItems.length > 0"
      :iTotal="iTotal"
      :iNumPage="iNumPage"
      @setItemsPerPage="setItemsPerPage"
      @setPage="setPage"
    ></core-table-card-footer>
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
  },
  data() {
    return {
      iItemsPerPage: 0,
    };
  },
  emits: [
    "setItemsPerPage",
    "setPage",
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
  },
  watch: {
    bLoadingItems() {},
  },
};
</script>
