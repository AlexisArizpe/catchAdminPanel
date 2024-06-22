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
        <!-- #region content-info-stepper -->
        <div class="content-info-stepper">
          <div class="content-img-info-all">
            <div class="content-img">
              <p class="txt-user-words">
                {{
                  getInitialWordGlobal(
                    oItem.Customer.sName,
                    oItem.Customer.sLastName
                  )
                }}
              </p>
            </div>
            <div class="content-info">
              <p class="txt-name">
                {{ oItem.Customer.sName + " " + oItem.Customer.sLastName }}
              </p>
              <p class="txt-email-phone">
                {{ oItem.Customer.sEmail }} | {{ oItem.Customer.sPhoneNumber }}
              </p>
            </div>
          </div>
          <div v-if="iStatus === 3" class="content-stepper-benefit">
            <stepper-content :sStatus="oItem.sStatus" />
          </div>
        </div>
        <!-- #endregion content-info-stepper -->

        <!-- #region content-folio-benefit -->
        <div class="content-folio-benefit">
          <v-divider />
          <div class="title-benefit">
            Beneficio
            <span class="folio-benefit">{{ oItem.Benefit.sFolio }}</span>
          </div>
        </div>
        <!-- #endregion content-folio-benefit -->

        <!-- #region Resumen del beneficio -->
        <div class="content-items-benefit-records">
          <div
            v-for="(oItemRecord, i) in oItem.aStatusRecords"
            :key="i"
            class="content-item-benefit-records"
            :class="iStatus === 3 ? 'content-completed' : 'content-incompleted'"
          >
            <div class="content-divider-resumen">
              <div class="content-title-status">
                <div class="status-benefit" :style="oItemRecord.sColorStatus">
                  <span class="txt-status-benefit">
                    {{ oItemRecord.sStatus }}
                  </span>
                </div>
              </div>
              <v-divider />
            </div>

            <div
              v-for="(oItemInfoLabel, iInfoLabel) in oItemRecord.aLabelsInfo"
              :key="iInfoLabel"
              class="content-info-label"
            >
              <p class="txt-title-date" v-html="oItemInfoLabel.sLabel"></p>
              <p class="txt-info-date" v-html="oItemInfoLabel.sResult"></p>
            </div>
            <!-- #region Monto de cuenta (Solo canjeado) -->
            <p
              v-if="oItemRecord.eStatus == 'redeemed'"
              class="txt-title-date txt-title-price-date"
            >
              Monto de la cuenta:
              <span class="txt-info-date txt-info-price-date"
                >${{ getFormatMoneyGlobal(oItem.dTicketAmount) }}</span
              >
            </p>
            <!-- #endregion Monto de cuenta (Solo canjeado) -->

            <!-- #region Insta , Encuesta y rating (Solo Completo) -->
            <div
              v-if="oItemRecord.eStatus == 'completed'"
              class="content-insta-survey-rating"
            >
              <!-- #region content-insta-survey -->
              <!-- <div class="content-insta-survey">
                <div class="content-item-insta-survey">
                  <p class="txt-title-date">Stories de instagram</p>
                  <div class="content-icon-check">
                    <span class="mdi mdi-check icon-check"></span>
                  </div>
                </div>
                <div class="content-item-insta-survey">
                  <p class="txt-title-date">Encuesta</p>
                  <div class="content-icon-check">
                    <span class="mdi mdi-check icon-check"></span>
                  </div>
                </div>
              </div> -->
              <!-- #endregion content-insta-survey -->
              <v-divider class="my-5" />
              <!-- #region rating -->
              <div class="content-items-rating">
                <div
                  v-for="(oRating, iRating) in oItem.aRatings"
                  :key="iRating"
                  class="content-item-rating"
                >
                  <p class="txt-info-date">{{ oRating.sLabel }}</p>
                  <v-rating
                    v-model="oRating.dRating"
                    disabled
                    size="small"
                    density="compact"
                  ></v-rating>
                </div>
              </div>
              <!-- #endregion rating -->

              <!-- #region btns -->
              <!-- <div class="content-items-btns">
                <div
                  v-for="(oQualifier, iQualifer) in aBtnQualifiers"
                  :key="iQualifer"
                  class="btn-qualifier"
                >
                  {{ oQualifier }}
                </div>
              </div> -->
              <!-- #endregion btns -->

              <!-- #region description -->
              <p class="txt-description">
                {{ oItem.sComments ?? "Sin comentarios" }}
              </p>
              <!-- #endregion description -->
            </div>
            <!-- #endregion Insta , Encuesta y rating (Solo Completo) -->
          </div>
        </div>

        <!-- #endregion Resumen del beneficio -->
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
  data: () => ({
    aBtnQualifiers: ["¡Excelente atención", "🙌🏼 🙌🏼 🙌🏼", "🥳 🥳 🥳"],
  }),
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
/* #region content-info-stepper */
.content-info-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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

/* #region content-stepper-benefit */
.content-stepper-benefit {
  width: 50%;
}
/* #endregion content-stepper-benefit */

/* #endregion content-info-stepper */

.content-folio-benefit {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* #region content-divider-resumen */
.content-divider-resumen {
  display: flex;
  align-items: center;
  padding: 10px 0px;
}

.content-title-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 0px 0px;
}
.title-benefit {
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 500;
}
.folio-benefit {
  font-weight: 900;
}
/* #endregion content-divider-resumen */

/* #region content-record-benefit */

.content-items-benefit-records {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Agrega un espacio entre los elementos */
}
.content-item-benefit-records {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
}
.content-completed {
  width: calc(50% - 10px); /* Establece el ancho descontando el espacio */
}
.content-incompleted {
  width: 100% !important; /* Establece el ancho descontando el espacio */
}
.status-benefit {
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
.content-record-benefit {
  padding: 20px 0px 0px 0px;
}
.content-info-label {
  display: flex;
  align-items: center;
}
.txt-title-date {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 22.5px;
  text-align: left;
}
.txt-info-date {
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 22.5px;
  text-align: left;
  margin-bottom: 2px;
}

.txt-title-price-date {
  font-weight: normal !important;
  font-size: 1.2rem;
  padding: 10px 0px;
}
.txt-info-price-date {
  font-weight: bold !important;
  font-size: 1.3rem;
  padding: 10px 0px;
}

.content-insta-survey {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
}
.content-item-insta-survey {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.content-icon-check {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 25px;
  height: 25px;
  background-color: #86c157;
}
.icon-check {
  font-size: 1.3rem;
  color: var(--global-color-white);
}

.content-items-rating {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.content-item-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-items-btns {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 20px;
}

.btn-qualifier {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  height: 28.98px;
  top: 424px;
  left: 581px;
  gap: 0px;
  border-radius: 38px;
  border: 2px solid #000000;
  opacity: 0px;
  text-align: center;
  font-size: 0.8rem;
}

.txt-description {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 500;
  line-height: 15.23px;
}

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
