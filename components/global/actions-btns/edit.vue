<template>
  <div class="content-actions-btns-detail-global">
    <div v-if="!bMobile" class="content-action-btn-delete-global">
      <v-btn
        v-if="bShowBtnDelete"
        @click="setDeleteItem()"
        class="btn-second-global-red"
      >
        {{ sBtnNameDelete }}
      </v-btn>
    </div>
    <v-spacer v-if="!bTablet" />
    <!-- #region btn action primary if mod mobile -->
    <div
      v-if="bMobile"
      v-show="bShowBtnModify"
      class="content-action-btn-general-global"
    >
      <v-btn
        v-if="!bActiveModifyEdit"
        @click="setModify()"
        class="btn-primary-global"
      >
        {{ sBtnNameModify }}
      </v-btn>
      <v-btn
        v-else
        @click="setChange()"
        :loading="bLoadingBtnEdit"
        :disabled="!bValidationEdit"
        class="btn-primary-global"
      >
        {{ sBtnNameSave }}
      </v-btn>
    </div>
    <!-- #endregion btn action primary if mod mobile -->

    <div class="content-action-btn-cancel-global">
      <v-btn
        v-if="bActiveModifyEdit"
        @click="setCancel()"
        class="btn-second-global"
      >
        {{ sBtnNameCancel }}
      </v-btn>
      <v-btn
        v-if="!bActiveModifyEdit && bShowBtnLastEdition"
        @click="setLastEditionItem()"
        class="btn-second-global"
      >
        Última edición
      </v-btn>
    </div>

    <div
      v-if="!bMobile"
      v-show="bShowBtnModify"
      class="content-action-btn-general-global"
    >
      <v-btn
        v-if="!bActiveModifyEdit"
        @click="setModify()"
        class="btn-primary-global"
      >
        {{ sBtnNameModify }}
      </v-btn>
      <v-btn
        v-else
        @click="setChange()"
        :loading="bLoadingBtnEdit"
        :disabled="!bValidationEdit"
        class="btn-primary-global"
      >
        {{ sBtnNameSave }}
      </v-btn>
    </div>

    <!-- #region Btn eliminar modo mobile -->
    <div v-if="bMobile" class="content-action-btn-delete-global">
      <v-btn
        v-if="bShowBtnDelete"
        @click="setDeleteItem()"
        class="btn-second-global-red"
      >
        {{ sBtnNameDelete }}
      </v-btn>
    </div>
    <!-- #endregion Btn eliminar modo mobile -->
  </div>
</template>
<script>
export default {
  props: {
    bValidationEdit: {
      type: Boolean,
      default: true,
    },
    oEdit: Object,
    bLoadingBtnEdit: Boolean,
    bActiveModify: Boolean,
    sBtnNameSave: {
      type: String,
      default: "Guardar cambios",
    },
    sBtnNameModify: {
      type: String,
      default: "Modificar",
    },
    bShowBtnModify: {
      type: Boolean,
      default: true,
    },

    bBtnNameCancel: {
      type: Boolean,
      default: true,
    },
    sBtnNameCancel: {
      type: String,
      default: "Cancelar",
    },

    bShowBtnDelete: {
      type: Boolean,
      default: true,
    },
    sBtnNameDelete: {
      type: String,
      default: "Eliminar",
    },

    bActiveModifyFixes: Boolean,
  },
  data() {
    return {
      bActiveModifyEdit: false,
      aShowChangePassword: ["clients-id"],
      aShowBtnLastEdition: ["administrators-id"],
    };
  },
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
    },
    bTablet() {
      return this.$vuetify.display.sm;
    },
    bShowChangePassword() {
      return (
        this.aShowChangePassword.filter((e) => e === this.$route.name).length >
        0
      );
    },
    bShowBtnLastEdition() {
      return (
        this.aShowBtnLastEdition.filter((e) => e === this.$route.name).length >
        0
      );
    },
  },
  beforeMount() {
    if (this.bActiveModifyFixes) {
      this.bActiveModifyEdit = true;
    } else {
      this.bActiveModifyEdit = this.bActiveModify;
    }
  },
  methods: {
    setDeleteItem() {
      this.$emit("setDeleteItem");
    },
    setModify() {
      this.bActiveModifyEdit = !this.bActiveModifyEdit;
      this.$emit("setModify", this.bActiveModifyEdit);
    },
    setCancel() {
      if (this.bActiveModifyFixes) {
        this.$emit("setCancel");
      } else {
        if (this.bActiveModifyEdit) {
          this.bActiveModifyEdit = false;
          this.$emit("setDiscard", this.bActiveModifyEdit);
        } else {
          this.$emit("setCancel");
        }
      }
    },
    setLastEditionItem() {
      this.$emit("setLastEditionItem");
    },
    setChangePasswordItem() {
      this.$emit("setChangePasswordItem");
    },
    setChange() {
      this.$emit("setChange");
    },
  },
  watch: {
    bActiveModify() {
      if (this.bActiveModifyFixes) {
        this.bActiveModifyEdit = true;
      } else {
        this.bActiveModifyEdit = this.bActiveModify;
      }
    },
  },
};
</script>
<style scoped>
.content-actions-btns-detail-global {
  display: flex;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.content-action-btn-delete-global {
  width: 150px;
}

.content-action-btn-cancel-global {
  width: 150px;
  margin-left: 15px;
}

.content-action-btn-general-global {
  width: 150px;
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
    margin-top: 20px;
  }

  .content-action-btn-cancel-global {
    width: 100%;
    margin-top: 20px;
    margin-left: 0px;
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
    justify-content: space-between;
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
