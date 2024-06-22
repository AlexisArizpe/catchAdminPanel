<template>
  <v-dialog v-model="bDialog" width="400px" persistent>
    <v-card class="content-card-dialog-global">
      <div class="content-close-dialog">
        <v-spacer />
        <v-btn
          @click="setCloseDialog"
          variant="outlined"
          class="btn-close-dialog-global"
          density="compact"
          icon="mdi mdi-close"
        ></v-btn>
      </div>
      <v-card-text
        class="content-body-detail-dialog-global content-body-redeem-benefit"
      >
        <p class="txt-title-dialog-global text-center mb-7">
          <span class="font-weight-bold">Canjear</span> un beneficio
        </p>
        <p class="text-center mb-10 l-spacing-0 px-4">{{ sTextInfo }}</p>

        <!-- #region Monto total de la cuenta -->
        <v-text-field
          v-if="!bNext"
          v-model="dTicketAmount"
          :rules="priceRulesGlobal"
          variant="outlined"
          flat
          density="comfortable"
          color="primary"
          placeholder="Monto"
          prefix="$"
          suffix="MXN"
          persistent-placeholder
          rounded="lg"
          @input="getFormatNumber('dTicketAmount')"
        >
        </v-text-field>
        <!-- #endregion Monto total de la cuenta -->

        <div v-if="bNext" class="content-code-QR-all">
          <v-otp-input v-model="sFolio" length="8" type="text"></v-otp-input>
          <div class="content-btn-scan">
            <v-btn
              class="l-spacing-0 text-none ml-0 btn-next-global bg-color-white-global"
              block
              variant="outlined"
            >
              <span class="mdi mdi-scan-helper icon-scan"></span>Escanear QR
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="content-actions-redeem-benefit">
        <v-btn
          v-if="!bNext"
          @click="bNext = true"
          class="l-spacing-0 text-none ml-0 btn-next-global"
          block
          variant="outlined"
        >
          Siguiente
        </v-btn>

        <v-btn
          v-if="bNext"
          @click="setRedeemBenefit"
          :loading="bLoadingBtnAdd"
          class="l-spacing-0 text-none ml-0"
          block
          variant="flat"
          color="primary"
        >
          Canjear beneficio
        </v-btn>
        <v-btn
          v-if="bNext"
          @click="bNext = false"
          class="l-spacing-0 ml-0"
          block
          variant="text"
        >
          Regresar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    sComponent: String,
  },
  data: () => ({
    bDialog: false,
    bNext: false,
    dTicketAmount: null,
    sFolio: "",
    bLoadingBtnAdd: false,
  }),
  emits: ["update:modelValue"],
  computed: {
    sTextInfo() {
      switch (this.bNext) {
        case true:
          return "Ingresa el código del beneficio o escanea el QR tu cámara";

        case false:
          return "Ingresa el monto total de la cuenta";

        default:
          return "";
      }
    },
  },
  methods: {
    setCloseDialog() {
      this.bDialog = false;
      this.dTicketAmount = null;
      this.sFolio = "";
      this.bNext = false;
    },
    async setRedeemBenefit() {
      this.bLoadingBtnAdd = true;
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = {
          dTicketAmount: this.dTicketAmount.replaceAll(",", ""),
        };
      this.$api
        .post(`benefits/interactions/${this.sFolio}/redeem`, payload, config)
        .then(async (response) => {
          this.$swal.fire({
            title: "¡Canjeado!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          this.setCloseDialog();
          this.$store.table.setRefresh(true);
          this.bLoadingBtnAdd = false;
        })
        .catch((error) => {
          console.log(error);
          this.bLoadingBtnAdd = false;
          this.$swal.fire({
            title: "¡Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        });
    },
    getFormatNumber(field) {
      this[field] = this.getFormatNumberGlobal(this[field]);
    },
  },
  watch: {
    modelValue() {
      this.bDialog = this.modelValue;
    },
    sFolio(newText, oldText) {
      this.sFolio = newText.toUpperCase();
    },
    bDialog() {
      this.$emit("update:modelValue", this.bDialog);
    },
  },
};
</script>
<style scoped>
.content-body-redeem-benefit {
  padding: 10px 30px !important;
  max-height: 350px;
  height: 350px;
}
.content-btn-scan {
  padding: 0px 10px;
}
.icon-scan {
  font-size: 1.3rem !important;
  margin-right: 20px;
}
.content-actions-redeem-benefit {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;
}
</style>
