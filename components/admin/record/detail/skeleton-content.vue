<template>
  <div>
    <!-- #region Información general -->
    <core-dividers-with-txt
      sNameDivider="Información general"
    ></core-dividers-with-txt>

    <v-row>
      <!-- #region campo de Folio -->
      <v-col class="pb-0" cols="12" sm="4" md="3" lg="3" xl="3">
        <div class="content-txt-result-global">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </v-col>
      <!-- #endregion campo de Folio -->

      <!-- #region campo de nombre -->
      <v-col class="pb-0" cols="12" sm="4" md="3" lg="3" xl="3">
        <div class="content-txt-result-global">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </v-col>
      <!-- #endregion campo de nombre -->

      <!-- #region campo de Correo electrónico -->
      <v-col class="pb-0" cols="12" sm=" 4" md="3" lg="3" xl="3">
        <div class="content-txt-result-global">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </v-col>
      <!-- #endregion campo de Correo electrónico -->

      <!-- #region campo de Teléfono-->
      <v-col class="pb-0" cols="12" sm="4" md="3" lg="3" xl="3">
        <div class="content-txt-result-global">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </v-col>
      <!-- #endregion campo de Teléfono -->

      <!-- #region campo de Fecha de registro-->
      <v-col class="pb-0" cols="12" sm="4" md="3" lg="3" xl="3">
        <div class="content-txt-result-global">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </v-col>
      <!-- #endregion campo de Fecha de registro -->

      <!-- #region campo de Creado por-->
      <v-col class="pb-0" cols="12" sm="4" md="3" lg="3" xl="3">
        <div class="content-txt-result-global">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
      </v-col>
      <!-- #endregion campo de Creado por -->
    </v-row>

    <!-- #region permissions table -->
    <core-dividers-with-txt
      sNameDivider="Módulos"
      class="mt-8 mb-6"
    ></core-dividers-with-txt>

    <core-permissions-skeleton-table-component></core-permissions-skeleton-table-component>

    <!-- #endregion permissions table -->

    <!-- #region actions btns  -->
    <v-divider class="mt-8 mb-0 content-divider-full-global"></v-divider>

    <core-actions-btns-skeleton-edit></core-actions-btns-skeleton-edit>
    <!-- #endregion actions btns  -->

    <!-- #endregion Información general -->
  </div>
</template>
<script>
export default {
  props: {
    bMobile: Boolean,
    bTablet: Boolean,
  },
  data: () => ({
    sToReturn: "admin-administrators",
  }),
};
</script>
