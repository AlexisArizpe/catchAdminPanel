<template>
  <div class="content-card-top-3-all">
    <p class="txt-title"><span class="font-weight-bold">Top 3:</span> Beneficios <span class="font-weight-bold">más elegidos</span></p>
    <div v-for="(oItem, i) in aItems" :key="i" class="content-item-card">
      <div class="content-number">#{{ i + 1 }}</div>
      <div class="content-txt">
        {{ oItem.sName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    aItems: [
      {
        sName:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        sName:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        sName:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  }),
};
</script>

<style scoped>
.content-card-top-3-all {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
}
.txt-title{
  font-size: 1rem;
}

.content-item-card {
  position: relative; /* Añadido */
  display: flex;
  align-items: center;
  background-image: url('public/img/bg-img-card-top-3.png');
  border-radius: 15px;
  overflow: hidden;
  min-height: 60px;
  max-width: 430px;
  min-width: 430px;
}

.content-item-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.725); /* Ajusta la opacidad según sea necesario */
  border-radius: 15px; /* Asegúrate de que coincida con el borde del div */
  z-index: 1;
}

.content-item-card > * {
  position: relative;
  z-index: 2;
}

.content-number {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 5px;
  height: 100%;
  left: 0px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--global-color-black);
  background-color: var(--global-color-yellow-primary);
}

.content-txt {
  font-size: .8rem;
  padding: 5px 20px 5px 40px;
  color: var(--global-color-white);
  text-align: left;
}
</style>
