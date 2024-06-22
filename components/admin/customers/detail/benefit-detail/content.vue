<template>
  <!-- bEmptyObjGlobal(oItem) -->
  <admin-benefits-detail-skeleton-content v-if="false" />
  <v-card v-else class="content-card-dialog-global">
    <div class="content-close-dialog">
      <v-btn
        @click="setCloseDialog"
        variant="outlined"
        class="btn-close-dialog-global"
        density="compact"
        icon="mdi mdi-close"
      ></v-btn>
    </div>

    <v-card-text class="content-body-detail-dialog-global">
      <div class="content-detail-all">
        <div class="content-img-info-all">
          <div class="content-img">
            <p class="txt-user-words">
              {{
                getInitialWordGlobal(
                  oItem?.Customer?.sName ?? "",
                  oItem?.Customer?.sLastName ?? ""
                )
              }}
            </p>
          </div>
          <div class="content-info">
            <p class="txt-name">
              {{ oItem?.Customer?.sName ?? "" }}
              {{ oItem?.Customer?.sLastName ?? "" }}
            </p>
            <p class="txt-email-phone">
              {{ oItem?.Customer?.sEmail ?? "" }} |
              {{ oItem?.Customer?.sPhoneNumber ?? "" }}
            </p>
          </div>
        </div>
        <v-divider />
        <div class="content-record-benefit">
          <div class="content-title-status">
            <div class="title-benefit">
              Beneficio
              <span class="folio-benefit">{{
                oItem?.Benefit?.sFolio ?? ""
              }}</span>
            </div>
            <div class="status-benefit" :style="oItem.sColorStatus">
              <span class="txt-status-benefit"> {{ oItem.sStatus }} </span>
            </div>
          </div>

          <div class="content-stepper-benefit">
            <stepper-content :sStatus="oItem.sStatus" />
          </div>

          <div class="content-record-dates">
            <!-- #region Activación y Reserva -->
            <p class="txt-title-date">
              Fecha de activación:
              <span class="txt-info-date">{{
                oItem.aStatusRecords?.find((e) => e.eStatus === "active")
                  ?.sCreatedAtFormat ?? ""
              }}</span>
            </p>
            <p class="txt-title-date">
              Fecha de reserva:
              <span class="txt-info-date">{{ oItem.tDate }}</span>
            </p>
            <!-- #endregion Activación y Reserva -->

            <!-- #region Cancelación -->
            <p
              v-if="iStatus == 1"
              class="txt-title-date color-red-canceled-global"
            >
              Fecha de cancelación:
              <span class="txt-info-date color-red-canceled-global">{{
                oItem.aStatusRecords.find((e) => e.eStatus === "canceled")
                  .sCreatedAtFormat
              }}</span>
            </p>
            <!-- #endregion Cancelación -->

            <!-- #region Canjeo, creado por y Monto de cuenta -->
            <v-divider v-if="iStatus == 2" class="mt-2 mb-3" />
            <p v-if="iStatus == 2" class="txt-title-date">
              Fecha de canjeo:
              <span class="txt-info-date">
                {{
                  oItem.aStatusRecords.find((e) => e.eStatus === "redeemed")
                    .sCreatedAtFormat
                }}
              </span>
            </p>
            <p v-if="iStatus == 2" class="txt-title-date">
              Canjeado por:
              <span class="txt-info-date">
                {{
                  oItem.aStatusRecords.find((e) => e.eStatus === "redeemed")
                    .sFullName
                }}
              </span>
            </p>
            <v-divider v-if="iStatus == 2" class="mt-2 mb-3" />

            <p v-if="iStatus == 2" class="txt-title-date txt-price-date">
              Monto de la cuenta:
              <span class="txt-info-date txt-price-date"
                >${{ getFormatMoneyGlobal(oItem.dTicketAmount) }}</span
              >
            </p>

            <!-- #endregion Canjeo, creado por y Monto de cuenta -->
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    oItem: Object,
    sTypeBenefit: {
      type: String,
      default: "regular",
    },
  },
  data: () => ({}),
  computed: {
    iStatus() {
      // 0-Activado, 1-Cancelado, 2-Canjeado, 3-Completo 4-Incompleto
      let sStatus = this.oItem.eStatus;
      switch (sStatus) {
        case "active":
          return 0;
        case "canceled":
          return 1;
        case "redeemed":
          return 2;
        case "completed":
          return 3;
        case "incompleted":
          return 4;
        case "expired":
          return 5;

        default:
          return null;
      }
    },
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
    bRefresh() {
      return this.$store.table.bRefresh;
    },
  },
  async beforeMount() {},
  emits: ["setCloseDialog"],
  methods: {
    setCloseDialog() {
      this.$emit("setCloseDialog");
    },
  },
  watch: {
    bRefresh() {
      this.getItem();
    },
  },
};
</script>
<style scoped>
/* #region content-img-info-all */
.content-img-info-all {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 30px 0px;
}
.content-img {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--global-color-yellow-primary);
  /* background-image: url("https://s3-alpha-sig.figma.com/img/faa8/931c/e100b1154880b06e9192eed35cc3fbd4?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bruHf~jTCKsiS47VQ9TMS~-gNiRr4NNL1lhnENU5sRTYcFHUV2VFn8oxRXPDAZQqxXbV4XsVDj5cHvHs41thOso3UvaXszLNmscuF6MxmTG546wjIg8kIlw1UKar6ABhWYO8UntToEo7JL8MS9do2g-b3hEkVUwaUT0X2DhxSBXaI7MXjZjobrue0S~M3IX8xXRnzRIVpNvagUuVawmMJxQ7wyF00aO7TqoGznwnJQW-RDGLibdxMrGqrg8NtWP1VwK49GKCBDeefMAH~vkO84bva8zUi4UfLffRbe68vBpRt1QEo~qs3IH3hCQJC903M6mxt4qKjHYj92hnT6OUbQ__");
  background-size: cover;
  background-position: center center; */
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 100%;
  width: 100px;
  max-width: 100px;
  min-width: 100px;
  height: 100px;
  max-height: 100px;
  min-height: 100px;
}
.txt-user-words {
  font-size: 1.8rem;
  margin: 0px;
  line-height: 0px;
  font-weight: bold;
}
.txt-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2px;
  line-height: normal;
}
.txt-email-phone {
  font-size: 0.8rem;
  line-height: normal;
  color: #575757;
}
/* #endregion content-img-info-all */

/* #region content-record-benefit */
.content-record-benefit {
  padding: 20px 0px 0px 0px;
}
/* #region content-title-status */
.content-title-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 20px 0px;
}
.title-benefit {
  font-size: 1.1rem;
  font-weight: 500;
}
.folio-benefit {
  font-weight: 900;
}
.status-benefit {
  background-color: #dff6ff;
  width: 94px;
  height: 26px;
  border-radius: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt-status-benefit {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 14.06px;
  text-align: center;
}
/* #endregion content-title-status */

/* #region content-stepper-benefit */
.content-stepper-benefit {
}
/* #endregion content-stepper-benefit */

/* #region content-record-dates */
.content-record-dates {
  padding: 40px 0px 10px 0px;
}
.txt-title-date {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 22.5px;
  text-align: left;
  margin-bottom: 2px;
}
.txt-info-date {
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-bottom: 2px;
}

.txt-price-date {
  font-size: 1.5rem;
  padding: 10px 0px;
}

/* #endregion content-record-dates */

/* #endregion content-record-benefit */

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-img-general {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  .content-img-all {
    height: 100%;
    width: 450px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  }
  .content-form-name-description-all {
    width: 100%;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .content-img-general {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  .content-img-all {
    height: 100%;
    width: 450px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  }
  .content-form-name-description-all {
    width: 100%;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
