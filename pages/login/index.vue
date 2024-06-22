<template>
  <div>
    <NuxtLayout name="initial">
      <div class="content-form-initial-login">
        <div class="content-form-initial-title-global">
          <span class="txt-initial-global"
            >Inicio de sesión
            <span class="txt-sub-initial-global"
              >Ingresa al administrador</span
            ></span
          >
        </div>

        <div class="content-form-inputs">
          <v-form ref="form">
            <!-- #region Correo electrónico -->
            <v-text-field
              v-model="sEmail"
              variant="solo"
              flat
              density="comfortable"
              color="greenprimary"
              placeholder="Email"
              :rules="emailRulesGlobal"
              persistent-placeholder
              @keyup.enter="setFocusPassword()"
              rounded="lg"
            >
            </v-text-field>
            <!-- #endregion Correo electrónico -->

            <!-- #region Contraseña -->
            <v-text-field
              v-model="sPassword"
              ref="sPassword"
              variant="solo"
              flat
              density="comfortable"
              color="greenprimary"
              placeholder="Contraseña"
              persistent-placeholder
              :rules="passwordRulesGlobal"
              :append-inner-icon="bShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="setShowPassword"
              :type="bShowPassword ? 'text' : 'password'"
              @keyup.enter="setLogin()"
              rounded="lg"
            >
            </v-text-field>
            <!-- #endregion Contraseña -->

            <div class="content-label-recover-password">
              <p
                class="txt-label-recover-password"
                @click="setPasswordRecovery()"
              >
                Recuperar contraseña
              </p>
            </div>
          </v-form>
        </div>

        <div class="content-form-initial-btns-global">
          <v-btn
            @click="setLogin()"
            class="btn-primary-global"
            block
            :loading="bLoading"
          >
            Iniciar sesión
          </v-btn>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  name: "PageLogin",
  data() {
    return {
      bValidateForm: false,
      sEmail: "",
      bErrorEmail: false,
      sPassword: "",
      bErrorPassword: false,
      hasVisiblePassword: true,
      bTempSuperAdmin: true,
      bLoading: false,
      bShowPassword: false,
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
  methods: {
    async setLogin() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid && !this.bLoading) {
          this.bLoading = true;

          const payload = {
            sEmail: this.sEmail,
            sPassword: this.sPassword,
          };
          const oResult = await this.$api.post(
            `auth/login/administrator`,
            payload
          );

          this.$store.user.setUserId(oResult.data.session.sUserId);
          this.$store.user.setEstablishmentId(
            oResult.data.session.User.EstablishmentUser?.sEstablishmentId ??
              null
          );
          this.$store.user.setEstablishmentName(
            oResult.data.session.User.EstablishmentUser?.sName ?? ""
          );

          this.$store.user.setToken(oResult.data.session.sToken);
          this.$store.user.setAuth(true);
          // consulta los permisos del cliente, tanto si es super admin y los modulos disponibles.
          let aPermissions =
            await this.$store.permissions.getPermissionsGlobal();
            console.log(aPermissions,"aPermissions")

          let sFirstModuleId =
            aPermissions.data.user.Administrator.Permissions[0].sModuleId;
          let sToRoute = this.$store.menu.aMenuGlobal.find(
            (e) => e.sId === sFirstModuleId
          ).sRoute;

          let sCreatedBy = aPermissions.data.user.Administrator.CreatedBy;
          this.$store.user.setSuperAdmin(sCreatedBy === null ? true : false);

          // this.$store.alert.success(oResult.data.message);
          this.$toast(oResult.data.message, {
            type: "success",
            hideProgressBar: true,
          });
          setTimeout(() => {
            this.$router.push({ name: sToRoute });
          }, 2500);
        }
      } catch (error) {
        console.log(error);
        this.bLoading = false;

        this.$toast(error.response.data.message, {
          type: "error",
          hideProgressBar: true,
        });
      }
    },
    setShowPassword() {
      this.bShowPassword = !this.bShowPassword;
    },
    setFocusPassword() {
      this.$refs.sPassword.focus();
    },
    setPasswordRecovery() {
      this.$router.push({ name: "password-recovery" });
    },
    setValidateForm() {},
  },
  computed: {
    aMenuGlobal() {
      return this.$store.state.sidebar.aMenuGlobal;
    },
    bSuperAdmin() {
      return this.$store.state.user.bSuperAdmin;
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
</style>
