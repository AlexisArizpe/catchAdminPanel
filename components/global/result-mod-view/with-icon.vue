<template>
  <div class="content-result-mod-view-all">
    <div class="content-icon">
      <span class="icon-result" :class="sIcon"></span>
    </div>
    <div class="content-txt">
      <p class="txt-title-mod-view">
        {{ sTitle }}
      </p>

      <p class="txt-result-mod-view">
        {{ sResult }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sTitle: {
      type: String,
      default: "Titulo",
    },
    sResult: {
      type: [String, Number],
      default: "Resultado",
    },
    sIcon: {
      type: String,
      default: "",
    },
    sTypeResult: {
      type: String,
      default: "Normal",
    },
  },
  data: () => ({}),
};
</script>
<style scoped>
.content-result-mod-view-all {
  display: flex;
  gap: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.content-icon {
  border-radius: 5px;
  height: 40px;
  width: 40px;
  max-width: 40px;
  min-width: 40px;
  background-color: #e3e0dc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-result {
  font-size: 1.4rem;
}
.content-txt {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.txt-title-mod-view {
  font-weight: bold;
  font-size: 0.8rem;
  color: var(--global-color-black);
}
.txt-result-mod-view {
  font-size: 0.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
