<template>
  <v-row>
    <!-- #region Razón social -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Razón social</p>
      <v-text-field
        v-model="oItem.BillingInformation.sBusinessName"
        variant="outlined"
        flat
        density="comfortable"
        color="greenprimary"
        placeholder="Razón social"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Razón social -->

    <!-- #region Calle y número -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Calle y número</p>
      <v-text-field
        v-model="oItem.BillingInformation.sAddress"
        :rules="streetRulesGlobal"
        variant="outlined"
        flat
        density="comfortable"
        color="greenprimary"
        placeholder="Calle y número"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Calle y número -->

    <!-- #region Código postal -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Código postal</p>
      <v-text-field
        v-model="oItem.BillingInformation.sZipCode"
        :rules="zipRulesGlobal"
        variant="outlined"
        flat
        density="comfortable"
        color="greenprimary"
        placeholder="Código postal"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Código postal -->

    <!-- #region Especificaciones -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Especificaciones</p>
      <v-text-field
        v-model="oItem.BillingInformation.sAddressDetail"
        :rules="addressRulesGlobal"
        variant="outlined"
        flat
        density="comfortable"
        color="greenprimary"
        placeholder="Especificaciones"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Especificaciones -->

    <!-- #region Ciudad -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Ciudad</p>
      <v-text-field
        v-model="oItem.BillingInformation.sCity"
        :rules="cityRulesGlobal"
        variant="outlined"
        flat
        density="comfortable"
        color="greenprimary"
        placeholder="Ciudad"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Ciudad -->

    <!-- #region Estado -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Estado</p>
      <v-select
        v-model="oItem.BillingInformation.iStateId"
        :rules="stateRulesGlobal"
        variant="outlined"
        flat
        density="comfortable"
        placeholder="Estado"
        :menu-props="{ bottom: true, offsetY: true }"
        :items="aStates"
        item-value="iId"
        item-title="sName"
        no-data-text="No hay información"
        clearable
      >
      </v-select>
    </v-col>
    <!-- #endregion Estado -->

    <!-- #region Correo electrónico -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Correo electrónico</p>
      <v-text-field
        v-model="oItem.BillingInformation.sEmail"
        :rules="emailRulesGlobal"
        variant="outlined"
        flat
        density="comfortable"
        color="primary"
        placeholder="Correo electrónico"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Correo electrónico -->

    <!-- #region RFC -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">RFC</p>
      <v-text-field
        v-model="oItem.BillingInformation.sTaxId"
        variant="outlined"
        flat
        density="comfortable"
        color="primary"
        placeholder="RFC"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion RFC -->

    <!-- #region Telefono -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-3">Télefono</p>
      <input-phone
        v-model="oItem.BillingInformation.sPhoneNumber"
        BgColor="white"
        variant="outlined"
        :bCountryCallingCode="false"
        :sExtPhone="oItem.BillingInformation.sPhoneExtension"
        @setExtPhone="setExtPhone"
        @input="getFormatPhoneNumber('sPhoneNumber')"
      ></input-phone>
    </v-col>
    <!-- #endregion Telefono -->
  </v-row>
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
    aCountry: [],
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
    getFormatPhoneNumber(field) {
      this.oItem.BillingInformation[field] = this.getFormatPhoneNumberGlobal(
        this.oItem.BillingInformation[field]
      );
    },
  },
};
</script>
