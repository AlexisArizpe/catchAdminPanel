<template>
  <div>
    <div class="content-global-header-detail" ref="HeaderDetailGlobal">
      <div class="content-txt-global-header-detail">
        <v-btn
          @click="getBack()"
          class="btn-arrow-header-detail-global"
          icon
          variant="text"
        >
          <span class="mdi mdi-arrow-left icon-arrow-left-back"></span>
        </v-btn>
        <span class="txt-global-header-detail">
          {{ sNameHeaderDetail }}
        </span>
        <span class="txt-name-global-header-detail">
          {{ sTitleHeaderDetail }}
        </span>
        <span class="txt-extra-info-header-detail">
          {{ sExtraInfo }}
        </span>
      </div>
    </div>
    <core-dialogs-confirm
      :bDialogConfirmOrigin="bDialogConfirmOrigin"
      :oItemConfirmOrigin="oItemConfirmOrigin"
      @setDialogConfirm="setStatusItem"
    ></core-dialogs-confirm>
  </div>
</template>
<script>
export default {
  props: {
    sNameHeaderDetail: String,
    sNameItem: String,
    sToReturn: String,
    aStatus: Array,
    aToStatus: Array,
    bVisibility: Boolean,
    oStatus: Object,
    bBtnS: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    aShowStatusOrder: ["orders-id"],
    aShowUpdateStatusProduct: ["products-id"],
    // #region access status header detail
    aShowStatus: ["admin-administrators-id"],
    // #endregion access status header detail
    bDialogConfirmOrigin: false,
    oItemConfirmOrigin: {},
  }),
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
    },
    sTitleHeaderDetail() {
      return this.$store.header.sNameItemHeader;
    },
    sExtraInfo() {
      return this.$store.header.sExtraInfo;
    },
    bShowStatusOrder() {
      return (
        this.aShowStatusOrder.filter((e) => e === this.$route.name).length > 0
      );
    },
    bShowUpdateStatusProduct() {
      return (
        this.aShowUpdateStatusProduct.filter((e) => e === this.$route.name)
          .length > 0
      );
    },
    bShowStatus() {
      return this.aShowStatus.filter((e) => e === this.$route.name).length > 0;
    },
  },
  beforeUnmount() {
    // this.$store.header.setNameItemHeader("");
  },
  methods: {
    getBack() {
      this.$emit("getBack");
    },
    setStatusItem(oItem) {
      this.bDialogConfirmOrigin = !this.bDialogConfirmOrigin;
      if (this.bDialogConfirmOrigin) {
        this.oItemConfirmOrigin = {
          sNameHeader: `${
            this.oStatus.bVisibility ? "Restringir" : "Permitir"
          } accceso`,
          sQuestion: `<span>Estás a punto de  ${
            this.oStatus.bVisibility ? "restringir" : "permitir"
          } el acceso a</br> <span class="font-weight-bold"> ${
            this.sTitleHeaderDetail
          }</span>.</span> </br>
           <span> ¿Desea proseguir con la acción? </span>`,
          bDoubleConfirm: false,
          sDoubleConfirm: `<span>Acepto la responsabilidad y deseo proseguir con la eliminación de: </span> </br> <span class="font-weight-bold"> ${this.sTitleHeaderDetail} </span>`,
          sNameActionBtn: `${
            this.oStatus.bVisibility ? "Restringir" : "Permitir"
          }`,
          sApi: ``,
          iOptionApi: 0, // 0 --> Delete , 1 -> Patch , 2 -> Patch Access
          oPayload: { bVisibility: !this.oStatus.bVisibility },
          bReturn: false,
          toReturn: "",
          bDialogType: 1, // 0 -> Mod Double Confirm , 1 -> Mod Access
        };
      }
    },
  },
};
</script>
<style>
.content-global-header-detail {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 12px 5px 12px;
}
.btn-arrow-header-detail-global {
  color: var(--global-color-black) !important;
  font-size: 20px !important;
}
.content-arrow-header-detail-global {
  text-decoration: none !important;
}
.content-txt-global-header-detail {
  display: flex;
  align-items: center;
}
.btn-arrow-header-detail-global {
  margin-right: 0px;
  transition: all 0.2s !important;
}
.content-txt-global-header-detail:hover .btn-arrow-header-detail-global {
  margin-right: 10px;
}
.txt-global-header-detail {
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-size: 25px;
}
.txt-name-global-header-detail {
  font-family: "Roboto";
  margin-left: 5px;
  font-size: 25px;
  /* white-space: nowrap; */
}
.txt-extra-info-header-detail {
  font-family: "Roboto";
  margin-left: 5px;
  margin-top: 5px;
  font-size: 15px;
}
.content-btn-update-status-product-all {
  display: flex;
  /* width: 80%; */
  justify-content: flex-end;
}
.icon-btn-status-product-global {
  font-size: 18px;
  margin-right: 5px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-global-header-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 20px 12px 5px 12px;
  }
  .icon-arrow-left-back {
    font-size: 1rem;
  }
  .content-txt-global-header-detail {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .txt-global-header-detail {
    display: flex;
    align-items: center;
    font-family: "Roboto";
    font-size: 20px;
  }
  .txt-name-global-header-detail {
    font-family: "Roboto";
    margin-left: 5px;
    font-size: 20px;
  }

  .content-status-header-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    background-color: var(--global-bg-switch-visibility);
    padding: 0px 20px;
    border-radius: 30px;
    width: 100%;
    height: 50px;
  }
  .content-visiblility {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 30px;
    font-size: 0.9rem;
  }
  .switch-visibility {
    min-width: 50px;
    max-width: 50px;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
  .demoColorResponsive {
    background-color: rgb(201, 122, 83);
  }
}

/*#endregion MD */

/*#region LG */
@media (min-width: 1264px) and (max-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(204, 198, 109);
  }
}

/*#endregion LG */

/*#region XL */
@media (min-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(113, 199, 201);
  }
}

/*#endregion XL */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
