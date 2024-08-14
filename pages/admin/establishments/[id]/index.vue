<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <headers-header :sNameHeader="sNameHeader" sTopText="Restaurantes" />
      <admin-establishments-detail-general-search-content
        @setDetailItem="setDetailItemCustomer"
        sTypeToAdd="dialog"
        sIconBtnAdd="mdi mdi-plus"
      />
      <admin-establishments-detail-general-dashboard-content
        :aItems="aItemDashboard"
      />

      <div class="content-general-global pt-5">
        <admin-establishments-detail-general-cards
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

        <admin-establishments-detail-general-table
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

      <!-- #region dialog customer -->
      <v-dialog v-model="bDialog" width="630px" height="900px" persistent>
        <admin-establishments-detail-content-dialog
          :sEstablishmentId="sEstablishmentId"
          @setCloseDialog="setDetailItemCustomer"
        />
      </v-dialog>
      <!-- #endregion dialog customer -->

      <!-- #region dialog benefit -->
      <v-dialog v-model="bDialogBenefitDetail" width="1150px" persistent>
        <admin-establishments-detail-benefit-detail-content
          :sTypeBenefit="sTypeBenefit"
          :oItem="oItemDetail"
          @setCloseDialog="setDetailItem"
        />
      </v-dialog>
      <!-- #endregion dialog benefit -->
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data: () => ({
    sNameHeader: "Nombre del consumidor",
    aHeader: [
      {
        sText: "Folio",
        title: "Folio",
        sValue: "sFolio",
        key: "sFolio",
        sortable: false,
        align: "start",
        sClass: "global-header-table w-100px",
        sCellClass: "global-body-table w-100px",
      },
      {
        title: "Fecha",
        sText: "Fecha",
        sValue: "sDate",
        key: "sDate",
        sortable: false,
        align: "start",
        sClass: "global-header-table text-start",
        sCellClass: "global-body-table w-s-nowrap text-start",
      },
      {
        sText: "Tipo de beneficio",
        title: "Tipo de beneficio",
        sValue: "sBenefitsType",
        key: "sBenefitsType",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Nombre",
        title: "Nombre",
        sValue: "sName",
        key: "sName",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Estado",
        title: "Estado",
        sValue: "sStatus",
        key: "sStatus",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Stock",
        title: "Stock",
        sValue: "iStock",
        key: "iStock",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Activdados",
        title: "Activdados",
        sValue: "sActive",
        key: "sActive",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Canjeados",
        title: "Canjeados",
        sValue: "sRedeemed",
        key: "sRedeemed",
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
    aItemDashboard: [],
    oItemEstablishment: {},

    bDialogBenefitDetail: false,
    sTypeBenefit: "regular",
    bCompleted: false,
    eStatus: null,
    oItemDetail: {},
    sIdBenefit: null,
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

    sEstablishmentId() {
      return this.$route.params.id;
    },
  },
  async beforeMount() {
    await this.getItem();
    await this.getItems();
  },
  methods: {
    async getItem() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        let oResult = await this.$api.get(
          `establishments/${this.$route.params.id}`,
          payload
        );
        this.oItemEstablishment = oResult.data.establishment;
        this.aItemDashboard = [
          {
            eStatus: null,
            sName: "Beneficios completos",
            sPorcent: this.oItemEstablishment.iCompletedInteractions ?? 0,
            sTotal: "",
          },
          {
            eStatus: null,
            sName: "Beneficios canjeados",
            sPorcent: this.oItemEstablishment.iRedeemedInteractions ?? 0,
            sTotal: "",
          },
          {
            eStatus: null,
            sName: "Beneficios activados",
            sPorcent: this.oItemEstablishment.iActiveInteractions,
            sTotal: "",
          },
          {
            eStatus: null,
            sName: "Consumidores",
            sPorcent: this.oItemEstablishment.iCustomers,
            sTotal: "",
          },
          {
            eStatus: null,
            sName: "Ticket promedio",
            sPorcent: `$ ${this.getFormatMoneyGlobal(
              this.oItemEstablishment.dAverageTicket ?? 0
            )}`,
            sTotal: "",
          },
        ];
        this.sNameHeader = oResult.data.establishment.sName;
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error);
      }
    },
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
            sEstablishmentId: this.sEstablishmentId,
            bLightning: false,
          },
        };
        const oResult = await this.$api.get(`benefits`, payload);
        this.aItems = oResult.data.benefits.map((e, i) => {
          return {
            idx: i,
            ...e,
            sId: e.sBenefitId,
            sFolio: e.sFolio,
            sDate: this.getFormatDDMMYYYY(new Date(e.tCreatedAt)),
            sBenefitsType: this.getBenefitTypeName(e.eBenefitType),
            sName: e.sName,
            sDescription: e.sDescription,
            sStatus: e.eStatus,
            sNameStatus: this.getStatusNameBenefits(e.eStatus),
            sColorStatus: this.getStatusColorBenefits(e.eStatus),
            iStatus: this.getStatusBenefits(e.eStatus),
            eBenefitType: e.eBenefitType,
            iStock: `${e.iStock}`,
            sActive: `${e.iTotalActivations}%`,
            sRedeemed: `${e.iTotalRedemptions}%`,
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
    getDateStatus(oItem) {
      if (oItem.StatusRecords !== undefined) {
        let tDate = oItem.StatusRecords.find(
          (e) => (e.eStatus = oItem.eStatus)
        )?.tCreatedAt;
        return this.getFormatDDMMYYYY(new Date(tDate), true);
      } else {
        return "";
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
    // Detalle de beneficio
    setDetailItem(oItem) {
      if (oItem) {
        this.oItemDetail = oItem;
      }
      this.bDialogBenefitDetail = !this.bDialogBenefitDetail;
    },
    setDetailItemCustomer() {
      this.bDialog = !this.bDialog;
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
