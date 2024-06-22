<template>
  <div>
    <NuxtLayout name="initial">
      <v-btn @click="getLogin" class="btn-back-initial" variant="text">
        <span class="mdi mdi-arrow-left"></span> Regresar
      </v-btn>
      <div class="content-form-initial-global">
        <div class="content-form-initial-title-global">
          <p class="txt-initial-global">
            Recupera contraseña
            <span class="txt-sub-initial-global">Ingresa tu correo</span>
          </p>
        </div>

        <div class="content-form-inputs">
          <v-form ref="form">
            <v-text-field
              v-model="sEmail"
              variant="solo"
              flat
              density="comfortable"
              placeholder="Correo electrónico"
              persistent-placeholder
              :rules="emailRulesGlobal"
              @keyup.enter="setFocusPassword()"
              rounded="lg"
            >
            </v-text-field>
          </v-form>
        </div>

        <div class="content-form-initial-btns-global">
          <v-btn
            @click="setRecoveryPassword()"
            class="btn-primary-global"
            block
            :loading="bLoading"
          >
            Recuperar contraseña
          </v-btn>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  name: "PagePasswordRecovery",
  data() {
    return {
      bValidateForm: false,
      sEmail: "",
      bLoading: false,
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
    async setRecoveryPassword() {
      const { valid } = await this.$refs.form.validate();
      if (valid && !this.bLoading) {
        this.bLoading = true;
        const payload = {
          sEmail: this.sEmail,
        };
        this.$api
          .post(`auth/recovery/establishment`, payload)
          .then((response) => {
            this.sEmail = "";
            this.$refs.form.reset();

            this.$toast(response.data.message, {
              type: "success",
              hideProgressBar: true,
            });
            // this.$toast.success(response.message);
            this.bLoading = false;
            // this.$router.push({name:"login"});
          })
          .catch((error) => {
            this.bLoading = false;
            this.$store.alert.error(error.response.data.message);
          });
      }
    },
    getLogin() {
      this.$router.push({ name: "login" });
    },
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
</style>
