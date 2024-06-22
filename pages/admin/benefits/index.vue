<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <headers-header sNameHeader="Beneficios" />

      <admin-benefits-general-search-content
        @setSearch="setSearch"
        @setTypeBenefit="setTypeBenefit"
        :sNameBtnAdd="sNameAdd"
        toAdd="admin-benefits-add-type"
        :bBtnAdd="bWrite || bManage"
        sIconBtnAdd="mdi mdi-plus"
      />
      <admin-benefits-cards-content
        :aItems="aItemsCurrent"
        @setDetailItem="setDetailItem"
        :bLoadingItems="bLoadingItems"
      />

      <div class="content-general-global">
        <admin-benefits-general-cards
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
          @setAccessItem="setAccessItem"
        >
        </admin-benefits-general-cards>

        <admin-benefits-general-table
          v-else
          :aHeader="aHeader"
          :bLoadingItems="bLoadingItems"
          :aItems="aItems"
          :iNumPage="iNumPage"
          :iTotal="iTotal"
          :aActionsTableCard="aActionsTableCard"
          :aItemsBenefitType="aItemsBenefitType"
          :aItemsBenefitStatus="aItemsBenefitStatus"
          @setItemsPerPage="setItemsPerPage"
          @setPage="setPage"
          @setSearch="setSearch"
          @setDeleteItem="setDeleteItem"
          @setDetailItem="setDetailItem"
          @setAccessItem="setAccessItem"
        >
        </admin-benefits-general-table>
      </div>

      <v-dialog v-model="bDialogDetail" width="1150px" persistent>
        <admin-benefits-detail-content
          :sTypeBenefit="sTypeBenefit"
          :sIdBenefit="sIdBenefit"
          @setCloseDialog="setDetailItem"
        />
      </v-dialog>
      <!-- admin-benefits-detail-content -->
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data: () => ({
    aHeader: [
      {
        sText: "Folio",
        title: "Folio",
        sValue: "sFolio",
        key: "sFolio",
        sortable: true,
        sClass: "global-header-table ",
        sCellClass: "global-body-table w-s-nowrap",
      },
      {
        sText: "Tipo de beneficio",
        title: "Tipo de beneficio",
        sValue: "sBenefitsType",
        key: "sBenefitsType",
        sortable: false,
        align: "center",
        sClass: "global-header-table min-w-150px text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        title: "Nombre",
        sText: "Nombre",
        sValue: "sName",
        key: "sName",
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
        sText: "Activados",
        title: "Activados",
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
    sIdBenefit: null,
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
    aItemsFiltered: [],
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
    bDialogDetail: false,
    sTypeBenefit: "regular",
    sNameAdd: "Crear beneficio regular",
    aItemsBenefitType: [
      // { type: "subheader", title: "Tipo de beneficio" },
      {
        title: "Regalo",
        icon: "mdi mdi-gift-outline",
        value: "gift",
        selected: false,
      },
      {
        title: "Descuento",
        icon: "mdi mdi-percent-outline",
        value: "discount",
        selected: false,
      },
      {
        title: "Promoción",
        icon: "mdi mdi-tag-multiple-outline",
        value: "promotion",
        selected: false,
      },
      // { type: "divider" },
    ],
    aItemsBenefitStatus: [
      // { type: "subheader", title: "Estado del beneficio" },
      {
        title: "Finalizado",
        value: "finished",
        selected: false,
      },
      {
        title: "Cancelado",
        value: "canceled",
        selected: false,
      },
    ],
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
    await this.getItemsCurrent();
    await this.getItems();
  },
  methods: {
    async getItemsCurrent() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {
            sEstablishmentId: this.$store.user.sEstablishmentId,
            iPageNumber: 1,
            iItemsPerPage: 999999,
            "aStatus[0]": "programmed",
            "aStatus[1]": "active",
            "aStatus[2]": "out of stock",
            bLightning: this.sTypeBenefit === "relampago" ? true : false,
          },
        };
        const oResult = await this.$api.get(`benefits`, payload);
        this.aItemsCurrent = oResult.data.benefits.map((e) => {
          return {
            sId: e.sBenefitId,
            sImg: e.sImageKey !== null ? e.oImages.xlg : null,
            sIcon: this.getIconStatusBenefits(e.eBenefitType),
            sFolio: e.sFolio,
            sBenefitsType: e.eBenefitType,
            sName: e.sName,
            sDescription: e.sDescription,
            sStatus: e.sStatus,
            sNameStatus: this.getStatusNameBenefits(e.sStatus),
            sColorStatus: this.getStatusColorBenefits(e.sStatus),
            iStatus: this.getStatusBenefits(e.sStatus),
            eBenefitType: e.eBenefitType,
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
    async getItems() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {
            sEstablishmentId: this.$store.user.sEstablishmentId,
            sSearch: this.sSearch ? this.sSearch : "",
            iPageNumber: this.iPage,
            iItemsPerPage: this.iItemsPerPage,
            bLightning: this.sTypeBenefit === "relampago" ? true : false,
          },
        };

        this.setStatusPayload(payload);
        this.setTypePayload(payload);
        const oResult = await this.$api.get(`benefits`, payload);

        this.aItems = oResult.data.benefits.map((e, i) => {
          return {
            idx: i,
            sId: e.sBenefitId,
            sFolio: e.sFolio,
            sBenefitsType: this.getBenefitTypeName(e.eBenefitType),
            sName: e.sName,
            sDescription: e.sDescription,
            sStatus: e.sStatus,
            sNameStatus: this.getStatusNameBenefits(e.sStatus),
            sColorStatus: this.getStatusColorBenefits(e.sStatus),
            iStatus: this.getStatusBenefits(e.sStatus),
            eBenefitType: e.eBenefitType,
            iStock: `${e.iStock}`,
            sActive: `${e.iTotalActivations}%`,
            sRedeemed: `${e.iTotalRedemptions}%`,
          };
        });
        this.iNumPage = oResult.data.iNumPages === 0 ? 1 : oResult.data.iNumPages;
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
    setDetailItem(oItem) {
      if (oItem) {
        this.sIdBenefit = oItem.sId;
      }
      this.bDialogDetail = !this.bDialogDetail;
    },
    setItemsPerPage(iItemsPerPage) {
      this.iItemsPerPage = iItemsPerPage;
      this.iPage = 1;
    },
    setPage(iPage) {
      this.iPage = iPage;
    },
    async setTypeBenefit(sTypeBenefit) {
      this.sTypeBenefit = sTypeBenefit;
      if (this.sTypeBenefit === "regular") {
        this.sNameAdd = "Crear beneficio regular";
      } else {
        this.sNameAdd = "Crear beneficio relámpago";
      }
      this.bLoadingItems = true;
      this.aItemsCurrent = [];
      this.aItems = [];
      await this.getItemsCurrent();
      await this.getItems();
    },
    setStatusPayload(payload) {
      if (
        this.aItemsBenefitStatus.filter((e) => e.selected === true).length > 0
      ) {
        for (let i = 0; i < this.aItemsBenefitStatus.length; i++) {
          const element = this.aItemsBenefitStatus[i];
          if (element.selected) {
            payload.params[`aStatus[${i}]`] = element.value;
          }
        }
      } else {
        payload.params["aStatus[0]"] = "canceled";
        payload.params["aStatus[1]"] = "finished";
      }
    },
    setTypePayload(payload) {
      if (
        this.aItemsBenefitType.filter((e) => e.selected === true).length > 0
      ) {
        for (let i = 0; i < this.aItemsBenefitType.length; i++) {
          const element = this.aItemsBenefitType[i];
          if (element.selected) {
            payload.params[`aBenefitTypes[${i}]`] = element.value;
          }
        }
      } else {
        payload.params["aBenefitTypes[0]"] = "gift";
        payload.params["aBenefitTypes[1]"] = "discount";
        payload.params["aBenefitTypes[2]"] = "promotion";
      }
    },
  },
  watch: {
    async bRefresh() {
      await this.getItemsCurrent();
      await this.getItems();
    },
    iItemsPerPage() {
      this.getItems();
    },
    iPage() {
      this.getItems();
    },
    aItemsBenefitType: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        this.getItems();
      },
    },
    aItemsBenefitStatus: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        this.getItems();
      },
    },
  },
};
</script>
