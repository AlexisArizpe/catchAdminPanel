<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <!-- <google-map @location-changed="updateLocation" /> -->
      <headers-header sNameHeader="Restaurantes" />

      <!-- v-if="$store.user.bSuperAdmin" -->
      <!-- :bBtnAdd="bWrite || bManage" -->
      <admin-customers-general-search-content
        v-if="false"
        @setSearch="setSearch"
        @serAddItem="serAddItem"
        sNameBtnAdd="Añadir consumidor"
        toAdd=""
        sTypeToAdd="dialog"
        :bBtnAdd="false" 
        sIconBtnAdd="mdi mdi-plus"
      />

      <div class="content-general-global pt-5">
        <admin-establishments-general-cards
          v-if="bMobile"
          :aHeader="aHeader"
          :bLoadingItems="bLoadingItems"
          :aItems="aItems"
          :iNumPage="iNumPage"
          :iTotal="iTotal"
          :aActionsTableCard="aActionsTableCard"
          @setItemsPerPage="setItemsPerPage"
          @setPage="setPage"
          @setSearch="setSearch"
          @setDeleteItem="setDeleteItem"
          @setDetailItem="setDetailItem"
        />

        <admin-establishments-general-table
          v-else
          :aHeader="aHeader"
          :bLoadingItems="bLoadingItems"
          :aItems="aItems"
          :iNumPage="iNumPage"
          :iTotal="iTotal"
          :aActionsTableCard="aActionsTableCard"
          @setItemsPerPage="setItemsPerPage"
          @setPage="setPage"
          @setSearch="setSearch"
          @setDeleteItem="setDeleteItem"
          @setDetailItem="setDetailItem"
        />
      </div>


    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data: () => ({
    aHeader: [
      {
        sText: "Nombre",
        title: "Nombre",
        sValue: "sName",
        key: "sName",
        sortable: false,
        align: "start",
        sClass: "global-header-table min-w-150px text-start",
        sCellClass: "global-body-table text-start",
      },
      {
        sText: "Completos",
        title: "Completos",
        sValue: "iCompleted",
        key: "iCompleted",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table w-s-nowrap text-center",
      },
      {
        title: "Activados",
        sText: "Activados",
        sValue: "iActive",
        key: "iActive",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table w-s-nowrap text-center",
      },
      {
        sText: "Canjeados",
        title: "Canjeados",
        sValue: "iRedeemed",
        key: "iRedeemed",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Estado",
        title: "Estado",
        sValue: "sVerified",
        key: "sVerified",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Acciones",
        title: "Acciones",
        sValue: "sActions",
        key: "sActions",
        align: "center",
        sortable: false,
        sClass:
          "global-header-table global-header-accions global-col-header-accion",
        sCellClass:
          "global-body-table global-body-accions global-col-body-accion",
      },
    ],
    aItemsCurrent: [],
    aItems: [],
    sUserId: null,
    aActionsTableCard: [
      {
        sIcon: `<i class="mdi mdi-open-in-new"></i>`,
        sName: "Detalle",
        sNameTooltip: "Ver detalle",
        iAction: 1,
        sClassBtn: "btn-action-global",
        sClassTxt: "color-primary-global",
      },
    ],
    iPage: 1,
    iNumPage: 0,
    iTotal: 0,
    iItemsPerPage: 30,
    bLoadingItems: true,
    oSearch: {
      sLabel: "Búsqueda",
      sPlaceholder: "Folio, nombre ó correo electrónico",
    },
    sSearch: "",
    bDialogConfirmOrigin: false,
    oItemConfirmOrigin: {},
    bDialog: false,
    sTypeDialog: "add",
  }),
  computed: {
    // #region Variables de permisos
    sActionPermission() {
      return this.$store.permissions.sActionPermission;
    },
    bRead() {
      return this.sActionPermission === "READ";
    },
    bWrite() {
      return this.sActionPermission === "WRITE";
    },
    bManage() {
      return this.$store.permissions.sActionPermission
        ? this.sActionPermission === "MANAGE"
        : true;
    },
    // #endregion Variables de permisos

    aActionsTableCard() {
      if (this.bRead) {
        return [
          {
            sIcon: `<i class="mdi mdi-open-in-new"></i>`,
            sName: "Detalle",
            sNameTooltip: "Ver detalle",
            iAction: 1,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-primary-global",
          },
        ];
      } else if (this.bWrite) {
        return [
          {
            sIcon: `<i class="mdi mdi-open-in-new"></i>`,
            sName: "Detalle",
            sNameTooltip: "Ver detalle",
            iAction: 1,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-primary-global",
          },
        ];
      } else if (this.bManage) {
        return [
          {
            sIcon: `<i class="mdi mdi-open-in-new"></i>`,
            sName: "Detalle",
            sNameTooltip: "Ver detalle",
            iAction: 1,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-primary-global",
          },
        ];
      }
    },
    bRefresh() {
      return this.$store.table.bRefresh;
    },
    bMobile() {
      return this.$vuetify.display.xs;
    },
    bTablet() {
      return this.$vuetify.display.sm;
    },
  },
  async beforeMount() {
    await this.getItems();
  },
  methods: {
    async getItems() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {
            sSearch: this.sSearch ? this.sSearch : "",
            iPageNumber: this.iPage,
            iItemsPerPage: this.iItemsPerPage,
          },
        };

        const oResult = await this.$api.get(`establishments`, payload);
        this.aItems = oResult.data.establishments.map((e, i) => {
          return {
            idx: i,
            sId: e.sEstablishmentId,
            sLastActivity: "Falta de bk",
            sName: e.sName,
            iCompleted: e.iCompletedInteractions,
            iActive: e.iActiveInteractions,
            iRedeemed: e.iRedeemedInteractions,
            bVerified: e.bVerified,
            sVerified: e.bVerified ? "Activo" : "Bloqueado",
          };
        });
        this.iNumPage =
          oResult.data.iNumPages === 0 ? 1 : oResult.data.iNumPages;
        this.iTotal = oResult.data.iTotal;
        this.bLoadingItems = false;
        this.$store.table.setRefresh(false);
      } catch (error) {
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
    setSearch(sSearch) {
      this.sSearch = sSearch;
      this.getItems();
    },
    setDeleteItem(oItem) {
      this.bDialogConfirmOrigin = !this.bDialogConfirmOrigin;
      if (this.bDialogConfirmOrigin) {
        this.oItemConfirmOrigin = {
          sNameHeader: "Eliminar administrador",
          sQuestion: `<span>La eliminación de un registro de un administrador es una acción irreversíble.</span> </br>
             <span> ¿Desea eliminar el registro <span class="font-weight-bold"> ${oItem.sFolio} </span> del administrador <span class="font-weight-bold"> ${oItem.sName} </span> de forma permanente? </span>`,
          bDoubleConfirm: false,
          sDoubleConfirm: `<span>Acepto la responsabilidad y deseo proseguir con la eliminación de: </span> </br> <span class="font-weight-bold"> ${oItem.sName} </span>`,
          sNameActionBtn: "Eliminar",
          sApi: `enterprises/clients/${oItem.sId}`,
          iOptionApi: 0, // 0 --> Delete , 1 -> Post , 2 -> Patch Access
          oPayload: {},
          bReturn: false,
          toReturn: this.sToReturn,
          bDialogType: 0, // 0 -> Mod Double Confirm , 1 -> Mod Access Confrim
        };
      }
    },
    serAddItem() {
      this.sTypeDialog = "add";
      this.bDialog = !this.bDialog;
    },
    setDetailItem(oItem) {
      this.$router.push({
        name: "admin-establishments-id",
        params: { id: oItem.sId },
      });
    },
    setItemsPerPage(iItemsPerPage) {
      this.iItemsPerPage = iItemsPerPage;
      this.iPage = 1;
    },
    setPage(iPage) {
      this.iPage = iPage;
    },
  },
  watch: {
    async bRefresh() {
      await this.getItems();
    },
    iItemsPerPage() {
      this.getItems();
    },
    iPage() {
      this.getItems();
    },
  },
};
</script>
