<template>
  <div class="content-quantity-selected-all">
    <p class="txt-quantity-selected font-weight-bold">{{ sTitle }}</p>
    <div class="content-items-all">
      <v-btn
        v-for="(oItem, i) in aItems"
        :key="i"
        @click="oItem.bSelected = !oItem.bSelected"
        :variant="oItem.bSelected ? 'flat' : 'outlined'"
        color="primary"
        :prepend-icon="oItem.sIcon"
        class="text-none l-spacing-0 btn-quantity"
        :class="oItem.bSelected?'btn-quantity-active':'btn-quantity-selected'"
        density="comfortable"
        rounded="xl"
      >
        {{ oItem.sName }}
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sTitle: {
      type: String,
      default: "",
    },
    aItems: {
      type: Array,
      default: [],
    },
  },
  data: () => ({}),
};
</script>
<style scoped>
.content-quantity-selected-all {
}
.content-items-all {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  width: 100%;
  overflow: auto;
}
.content-items-all::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

.content-items-all::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

.content-items-all::-webkit-scrollbar-thumb {
  background: var(--global-color-scroll) !important;
  border-radius: 10px;
}

.content-items-all::-webkit-scrollbar-thumb:hover {
  background: var(--global-color-scroll) !important;
}
.txt-quantity-selected {
  font-size: 0.9rem;
  margin-bottom: 5px;
}
.btn-quantity{
  padding: 5px;
  font-size: 14px !important;
}
.btn-quantity-active{
  background-color: var(--global-color-black);
  border: solid 1px var(--global-color-black) !important;
  color: var(--global-color-white) !important;
}
.btn-quantity-selected {
  background-color: var(--global-color-grey-selected) !important;
  border: solid 1px var(--global-color-grey-selected) !important;
  color: var(--global-color-white) !important;
}
.btn-quantity-selected:hover {
  background-color: var(--global-color-white) !important;
  border: solid 1px var(--global-color-black) !important;
  color: var(--global-color-black) !important;
}
</style>
