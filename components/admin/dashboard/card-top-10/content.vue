<template>
  <div class="content-card-top-10-all">
    <p class="txt-title">
      <span class="font-weight-bold">Top 10:</span> Restaurantes
      <span class="font-weight-bold">{{ sTitle }}</span>
    </p>
    <div v-if="bLoadingItems" class="content-loading-item">
      <table-card-loading-items />
    </div>
    <div v-else class="content-items-all">
      <div v-if="aItems.length === 0" class="content-empty-items">
        <div class="content-item-card">
          <div class="content-number"># 1</div>
          <div class="content-txt">
            <div class="txt-card">Sin información</div>
            <div class="content-rating">
              <Icon icon="ic:round-star" />
              0
            </div>
          </div>
        </div>
        <div
          v-for="(oItem, i) in 9"
          :key="i + '-empty'"
          class="content-item-card-normal"
        >
          <div class="txt-number-normal">
            {{ i + 2 }}
          </div>
          <div class="txt-card-normal">Sin información</div>
          <div class="txt-rating">0</div>
        </div>
      </div>
      <div v-if="aItems.length > 0" class="content-item-card">
        <div class="content-number"># 1</div>
        <div class="content-txt">
          <div class="txt-card">
            {{ oItems.firstItem.sName }}
          </div>
          <div class="content-rating">
            <Icon icon="ic:round-star" />
            {{ oItems.firstItem.sRating }}
          </div>
        </div>
      </div>
      <div v-if="aItems.length > 0" class="content-item-card-normal-all">
        <div
          v-for="(oItem, i) in oItems.restItems"
          :key="i"
          class="content-item-card-normal"
        >
          <div class="txt-number-normal">
            {{ i + 2 }}
          </div>
          <div class="txt-card-normal">
            {{ oItem.sName }}
          </div>
          <div class="txt-rating">
            {{ oItem.sRating }}
          </div>
        </div>
      </div>
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
    aItems: {
      type: Array,
      default: [],
    },
    bLoadingItems: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
  computed: {
    oItems() {
      const [firstItem, ...restItems] = this.aItems;
      return { firstItem, restItems };
    },
  },
};
</script>
<style scoped>
.content-card-top-10-all {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
  min-width: 300px;
}
.txt-title {
  font-size: 1rem;
}
.content-items-all {
  min-height: 220px;
}
.content-loading-item {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 220px;
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
  margin-bottom: 10px;
}
.content-number {
  display: flex;
  align-items: center;
  position: absolute;
  left: 0px;
  padding: 0px 5px;
  font-size: 0.8rem;
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
  padding-left: 10px;
  font-size: 0.7rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
}
.content-rating {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  letter-spacing: normal;
  background-color: var(--global-color-black);
  color: var(--global-color-yellow-primary);
  padding: 0px 7px;
  border-radius: 10px;
}

.content-item-card-normal-all {
  background-color: var(--global-color-white);
  box-shadow: 0px 4px 10px var(--global-color-box-shadow);
  border-radius: 5px;
}
.content-item-card-normal {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--global-color-black);
  padding: 2px 15px;
}
.content-item-card-normal:nth-last-child(-n + 1) {
  border-bottom: 0px solid var(--global-color-black);
}
.txt-number-normal {
  text-align: right;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 20px;
  max-width: 20px;
  padding-right: 5px;
}
.txt-card-normal {
  text-align: left;
  padding-left: 5px;
  width: 100%;
  font-size: 0.7rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
}
.txt-rating {
  text-align: end;
  font-size: 0.7rem;
  min-width: 30px;
  max-width: 30px;
}
</style>
