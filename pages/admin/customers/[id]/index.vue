<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <headers-header :sNameHeader="sNameHeader" sTopText="Consumidores" />
      <admin-customers-detail-general-search-content
        @setDetailItem="setDetailItemCustomer"
        sTypeToAdd="dialog"
        sIconBtnAdd="mdi mdi-plus"
      />
      <admin-customers-detail-general-dashboard-content
        :aItems="aItemDashboard"
      />

      <div class="content-general-global pt-5">
        <admin-customers-detail-general-cards
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

        <admin-customers-detail-general-table
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
      <v-dialog v-model="bDialog" width="500px" persistent>
        <admin-customers-detail-content-dialog
          :sCustomerId="sCustomerId"
          @setCloseDialog="setDetailItemCustomer"
        />
      </v-dialog>
      <!-- #endregion dialog customer -->

      <!-- #region dialog benefit -->
      <v-dialog
        v-model="bDialogBenefitDetail"
        :width="
          bCompleted ? (eStatus === 'completed' ? '900px' : '450px') : '450px'
        "
        persistent
      >
        <admin-customers-detail-benefit-detail-complete-content
          v-if="bCompleted"
          :sTypeBenefit="sTypeBenefit"
          :oItem="oItemDetail"
          @setCloseDialog="setDetailItem"
        />
        <admin-customers-detail-benefit-detail-content
          v-else
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
        sText: "Fecha y hora",
        title: "Fecha y hora",
        sValue: "sTimeDate",
        key: "sTimeDate",
        sortable: false,
        align: "start",
        sClass: "global-header-table w-100px",
        sCellClass: "global-body-table w-100px",
      },
      //   {
      //     sText: "Cliente",
      //     title: "Cliente",
      //     sValue: "sCustomerName",
      //     key: "sCustomerName",
      //     sortable: true,
      //     sClass: "global-header-table ",
      //     sCellClass: "global-body-table w-s-nowrap",
      //   },
      {
        title: "Folio",
        sText: "Folio",
        sValue: "sFolio",
        key: "sFolio",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table w-s-nowrap text-center",
      },
      {
        sText: "Restaurante",
        title: "Restaurante",
        sValue: "sRestaurantName",
        key: "sRestaurantName",
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
    oItemCustomer: {},

    bDialogBenefitDetail: false,
    sTypeBenefit: "regular",
    bCompleted: false,
    eStatus: null,
    oItemDetail: {},
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

    sCustomerId() {
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
          `customers/${this.$route.params.id}`,
          payload
        );
        this.oItemCustomer = oResult.data.customer;
        this.sNameHeader = `${oResult.data.customer.User.sName} ${oResult.data.customer.User.sLastName}`;

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
          },
        };

        const oResult = await this.$api.get(
          `customers/interactions/${this.$route.params.id}`,
          payload
        );
        this.aItems = oResult.data.interactions.map((e, i) => {
          return {
            ...e,
            idx: i,
            sId: e.sBenefitInteractionId,
            sTimeDate: this.getFormatDDMMYYYY(
              new Date(e.tLastStatusUpdate),
              true
            ),
            sFolio: e.sFolio,
            sRestaurantName: e.Benefit.Establishment.sName,
            sName: e.Benefit.sName,
            Customer: this.oItemCustomer.User,
            sStatus: this.getBenefitStatusName(e.eStatus),
            sColorStatus: this.getBenefitStatusColors(e.eStatus),

            tCreatedAt: this.getFormatDDMMYYYY(
              new Date(e.tUpdatedAt ?? e.tCreatedAt),
              true
            ),
            // aStatusRecords: [],
            aStatusRecords:
              e.StatusRecords.length > 0
                ? e.StatusRecords.map((eRecord) => {
                    return {
                      eStatus: eRecord.eStatus,
                      sStatus: this.getBenefitStatusName(eRecord.eStatus),
                      sColorStatus: this.getBenefitStatusColors(
                        eRecord.eStatus
                      ),
                      bPrice: eRecord.eStatus === "redeemed",
                      sPrice: e?.dTicketAmount ?? 0,
                      aLabelsInfo: this.getLabelInfo(e, eRecord),
                      sFullName: `${eRecord.CreatedBy?.sName ?? ""} ${
                        eRecord.CreatedBy?.sLastName ?? ""
                      }`,
                      sCreatedAtFormat: this.getFormatDDMMYYYY(
                        new Date(eRecord.tCreatedAt),
                        true
                      ),
                    };
                  }).sort((a, b) => {
                    const statusOrder = {
                      active: 1,
                      completed: 2,
                      redeemed: 3,
                    };
                    return statusOrder[a.eStatus] - statusOrder[b.eStatus];
                  })
                : [],
            aRatings: [
              {
                sLabel: "Producto",
                dRating: e.iProductRating,
              },
              {
                sLabel: "Atención",
                dRating: e.iServiceRating,
              },
              {
                sLabel: "Local",
                dRating: e.iFacilityRating,
              },
            ],
            tDateStatusActive: this.getDateStatus(e),
            tDateStatusRedeemed: this.getDateStatus(e),
            tDate: this.getFormatDDMMYYYY(new Date(e.tDate), true),
          };
        });

        this.aItemDashboard = [
          {
            eStatus: "completed",
            sName: "Completos",
            sPorcent: `${this.getPercentGlobal(
              this.oItemCustomer.iCompletedInteractions,
              oResult.data.iTotal
            )}%`,
            sTotal: this.oItemCustomer.iCompletedInteractions,
          },
          {
            eStatus: "redeemed",
            sName: "Canjeados",
            sPorcent: `${this.getPercentGlobal(
              this.oItemCustomer.iRedeemedInteractions,
              oResult.data.iTotal
            )}%`,
            sTotal: this.oItemCustomer.iRedeemedInteractions,
          },
          {
            eStatus: "active",
            sName: "Activados",
            sPorcent: `${this.getPercentGlobal(
              this.oItemCustomer.iActiveInteractions,
              oResult.data.iTotal
            )}%`,
            sTotal: this.oItemCustomer.iActiveInteractions,
          },
          {
            eStatus: "canceled",
            sName: "no utilizados",
            sPorcent: `${this.getPercentGlobal(
              Number(this.oItemCustomer.iCanceledInteractions) +
                Number(this.oItemCustomer.iExpiredInteractions) +
                Number(this.oItemCustomer.iIncompletedInteractions),
              oResult.data.iTotal
            )}%`,
            sTotal:
              Number(this.oItemCustomer.iCanceledInteractions) +
              Number(this.oItemCustomer.iExpiredInteractions) +
              Number(this.oItemCustomer.iIncompletedInteractions),
          },
        ];

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
    getLabelInfo(oItem, oRecord) {
      switch (oRecord.eStatus) {
        case "active":
          return [
            {
              sLabel: "Fecha de activación: ",
              sResult: this.getFormatDDMMYYYY(
                new Date(
                  oItem.StatusRecords.find(
                    (e) => e.eStatus === "active"
                  )?.tCreatedAt
                ) ?? new Date(),
                true
              ),
            },
            {
              sLabel: "Fecha de revserva: ",
              sResult: this.getFormatDDMMYYYY(
                new Date(oItem.tDate ?? new Date()),
                true
              ),
            },
          ];
        case "canceled":
          return [];
        case "completed":
          return [
            {
              sLabel: "Fecha de finalización: ",
              sResult: this.getFormatDDMMYYYY(
                new Date(
                  oItem.StatusRecords.find(
                    (e) => e.eStatus === "completed"
                  )?.tCreatedAt
                ) ?? new Date(),
                true
              ),
            },
          ];
        case "incompleted":
          return [
            {
              sLabel: "Fecha de finalización: ",
              sResult: this.getFormatDDMMYYYY(
                new Date(
                  oItem.StatusRecords.find(
                    (e) => e.eStatus === "incompleted"
                  )?.tCreatedAt
                ) ?? new Date(),
                true
              ),
            },
          ];
        case "redeemed":
          return [
            {
              sLabel: "Fecha de canjeo: ",
              sResult: this.getFormatDDMMYYYY(
                new Date(
                  oItem.StatusRecords.find(
                    (e) => e.eStatus === "redeemed"
                  )?.tCreatedAt
                ) ?? new Date(),
                true
              ),
            },
            {
              sLabel: "Canjeado por: ",
              sResult:
                oItem.StatusRecords.find((e) => e.eStatus === "redeemed")
                  .CreatedBy.sName +
                " " +
                oItem.StatusRecords.find((e) => e.eStatus === "redeemed")
                  .CreatedBy.sLastName,
            },
          ];
        default:
          return [];
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
        this.bCompleted =
          oItem.eStatus === "completed" || oItem.eStatus === "incompleted";
        this.eStatus = oItem.eStatus;
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
