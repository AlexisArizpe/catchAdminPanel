<template>
  <v-dialog
    v-model="bDialogConfirm"
    persistent
    @keydown.esc="setDialogConfirm"
    width="550px"
    content-class="dialog-confirm-global"
  >
    <div class="global-container-dialog">
      <v-btn
        @click="setDialogConfirm(false)"
        icon
        variant="text"
        density="comfortable"
        class="global-btn-close"
      >
        <v-icon> mdi-close </v-icon>
      </v-btn>

      <div class="content-header-confirm">
        <span class="txt-header-confirm">
          {{ oItemConfirm.sNameHeader }}
        </span>
      </div>

      <div class="content-body-dialog-confirm-all">
        <div class="content-body-dialog-confirm">
          <div
            class="content-question-dialog-confirm"
            v-html="oItemConfirm.sQuestion"
          />
          <v-checkbox
            v-if="oItemConfirm.bDialogType === 0"
            v-model="oItemConfirm.bDoubleConfirm"
            :label="oItemConfirm.sDoubleConfirm"
            hide-details
          >
            <template #label>
              <span
                class="content-double-confirm-dialog-confirm"
                v-html="oItemConfirm.sDoubleConfirm"
              ></span>
            </template>
          </v-checkbox>
        </div>
      </div>

      <div class="footer-dialog-confirm">
        <div class="content-action-cancel-global-dialog-confirm">
          <v-btn
            class="btn-second-global"
            block
            @click="setDialogConfirm(false)"
          >
            Cancelar
          </v-btn>
        </div>
        <div class="content-action-general-global-dialog-confirm">
          <v-btn
            class="btn-primary-global"
            :loading="bLoadingBtnAction"
            block
            :disabled="bValidationBtnAction"
            @click="setAction()"
          >
            {{ oItemConfirm.sNameActionBtn }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: {
    bDialogConfirmOrigin: Boolean,
    oItemConfirmOrigin: Object,
  },
  data() {
    return {
      bLoadingBtnAction: false,
      bDialogConfirm: false,
      oItemConfirm: {
        sNameHeader: "",
        bDoubleConfirm: false,
        sDoubleConfirm: ``,
        sNameActionBtn: "",
        sApi: "",
        iOptionApi: 0, // 0 --> Delete , 1 -> Patch , 2 -> Patch Access
        oPayload: {},
        bReturn: false,
        bSuccessReturn: false,
        bDialogType: 0, // 0 -> Mod Double Confirm , 1 -> Mod Access
      },
      bDoubleConfirm: false,
      sPassword: "",
      hasVisiblePassword: true,
    };
  },
  methods: {
    // El bSucces es para verificar si se hizo la petición o solo se cerro sin hacer la peticion
    setDialogConfirm(bSuccess) {
      this.bLoadingBtnAction = false;
      this.bDialogConfirm = false;
      this.$emit("setDialogConfirm", bSuccess);
    },
    setAction() {
      if (this.oItemConfirm.bDialogType === 1) {
        this.setActionPut();
      } else {
        switch (this.oItemConfirm.iOptionApi) {
          case 0:
            this.setActionDelete();
            break;
          case 1:
            this.setActionPost();
            break;
          case 2:
            this.setActionPut();
          case 3:
            this.setActionPatch();
            break;

          default:
            break;
        }
      }
    },
    setActionDelete() {
      this.bLoadingBtnAction = true;
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = this.oItemConfirm.oPayload;
      this.$api
        .delete(this.oItemConfirm.sApi, config)
        .then((response) => {
          if (this.oItemConfirm.bReturn) {
            this.$router.push({ name: this.oItemConfirm.toReturn });
          } else {
            this.setDialogConfirm(this.oItemConfirm.bSuccessReturn);
            this.$store.table.setRefresh(true);
          }
          this.$store.alert.success(response.data.message);
        })
        .catch((error) => {
          // this.$alert.error(error.response);
          this.$store.alert.error(error.response.data.message);
          this.bLoadingBtnAction = false;
        });
    },
    setActionPost() {
      this.bLoadingBtnAction = true;
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = this.oItemConfirm.oPayload;
      this.$api
        .post(this.oItemConfirm.sApi, payload, config)
        .then((response) => {
          if (this.oItemConfirm.bReturn) {
            this.$router.push({ name: this.oItemConfirm.toReturn });
          } else {
            this.$store.table.setRefresh(true);
            this.setDialogConfirm(true);
          }
          this.$store.alert.success(response.data.message);
        })
        .catch((error) => {
          // this.$alert.error(error.response);
          this.$store.alert.error(error.response.data.message);
          this.bLoadingBtnAction = false;
        });
    },
    setActionPut() {
      this.bLoadingBtnAction = true;

      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.sToken}`,
          },
        },
        payload = this.oItemConfirm.oPayload;
      this.$axios
        .$put(this.oItemConfirm.sApi, payload, config)
        .then((response) => {
          if (this.oItemConfirm.bReturn) {
            this.$router.push({ name: this.oItemConfirm.toReturn });
          } else {
            this.$store.commit("table/setRefresh", true);
            this.setDialogConfirm(true);
          }
          this.msgSuccess(response.message);
        })
        .catch((error) => {
          this.$alert.error(error.response);
          this.bLoadingBtnAction = false;
        });
    },
    setActionPatch() {
      this.bLoadingBtnAction = true;
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = this.oItemConfirm.oPayload;
      this.$api
        .patch(this.oItemConfirm.sApi, payload, config)
        .then((response) => {
          if (this.oItemConfirm.bReturn) {
            this.$router.push({ name: this.oItemConfirm.toReturn });
          } else {
            this.setDialogConfirm(this.oItemConfirm.bSuccessReturn);
            this.$store.table.setRefresh(true);
          }
          this.$store.alert.success(response.data.message);
        })
        .catch((error) => {
          // this.$alert.error(error.response);
          this.$store.alert.error(error.response.data.message);
          this.bLoadingBtnAction = false;
        });
    },
  },
  computed: {
    bValidationBtnAction() {
      return this.oItemConfirm.bDialogType === 0
        ? !this.oItemConfirm.bDoubleConfirm
        : false;
    },
  },
  watch: {
    bDialogConfirmOrigin() {
      this.bDialogConfirm = this.bDialogConfirmOrigin;
      if (this.bDialogConfirm) {
        this.oItemConfirm = this.oItemConfirmOrigin;
      } else {
        this.oItemConfirm = {
          sNameHeader: "",
          sQuestion: ``,
          bDoubleConfirm: false,
          sDoubleConfirm: ``,
          sNameActionBtn: "",
          sApi: "",
          iOptionApi: 0, // 0 --> Delete , 1 -> Patch , 2 -> Patch Access
          oPayload: {},
          bReturn: false,
          bDialogType: 0, // 0 -> Mod Double Confirm , 1 -> Mod Access Confrim
        };
        this.sPassword = "";
        this.hasVisiblePassword = true;
      }
    },
  },
};
</script>
<style>
.dialog-confirm-global {
  border-radius: 15px !important;
}
.global-container-dialog {
  position: relative;
  background-color: var(--global-color-white);
  border-radius: 14px;
}
.global-btn-close {
  position: absolute !important;
  top: 5px;
  right: 5px;
  z-index: 9999;
  background: var(--global-color-white-blur);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
}
.content-header-confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 15px 25px;
  border-bottom: 1px solid var(--global-color-grey-divider);
}
.content-body-dialog-confirm-all {
  border-top: 1px solid var(--global-color-grey-border-navbar) !important;
  padding: 20px 20px;
  max-height: calc(100vh - 200px);
  overflow: auto;
}
.content-body-dialog-confirm {
  /* margin-bottom: 15px; */
}

.txt-header-confirm {
  font-family: "Ubuntu Medium";
  font-size: 30px;
  text-align: center;
  color: var(--global-color-txt-result);
}

.content-question-dialog-confirm {
  text-align: center;
  font-size: 14px;
  padding-bottom: 15px;
}

.content-double-confirm-dialog-confirm {
  text-align: justify;
  font-size: 11px;
  color: var(--global-color-txt-double-confirm);
}

.footer-dialog-confirm {
  display: flex;
  padding: 0px 20px 30px 20px;
}

.content-action-cancel-global-dialog-confirm {
  width: 100%;
  margin-right: 15px;
}

.content-action-general-global-dialog-confirm {
  width: 100%;
}
.vs-checkbox-con {
  min-width: 23px;
  max-width: 23px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .footer-dialog-confirm {
    display: block;
    padding-bottom: 15px;
  }

  .content-action-cancel-global-dialog-confirm {
    width: 100%;
    margin-right: 0px;
    padding-bottom: 15px;
  }

  .content-action-general-global-dialog-confirm {
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
