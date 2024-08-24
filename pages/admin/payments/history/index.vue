<template>
  <div class="content-page-all-global">
    <NuxtLayout name="card-registration">
      <div class="content-payments-history-all">
        <div class="content-payments-history">
          <p @click="setBack" class="txt-back-to">
            <Icon icon="ri:arrow-left-line" /> Suscripción
          </p>
          <admin-payments-history-general-cards
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
          >
          </admin-payments-history-general-cards>

          <admin-payments-history-general-table
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
          >
          </admin-payments-history-general-table>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data: () => ({
    aHeader: [
      {
        sText: "ID de transferencia",
        title: "ID de transferencia",
        sValue: "sId",
        key: "sId",
        sortable: false,
        align: "start",
        sClass: "global-header-table min-w-150px text-start",
        sCellClass: "global-body-table text-start",
      },
      {
        title: "Fecha y hora",
        key: "sDateTime",
        sortable: true,
        sClass: "global-header-table ",
        sCellClass: "global-body-table w-s-nowrap",
      },
      {
        title: "Concepto",
        key: "sConcept",
        sortable: false,
        align: "center",
        sClass: "global-header-table min-w-150px text-center",
        sCellClass: "global-body-table text-center",
      },
      // {
      //   title: "Período",
      //   key: "sPeriod",
      //   sortable: true,
      //   align: "center",
      //   sClass: "global-header-table text-center",
      //   sCellClass: "global-body-table w-s-nowrap text-center",
      // },
      {
        title: "Método de pago",
        key: "sPaymentMethod",
        sortable: true,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        title: "Total",
        key: "sTotal",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      // {
      //   title: "Acciones",
      //   key: "sActions",
      //   align: "center",
      //   sortable: false,
      //   sClass:
      //     "global-header-table global-header-accions global-col-header-accion",
      //   sCellClass:
      //     "global-body-table global-body-accions global-col-body-accion",
      // },
    ],
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
    sSearch: "",
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
    setBack() {
      this.$router.go(-1);
    },
    async getItems() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };

        const oResult = await this.$api.get(`payments`, payload);

        this.aItems = oResult.data.payments.map((e, i) => {
          return {
            idx: i,
            ...e,
            sId: e.sStripePaymentId,
            sDateTime: this.getFormatDDMMYYYY(new Date(e.tCreatedAt), true),
            sEstablishmentName: e.sName,
            sConcept: "Suscripción regular",
            sPeriod: "12/06/24 - 12/06/24",
            sPaymentMethod: e.sStripePaymentMethodId
              ? `${this.getTitleCaseGlobal(e.PaymentMethod.oCard.sBrand)} *${
                  e.PaymentMethod.oCard.sLast4
                }`
              : null,
            eStatus: this.getPaymentStatusName(e.eStatus),
            sColorStatus: this.getStatusColorPayment(e.eStatus),
            sTotal: `$ ${this.getFormatMoneyGlobal(e.dAmount)} MXN`,
            bDownloadPDF: e.sStripePaymentMethodId ? true : false,
          };
        });

        this.bLoadingItems = false;
        this.$store.table.setRefresh(false);
      } catch (error) {
        this.$swal.fire({
          title: "Error!",
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
      await this.getItemsCurrent();
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
<style scoped>
.content-payments-history-all {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
}
.content-payments-history {
  max-width: 1300px;
  width: 100%;
}

.txt-back-to {
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  letter-spacing: normal;
  line-height: normal;
  gap: 5px;
  align-items: center;
  margin-bottom: 20px;
}
.txt-back-to:hover {
  text-decoration: underline;
}
</style>
