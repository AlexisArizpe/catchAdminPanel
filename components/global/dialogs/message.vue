<template>
  <v-dialog v-model="bDialog" width="500px">
    <v-card class="content-card-dialog-global">
      <v-card-text
        class="content-body-detail-dialog-global content-body-message-dialog"
      >
        <p>{{ sMessage }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn
          @click="setCloseDialog"
          class="l-spacing-0"
          width="200"
          variant="flat"
        >
          {{ sBtnSecond }}
        </v-btn>
        <v-spacer />
        <v-btn
          class="l-spacing-0 text-none"
          variant="flat"
          :color="sColorBtnPrimary"
          width="200"
        >
          {{ sBtnPrimary }}
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
    sMessage: {
      type: String,
      default: ``,
    },
    sBtnSecond: {
      type: String,
      default: "Regresar",
    },
    sBtnPrimary: {
      type: String,
      default: "Finalizar",
    },
    sColorBtnPrimary: {
      type: String,
      default: "primary",
    },
  },
  data: () => ({
    bDialog: false,
  }),
  computed: {
    sMessage() {
      return this.$store.message.sMessage;
    },
  },
  emits: ["update:modelValue"],
  methods: {
    setCloseDialog() {
      this.bDialog = false;
    },
  },
  watch: {
    modelValue() {
      this.bDialog = this.modelValue;
      if (!this.bDialog) {
        this.$store.message.close();
      }
    },
    bDialog() {
      this.$emit("update:modelValue", this.bDialog);
      if (!this.bDialog) {
        this.$store.message.close();
      }
    },
  },
};
</script>
<style scoped>
.content-body-message-dialog {
  padding: 70px !important;
}
</style>
