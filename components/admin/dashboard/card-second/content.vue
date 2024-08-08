<template>
  <div class="content-card-second-all">
    <div
      v-if="bLoadingItems"
      v-for="(_, iLoading) in 5"
      :key="iLoading"
      class="content-item-card"
    >
      <div class="content-color content-color-loading" ></div>
      <div class="content-title-result">
        <div class="txt-title">
          <v-skeleton-loader type="text"></v-skeleton-loader>
        </div>
        <v-skeleton-loader type="text"></v-skeleton-loader>

      </div>
    </div>
    <div v-else v-for="(oItem, i) in aItems" :key="i" class="content-item-card">
      <div class="content-color" :class="oItem.sColor"></div>
      <div class="content-title-result">
        <div class="txt-title" v-html="oItem.sTitle"></div>
        <p class="txt-result">{{ oItem.sValue }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    aItems: {
      type: Array,
      default: [],
    },
    bLoadingItems: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
};
</script>
<style scoped>
.content-card-second-all {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 0px 20px 0px;
  /* overflow: auto; */
}
.content-card-second-all::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
.content-card-second-all::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}
.content-card-second-all::-webkit-scrollbar-thumb {
  background: var(--global-color-scroll) !important;
  border-radius: 10px;
}
.content-card-second-all::-webkit-scrollbar-thumb:hover {
  background: var(--global-color-scroll) !important;
}

.content-item-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--global-color-white);
  min-width: 222px;
  border-radius: 10px;
  min-height: 110px;
  max-height: 110px;
  box-shadow: 0px 4px 10px var(--global-color-box-shadow);
}

.content-color {
  position: absolute;
  left: 0px;
  max-width: 20px;
  min-width: 20px;
  width: 20px;
  height: 100%;
}
.content-color-loading{
  background-color: var(--global-color-black);
}
.content-title-result {
  width: 100%;
  padding: 20px 20px 20px 30px;
}
.txt-title {
  font-size: 0.8rem;
}
.txt-result {
  font-size: 1.1rem;
  font-weight: 700;
}
</style>
