<template>
  <div class="content-card-registration-all">
    <div class="content-card-registration">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.content-card-registration-all {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  height: 100dvh;
  background-color: var(--global-bg-color-grey-panel);
}
</style>
