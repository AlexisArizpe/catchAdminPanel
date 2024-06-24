<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <!-- <google-map @location-changed="updateLocation" /> -->
      <headers-header sNameHeader="Solicitudes de admisión" />

      <div class="content-general-global pt-5">
        <admin-admissions-general-cards
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

        <admin-admissions-general-table
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

      <v-dialog v-model="bDialog" width="auto" persistent>
        <component
          :is="markRaw(sComponent)"
          :sAdmissionId="sAdmissionId"
          @setCloseDialog="setDetailItem"
        />
        <!-- <admin-admissions-detail-content
          :sAdmissionId="sAdmissionId"
          @setCloseDialog="setDetailItem"
        /> -->
      </v-dialog>
    </NuxtLayout>
  </div>
</template>
<script>
import { markRaw } from "vue"; // Importa markRaw
export default {
  data: () => ({
    aHeader: [
      {
        sText: "Nº Trámite",
        title: "Nº Trámite",
        sValue: "iNum",
        key: "iNum",
        sortable: true,
        sClass: "global-header-table ",
        sCellClass: "global-body-table w-s-nowrap",
      },
      {
        sText: "Fecha y hora",
        title: "Fecha y hora",
        sValue: "sDateTime",
        key: "sDateTime",
        sortable: false,
        align: "center",
        sClass: "global-header-table min-w-150px text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        title: "Nombre del restaurante",
        sText: "Nombre del restaurante",
        sValue: "sRestaurantName",
        key: "sRestaurantName",
        sortable: true,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table w-s-nowrap text-center",
      },
      {
        sText: "Estado",
        title: "Estado",
        sValue: "sStatus",
        key: "sStatus",
        sortable: true,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Responsable",
        title: "Responsable",
        sValue: "sManager",
        key: "sManager",
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
    sAdmissionId: null,
    sComponent: null,
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
            eStatus:['accepted','processing','rejected','accepted']
          },
        };

        const oResult = await this.$api.get(`admissions`, payload);
        this.aItems = oResult.data.admissionRequests.map((e, i) => {
          return {
            idx: i,
            sId: e.sAdmissionRequestId,
            sFolio: e.iFolio,
            iNum: e.iFolio,
            sDateTime: this.getFormatDDMMYYYY(new Date(e.tCreatedAt), true),
            sRestaurantName: e.Establishment.sName,
            eStatus: e.eStatus,
            // sStatus: this.getAdmissionStatusName(e.eStatus),
            sNameStatus: this.getAdmissionStatusName(e.eStatus),
            sColorStatus: this.getAdmissionStatusColors(e.eStatus),
            sManager: e?.ManagedBy?.sName
              ? `${e?.ManagedBy?.sName} ${e?.ManagedBy?.sLastName}`
              : null,
            oStyleAction: this.getStyleAction(e.eStatus),
          };
        });
        this.iNumPage =
          oResult.data.iNumPages === 0 ? 1 : oResult.data.iNumPages;
        this.iTotal = oResult.data.iTotal;
        this.bLoadingItems = false;
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error);
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
      if (oItem) {
        console.log(oItem, "oItem");
        this.sTypeDialog = "edit";
        this.sAdmissionId = oItem.sId;
        this.sComponent = this.getComponent(oItem.eStatus);
      }
      this.bDialog = !this.bDialog;
    },
    getComponent(sStatus) {
      switch (sStatus) {
        case "pending":
          return markRaw(
            resolveComponent("AdminAdmissionsDetailStatusPending")
          );
        case "processing":
          return markRaw(
            resolveComponent("AdminAdmissionsDetailStatusProcessing")
          );
        case "accepted":
          return markRaw(
            resolveComponent("AdminAdmissionsDetailStatusAccepted")
          );
        case "rejected":
          return markRaw(
            resolveComponent("AdminAdmissionsDetailStatusRejected")
          );

        default:
          return "";
      }
    },
    setItemsPerPage(iItemsPerPage) {
      this.iItemsPerPage = iItemsPerPage;
      this.iPage = 1;
    },
    setPage(iPage) {
      this.iPage = iPage;
    },
    getStyleAction(sStatus) {
      switch (sStatus) {
        case "pending":
          return {
            sIcon: "mdi mdi-plus",
            sClass: "btn-action-table-black-global",
          };
        case "processing":
          return {
            sIcon: "mdi mdi-plus",
            sClass: "btn-action-table-black-global",
          };
        case "accepted":
          return {
            sIcon: "mdi mdi-open-in-new",
            sClass: "btn-action-table-grey-global",
          };
        case "rejected":
          return {
            sIcon: "mdi mdi-open-in-new",
            sClass: "btn-action-table-grey-global",
          };

        default:
          return "";
      }
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
