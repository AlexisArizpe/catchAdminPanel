<template>
  <v-app>
    <nuxt-page />
    <dialogs-message v-model="bDetail" />
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
