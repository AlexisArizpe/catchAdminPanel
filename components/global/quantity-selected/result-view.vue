<template>
  <p class="txt-title-content-global font-weight-bold">{{ sTitle }}</p>
  <div class="content-txt-info">
    <div v-if="sIcon" class="content-icon">
      <span class="icon-info" :class="sIcon"></span>
    </div>
    <div>
      <div class="color-grey-global" v-html="sResult"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sType: {
      type: String,
      default: "normal",
    },
    sTitle: {
      type: String,
      default: "Titulo",
    },
    sIcon: {
      type: String,
      defualt: null,
    },
    sResult: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
};
</script>
<style scoped>
.content-txt-info {
  display: flex;
}
.content-icon {
  height: 20px !important;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.icon-info {
  font-size: 1.5rem !important;
  color: var(--global-color-txt-grey) !important;
}
</style>
