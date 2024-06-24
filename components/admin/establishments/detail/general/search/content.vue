<template>
  <v-app-bar
    scroll-behavior="elevate"
    density="comfortable"
    color="backgroundPanel"
    class="content-global-search"
  >
    <div class="content-btns">
      <div class="content-btn-add-search">
        <v-btn
          @click="getBack"
          class="btn-second-global btn-add"
          color="black"
          variant="outlined"
        >
          <v-icon class="ml-1">mdi mdi-arrow-left</v-icon>
          <span>Volver a Restaurantes</span>
        </v-btn>
      </div>

      <div class="content-btn-add-search">
        <v-btn
          @click="setDetailItem"
          class="btn-primary-global"
          variant="flat"
          color="primary"
        >
          <v-icon class="ml-1">mdi mdi-plus</v-icon>
          <span>Ver información del restaurante</span>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  props: {},
  data: () => ({}),
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
    },
  },
  methods: {
    getBack() {
      this.$router.push({
        name: "admin-establishments",
      });
    },
    setDetailItem() {
      this.$emit("setDetailItem");
    },
  },
};
</script>
<style scoped>
.content-global-search {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 0px 21px;
}
.content-filter-all {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}
.content-filter {
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: var(--global-color-white) !important;
  border-radius: 20px;
  padding: 3px 5px;
  box-shadow: 0px 2px 5px 0px #00000040;
}
.btn-filter {
  min-width: 100px;
}
.btn-filter:hover {
  border: 1px solid var(--global-color-black);
}

.content-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-add {
  background-color: var(--global-color-white) !important;
  width: 220px !important;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .btn-add {
    background-color: var(--global-color-white) !important;
    width: 45px !important;
    min-width: 45px !important;
    padding: 0px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
  .demoColorResponsive {
    background-color: rgb(201, 122, 83);
  }
}

/*#endregion MD */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
