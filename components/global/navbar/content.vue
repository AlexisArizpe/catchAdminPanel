<template>
  <v-app-bar
    app
    class="content-app-bar-all"
    color="transparent"
    scroll-behavior="elevate"
    density="comfortable"
    >
    <!-- :height="190" -->
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="bMenu = !bMenu"></v-app-bar-nav-icon>
    </template>

    <!-- <v-app-bar-title>{{bMenu}}</v-app-bar-title> -->

    <template v-slot:append>
      <core-navbar-btn-user-profile></core-navbar-btn-user-profile>
    </template>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    bMenu: false,
  }),
  emits: ["update:modelValue"],
  methods: {
    setAlert() {
      // this.$toast.success("Lorem Ipsum is simply dummy text of the printing and")
      // this.$store.alert.success("Lorem Ipsum is simply dummy text of the printing and ")
      // this.$store.alert.success("aqui")
    },
  },
  watch: {
    bMenu() {
      this.$emit("update:modelValue", this.bMenu);
    },
  },
};
</script>
<style>
.content-app-bar-all {
  padding: 4px 4px !important;
}
</style>
