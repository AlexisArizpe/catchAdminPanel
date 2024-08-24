<template>
  <div class="content-icon-types">
    <div class="content-item-icon-type" v-for="(oItem, i) in aCatalog" :key="i">
      <div
        @click="setActive(oItem)"
        class="content-icon-all"
        :class="oItem.bActive ? 'color-white-global bg-color-black-global' : ''"
      >
        <!-- {{oItem.sIcon}} -->
        <v-img
          class="img-icon-type"
          width="55px"
          height="55px"
          :src="oItem.sIcon"
          :class="{ active: oItem.bActive }"
        ></v-img>
        <!-- <span class="mdi icon-type" :class="oItem.sIcon"></span> -->
      </div>
      <p class="txt-icon">{{ oItem.sName }}</p>
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
.content-icon-types {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px;
}
.content-item-icon-type {
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% / 4 - 15px);
}

.content-icon-all {
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid var(--global-color-black);
  border-radius: 100%;
}

.img-icon-type {
  width: 55px;
  min-width: 55px;
  max-width: 55px;
}
.img-icon-type.active {
  filter: brightness(0) invert(1); /* Cambia a blanco */
}
.icon-type {
  font-size: 1.9em;
}
.txt-icon {
  font-size: 0.9em;
}
</style>
