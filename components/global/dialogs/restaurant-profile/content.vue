<template>
  <v-dialog v-model="bDialog" width="550px">
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
              <upload-image-profile
                v-model="aImg"
                :aImg="aImg"
                sMod="edit"
                sModImgUpload="Circle"
                :bActiveModify="bEditPermission"
              />
              <!-- <div class="img-profile">
                <span class="mdi mdi-account icon-profile"></span>
              </div> -->
            </div>
            <!-- #region Nombre público del restaurante -->
            <div class="content-text-filed-public-name">
              <v-text-field
                v-model="sPublicNameRestaurant"
                :rules="nameSingularRulesGlobal"
                :disabled="!bEditPermission"
                variant="solo"
                flat
                density="comfortable"
                color="primary"
                bg-color="grey"
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
            </div>
            <!-- #endregion Nombre público del restaurante -->
          </div>
          <!-- #endregion Imagen de perfil y nombre publico de restaurant -->

          <div class="content-restaurant-user-data-all">
            <v-row class="content-restaurant-data-all ma-0">
              <v-col class="py-0" cols="12">
                <p class="font-weight-bold">Datos del restaurante</p>
                <v-divider class="mt-1 mb-4" />
              </v-col>
              <!-- #region Teléfono -->
              <v-col class="py-0" cols="12" sm="12">
                <input-phone
                  v-model="sPhoneRestaurant"
                  :disabled="!bEditPermission"
                  :sCountryCallingCode="iCountryCallingCodeRestaurant"
                  :sExtPhone="sExtRestaurant"
                  @setCountryPhone="setCountryPhoneRestaurant"
                  @setExtPhone="setExtPhoneRestaurant"
                  @input="getFormatPhoneNumber('sPhoneRestaurant')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->
              <!-- #region Localización Maps -->
              <v-col class="py-0" cols="12" sm="12">
                <input-autocomplete-maps
                  v-model="sTextAddress"
                  :disabled="!bEditPermission"
                />
              </v-col>
              <!-- #endregion Localización Maps -->

              <!-- #region Calle y número -->
              <v-col class="py-0" cols="12" sm="8">
                <v-text-field
                  v-model="sAddressRestaurant"
                  :disabled="!bEditPermission"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
                  :disabled="!bEditPermission"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
                  :disabled="!bEditPermission"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Especificaciones"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Especificaciones
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Especificaciones -->

              <!-- #region Ciudad -->
              <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                  v-model="sCityRestaurant"
                  :disabled="!bEditPermission"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
                  :disabled="!bEditPermission"
                  :menu-props="{ bottom: true, offsetY: true }"
                  class="input-global"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
      </v-card-text>

      <v-card-actions class="content-actions-user-profile">
        <v-btn
          v-if="bEditPermission"
          @click="setChange()"
          block
          class="btn-primary-global"
          variant="flat"
          color="primary"
          :loading="bLoadingBtnEdit"
        >
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    bDialog: false,

    aImg: [],
    sEstablishmentId: null,
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
    sTextAddress: null,
    oLocaltion: {},
    sNameManager: null,
    sLastNameManager: null,
    iCountryCallingCodeManager: null,
    sPhoneManager: null,
    sExtManager: null,
    sEmailManager: null,

    aCountry: [],
    aStates: [],

    bLoadingBtnEdit: false,

    selectedPlace: null,
    selectedPlaceSearch: null,
    places: [],
    loader: null,
  }),
  computed: {
    sUserId() {
      return this.$store.user.sUserId;
    },
    bSuperAdmin() {
      return this.$store.user.bSuperAdmin;
    },
    bEditPermission() {
      let sIdDash = "4ccb3662-f7d6-4d0e-af7d-f238bfabdf96";
      let oDash =
        this.$store.menu.aMenuFilterGlobal.find((e) => e.sId === sIdDash) ??
        null;
      return this.bSuperAdmin
        ? true
        : oDash?.sActions === "WRITE"
        ? true
        : false;
    },
  },
  mounted() {
    this.loader = new Loader({
      apiKey: "AIzaSyBRDxB67vNls8sVYKRdLU-8XPFhCRhzX6s",
      libraries: ["places"],
    });
  },
  emits: ["update:modelValue"],
  methods: {
    setCloseDialog() {
      this.bDialog = false;
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
        const oResult = await this.$api.get(
          `establishments/${this.$store.user.sEstablishmentId}`,
          payload
        );
        this.setFillData(oResult.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    setFillData(oItem) {
      this.aImg = [
        {
          sId: "123",
          sUrl: oItem.establishment.sImageKey
            ? oItem.establishment.oImages.xlg
            : null,
        },
      ];
      this.sEstablishmentId = oItem.establishment.sEstablishmentId;
      this.sPublicNameRestaurant = oItem.establishment.sName;
      this.iCountryCallingCodeRestaurant =
        oItem.establishment.iCountryCallingCode;
      this.sPhoneRestaurant = oItem.establishment.sPhoneNumber;
      this.getFormatPhoneNumber("sPhoneRestaurant");
      this.sExtRestaurant = oItem.establishment.sPhoneExtension;
      this.sAddressRestaurant = oItem.establishment.sLocationAddress;
      this.sZIPRestaurant = oItem.establishment.sLocationAddressZIPCode;
      this.sAddressSpecificRestaurant =
        oItem.establishment.sLocationAddressDetail;
      this.sCityRestaurant = oItem.establishment.sLocationAddressCity;
      this.iStateRestaurant = oItem.establishment.iLocationAddressState;
      this.dLocationLatitude = oItem.establishment.dLocationLatitude;
      this.dLocationLongitude = oItem.establishment.dLocationLongitude;
      this.oLocaltion = {
        dLat: oItem.establishment.dLocationLatitude,
        dLng: oItem.establishment.dLocationLongitude,
      };

      this.sNameManager = "Alexiz Israel";
      this.sLastNameManager = "Arizpe Orocio";
      this.sPhoneManager = "8130988331";
      this.getFormatPhoneNumber("sPhoneManager");
      this.sExtManager = null;
      this.sEmailManager = "alexizarizpe@gmail.com";
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
              sName: this.sPublicNameRestaurant,
              sPhoneNumber: this.sPhoneRestaurant
                ? this.sPhoneRestaurant.replaceAll("-", "")
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
            };

          const oResult = await this.$api.patch(
            `establishments`,
            payload,
            config
          );
          if (this.aImg[0].file) {
            await this.setAddImg();
          }
          this.$store.table.setRefresh(true);
          this.$store.user.setEstablishmentName(
            oResult.data.establishment[0].sName
          );
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
    async setAddImg() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const formData = new FormData();
        if (this.aImg.length > 0) {
          formData.append("aImage", this.aImg[0].file);
        }
        // ?bDeleteImage=${false}
        await this.$api.post(
          `establishments/images/${this.sEstablishmentId}`,
          formData,
          config
        );
      } catch (error) {
        console.log(error);
      }
    },
    setCountryPhoneRestaurant(sValue) {
      this.iCountryCallingCodeRestaurant = sValue;
    },
    setExtPhoneRestaurant(sExtPhone) {
      this.sExtRestaurant = sExtPhone;
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
  watch: {
    async modelValue() {
      this.bDialog = this.modelValue;
      if (this.bDialog) {
        await this.getCountries();
        await this.getStates();
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

.content-actions-user-profile {
  display: flex;
  margin: 10px 0px;
  padding: 20px 100px;
  justify-content: center;
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
    padding: 20px 30px;
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
    padding: 20px 30px;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
