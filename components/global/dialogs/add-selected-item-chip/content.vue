<template>
  <v-dialog
    v-model="bDialog"
    persistent
    @keydown.esc="setCloseDialog"
    width="600px"
    content-class="content-dialog-all-global"
  >
    <div class="content-dialog-global">
      <v-btn
        @click="setCloseDialog"
        icon
        variant="text"
        density="comfortable"
        class="btn-close-dialog-global"
      >
        <v-icon> mdi-close </v-icon>
      </v-btn>

      <div class="content-header-dialog-global">
        <span class="txt-header-dialog-global">
          <span class="font-weight-bold">Selecciona</span>
          <br />
          {{ sTitle }}
        </span>
      </div>

      <div class="content-body-dialog-global-all">
        <div class="content-body-dialog-global">
          <component :is="sComponent" :aCatalog="aCatalog" />
        </div>
      </div>

      <div class="footer-dialog">
        <div class="content-btns-footer-dialog-global">
          <v-btn @click="setCloseDialog" class="btn-primary-global">
            Cerrar
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    sType: {
      type: String,
      default: "icon",
    },
    sTitle: {
      type: String,
      default: "Titulo",
    },
    aCatalog: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    bDialog: false,
  }),
  computed: {
    sComponent() {
      return `dialogs-add-selected-item-chip-type-${this.sType}`;
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
.content-dialog-all-global {
  border-radius: 15px !important;
}
.content-dialog-global {
  position: relative;
  background-color: var(--global-color-white);
  border-radius: 14px;
}
.btn-close-dialog-global {
  position: absolute !important;
  top: 5px;
  right: 5px;
  z-index: 9999;
  background: var(--global-color-white-blur);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
}
.content-header-dialog-global {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 15px 25px;
  border-bottom: 1px solid var(--global-color-grey-divider);
}
.content-body-dialog-global-all {
  border-top: 1px solid var(--global-color-grey-border-navbar) !important;
  padding: 20px 20px;
  max-height: calc(100vh - 200px);
  overflow: auto;
}

.txt-header-dialog-global {
  font-size: 30px;
  text-align: center;
  line-height: normal;
  color: var(--global-color-txt-result);
}

.footer-dialog {
  display: flex;
  align-items: center;
  padding: 15px 20px 15px 20px;
}

.content-btns-footer-dialog-global {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .footer-dialog {
    display: block;
    padding-bottom: 15px;
  }

  .content-btns-footer-dialog-global {
    width: 100%;
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

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
