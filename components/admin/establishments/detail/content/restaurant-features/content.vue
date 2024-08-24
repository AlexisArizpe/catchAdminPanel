<template>
  <v-form ref="formRestaurante">
    <v-row>
      <!-- #region Categoría de comida, Comidas que sirven -->
      <v-col cols="12" sm="4">
        <v-row>
          <!-- #region Categoría de comida -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Categoría de comida</p>
          </v-col>
          <v-col class="py-0" cols="12" sm="12">
            <selected-item-chips-content
              sBtnName="Seleccionar categorías"
              sTitleDialog="categorias de comida"
              sType="icon"
              :aItems="oItem.Categories"
            />
          </v-col>
          <!-- #endregion Categoría de comida -->

          <!-- #region Comidas que sirven -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Comidas que sirven</p>
          </v-col>

          <v-col class="py-0" cols="12">
            <selected-item-checkbox-content :aItems="oItem.FoodTypes" />
          </v-col>
          <!-- #endregion Comidas que sirven -->
        </v-row>
      </v-col>
      <!-- #endregion Categoría de comida, Comidas que sirven -->

      <!-- #region Chef, Opciones de pago, Rango de precio -->
      <v-col cols="12" sm="4">
        <v-row>
          <!-- #region Chef -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Chef</p>
          </v-col>
          <v-col class="py-0" cols="12" sm="12">
            <v-text-field
              v-model="oItem.sChefName"
              variant="outlined"
              flat
              density="comfortable"
              color="primary"
              bg-color="white"
              placeholder="Nombre del chef"
              rounded="lg"
              :rules="cityRulesGlobal"
            >
            </v-text-field>
          </v-col>
          <!-- #endregion Chef -->

          <!-- #region Opciones de pago -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Opciones de pago</p>
          </v-col>

          <v-col class="py-0" cols="12">
            <selected-item-checkbox-content :aItems="oItem.PaymentOptions" />
          </v-col>
          <!-- #endregion Opciones de pago -->

          <!-- #region Rango de precio -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">Rango de precio</p>
          </v-col>

          <v-col class="py-0" cols="12">
            <selected-item-checkbox-content
              v-model="oItem.oAmenities.ePriceRange"
              :aItems="aPriceRange"
              :sValue="oItem.oAmenities.ePriceRange"
              eType="unitary"
            />
          </v-col>

          <!-- #endregion Rango de precio -->
        </v-row>
      </v-col>
      <!-- #endregion Chef, Opciones de pago, Rango de precio -->

      <!-- #region Características y amenidades del restaurante -->
      <v-col cols="12" sm="4">
        <v-row>
          <!-- #region Link al menú digital -->
          <v-col class="py-0" cols="12">
            <p class="txt-subtitle-form-global mb-2">
              Características y amenidades del restaurante
            </p>
          </v-col>

          <v-col class="py-0" cols="12" sm="12">
            <selected-item-chips-content
              sBtnName="Seleccionar características y amenidades"
              sTitleDialog="características"
              sType="checkbox"
              :aItems="oItem.oAmenities.Amenities"
            />
          </v-col>
          <!-- #endregion Link al menú digital -->
        </v-row>
      </v-col>
      <!-- #endregion Características y amenidades del restaurante -->
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
    aPriceRange: [
      {
        sId: "$",
        sName: "$",
      },
      {
        sId: "$$",
        sName: "$$",
      },
      {
        sId: "$$$",
        sName: "$$$",
      },
      {
        sId: "$$$$",
        sName: "$$$$",
      },
    ],
  }),
  computed: {
    bSuperAdmin() {
      return this.$store.user.bSuperAdmin;
    },
  },
};
</script>
