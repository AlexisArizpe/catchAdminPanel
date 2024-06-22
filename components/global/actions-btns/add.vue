<template>
  <div class="content-actions-btns-detail-global">
    <v-spacer v-if="!bTablet" />
    <div class="content-action-btn-cancel-global">
      <v-btn
        @click="setCancel()"
        class="text-none l-spacing-0 font-weight-bold border-r-8px btn-action-cancel-global"
        variant="flat"
        width="100%"
      >
        {{ sBtnNameCancel }}
      </v-btn>
    </div>
    <div v-if="!bMobile" class="content-action-btn-general-global">
      <v-btn
        @click="setAdd()"
        :loading="bLoadingBtnAdd"
        :disabled="!bValidationAdd"
        variant="flat"
        class="btn-primary-global"
        color="primary"
        width="100%"
      >
        {{ sBtnNameAdd }}
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bValidationAdd: {
      type: Boolean,
      default: true,
    },
    bLoadingBtnAdd: Boolean,
    sBtnNameAdd: {
      type: String,
      default: "Añadir",
    },
    sBtnNameCancel: {
      type: String,
      default: "Cancelar",
    },
  },
  data() {
    return {
      bMobile: false,
      bTablet: false,
    };
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;
    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.bMobile = window.innerWidth < 599.99;
      this.bTablet = window.innerWidth > 600 && window.innerWidth < 959.99;
    },
    setCancel() {
      this.$emit("setCancel");
    },
    setAdd() {
      this.$emit("setAdd");
    },
  },
};
</script>
<style scoped>
.content-actions-btns-detail-global {
  position: fixed;
  right: 20px;

  bottom: 0;
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.content-action-btn-delete-global {
  width: 150px;
}

.content-action-btn-cancel-global {
  width: 250px;
}
.btn-action-cancel-global {
  width: 100%;
  background-color: var(--global-color-grey-selected) !important;
  color: var(--global-color-white);
}

.content-action-btn-general-global {
  width: 250px;
  margin-left: 15px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .content-actions-btns-detail-global {
    display: block;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .content-action-btn-delete-global {
    width: 100%;
  }

  .content-action-btn-cancel-global {
    width: 100%;
    margin-top: 20px;
  }

  .content-action-btn-general-global {
    width: 100%;
    margin-left: 0px;
    margin-top: 20px;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }

  .content-actions-btns-detail-global {
    display: flex;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: flex-end;
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
