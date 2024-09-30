<template>
  <v-row>
    <!-- #region Número de teléfono de reservaciones -->

    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-2">
        Número de teléfono de reservaciones
      </p>
      <input-phone
        v-model="oItem.ReservationData.sCallNumber"
        variant="outlined"
        BgColor="white"
        :required="false"
        :sCountryCallingCode="oItem.ReservationData.iCallCallingCode"
        :bExtPhone="false"
        :disabled="!bSuperAdmin"
        :readonly="!bSuperAdmin"
        placeholder="Número de teléfono de reservaciones"
        @setCountryPhone="setCountryPhone($event, 'iCallCallingCode')"
        @input="getFormatPhoneNumber('sCallNumber')"
      ></input-phone>
    </v-col>
    <!-- #endregion Número de teléfono de reservaciones -->

    <!-- #region Número de teléfono de WhatsApp -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-2">
        Número de teléfono de WhatsApp
      </p>
      <input-phone
        v-model="oItem.ReservationData.sWhatsappNumber"
        variant="outlined"
        BgColor="white"
        :required="false"
        :sCountryCallingCode="oItem.ReservationData.iWhatsappCallingCode"
        :bExtPhone="false"
        :disabled="!bSuperAdmin"
        :readonly="!bSuperAdmin"
        placeholder="Número de teléfono de WhatsApp"
        @setCountryPhone="setCountryPhone($event, 'iWhatsappCallingCode')"
        @input="getFormatPhoneNumber('sWhatsappNumber')"
      ></input-phone>
    </v-col>
    <!-- #endregion Número de teléfono de WhatsApp -->

    <!-- #region Link de gestor de reservas -->

    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-2">Link de gestor de reservas</p>

      <v-text-field
        v-model="oItem.ReservationData.sReservationUrl"
        :disabled="!bSuperAdmin"
        :readonly="!bSuperAdmin"
        variant="outlined"
        flat
        density="comfortable"
        color="primary"
        bg-color="white"
        placeholder="Link de gestor de reservas"
        rounded="lg"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Link de gestor de reservas -->
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
  data: () => ({}),
  computed: {
    bSuperAdmin() {
      return this.$store.user.bSuperAdmin;
    },
  },
  methods: {
    setCountryPhone($event, iCountryCallingCode) {
      this.oItem.ReservationData[iCountryCallingCode] = $event;
    },
    getFormatPhoneNumber(field) {
      this.oItem.ReservationData[field] = this.getFormatPhoneNumberGlobal(
        this.oItem.ReservationData[field]
      );
    },
  },
};
</script>
