<template>
  <v-form ref="formRestaurante">
    <p class="txt-title-signup">Datos del restaurante</p>
    <v-divider class="mb-8 mt-3" />
    <v-row>
      <!-- <v-col class="py-0" cols="12">
        <div class="content-upload-img-all">
          <div class="content-upload-img">
            <upload-image-profile
              v-model="oItemsField.aImage"
              sMod="add"
              sModImgUpload="Circle"
              :bActiveModify="true"
            />
          </div>
        </div>
      </v-col> -->
      <!-- #region Nombre público del restaurante -->
      <v-col class="py-0" cols="12">
        <v-text-field
          v-model="oItemsField.sEstablishmentName"
          :rules="nameSingularRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
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
          v-model="oItemsField.sEstablishmentPhoneNumber"
          BgColor="white"
          :sCountryCallingCode="oItemsField.iCountryCallingCode"
          :sExtPhone="oItemsField.sEstablishmentPhoneExtension"
          @setCountryPhone="setCountryPhone"
          @setExtPhone="setExtPhone"
          @input="getFormatPhoneNumber('sEstablishmentPhoneNumber')"
        ></input-phone>
      </v-col>
      <!-- #endregion Teléfono -->

      <v-col class="py-0" cols="12">
        <p class="txt-subtitle-signup mb-3">Dirección</p>
      </v-col>
      <!-- #region Localización Maps -->
      <v-col class="py-0" cols="12" sm="12">
        <input-autocomplete-maps v-model="sTextAddress" bg-color="white" />
      </v-col>
      <!-- #endregion Localización Maps -->

      <!-- #region Calle y número -->
      <v-col class="py-0" cols="12" sm="8">
        <v-text-field
          v-model="oItemsField.sLocationAddress"
          :rules="streetRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Calle y número"
          rounded="lg"
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
          v-model="oItemsField.sLocationAddressZIPCode"
          :rules="zipRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Código postal"
          rounded="lg"
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
          v-model="oItemsField.sLocationAddressDetail"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
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
          v-model="oItemsField.sLocationAddressCity"
          :rules="cityRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Ciudad"
          rounded="lg"
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
          v-model="oItemsField.iLocationAddressState"
          :rules="stateRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
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

      <v-col class="py-0" cols="12">
        <google-map
          @setLocation="setLocation"
          @setLocationSpecific="setLocationSpecific"
          :bEdit="false"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    oItemsField: {
      type: [Object, Boolean],
      default: false,
    },
    sForm: {
      type: String,
      default: "",
    },
    bValidate: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    sTextAddress: null,
    aCountry: [],
    aStates: [],
  }),
  emits: ["setValidate"],
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
      this.oItemsField.iCountryCallingCode = sValue;
    },
    setExtPhoneRestaurant(sExtPhone) {
      this.oItemsField.sExt = sExtPhone;
    },
    getFormatPhoneNumber(field) {
      this.oItemsField[field] = this.getFormatPhoneNumberGlobal(
        this.oItemsField[field]
      );
    },
    setLocation(oLocation) {
      this.oItemsField.dLocationLatitude = oLocation.lat;
      this.oItemsField.dLocationLongitude = oLocation.lng;
    },
    setLocationSpecific(oItem) {
      const oState = this.aStates.find((e) => e.sName === oItem.sState);
      this.oItemsField.sLocationAddress = `${oItem.sStreet} ${oItem.sNumber}`;
      this.oItemsField.sLocationAddressCity = oItem.sCity;
      this.oItemsField.sLocationAddressZIPCode = oItem.sPostalCode;
      // this.oItemsField.sLocationAddressDetail = oItem.sFormattedAddress;
      this.oItemsField.iLocationAddressState = oState.iId ?? null;
    },
  },
  watch: {
    async bValidate() {
      const { valid } = await this.$refs[this.sForm].validate();
      this.$emit("setValidate", valid);
    },
  },
};
</script>
<style scoped>
.content-upload-restaurant {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: -webkit-center;
  margin-bottom: 30px;
}
.content-upload-img-all {
  height: 100%;
  width: 100%;
  padding: 10px 0px 30px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-upload-img {
  height: 150px;
  width: 150px;
}
</style>
