<template>
  <div class="content-bar-chart-all">
    <p class="txt-title">
      <span class="font-weight-bold">{{ sTitle }}</span> con mayor activación
    </p>
    <div v-if="bLoadingItems" class="content-loading-item">
      <table-card-loading-items />
    </div>
    <div v-else class="content-bar-chart">
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
  computed: {
    bEmptyItems() {
      return this.oData.data?.length === 0 ?? 0;
    },
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.myChart.getContext("2d");
      const data = this.oData.data;
      const backgroundColors = data.map((value) => {
        if (value < 20) {
          return "#E74A3B"; // Rojo
        } else if (value >= 20 && value < 40) {
          return "#34C4FF"; // Azul
        } else {
          return "#86C157"; // Verde
        }
      });

      new this.$Chart(ctx, {
        type: "bar",
        data: {
          labels: this.oData.label,
          datasets: [
            {
              label: null,
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) => {
                return color.replace("rgba", "rgb").replace(")", ", 1)");
              }),
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
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
.content-bar-chart-all {
  width: 426px;
  max-width: 426px;
  min-width: 426px;
  background-color: var(--global-color-white);
  min-height: 245px;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px var(--global-color-box-shadow);
}
.txt-title {
  font-weight: lighter;
  font-size: 1rem;
  margin-bottom: 5px;
}
canvas {
  width: 100% !important;
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
