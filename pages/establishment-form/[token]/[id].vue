<template>
  <div>
    <NuxtLayout name="initial">
      <div class="content-form-initial">
        <div v-if="bFormSend" class="content-message-all">
          <div class="content-icon-message-global">
            <Icon
              icon="lets-icons:check-ring-light"
              class="icon-message-global"
            />
          </div>
          <p class="txt-title-message-global">¡Listo!</p>
          <p class="txt-description-message-global">
            Tu información fue incluida en tu solicitud con éxito. <br />
            ¡Pronto nos pondremos en contacto contigo!
          </p>
        </div>

        <div v-if="!bFormSend" class="content-form-initial-title-global">
          <span class="txt-initial-global"
            >Formulario de suscripción
            <span class="txt-sub-initial-global">Completa tus datos</span></span
          >
        </div>

        <div v-if="!bFormSend" class="content-form-inputs">
          <v-form ref="form">
            <div class="content-restaurant-user-data-all">
              <v-row class="content-restaurant-data-all ma-0">
                <v-col class="py-0" cols="12">
                  <p class="font-weight-bold">Datos del restaurante</p>
                  <v-divider class="mt-1 mb-4" />
                </v-col>

                <!-- #region Nombre público del restaurante -->
                <v-col class="py-0" cols="12" sm="12">
                  <v-text-field
                    v-model="sPublicNameRestaurant"
                    :rules="nameSingularRulesGlobal"
                    variant="solo"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Nombre público del restaurante"
                    rounded="lg"
                  >
                    <template #label>
                      <span class="txt-labels-form-initial-global"
                        >Nombre público del restaurante
                        <span class="color-red-global">*</span>
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- #endregion Nombre público del restaurante -->

                <!-- #region Teléfono -->
                <v-col class="py-0" cols="12" sm="12">
                  <input-phone
                    v-model="sPhoneNumberRestaurant"
                    bg-color="white"
                    :sCountryCallingCode="iCountryCallingCodeRestaurant"
                    :sExtPhone="sExtRestaurant"
                    @setCountryPhone="
                      setCountryPhone($event, 'sPhoneNumberRestaurant')
                    "
                    @setExtPhone="setExtPhone($event, 'sPhoneNumberRestaurant')"
                    @input="getFormatPhoneNumber('sPhoneNumberRestaurant')"
                  ></input-phone>
                </v-col>
                <!-- #endregion Teléfono -->
                <!-- #region Localización Maps -->
                <v-col class="py-0" cols="12" sm="12">
                  <input-autocomplete-maps
                    v-model="sTextAddress"
                    bg-color="white"
                  />
                </v-col>
                <!-- #endregion Localización Maps -->

                <!-- #region Calle y número -->
                <v-col class="py-0" cols="12" sm="8">
                  <v-text-field
                    v-model="sAddressRestaurant"
                    variant="solo"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Calle y número"
                    rounded="lg"
                    :rules="streetRulesGlobal"
                  >
                    <template #label>
                      <span class="txt-labels-form-initial-global"
                        >Calle y número
                        <span class="color-red-global">*</span>
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- #endregion Calle y número -->

                <!-- #region Código postal -->
                <v-col class="py-0" cols="12" sm="4">
                  <v-text-field
                    v-model="sZIPRestaurant"
                    variant="solo"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Código postal"
                    rounded="lg"
                    :rules="zipRulesGlobal"
                  >
                    <template #label>
                      <span class="txt-labels-form-initial-global"
                        >Código postal
                        <span class="color-red-global">*</span>
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- #endregion Código postal -->

                <!-- #region Especificaciones -->
                <v-col class="py-0" cols="12">
                  <v-text-field
                    v-model="sAddressSpecificRestaurant"
                    variant="solo"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Especificaciones"
                    rounded="lg"
                  >
                    <template #label>
                      <span class="txt-labels-form-initial-global"
                        >Especificaciones
                        <span class="color-red-global">*</span>
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- #endregion Especificaciones -->

                <!-- #region Ciudad -->
                <v-col class="py-0" cols="12" sm="6">
                  <v-text-field
                    v-model="sCityRestaurant"
                    variant="solo"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Ciudad"
                    rounded="lg"
                    :rules="cityRulesGlobal"
                  >
                    <template #label>
                      <span class="txt-labels-form-initial-global"
                        >Ciudad
                        <span class="color-red-global">*</span>
                      </span>
                    </template>
                  </v-text-field>
                </v-col>
                <!-- #endregion Ciudad -->

                <!-- #region Estado -->
                <v-col class="py-0" cols="12" sm="6">
                  <v-select
                    v-model="iStateRestaurant"
                    :menu-props="{ bottom: true, offsetY: true }"
                    class="input-global"
                    variant="solo"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    :items="aStates"
                    item-value="iId"
                    item-title="sName"
                    :placeholder="'Seleccionar estado'"
                    no-data-text="No hay información"
                    persistent-placeholder
                    clearable
                    :rules="stateRulesGlobal"
                  >
                    <template #label>
                      <span class="txt-labels-form-initial-global"
                        >Estado
                        <span class="color-red-global">*</span>
                      </span>
                    </template>
                  </v-select>
                </v-col>
                <!-- #endregion Estado -->

                <v-col class="py-0" cols="12">
                  <google-map
                    @setLocation="setLocation"
                    @setLocationSpecific="setLocationSpecific"
                    :oLocaltion="oLocaltion"
                    :bEdit="true"
                  />
                  <!-- <v-img class="img-maps" src="/img/Google%20maps.png"></v-img> -->
                </v-col>
              </v-row>
            </div>
          </v-form>
        </div>

        <div v-if="!bFormSend" class="content-form-initial-btns-global">
          <v-btn
            @click="setChange()"
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
      aImg: [],
      sEstablishmentId: null,
      sPublicNameRestaurant: null,
      iCountryCallingCodeRestaurant: 2,
      sPhoneNumberRestaurant: null,
      sExtRestaurant: null,
      sAddressRestaurant: null,
      sZIPRestaurant: null,
      sAddressSpecificRestaurant: null,
      sCityRestaurant: null,
      iStateRestaurant: null,
      dLocationLatitude: null,
      dLocationLongitude: null,
      sTextAddress: null,
      oLocaltion: {},

      sNameUser: null,
      sLastNameUser: null,
      sPhoneNumberUser: null,
      sPhoneExtensionUser: null,

      aCountry: [],
      aStates: [],

      selectedPlace: null,
      selectedPlaceSearch: null,
      places: [],
      loader: null,
      bLoading: false,
      bFormSend: false,
    };
  },
  computed: {
    sToken() {
      return this.$route.params?.token ?? null;
    },
    sId() {
      return this.$route.params?.id ?? null;
    },
    aMenuGlobal() {
      return this.$store.state.sidebar.aMenuGlobal;
    },
    bSuperAdmin() {
      return this.$store.state.user.bSuperAdmin;
    },
  },
  mounted() {
    let input = document.querySelector("input[type=password]");
    if (input) {
      input.setAttribute("autocomplete", "off");
      input.setAttribute("readonly", "true");
      input.setAttribute("onfocus", 'this.removeAttribute("readonly");');
    }
  },
  async beforeMount() {
    await this.getCountries();
    await this.getStates();
    await this.getItem();
  },
  methods: {
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
        if (this.sToken) {
          const payload = {
            headers: {
              Authorization: "Bearer " + this.sToken,
            },
            params: {},
          };
          const oResult = await this.$api.get(
            `admissions/${this.sId}`,
            payload
          );
          console.log(oResult);
          this.setFillData(oResult.data.admissionRequest);
        } else {
          this.$swal.fire({
            title: "¡Error!",
            text: "Token invalido",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
      }
    },
    setFillData(oItem) {
      this.sPublicNameRestaurant = oItem.Establishment.sName;

      this.iCountryCallingCodeRestaurant = 2;
      // oItem.Establishment.iCountryCallingCode;

      this.sPhoneNumberRestaurant = oItem.Establishment.sPhoneNumber;

      if (this.sPhoneNumberRestaurant) {
        this.getFormatPhoneNumber("sPhoneNumberRestaurant");
      }
      this.sExtRestaurant = oItem.Establishment.sPhoneExtension;
      this.sAddressRestaurant = oItem.Establishment.sLocationAddress;
      this.sZIPRestaurant = oItem.Establishment.sLocationAddressZIPCode;
      this.sAddressSpecificRestaurant =
        oItem.Establishment.sLocationAddressDetail;
      this.sCityRestaurant = oItem.Establishment.sLocationAddressCity;
      this.iStateRestaurant = oItem.Establishment.iLocationAddressState;
      this.dLocationLatitude = oItem.Establishment.dLocationLatitude;
      this.dLocationLongitude = oItem.Establishment.dLocationLongitude;
      this.oLocaltion = {
        dLat: oItem.Establishment.dLocationLatitude ?? 0,
        dLng: oItem.Establishment.dLocationLongitude ?? 0,
      };

      this.sNameUser = oItem.User.sName;
      this.sLastNameUser = oItem.User.sLastName;
      this.sPhoneNumberUser = oItem.User.sPhoneNumber;
      this.sPhoneExtensionUser = oItem.User.sPhoneExtension;
    },
    async setChange() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.bLoading = true;
          const config = {
              headers: {
                // Authorization: `Bearer ${this.sToken}`,
              },
            },
            payload = {
              sToken: this.sToken,
              Establishment: {
                sName: this.sPublicNameRestaurant,
                sPhoneNumber: this.sPhoneNumberRestaurant
                  ? this.sPhoneNumberRestaurant.replaceAll("-", "")
                  : null,
                sPhoneExtension: this.sExtRestaurant,
                iCountryCallingCode: this.iCountryCallingCodeRestaurant,
                sLocationAddress: this.sAddressRestaurant,
                sLocationAddressDetail: this.sAddressSpecificRestaurant,
                sLocationAddressCity: this.sCityRestaurant,
                iLocationAddressState: this.iStateRestaurant,
                sLocationAddressZIPCode: this.sZIPRestaurant,
                dLocationLatitude: this.dLocationLatitude,
                dLocationLongitude: this.dLocationLongitude,
              },
              User: {
                sName: this.sNameUser,
                sLastName: this.sLastNameUser,
                sPhoneNumber: this.sPhoneNumberUser
                  ? this.sPhoneNumberUser.replaceAll("-", "")
                  : null,
                sPhoneExtension: this.sPhoneExtensionUser,
              },
            };

          const oResult = await this.$api.put(
            `admissions/${this.sId}`,
            payload,
            config
          );

          // this.$swal.fire({
          //   title: "¡Listo!",
          //   text: oResult.data.message,
          //   icon: "success",
          //   confirmButtonText: "Cerrar",
          // });
          this.bFormSend = true;
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

    setCountryPhone(iCountryPhone, sTextField) {
      this[sTextField] = iCountryPhone;
    },
    setExtPhone(sExtPhone, sTextField) {
      this[sTextField] = sExtPhone;
    },
    getFormatPhoneNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
    },
    setLocation(oLocation) {
      this.dLocationLatitude = oLocation.lat;
      this.dLocationLongitude = oLocation.lng;
    },
    setLocationSpecific(oItem) {
      const oState = this.aStates.find((e) => e.sName === oItem.sState);
      this.sAddressRestaurant = `${oItem.sStreet} ${oItem.sNumber}`;
      this.sCityRestaurant = oItem.sCity;
      this.sZIPRestaurant = oItem.sPostalCode;
      // this.sAddressSpecificRestaurant = oItem.sFormattedAddress;
      this.iStateRestaurant = oState.iId ?? null;
    },
  },
};
</script>
<style scoped>
.content-form-inputs {
  width: 100%;
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

.content-img-public-name {
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
}
.content-img {
  width: 120px;
  max-width: 120px;
  min-width: 120px;
  min-height: 120px;
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
</style>
