<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <!-- <google-map @location-changed="updateLocation" /> -->
      <headers-header sNameHeader="Pagos" />

      <!-- v-if="$store.user.bSuperAdmin" -->
      <!-- :bBtnAdd="bWrite || bManage" -->
      <admin-payments-general-search-content
        v-if="false"
        @setSearch="setSearch"
        @serAddItem="serAddItem"
        sNameBtnAdd=""
        toAdd=""
        sTypeToAdd="dialog"
        :bBtnAdd="false"
        sIconBtnAdd="mdi mdi-plus"
      />

      <div class="content-general-global pt-5">
        <admin-payments-general-cards
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
          @setDate="setDate"
          @setDeleteItem="setDeleteItem"
          @setDetailItem="setDownloadItem"
        />

        <admin-payments-general-table
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
          @setDate="setDate"
          @setDeleteItem="setDeleteItem"
          @setDetailItem="setDownloadItem"
        />
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
import html2pdf from "html2pdf.js";
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
        sText: "Fecha y hora",
        title: "Fecha y hora",
        sValue: "sDateTime",
        key: "sDateTime",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center w-s-nowrap",
        sCellClass: "global-body-table w-s-nowrap text-center",
      },
      {
        title: "Establecimiento",
        sText: "Establecimiento",
        sValue: "sEstablishmentName",
        key: "sEstablishmentName",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table w-s-nowrap text-center",
      },
      {
        sText: "Concepto",
        title: "Concepto",
        sValue: "sConcept",
        key: "sConcept",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Método de pago",
        title: "Método de pago",
        sValue: "sPaymentMethod",
        key: "sPaymentMethod",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Estado",
        title: "Estado",
        sValue: "eStatus",
        key: "eStatus",
        sortable: false,
        align: "center",
        sClass: "global-header-table text-center",
        sCellClass: "global-body-table text-center",
      },
      {
        sText: "Monto",
        title: "Monto",
        sValue: "dAmount",
        key: "dAmount",
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
    sDate: null,
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
            iMonth: this.sDate ? this.sDate.month + 1 : null,
            iYear: this.sDate ? this.sDate.year : null,
          },
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
            sPaymentMethod: e.PaymentMethod?.oCard
              ? `${this.getTitleCaseGlobal(e.PaymentMethod?.oCard?.sBrand)} *${
                  e.PaymentMethod?.oCard?.sLast4 ?? ""
                }`
              : null,
            eStatus: this.getPaymentStatusName(e.eStatus),
            sColorStatus: this.getStatusColorPayment(e.eStatus),
            dAmount: `$ ${this.getFormatMoneyGlobal(e.dAmount)} MXN`,
            bDownloadPDF: e.sStripePaymentMethodId ? true : false,
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
    async getDetailPayment(sId) {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`payments/${sId}`, payload);
        let oPayment = oResult.data.payment;
        oPayment["eStatus"] = this.getPaymentStatusName(oPayment.eStatus);
        oPayment["sDateIssue"] = this.getFormatDDMMYYYY(
          new Date(oPayment.tCreatedAt),
          true
        );
        oPayment["sBrand"] = this.getTitleCaseGlobal(
          oPayment.Invoice.PaymentMethod.sBrand
        );
        oPayment["sLast4"] = oPayment.Invoice.PaymentMethod.sLast4;
        oPayment["sConcept"] = "Suscripción regular";
        oPayment["dQuantity"] = 1;
        oPayment["sPrice"] = this.getFormatMoneyGlobal(oPayment.dAmount);
        oPayment["sTotalPrice"] = this.getFormatMoneyGlobal(
          1 * oPayment.dAmount
        );
        return this.setFillData(oPayment);
      } catch (error) {
        console.log(error);
      }
    },
    async getDetailEstablishment(sId) {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`establishments/${sId}`, payload);
        let oEstablishment = oResult.data.establishment;
        oEstablishment["sBillingFullAddress"] = `${
          oEstablishment.sBillingAddress
        } ${oEstablishment.sBillingAddressCity} ${
          oEstablishment.sBillingAddressZIPCode
        } ${oEstablishment.State?.sCode ?? ""} ${
          oEstablishment.State?.Country?.sName ?? ""
        }`;

        oEstablishment["sBillingEmail"] = oEstablishment.sBillingEmail
          ? oEstablishment.sBillingEmail
          : "Sin correo electrónico";

        oEstablishment["sPhoneNumber"] = oEstablishment.sPhoneNumber
          ? this.getFormatPhoneGlobal(
              oEstablishment?.CountryCallingCode?.sCallingCode,
              oEstablishment.sPhoneNumber,
              oEstablishment.sPhoneExtension
            )
          : "Sin teléfono";

        return oEstablishment;
      } catch (error) {
        console.log(error);
      }
    },
    async setFillData(oItem) {
      const oEstablishment = await this.getDetailEstablishment(
        oItem.sEstablishmentId
      );
      return {
        oPayment: oItem,
        oEstablishment: oEstablishment,
      };
    },
    setSearch(sSearch) {
      this.sSearch = sSearch;
      this.getItems();
    },
    setDate(sDate) {
      this.sDate = sDate;
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
    async setDownloadItem(oItem) {
      try {
        this.$store.catalog.setOverlay(true);
        let oBill = {
          contentHtml: await this.getDetailPayment(oItem.sPaymentId),
          // Otros objetos y arrays que necesites
        };

        // return;
        const response = await fetch("/pdf/bill.html");
        let html = await response.text();

        // Función recursiva para reemplazar las variables en el HTML
        const replaceVariables = (html, obj, parentKey = "") => {
          for (const key in obj) {
            const fullKey = parentKey ? `${parentKey}.${key}` : key;
            const regex = new RegExp(`{{\\s*${fullKey}\\s*}}`, "g");
            if (typeof obj[key] === "object" && obj[key] !== null) {
              html = replaceVariables(html, obj[key], fullKey);
            } else {
              html = html.replace(regex, obj[key]);
            }
          }
          return html;
        };

        html = replaceVariables(html, oBill);

        // Crea un elemento temporal para insertar el HTML
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;

        // Configuración de html2pdf
        const opt = {
          margin: 0,
          filename: `Factura-${oBill.contentHtml.oPayment.sStripePaymentId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        // Convertir el HTML a PDF
        html2pdf().from(tempElement).set(opt).save();
        this.$store.catalog.setOverlay(false);
      } catch (error) {
        this.$store.catalog.setOverlay(false);
        console.error("Error al cargar el archivo HTML:", error);
      }
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
