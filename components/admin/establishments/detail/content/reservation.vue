<template>
    <div class="content-restaurant-user-data-all">
      <v-row class="content-restaurant-data-all ma-0">
        <!-- #region Número de teléfono de reservaciones -->
        <v-col class="py-0" cols="12">
          <v-text-field
            readonly
            variant="solo"
            flat
            density="comfortable"
            color="primary"
            bg-color="grey"
            placeholder="Número de teléfono de reservaciones"
            rounded="lg"
          >
            <template #label>
              <span class="txt-labels-form-initial-global">Número de teléfono de reservaciones </span>
            </template>
          </v-text-field>
        </v-col>
        <!-- #endregion Número de teléfono de reservaciones -->
  
        <!-- #region Número de teléfono de WhatsApp -->
        <v-col class="py-0" cols="12">
          <v-text-field
            readonly
            variant="solo"
            flat
            density="comfortable"
            color="primary"
            bg-color="grey"
            placeholder="Número de teléfono de WhatsApp"
            rounded="lg"
          >
            <template #label>
              <span class="txt-labels-form-initial-global">Número de teléfono de WhatsApp </span>
            </template>
          </v-text-field>
        </v-col>
        <!-- #endregion Número de teléfono de WhatsApp -->
  
        <!-- #region Link de gestor de reservas -->
        <v-col class="py-0" cols="12">
          <v-text-field
            readonly
            variant="solo"
            flat
            density="comfortable"
            color="primary"
            bg-color="grey"
            placeholder="Link de gestor de reservas"
            rounded="lg"
          >
            <template #label>
              <span class="txt-labels-form-initial-global">Link de gestor de reservas </span>
            </template>
          </v-text-field>
        </v-col>
        <!-- #endregion Link de gestor de reservas -->
  

      </v-row>
    </div>
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
  };
  </script>
  