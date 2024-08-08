<template>
  <div class="content-card-primary-all">
    <div v-for="(oItem, i) in aItems" :key="i" class="content-item-card">
      <div class="content-header-card">
        {{ oItem.sName }}
      </div>
      <div class="content-txt-card">
        {{ oItem.sValue }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    aItems: {
      type: Array,
      default: [
        {
          sName: "Ventas totales",
          sValue: "1,000",
        },
        {
          sName: "Ticket promedio",
          sValue: "$ 1,000",
        },
      ],
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
.content-card-primary-all {
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 200px;
}
.content-item-card {
  background-color: var(--global-color-white);
  min-width: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 10px var(--global-color-box-shadow);
}
.content-header-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  background-color: var(--global-color-black);
  min-height: 40px;
  font-size: 1.1rem;
  color: var(--global-color-yellow-primary);
}
.content-txt-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 60px;
  font-weight: 800;
  font-size: 1.3rem;
  padding: 15px;
}
</style>
