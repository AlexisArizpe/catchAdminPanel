<template>
  <div>
    <NuxtLayout name="initial">
      <div class="content-form-initial">
        <div class="content-form-initial-title-global">
          <span class="txt-initial-global"
            >Formulario de contacto
            <span class="txt-sub-initial-global">Completa tus datos</span></span
          >
        </div>

        <div class="content-form-inputs">
          <p class="txt-title-form mb-1">Datos del cliente</p>
          <hr class="mb-6" />
          <v-form ref="form" class="w-100p">
            <v-row>
              <!-- #region Nombres -->
              <v-col cols="6">
                <v-text-field
                  v-model="sName"
                  :rules="nameRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  placeholder="Nombres"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Nombres
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Nombres -->

              <!-- #region Apellidos -->
              <v-col cols="6">
                <v-text-field
                  v-model="sLastName"
                  :rules="lastnameRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  placeholder="Apellidos"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Apellidos
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Apellidos -->

              <!-- #region Teléfono -->
              <v-col cols="12">
                <input-phone
                  v-model="sPhoneNumber"
                  :sCountryCallingCode="iCountryCallingCode"
                  :sExtPhone="sPhoneExtension"
                  BgColor="white"
                  @setCountryPhone="setCountryPhone"
                  @setExtPhone="setPhoneExtension"
                  @input="getFormatPhoneNumber('sPhoneNumber')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->

              <!-- #region Correo electrónico -->
              <v-col cols="12">
                <v-text-field
                  v-model="sEmail"
                  :rules="emailRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  placeholder="Correo electrónico"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Correo electrónico
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Correo electrónico -->

              <!-- #region Nombre del Restaurante -->
              <v-col cols="12">
                <v-text-field
                  v-model="sEstablishmentName"
                  :rules="nameSingularRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  placeholder="Nombre del Restaurante"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Nombre del Restaurante
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Nombre del Restaurante -->
            </v-row>
          </v-form>
        </div>

        <div class="content-form-initial-btns-global">
          <v-btn
            @click="setAdd()"
            class="btn-primary-global"
            block
            :loading="bLoading"
          >
            Enviar formulario
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
      sName: null,
      sLastName: null,
      aCountry: [],
      iCountryCallingCode: 2,
      sPhoneNumber: null,
      sPhoneExtension: null,
      sEmail: null,
      sEstablishmentName: null,
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
    async setAdd() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.bLoading = true;

          const config = {
              headers: {
                // Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {
              sName: this.sName,
              sLastName: this.sLastName,
              sEmail: this.sEmail,
              sPhoneNumber: this.sPhoneNumber,
              sPhoneExtension: this.sPhoneExtension,
              Establishment: {
                sName: this.sEstablishmentName,
              },
            };
          const oResult = await this.$api.post(`admissions`, payload, config);
          this.setEmptyDatea();
          this.$refs.form.reset();
          this.$swal.fire({
            title: "¡Listo!",
            text: oResult.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          this.$store.table.setRefresh(true);
          this.bLoading = false;
        }
      } catch (error) {
        this.bLoading = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
    setEmptyDatea() {
      this.sName = null;
      this.sLastName = null;
      this.iCountryCallingCode = 2;
      this.sPhoneNumber = null;
      this.sPhoneExtension = null;
      this.sEmail = null;
      this.sEstablishmentName = null;
    },
    setCountryPhone(iCountryCallingCode) {
      this.iCountryCallingCode = iCountryCallingCode;
    },
    setPhoneExtension(sPhoneExtension) {
      this.sPhoneExtension = sPhoneExtension;
    },
    getFormatPhoneNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
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
.txt-title-form {
  font-size: 1.1rem;
  font-weight: bold;
}
.content-form-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 20px;
}
.content-form-initial::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
.content-form-initial::-webkit-scrollbar-track {
  box-shadow: transparent;
}
.content-form-initial::-webkit-scrollbar-thumb {
  background: var(--global-color-scroll) !important;
}
.content-form-initial::-webkit-scrollbar-thumb:hover {
  background: var(--global-color-scroll) !important;
}
</style>
