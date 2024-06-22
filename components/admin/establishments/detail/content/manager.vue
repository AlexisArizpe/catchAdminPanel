<template>
  <div class="content-restaurant-user-data-all">
    <v-row class="content-restaurant-data-all ma-0">
      <!-- #region Nombres -->
      <v-col class="py-0" cols="6">
        <v-text-field
          v-model="oItem.oManager.sNameManager"
          readonly
          variant="solo"
          flat
          density="comfortable"
          color="primary"
          bg-color="grey"
          placeholder="Nombres"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global">Nombres </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Nombres -->

      <!-- #region Apellidos -->
      <v-col class="py-0" cols="6">
        <v-text-field
          v-model="oItem.oManager.sLastNameManager"
          readonly
          variant="solo"
          flat
          density="comfortable"
          color="primary"
          bg-color="grey"
          placeholder="Apellidos"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global">Apellidos </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Apellidos -->

      <!-- #region Teléfono -->
      <v-col class="py-0" cols="12" sm="12">
        <input-phone
          v-model="oItem.oManager.sPhoneManager"
          :readonly="true"
          :sCountryCallingCode="oItem.oManager.iCountryCallingCodeRestaurant"
          :sExtPhone="oItem.oManager.sExtManager"
        ></input-phone>
      </v-col>
      <!-- #endregion Teléfono -->

      <!-- #region Correo electrónico -->
      <v-col class="py-0" cols="12">
        <v-text-field
          v-model="oItem.oManager.sEmailManager"
          readonly
          variant="solo"
          flat
          density="comfortable"
          color="primary"
          bg-color="grey"
          placeholder="Correo electrónico"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Correo electrónico
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Correo electrónico -->

      <!-- #region Documentos del restaurante -->
      <v-col class="py-0" cols="12" sm="12">
        <p class="txt-title-documents">Documentos del restaurante</p>
        <docs-restaurants-content
          sTypeModule="edit"
          :aDocs="oItem.oManager.aDocs"
          :sId="oItem.oManager.sAdmissionRequestId"
          :sStatus="oItem.oManager.eStatusAdmissions"
        />
      </v-col>
      <!-- #endregion Documentos del restaurante -->
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
  async beforeMount() {},
  methods: {},
};
</script>
<style scoped>
.txt-title-documents {
  font-size: 0.9rem;
  letter-spacing: normal;
  font-weight: 400;
  margin-bottom: 5px;
}
</style>
