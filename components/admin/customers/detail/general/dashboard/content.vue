<template>
  <div class="content-dashboard-all">
    <p class="txt-totals" @click="bExpand = !bExpand">
      Totales <span class="mdi mdi-chevron-down icon-arrow" :class="!bExpand?'icon-rotate':''"></span>
    </p>
    <v-expand-transition>
      <div v-show="bExpand" class="content-items-all">
        <div v-for="(oItem, i) in aItems" class="content-item">
          <div
            class="line-color-status"
            :style="getBkColorBenefit(oItem.eStatus)"
          ></div>
          <p class="txt-title">
            Beneficios <span class="font-weight-bold">{{ oItem.sName }}</span>
          </p>
          <p class="txt-description">
            <span class="font-weight-bold">{{ oItem.sPorcent }} </span>({{
              oItem.sTotal
            }})
          </p>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>
<script>
export default {
  props: {
    sName: {
      type: String,
      default: "aqui",
    },
    aItems: {
      type: Array,
      default: [
        {
          sName: "Completos",
          sPorcent: "90%",
          sTotal: "500",
        },
        {
          sName: "Canjeados",
          sPorcent: "100%",
          sTotal: "500",
        },
        {
          sName: "Activados",
          sPorcent: "100%",
          sTotal: "500",
        },
        {
          sName: "Cancelados",
          sPorcent: "0%",
          sTotal: "500",
        },
      ],
    },
  },
  data: () => ({
    bExpand: true,
  }),
};
</script>
<style scoped>
.content-dashboard-all {
  padding: 5px 21px 0px 21px;
}
.txt-totals {
  cursor: pointer;
  color: #979797;
  font-size: 0.9rem;
}
.icon-arrow::before{
  transition: all .5s ;
}
.icon-rotate::before{
  transform: rotate(180deg) !important;
}
.content-items-all {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: center;
  padding-top: 10px;
}
.content-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--global-color-white);
  min-height: 120px;
  max-height: 120px;
  min-width: 260px;
  max-width: 260px;
  border-radius: 20px;
  padding: 0px 10px 5px 30px;
}
.line-color-status {
  background-color: black;
  position: absolute;
  left: 0;
  height: 100%;
  width: 20px;
}
.txt-title {
  font-size: 0.9rem;
}
.txt-description {
  font-size: 1.2rem;
  margin-top: 5px;
}
</style>
