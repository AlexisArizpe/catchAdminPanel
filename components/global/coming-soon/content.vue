<template>
  <div class="content-coming-soon-all">
    <div class="content-icon">
      <img class="img-coming-soon" src="/img/logo-coming-soon.png" />
    </div>
    <p class="txt-soon">Proximamente</p>
    <p class="txt-soon-description">
      Estamos trabajando en la construcción de esta sección
    </p>
  </div>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
<style scoped>
.content-coming-soon-all {
  width: 100%;
  height: calc(100vh - 120px);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--global-color-black);
  border-radius: 100%;
  height: 90px;
  min-height: 90px;
  max-height: 90px;
  width: 90px;
  min-width: 90px;
  max-width: 90px;
}
.img-coming-soon {
  object-fit: cover;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
}
.txt-soon {
  font-size: 2.7rem;
  font-weight: bold;
}
.txt-soon-description {
  font-size: 1.2rem;
  color: var(--global-color-txt-grey);
}
</style>
