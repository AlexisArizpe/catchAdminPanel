<template>
  <div class="content-result-mod-view-all">
    <p class="txt-title-mod-view">
      {{ sTitle }}
    </p>

    <p class="txt-result-mod-view"  :class="[sResult ?? 'txt-empty-global',sTypeResult === 'Description'?'txt-description':'']">
      {{ sResult ?? "No hay información" }}
    </p>
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
    sTypeResult: {
      type: String,
      default: "Normal",
    },
  },
  data: () => ({}),
};
</script>
<style scoped>
.content-txt {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.txt-title-mod-view {
  font-weight: bold;
  font-size: .9rem;
  color: var(--global-color-black);
}
.txt-result-mod-view {
  font-size: 0.8rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: 0px;
}
.txt-description{
  white-space: inherit !important;
}
</style>
