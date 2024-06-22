<template>
  <p class="txt-title-content-global">Período de vigencia</p>
  <div class="content-range-date-all">
    <!-- #region Desde -->
    <v-text-field
      variant="solo"
      flat
      density="comfortable"
      color="primary"
      bg-color="grey"
      placeholder="Desde"
    >
      <template #label>
        <span class="txt-labels-form-initial-global"
          >Desde
          <span class="color-red-global">*</span>
        </span>
      </template>
    </v-text-field>
    <!-- #endregion Desde -->
    <i class="mdi mdi-arrow-right mb-5 icon-arrow-range-date"></i>
    <!-- #region Hasta -->
    <v-text-field
      variant="solo"
      flat
      density="comfortable"
      color="primary"
      bg-color="grey"
      placeholder="Hasta"
      rounded="lg"
    >
      <template #label>
        <span class="txt-labels-form-initial-global"
          >Hasta
          <span class="color-red-global">*</span>
        </span>
      </template>
    </v-text-field>
    <!-- #endregion Hasta -->
  </div>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style scoped>
.content-range-date-all {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
}
.icon-arrow-range-date {
  font-size: 1.3rem;
}
</style>
