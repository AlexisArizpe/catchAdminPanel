<template>
  <v-row >
    <!-- #region Número de teléfono de reservaciones -->

    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-2">
        Número de teléfono de reservaciones
      </p>
      <v-text-field
        v-model="oItem.ReservationData.sCallNumber"
        :disabled="!bSuperAdmin"
        :readonly="!bSuperAdmin"
        variant="outlined"
        flat
        density="comfortable"
        color="primary"
        bg-color="white"
        placeholder="Número de teléfono de reservaciones"
        rounded="lg"
        @input="getFormatPhoneNumber('sCallNumber')"
      >
      </v-text-field>
    </v-col>
    <!-- #endregion Número de teléfono de reservaciones -->

    <!-- #region Número de teléfono de WhatsApp -->
    <v-col class="py-0" cols="12" sm="4">
      <p class="txt-subtitle-form-global mb-2">
        Número de teléfono de WhatsApp
      </p>

      <v-text-field
        v-model="oItem.ReservationData.sWhatsappNumber"
        :disabled="!bSuperAdmin"
        :readonly="!bSuperAdmin"
        variant="outlined"
        flat
        density="comfortable"
        color="primary"
        bg-color="white"
        placeholder="Número de teléfono de WhatsApp"
        rounded="lg"
        @input="getFormatPhoneNumber('sWhatsappNumber')"
        prepend-inner-icon="mdi mdi-whatsapp"
      >
      </v-text-field>
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
    getFormatPhoneNumber(field) {
      this.oItem.ReservationData[field] = this.getFormatPhoneNumberGlobal(
        this.oItem.ReservationData[field]
      );
    },
  },
};
</script>
