<template>
  <div class="content-card-top-5-all">
    <p class="txt-title">
      <span class="font-weight-bold">Top 5:</span> Beneficios
      <span class="font-weight-bold">mejores calificados</span>
    </p>
    <div v-for="(oItem, i) in aItems" :key="i" class="content-item-card">
      <div class="content-number">
        #{{ i + 1 }}
      </div>
      <div class="content-txt">
        <div class="txt-card">
          {{ oItem.sName }}
        </div>
        <div class="content-rating">
          <Icon icon="ic:round-star"/>
          {{ oItem.sRating }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    aItems: [
      {
        sName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed",
        sRating: 4.5,
      },
      {
        sName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed",
        sRating: 4.5,
      },
      {
        sName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed",
        sRating: 4.5,
      },
      {
        sName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed",
        sRating: 4.5,
      },
      {
        sName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed",
        sRating: 4.5,
      },
    ],
  }),
};
</script>
<style scoped>
.content-card-top-5-all {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

}
.txt-title {
  font-size: 1rem;
}
.content-item-card {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--global-color-white);
  padding: 0px 10px 0px 30px;
  box-shadow: 0px 4px 10px var(--global-color-box-shadow);
  border-radius: 5px;
  min-height: 35px;
  overflow: hidden;
}
.content-number{
  display: flex;
  align-items: center;
  position: absolute;
  left: 0px;
  padding: 0px 5px;
  font-size: .8rem;
  height: 100%;
  background-color: var(--global-color-black);
  color: var(--global-color-yellow-primary);
}
.content-txt {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.txt-card {
  width: 100%;
  font-size: 0.7rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
}
.content-rating{
  display: flex;
  align-items: center;
  font-size: .8rem;
  letter-spacing: normal;
  background-color: var(--global-color-black);
  color: var(--global-color-yellow-primary);
  padding: 0px 7px;
  border-radius: 10px;
}
</style>
