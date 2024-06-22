<template>
  <div  class="content-restaurant-user-data-all">
    <v-row class="content-restaurant-data-all ma-0">
      <!-- #region Teléfono -->
      <v-col class="py-0" cols="12" sm="12">
        <input-phone
          v-model="oItem.oRestaurant.sPhoneRestaurant"
          :readonly="true"
          :sCountryCallingCode="oItem.oRestaurant.iCountryCallingCodeRestaurant"
          :sExtPhone="oItem.oRestaurant.sExtRestaurant"
        ></input-phone>
      </v-col>
      <!-- #endregion Teléfono -->

      <!-- #region Localización Maps -->
      <!-- <v-col class="py-0" cols="12" sm="12">
                <input-autocomplete-maps
                  v-model="sTextAddress"
                  :disabled="!bEditPermission"
                />
              </v-col> -->
      <!-- #endregion Localización Maps -->

      <!-- #region Calle y número -->
      <v-col class="py-0" cols="12" sm="8">
        <v-text-field
          v-model="oItem.oRestaurant.sAddressRestaurant"
          readonly
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
          v-model="oItem.oRestaurant.sZIPRestaurant"
          readonly
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
          v-model="oItem.oRestaurant.sAddressSpecificRestaurant"
          readonly
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
          v-model="oItem.oRestaurant.sCityRestaurant"
          readonly
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
        <v-text-field
          v-model="oItem.oRestaurant.iStateRestaurant"
          readonly
          class="input-global"
          variant="solo"
          flat
          density="comfortable"
          color="primary"
          bg-color="grey"
          :rules="stateRulesGlobal"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Estado
              <span class="color-red-global">*</span>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Estado -->

      <!-- #region google map -->
      <v-col class="py-0" cols="12">
        <google-map
          @setLocation="setLocation"
          @setLocationSpecific="setLocationSpecific"
          :oLocaltion="oItem.oRestaurant.oLocaltion"
          :bEdit="true"
        />
        <!-- <v-img class="img-maps" src="/img/Google%20maps.png"></v-img> -->
      </v-col>
      <!-- #endregion google map -->
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
