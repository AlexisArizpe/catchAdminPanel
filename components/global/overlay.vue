<template>
  <v-overlay
    :model-value="bOverlay"
    :persistent="true"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="greenBtn"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    bOverlay() {
      return this.$store.catalog.bOverlay;
    },
  },
};
</script>
