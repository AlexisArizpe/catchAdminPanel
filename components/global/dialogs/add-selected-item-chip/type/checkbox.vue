<template>
  <div class="content-checkbox-type">
    <div
      v-for="(oItem, i) in aCatalog"
      :key="i"
      class="content-item-checkbox-type"
    >
      <div class="content-txt-checkbox">
        {{ oItem.sName }}
      </div>
      <div class="content-checkbox">
        <v-checkbox v-model="oItem.bActive" hide-details></v-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    aCatalog: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    aItems: [
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
      {
        sId: "1",
        bActive: false,
        sIcon: "mdi-close",
        sName: "Nombre de icono",
      },
    ],
  }),
  methods: {
    setActive(oItem) {
      oItem.bActive = !oItem.bActive;
    },
  },
};
</script>
<style scoped>
.content-checkbox-type {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.content-item-checkbox-type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--global-color-black);
}
.content-item-checkbox-type:nth-child(-n + 1) {
  border-top: none;
}
</style>
