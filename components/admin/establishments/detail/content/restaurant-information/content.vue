<template>
  <v-form ref="formRestaurante">
    <v-row>
      <!-- #region Dirección del restaurante -->
      <v-col cols="12" sm="4">
        <v-row>
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">
              Dirección del restaurante
            </p>
          </v-col>

          <!-- #region Localización Maps -->
          <v-col v-if="bSuperAdmin" class="py-0" cols="12" sm="12">
            <input-autocomplete-maps
              v-model="sTextAddress"
              variant="outlined"
              bg-color="white"
            />
          </v-col>
          <!-- #endregion Localización Maps -->

          <!-- #region Calle y número -->
          <v-col class="py-0" cols="12" sm="8">
            <v-text-field
              v-model="oItem.sLocationAddress"
              :readonly="!bSuperAdmin"
              :disabled="!bSuperAdmin"
              variant="outlined"
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
              v-model="oItem.sLocationAddressZIPCode"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              variant="outlined"
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
              v-model="oItem.sLocationAddressDetail"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              variant="outlined"
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
                </span>
              </template>
            </v-text-field>
          </v-col>
          <!-- #endregion Especificaciones -->

          <!-- #region Ciudad -->
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              v-model="oItem.sLocationAddressCity"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              variant="outlined"
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
              v-model="oItem.iLocationAddressState"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              :rules="stateRulesGlobal"
              variant="outlined"
              flat
              density="comfortable"
              color="primary"
              bg-color="white"
              label="Estado"
              placeholder="Estado"
              :menu-props="{ bottom: true, offsetY: true }"
              :items="aStates"
              item-value="iId"
              item-title="sName"
              no-data-text="No hay información"
              clearable
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

          <!-- #region google map -->
          <v-col class="py-0" cols="12">
            <google-map
              @setLocation="setLocation"
              @setLocationSpecific="setLocationSpecific"
              :oLocaltion="{
                dLat: oItem.dLocationLatitude,
                dLng: oItem.dLocationLongitude,
              }"
              :bEdit="true"
            />
            <!-- <v-img class="img-maps" src="/img/Google%20maps.png"></v-img> -->
          </v-col>
          <!-- #endregion google map -->
        </v-row>
      </v-col>
      <!-- #endregion Dirección del restaurante -->

      <!-- #region Telefono, Página web y Redes sociales -->
      <v-col cols="12" sm="4">
        <v-row>
          <!-- #region Teléfono -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Teléfono</p>
          </v-col>
          <v-col class="py-0" cols="12" sm="12">
            <input-phone
              v-model="oItem.sPhoneNumber"
              variant="outlined"
              BgColor="white"
              :required="false"
              :sCountryCallingCode="oItem.iCountryCallingCode"
              :sExtPhone="oItem.sPhoneExtension"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              @setCountryPhone="setCountryPhoneRestaurant"
              @setExtPhone="setExtPhoneRestaurant"
              @input="getFormatPhoneNumber('sPhoneNumber')"
            ></input-phone>
          </v-col>
          <!-- #endregion Teléfono -->

          <!-- #region Página web -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Página web</p>
          </v-col>

          <v-col class="py-0" cols="12" sm="12">
            <v-text-field
              v-model="oItem.sWebsiteUrl"
              :rules="linkRulesGlobal"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              variant="outlined"
              flat
              density="comfortable"
              color="primary"
              bg-color="white"
              placeholder="Página web"
              rounded="lg"
              prepend-inner-icon="mdi mdi-web"
            >
            </v-text-field>
          </v-col>
          <!-- #endregion Página web -->

          <!-- #region Redes sociales -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Redes sociales</p>
          </v-col>

          <!-- #region Link de instagram -->
          <v-col class="py-0" cols="12" sm="12">
            <v-text-field
              v-model="oItem.sInstagramUrl"
              :rules="linkRulesGlobal"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              variant="outlined"
              flat
              density="comfortable"
              color="primary"
              bg-color="white"
              placeholder="Link de instagram"
              rounded="lg"
              prepend-inner-icon="mdi mdi-instagram"
            >
            </v-text-field>
          </v-col>
          <!-- #endregion Link de instagram -->

          <!-- #region Link de facebook -->
          <v-col class="py-0" cols="12" sm="12">
            <v-text-field
              v-model="oItem.sFacebookUrl"
              :rules="linkRulesGlobal"
              :disabled="!bSuperAdmin"
              :readonly="!bSuperAdmin"
              variant="outlined"
              flat
              density="comfortable"
              color="primary"
              bg-color="white"
              placeholder="Link de facebook"
              rounded="lg"
              prepend-inner-icon="mdi mdi-facebook"
            >
            </v-text-field>
          </v-col>
          <!-- #endregion Link de facebook -->

          <!-- #endregion Redes sociales -->
        </v-row>
      </v-col>
      <!-- #endregion Telefono, Página web y Redes sociales -->

      <!-- #region Links de menus y horarios de apertura -->
      <v-col cols="12" sm="4">
        <v-row>
          <!-- #region Link al menú digital -->
          <v-col class="py-0" cols="12" sm="12">
            <admin-establishments-detail-content-restaurant-information-pdf-menu
              :oItem="oItem"
            />
          </v-col>
          <!-- #endregion Link al menú digital -->

          <!-- #region Horarios de apertura -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-3">Horarios de apertura</p>
          </v-col>

          <v-col class="py-0" cols="12" sm="12">
            <admin-establishments-detail-content-restaurant-information-opening-hours
              :oItem="oItem"
            />
          </v-col>
          <!-- #endregion Horarios de apertura -->
        </v-row>
      </v-col>
      <!-- #endregion Links de menus y horarios de apertura -->
      
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    oItem: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    sTextAddress: null,
    aStates: [],
  }),
  computed: {
    bSuperAdmin() {
      return this.$store.user.bSuperAdmin;
    },
  },
  async beforeMount() {
    await this.getCountries();
    await this.getStates();
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
    setCountryPhoneRestaurant(sValue) {
      this.oItem.iCountryCallingCode = sValue;
    },
    setLocation(oLocation) {
      this.oItem.dLocationLatitude = oLocation.lat;
      this.oItem.dLocationLongitude = oLocation.lng;
    },
    setLocationSpecific(oItem) {
      const oState = this.aStates.find((e) => e.sName === oItem.sState);
      this.oItem.sLocationAddress = `${oItem.sStreet} ${oItem.sNumber}`;
      this.oItem.sLocationAddressZIPCode = oItem.sPostalCode;
      this.oItem.sLocationAddressCity = oItem.sCity;
      this.oItem.iLocationAddressState = oState.iId ?? null;
    },
    setExtPhoneRestaurant(sExtPhone) {
      this.oItem.sPhoneExtension = sExtPhone;
    },
    getFormatPhoneNumber(field) {
      this.oItem[field] = this.getFormatPhoneNumberGlobal(this.oItem[field]);
    },
  },
};
</script>
<style scoped></style>
