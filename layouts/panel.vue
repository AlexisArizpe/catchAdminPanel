<template>
  <!-- #region  sidebar  -->
  <sidebar-content :bRail="bMenu" @setCloseDrawer="setCloseDrawer" />
  <!-- #endregion  sidebar -->

  <v-main class="main-panel">
    <!-- <navbar-content v-model="bMenu" /> -->
    <slot></slot>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    bMenu: false,
  }),
  methods: {
    setCloseDrawer() {
      this.bMenu = false;
    },
  },
};
</script>
<style>
.main-panel {
  background-color: var(--global-bg-color-grey-panel) !important;
  /* background-color: var(--global-color-white) !important;
  padding-left: var(--v-layout-left) !important;
  padding-top: var(--v-layout-top) !important; */
}
</style>
