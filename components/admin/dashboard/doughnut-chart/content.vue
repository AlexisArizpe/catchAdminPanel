<template>
  <div class="content-doughnut-chart-all">
    <!-- <p class="txt-title">{{ sTitle }}</p> -->
    <p class="txt-title">
      Promedio de beneficios <span class="font-weight-bold">{{ sTitle }}</span>
    </p>
    <div v-if="bLoadingItems" class="content-loading-item">
      <table-card-loading-items />
    </div>
    <div v-else class="content-doughnut-chart">
      <div v-if="bEmptyItems" class="content-empty-items">
        <table-card-empty-items />
      </div>
      <canvas v-else ref="myChart"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sTitle: {
      type: String,
      default: "",
    },
    oData: {
      type: Object,
      default: {},
    },
    bLoadingItems: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
  computed: {
    bEmptyItems() {
      return this.oData.labels?.length === 0 ?? 0;
    },
  },

  methods: {
    renderChart() {
      const ctx = this.$refs.myChart.getContext("2d");
      new this.$Chart(ctx, {
        type: "doughnut",
        data: this.oData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  watch: {
    oData: {
      handler(newVal) {
        nextTick(() => {
          this.renderChart();
        });
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.content-doughnut-chart-all {
  min-width: 345px;
  min-height: 260px;
  padding: 20px 15px;
  background-color: var(--global-color-white);
  border-radius: 10px;
  box-shadow: 0px 4px 10px var(--global-color-box-shadow);
}
.txt-title {
  font-size: 1rem;
}
.txt-subtitle {
  font-weight: lighter;
  font-size: 0.7rem;
  margin-bottom: 5px;
}
canvas {
  width: 100% !important;
  /* height: auto !important; */
  max-height: 180px;
}
.content-empty-items {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 180px;
}
.content-loading-item {
  display: flex;
  align-items: center;
  min-height: 180px;
}
</style>
