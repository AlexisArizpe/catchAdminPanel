<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <headers-header sNameHeader="Historial" />

      <div class="content-general-global">
        <admin-record-general-cards
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
        </admin-record-general-cards>

        <admin-record-general-table
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
        </admin-record-general-table>
      </div>
      <v-dialog
        v-model="bDialogDetail"
        :width="
          bCompleted ? (eStatus === 'completed' ? '900px' : '450px') : '450px'
        "
        persistent
      >
        <admin-record-detail-benefit-complete-content
          v-if="bCompleted"
          :sTypeBenefit="sTypeBenefit"
          :oItem="oItemDetail"
          @setCloseDialog="setDetailItem"
        />
        <admin-record-detail-content
          v-else
          :sTypeBenefit="sTypeBenefit"
          :oItem="oItemDetail"
          @setCloseDialog="setDetailItem"
        />
      </v-dialog>
      <!-- admin-record-detail-content -->
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data: () => ({
    aHeader: [
      {
        sText: "Fecha y hora",
        title: "Fecha y hora",
        sValue: "tCreatedAt",
        key: "tCreatedAt",
        sortable: true,
        sClass: "global-header-table ",
        sCellClass: "global-body-table w-s-nowrap",
      },
      {
        title: "Cliente",
        sText: "Cliente",
        sValue: "sClient",
        key: "sClient",
        sortable: false,
        sClass: "global-header-table",
        sCellClass: "global-body-table w-s-nowrap",
      },
      {
        sText: "Folio",
        title: "Folio",
        sValue: "sFolio",
        key: "sFolio",
        sortable: false,
        sClass: "global-header-table ",
        sCellClass: "global-body-table w-s-nowrap",
      },
      {
        title: "Nombre",
        sText: "Nombre",
        sValue: "sName",
        key: "sName",
        sortable: false,
        maxWidth: "50px",
        align: "center",
        sClass: "global-header-table",
        sCellClass: "global-body-table w-s-nowrap",
      },

      {
        sText: "Estado",
        title: "Estado",
        sValue: "sStatus",
        key: "sStatus",
        sortable: true,
        align: "start",
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
    oItemDetail: {},
    bCompleted: false,
    eStatus: null,
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

        // this.setStatusPayload(payload);
        // this.setTypePayload(payload);
        const oResult = await this.$api.get(`benefits/interactions`, payload);
        this.aItems = oResult.data.interactions.map((e, i) => {
          return {
            ...e,
            idx: i,
            sId: e.sRedeemedBenefitId,
            tCreatedAt: this.getFormatDDMMYYYY(
              new Date(e.tUpdatedAt ?? e.tCreatedAt),
              true
            ),
            sClient: `${e.Customer.sName} ${e.Customer.sLastName}`,
            sFolio: e.sFolio,
            sName: e.Benefit.sName,
            sStatus: this.getBenefitStatusName(e.eStatus),
            sColorStatus: this.getBenefitStatusColors(e.eStatus),
            aStatusRecords: e.StatusRecords.map((eRecord) => {
              return {
                eStatus: eRecord.eStatus,
                sStatus: this.getBenefitStatusName(eRecord.eStatus),
                sColorStatus: this.getBenefitStatusColors(eRecord.eStatus),
                bPrice: eRecord.eStatus === "redeemed",
                sPrice: e.dTicketAmount,
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
              const statusOrder = { active: 1, completed: 2, redeemed: 3 };
              return statusOrder[a.eStatus] - statusOrder[b.eStatus];
            }),
            sImg: e.Image ? e.Image.oImages.xlg : null,
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
        this.iNumPage = oResult.data.iNumPages === 0 ? 1 : oResult.data.iNumPages;
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
      let tDate = oItem.StatusRecords.find(
        (e) => (e.eStatus = oItem.eStatus)
      )?.tCreatedAt;
      return this.getFormatDDMMYYYY(new Date(tDate), true);
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
    setDetailItem(oItem) {
      if (oItem) {
        this.oItemDetail = oItem;
        this.bCompleted =
          oItem.eStatus === "completed" || oItem.eStatus === "incompleted";
        this.eStatus = oItem.eStatus;
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
    setTypeBenefit(sTypeBenefit) {
      this.sTypeBenefit = sTypeBenefit;
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
