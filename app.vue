<template>
  <v-app>
    <nuxt-page />
    <dialogs-message v-model="bDetail" />
    <overlay />
  </v-app>
</template>
<script>
export default {
  data: () => ({}),
  computed: {
    bDetail() {
      return this.$store.message.bDialog;
    },
  },
};
</script>
