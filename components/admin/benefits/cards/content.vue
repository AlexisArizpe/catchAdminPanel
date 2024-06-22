<template>
  <div class="content-cards-benefits-all">
    <p v-if="aItems.length > 0" class="txt-filter-benefits">
      Tienes
      <span class="font-weight-bold">{{ aItems.length }}</span> beneficios
      <span class="font-weight-bold">vigentes</span>
    </p>
    <table-card-loading-items v-if="bLoadingItems" />
    <table-card-empty-items v-else-if="aItems.length === 0" />
    <v-expansion-panels v-else v-model="bShowMore">
      <v-expansion-panel bg-color="white" elevation="0" :mandatory="false">
        <v-expansion-panel-title
          focusable
          static
          :ripple="false"
          color="white"
          hide-actions
        >
          <v-row>
            <v-col
              v-for="(oItem, i) in aItems.slice(0, iLengthItem)"
              :key="i"
              class="d-flex align-center justify-center"
              :cols="iCol"
            >
              <v-img
                class="img-item-card"
                @click="setDetailItem(oItem)"
                :src="oItem.sImg"
              >
                <div
                  class="content-img-fill"
                  :class="!oItem.sImg ? 'empty-img-item-card' : ''"
                >
                  <div class="content-status-all">
                    <div class="content-icon-card">
                      <span class="icon-card" :class="oItem.sIcon"></span>
                    </div>

                    <div
                      class="content-status-card"
                      :style="oItem.sColorStatus"
                    >
                      <span class="txt-status-card">{{
                        oItem.sNameStatus
                      }}</span>
                    </div>
                  </div>
                  <div class="content-txt-benefit">
                    <p class="txt-benefit">{{ oItem.sName }}</p>
                  </div>
                </div>
              </v-img>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col
              v-for="(oItem, i) in aItems.slice(4)"
              :key="i"
              class="d-flex align-center justify-center"
              cols="3"
            >
              <v-img
                class="img-item-card"
                @click="setDetailItem(oItem)"
                :src="oItem.sImg"
              >
                <div
                  class="content-img-fill"
                  :class="!oItem.sImg ? 'empty-img-item-card' : ''"
                >
                  <div class="content-status-all">
                    <div class="content-icon-card">
                      <span class="icon-card" :class="oItem.sIcon"></span>
                    </div>

                    <div
                      class="content-status-card"
                      :style="oItem.sColorStatus"
                    >
                      <span class="txt-status-card">{{
                        oItem.sNameStatus
                      }}</span>
                    </div>
                  </div>
                  <div class="content-txt-benefit">
                    <p class="txt-benefit">{{ oItem.sName }}</p>
                  </div>
                </div>
              </v-img>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <div v-if="bShowMoreBtn" class="content-btn-show-more">
        <v-btn
          @click="setOpenMore()"
          variant="outlined"
          class="btn-second-global"
          color="primary"
          :prepend-icon="
            bShowMore === 0
              ? 'mdi mdi-arrow-expand-up'
              : 'mdi mdi-arrow-expand-down'
          "
        >
          Mostrar {{ bShowMore === 0 ? "menos" : "más" }} beneficios
        </v-btn>
      </div>
    </v-expansion-panels>
  </div>
</template>
<script>
export default {
  props: {
    bLoadingItems: {
      type: Boolean,
      default: true,
    },
    aItems: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    bShowMore: null,
    aBenefits: [
      {
        sIcon: "mdi mdi-gift-outline",
        sImg: "",
        sStatus: "¡SIN STOCK!",
        sDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, mauris ut faucibus sollicitudin, leo ante ullamcorper diam, ac mollis nibh diam quis dolor",
      },
      {
        sIcon: "mdi mdi-sale-outline",
        sImg: "",
        sStatus: "¡SIN STOCK!",
        sDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, mauris ut faucibus sollicitudin, leo ante ullamcorper diam, ac mollis nibh diam quis dolor",
      },
      {
        sIcon: "mdi mdi-sale-outline",
        sImg: "",
        sStatus: "¡SIN STOCK!",
        sDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, mauris ut faucibus sollicitudin, leo ante ullamcorper diam, ac mollis nibh diam quis dolor",
      },
      {
        sIcon: "mdi mdi-sale-outline",
        sImg: "",
        sStatus: "¡SIN STOCK!",
        sDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, mauris ut faucibus sollicitudin, leo ante ullamcorper diam, ac mollis nibh diam quis dolor",
      },
      {
        sIcon: "mdi mdi-sale-outline",
        sImg: "",
        sStatus: "¡SIN STOCK!",
        sDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum, mauris ut faucibus sollicitudin, leo ante ullamcorper diam, ac mollis nibh diam quis dolor",
      },
    ],
    trip: {
      name: "",
      location: null,
      start: null,
      end: null,
    },
  }),
  computed: {
    iCol() {
      if (this.$vuetify.display.xs) {
        return 12;
      } else if (this.$vuetify.display.sm) {
        return 6;
      } else if (this.$vuetify.display.md) {
        return 4;
      } else {
        return 3;
      }
    },
    bShowMoreBtn() {
      if (this.$vuetify.display.xs) {
        return this.aItems.length > 1;
      } else if (this.$vuetify.display.sm) {
        return this.aItems.length > 2;
      } else if (this.$vuetify.display.md) {
        return this.aItems.length > 3;
      } else {
        return this.aItems.length > 4;
      }
    },
    iLengthItem() {
      if (this.$vuetify.display.xs) {
        return 1;
      } else if (this.$vuetify.display.sm) {
        return 2;
      } else if (this.$vuetify.display.md) {
        return 3;
      } else {
        return 4;
      }
    },
  },
  emits: ["setDetailItem"],
  methods: {
    setOpenMore() {
      if (this.bShowMore === null) {
        this.bShowMore = 0;
      } else {
        this.bShowMore = null;
      }
    },
    setDetailItem(oItem) {
      this.$emit("setDetailItem", oItem);
    },
  },
};
</script>
<style scoped>
.content-cards-benefits-all {
  background-color: var(--global-color-white);
  padding: 20px 20px;
  margin: 20px;
  border-radius: 15px;
}
.content-cards-benefits {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  gap: 15px;
  width: 100%;
  max-height: 120px;
  padding: 10px 0px;
  transition: all 0.5s !important;
}
.open-content-cards-benefits {
  max-height: max-content;
}

/* #region diseño de scroll */
.content-cards-benefits::-webkit-scrollbar {
  height: 0px;
  width: 0px;
}
.content-cards-benefits::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}
.content-cards-benefits::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.25) !important;
  border-radius: 10px;
}
.content-cards-benefits::-webkit-scrollbar-thumb:hover {
  background: var(--global-color-green-primary) !important;
}
/* #endregion diseño de scroll */

.img-item-card {
  cursor: pointer;
  min-width: 100px;
  max-width: 200px;
  width: 200px;
  border-radius: 15px;
  min-height: 110px;
  max-height: 110px;
}

.content-img-fill {
  display: flex;
  flex-direction: column;
  padding: 5px 0px 10px 0px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: var(--global-color-black-transparent-primary);
}
.empty-img-item-card {
  background-color: var(--global-color-black) !important;
}
.content-status-all {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px 10px;
}
.content-icon-card {
  background-color: var(--global-color-yellow-primary);
  padding: 0px 10px;
  border-radius: 30px;
}
.content-status-card {
  padding: 0px 10px;
  border-radius: 30px;
}
.txt-status-card {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
}
.content-txt-benefit {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
  color: var(--global-color-white);
  padding: 0px 15px;
}
.txt-benefit {
  font-size: 0.8rem;
}
.content-btn-show-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px 0px 20px;
}
</style>
