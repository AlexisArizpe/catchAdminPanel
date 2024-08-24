<template>
  <div class="content-selected-item-chips">
    <v-btn
      v-if="false"
      @click="setDialog"
      height="48px"
      class="btn-selected-item-chips"
      variant="outlined"
      block
      prepend-icon="mdi-plus"
    >
      {{ sBtnName }}
    </v-btn>
    <div class="content-items-chips">
      <table-card-loading-items v-if="bLoadingItems" />
      <table-card-empty-items
        v-else-if="aItems.filter((e) => e.bActive === true).length === 0"
      />
      <div
        v-for="(oItem, i) in aItems.filter((e) => e.bActive === true)"
        :key="i"
        class="content-item"
      >
        <span class="txt-chip">
          {{ oItem.sName }}
        </span>
        <v-btn @click="oItem.bActive = false" icon class="btn-delete-chip">
          <span class="mdi mdi-close icon-delete-chip"></span>
        </v-btn>
      </div>
    </div>

    <dialogs-add-selected-item-chip-content
      v-model="bDialogAdd"
      :sTitle="sTitleDialog"
      :sType="sType"
      :aCatalog="aItems"
    />
  </div>
</template>
<script>
export default {
  props: {
    sType: {
      type: String,
      default: "icon",
    },
    sTitleDialog: {
      type: String,
      default: "Titulo de dialog",
    },
    sBtnName: {
      type: String,
      default: "Titulo",
    },
    bLoadingItems: {
      type: Boolean,
      default: false,
    },
    aItems: {
      type: Array,
      default: [],
    },
    aCatalog: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    bDialogAdd: false,
  }),
  methods: {
    setDialog() {
      this.bDialogAdd = !this.bDialogAdd;
    },
  },
  watch: {
    aItems: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        // console.log(newVal, "newVal");
      },
    },
  },
};
</script>
<style scoped>
.btn-selected-item-chips {
  letter-spacing: normal;
  text-transform: none;
}

.content-items-chips {
  padding: 15px 0px;
  border: 1px solid #b9b9b9;
  margin-bottom: 10px;
  border-radius: 10px;
}

.content-items-chips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}
.content-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  /* width: calc(100% / 4 - 10px); */
  background-color: #b9b9b9;
  padding: 5px 10px;
  border-radius: 20px;
}

.txt-chip {
  font-size: 0.8em;
  color: var(--global-color-white);
}
.btn-delete-chip {
  height: 20px;
  max-height: 20px;
  min-height: 20px;
  width: 20px;
  max-width: 20px;
  min-width: 20px;
  background-color: transparent;
  box-shadow: none;
}
.icon-delete-chip {
  font-size: 1.2em;
  color: var(--global-color-white);
}
</style>
