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
          <!-- #region Imagen de perfil y nombre publico de restaurant -->
          <div class="content-img-public-name">
            <div class="content-img">
              <div class="img-profile">
                <span class="mdi mdi-account icon-profile"></span>
              </div>
            </div>
            <!-- <p class="font-weight-bold mt-2">ESTABLECIMIENTO</p> -->
            <p class="font-weight-bold mt-2">{{ oItem.sFullName }}</p>
          </div>
          <!-- #endregion Imagen de perfil y nombre publico de restaurant -->

          <div class="content-restaurant-user-data-all">
            <v-row class="content-user-data-all ma-0">
              <v-col class="py-0" cols="12">
                <p class="font-weight-bold">Datos del usuario</p>
                <v-divider class="mt-1 mb-4" />
              </v-col>

              <!-- #region Nombres -->
              <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                  v-model="sNameManager"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
              <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                  v-model="sLastNameManager"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
              <v-col class="py-0" cols="12" sm="12">
                <input-phone
                  v-model="sPhoneManager"
                  :sCountryCallingCode="iCountryCallingCodeManager"
                  :sExtPhone="sExtManager"
                  @setCountryPhone="setCountryPhoneManager"
                  @setExtPhone="setExtPhoneManager"
                  @input="getFormatPhoneNumber('sPhoneManager')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->

              <!-- #region Correo del encargado -->
              <!-- <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="sEmailManager"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Correo del encargado"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Correo del encargado
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col> -->
              <!-- #endregion Correo del encargado -->
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
          width="200px"
          :loading="bLoadingBtnEdit"
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

    oItem: {},

    sPublicNameRestaurant: null,
    iCountryCallingCodeRestaurant: null,
    sPhoneRestaurant: null,
    sExtRestaurant: null,
    sAddressRestaurant: null,
    sZIPRestaurant: null,
    sAddressSpecificRestaurant: null,
    sCityRestaurant: null,
    iStateRestaurant: null,
    dLocationLatitude: null,
    dLocationLongitude: null,

    sNameManager: null,
    sLastNameManager: null,
    iCountryCallingCodeManager: null,
    sPhoneManager: null,
    sExtManager: null,
    sEmailManager: null,

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
      this.iCountryCallingCode = null;
    },
    async getCountries() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`countries`, payload);
        this.aCountry = oResult.data.countries.map((e) => {
          return {
            iId: e.iCountryId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getStates() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`countries/2/states`, payload);
        this.aStates = oResult.data.states.results.map((e) => {
          return {
            iId: e.iStateId,
            iCountryId: e.iCountryId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getItem() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`auth/me`, payload);
        this.setFillData(oResult.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    setFillData(oItem) {
      this.oItem = {
        sFullName: `${oItem.user.sName} ${oItem.user.sLastName}`,
        sRole: "",
      };
      this.sNameManager = oItem.user.sName;
      this.sLastNameManager = oItem.user.sLastName;
      this.iCountryCallingCodeManager =
        oItem.user.CountryCallingCode.iCountryId;
      this.sPhoneManager = oItem.user.sPhoneNumber;
      this.getFormatPhoneNumber("sPhoneManager");
      this.sExtManager = oItem.user.sPhoneExtension;
      this.sEmailManager = oItem.user.sEmail;
    },
    async setChange() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.bLoadingBtnEdit = true;
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {
              sName: this.sNameManager,
              sLastName: this.sLastNameManager,
              iCountryCallingCode: this.iCountryCallingCodeManager,
              sPhoneNumber: this.sPhoneManager,
              sPhoneExtension: this.sExtManager,
            };

          const oResult = await this.$api.patch(`auth/me`, payload, config);

          this.setCloseDialog();
          this.$swal.fire({
            title: "¡Actualizado!",
            text: oResult.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });

          this.bLoadingBtnEdit = false;
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
    setCountryPhoneManager(sValue) {
      this.iCountryCallingCodeManager = sValue;
    },
    setExtPhoneManager(sExtPhone) {
      this.sExtManager = sExtPhone;
    },
    getFormatPhoneNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
    },
  },
  watch: {
    async modelValue() {
      this.bDialog = this.modelValue;
      if (this.bDialog) {
        await this.getItem();
      }
    },
    bDialog() {
      this.$emit("update:modelValue", this.bDialog);
    },
  },
};
</script>
<style scoped>
.content-img-public-name {
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: center;
  justify-content: center;
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
  padding: 20px 10px;
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
    padding: 20px 10px;
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
    padding: 20px 10px;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
