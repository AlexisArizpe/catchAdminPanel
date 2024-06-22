<template>
  <div>
    <NuxtLayout name="initial">
      <div class="content-form-initial-global">
        <div class="content-form-initial-title-global">
          <span class="txt-initial-global"
            >{{ sTitle }}
            <span class="txt-sub-initial-global">{{ sDescription }}</span></span
          >
        </div>

        <div class="content-form-inputs">
          <v-form ref="form">
            <!-- #region nueva contraseña -->
            <span refs="sNewPassword" class="txt-labels-reset-password-form"
              >Nueva contraseña <span class="color-red-global">*</span>
              <core-tooltip-password></core-tooltip-password>
            </span>
            <v-text-field
              ref="sNewPassword"
              density="comfortable"
              :rules="passwordRulesGlobal"
              :type="bShowNewPassword ? 'text' : 'password'"
              color="primary"
              class="input-global"
              variant="solo"
              flat
              v-model="sNewPassword"
              placeholder="Ingresa tu contraseña"
              persistent-placeholder
              @keyup.enter="setLogin()"
              :append-inner-icon="bShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              icon-after
              @click:append-inner="setShowNewPassword"
              autocapitalize="none"
              auto-correct="off"
              autocomplete="off"
              rounded="lg"
            >
            </v-text-field>
            <!-- #endregion nueva contraseña -->

            <!-- #region Contraseña -->
            <span class="txt-labels-reset-password-form"
              >Confirmar nueva contraseña
              <span class="color-red-global">*</span>
              <core-tooltip-password></core-tooltip-password>
            </span>
            <v-text-field
              ref="sConfrimNewPassword"
              density="comfortable"
              :rules="passwordRulesGlobal"
              :type="bShowConfirmNewPassword ? 'text' : 'password'"
              color="primary"
              class="input-global"
              variant="solo"
              flat
              v-model="sConfirmNewPassword"
              placeholder="Ingresa tu contraseña"
              persistent-placeholder
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
            </v-text-field>
            <!-- #endregion Contraseña -->
          </v-form>
        </div>

        <div class="content-form-initial-btns-global">
          <v-btn
            @click="setResetPassword()"
            class="btn-primary-global"
            block
            :loading="bLoadingBtn"
          >
            {{ sNameBtn }}
          </v-btn>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  layout: "reset",
  data() {
    return {
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

      bTempSuperAdmin: true,
      bLoadingBtn: false,
      bValidateForm: false,
    };
  },
  mounted() {
    let input = document.querySelector("input[type=password]");
    if (input) {
      input.setAttribute("autocomplete", "off");
      input.setAttribute("readonly", "true");
      input.setAttribute("onfocus", 'this.removeAttribute("readonly");');
    }
  },
  beforeMount() {},
  methods: {
    setShowPassword() {
      this.bShowNewPassword = !this.bShowNewPassword;
    },
    setShowNewPassword() {
      this.bShowNewPassword = !this.bShowNewPassword;
    },
    setShowConfirmNewPassword() {
      this.bShowConfirmNewPassword = !this.bShowConfirmNewPassword;
    },
    async setResetPassword() {
      const { valid } = await this.$refs.form.validate();
      if (
        valid &&
        !this.bLoading &&
        this.sConfirmNewPassword === this.sNewPassword
      ) {
        this.bLoading = true;
        const config = {
            headers: {
              // Authorization: `Bearer ${this.sToken}`,
            },
          },
          payload = {
            sNewPassword: this.sNewPassword,
            sConfirmNewPassword: this.sConfirmNewPassword,
            sToken: this.sToken,
          };
        this.$api
          .put(`auth/recovery`, payload, config)
          .then((response) => {
            this.sNewPassword = "";
            this.sConfirmNewPassword = "";
            this.$refs.form.reset();
            localStorage.clear();
            this.$toast(response.data.message, {
              type: "success",
              hideProgressBar: true,
            });
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 2000);
          })
          .catch((error) => {
            this.$toast(error.response.data.message, {
              type: "error",
              hideProgressBar: true,
            });
            this.bLoading = false;
          });
      }
    },
  },
  computed: {
    sToken() {
      return this.$route.params.token;
    },
    sTitle() {
      switch (this.$route.params.type) {
        case "1":
          return "Recuperación de contraseña";
        case "2":
          return "Creación de una nueva contraseña";
        default:
          return "Recuperación de contraseña";
      }
    },
    sDescription() {
      switch (this.$route.params.type) {
        case "1":
          return "Ingresa tu nueva contraseña";
        case "2":
          return "Ingresa tu nueva contraseña";
        default:
          return "Ingresa tu nueva contraseña";
      }
    },
    sNameBtn() {
      switch (this.$route.params.type) {
        case "1":
          return "Recuperar contraseña";
        case "2":
          return "Crear contraseña";
        default:
          return "Recuperar contraseña";
      }
    },
    sSuccessText() {
      switch (this.$route.params.type) {
        case "1":
          return "Recuperado";
        case "2":
          return "Creado";
        default:
          return "Recuperado";
      }
    },
  },
};
</script>
<style scoped>
.content-form-inputs {
  width: 100%;
}
.content-form-initial-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}
.txt-labels-reset-password-form {
  font-size: 13px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .txt-labels-reset-password-form {
    font-size: 13px;
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
