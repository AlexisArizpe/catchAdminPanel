<template>
  <v-dialog v-model="bDialog" width="450px">
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
      <v-card-text class="content-body-detail-dialog-global pb-0">
        <v-form ref="form">
          <div class="content-restaurant-user-data-all">
            <v-row class="content-restaurant-data-all ma-0">
              <v-col class="py-0" cols="12">
                <p class="txt-question-change-password">
                  ¿Seguro que deseas
                  <span class="font-weight-bold">cambiar tu contraseña</span>?
                </p>
              </v-col>

              <!-- #region Contraseña actual -->
              <v-col class="py-0" cols="12" sm="12">
                <v-text-field
                  ref="sPassword"
                  :rules="passwordRulesGlobal"
                  :type="bShowPassword ? 'text' : 'password'"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  v-model="sPassword"
                  placeholder="Ingresa tu contraseña"
                  @keyup.enter="setLogin()"
                  :append-inner-icon="bShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  icon-after
                  @click:append-inner="setShowPassword"
                  autocapitalize="none"
                  auto-correct="off"
                  autocomplete="off"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Contraseña actual
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Contraseña actual -->

              <!-- #region nueva contraseña -->
              <v-col class="py-0" cols="12" sm="12">
                <v-text-field
                  ref="sNewPassword"
                  :rules="passwordRulesGlobal"
                  :type="bShowNewPassword ? 'text' : 'password'"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  v-model="sNewPassword"
                  placeholder="Ingresa tu contraseña"
                  @keyup.enter="setLogin()"
                  :append-inner-icon="
                    bShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  icon-after
                  @click:append-inner="setShowNewPassword"
                  autocapitalize="none"
                  auto-correct="off"
                  autocomplete="off"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Nueva contraseña
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion nueva contraseña -->

              <!-- #region Confirmar contraseña -->
              <v-col class="py-0" cols="12" sm="12">
                <v-text-field
                  v-model="sConfirmNewPassword"
                  ref="sConfirmNewPassword"
                  :rules="passwordRulesGlobal"
                  :type="bShowConfirmNewPassword ? 'text' : 'password'"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Ingresa tu contraseña"
                  @keyup.enter="setLogin()"
                  :append-inner-icon="
                    bShowConfirmNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                  "
                  icon-after
                  @click:append-inner="setShowConfirmNewPassword"
                  autocapitalize="none"
                  auto-correct="off"
                  autocomplete="off"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Confirmar contraseña
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Confirmar contraseña -->
            </v-row>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions class="content-actions-user-profile">
        <v-btn
          @click="setChange()"
          class="btn-primary-global"
          variant="flat"
          color="primary"
          :loading="bLoadingBtnEdit"
          width="200px"
        >
          Guardar cambios
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
  },
  data: () => ({
    bDialog: false,

    // #region New Password
    sPassword: "",
    hasVisiblePassword: true,
    bShowPassword: false,
    // #endregion New Password

    // #region New Password
    sNewPassword: "",
    hasVisibleNewPassword: true,
    bShowNewPassword: false,
    // #endregion New Password

    // #region Confirm New Password
    sConfirmNewPassword: "",
    hasVisibleConfirmNewPassword: true,
    bShowConfirmNewPassword: false,
    // #endregion Confirm New Password

    aCountry: [],
    aStates: [],

    bLoadingBtnEdit: false,
  }),
  computed: {
    sUserId() {
      return this.$store.user.sUserId;
    },
  },
  emits: ["update:modelValue"],
  methods: {
    setCloseDialog() {
      this.bDialog = false;

      // #region New Password
      this.sPassword = "";
      this.hasVisiblePassword = true;
      this.bShowPassword = false;
      // #endregion New Password

      // #region New Password
      this.sNewPassword = "";
      this.hasVisibleNewPassword = true;
      this.bShowNewPassword = false;
      // #region Confirm New Password
      this.sConfirmNewPassword = ""; // #endregion Ne=Password;
      this.hasVisibleConfirmNewPassword = true;
      this.bShowConfirmNewPassword = false;
      // #endregion Confirm New Password
    },
    async setChange() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          if (this.getConfirmPassword()) {
            this.bLoadingBtnEdit = true;
            const config = {
                headers: {
                  Authorization: `Bearer ${this.$store.user.sToken}`,
                },
              },
              payload = {
                sPassword: this.sPassword,
                sNewPassword: this.sNewPassword,
              };

            const oResult = await this.$api.put(
              `auth/password`,
              payload,
              config
            );

            this.setCloseDialog();
            this.$swal.fire({
              title: "¡Actualizado!",
              text: oResult.data.message,
              icon: "success",
              confirmButtonText: "Cerrar",
            });

            this.bLoadingBtnEdit = false;
          } else {
            this.$toast(
              "La contraseña no coinciden entre la nueva y el confirmar",
              {
                type: "error",
                hideProgressBar: true,
              }
            );
          }
        }
      } catch (error) {
        this.setCloseDialog();
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnEdit = false;
      }
    },
    getConfirmPassword() {
      return this.sNewPassword === this.sConfirmNewPassword;
    },
    setShowPassword() {
      this.bShowPassword = !this.bShowPassword;
    },
    setShowNewPassword() {
      this.bShowNewPassword = !this.bShowNewPassword;
    },
    setShowConfirmNewPassword() {
      this.bShowConfirmNewPassword = !this.bShowConfirmNewPassword;
    },
  },
  watch: {
    async modelValue() {
      this.bDialog = this.modelValue;
      if (this.bDialog) {
      }
    },
    bDialog() {
      this.$emit("update:modelValue", this.bDialog);
    },
  },
};
</script>
<style scoped>
.txt-question-change-password {
  text-align: center;
  margin-bottom: 60px;
  padding: 0px 50px;
  font-size: 1.6rem;
}
.content-img-public-name {
  display: flex;
  gap: 20px;
  align-items: center;
}
.content-img {
  width: 120px;
  max-width: 120px;
  min-width: 120px;
  height: 120px;
  border-radius: 100%;
}
.img-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: var(--global-color-yellow-primary);
}
.icon-profile {
  font-size: 4rem;
  color: var(--global-color-black);
}
.content-text-filed-public-name {
  width: 100%;
}

.content-restaurant-user-data-all {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  padding: 30px 0px 0px 0px;
}
.content-restaurant-data-all,
.content-user-data-all {
  width: 50%;
}

.img-maps {
  border-radius: 20px;
}

.content-actions-user-profile {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-img-public-name {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .content-restaurant-user-data-all {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
    padding: 30px 0px 0px 0px;
  }
  .content-restaurant-data-all,
  .content-user-data-all {
    width: 100%;
  }
  .content-actions-user-profile {
    display: flex;
    padding: 0px 30px;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .content-restaurant-user-data-all {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
    padding: 30px 0px 0px 0px;
  }
  .content-restaurant-data-all,
  .content-user-data-all {
    width: 100%;
  }
  .content-actions-user-profile {
    display: flex;
    padding: 0px 30px;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
