<template>
  <v-form ref="form">
    <p class="txt-title-signup">Datos del usuario</p>
    <v-divider class="mb-8 mt-3" />
    <v-row>
      <!-- #region Correo electrónico -->
      <v-col class="py-0" cols="12">
        <v-text-field
          v-model="oItemsField.sEmail"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
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

      <!-- #region Contraseña -->
      <v-col class="py-0" cols="12">
        <v-text-field
          v-model="oItemsField.sPassword"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Contraseña"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Contraseña
              <span class="color-red-global">*</span>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Contraseña -->

      <!-- #region Confirmar contraseña -->
      <v-col class="py-0" cols="12">
        <v-text-field
          v-model="oItemsField.sPasswordConfirm"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Confirmar contraseña"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Confirmar contraseña
              <span class="color-red-global">*</span>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Confirmar contraseña -->
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
  },
  data: () => ({}),
};
</script>
