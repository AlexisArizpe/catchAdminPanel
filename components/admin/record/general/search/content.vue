<template>
  <v-app-bar
    scroll-behavior="elevate"
    density="comfortable"
    color="backgroundPanel"
    class="content-global-search"
  >
    <div class="content-filter-all">
      <div class="content-filter">
        <v-btn
          v-for="(oItem, i) in aBtnsfilter"
          :key="i"
          @click="setChangeFilter(oItem)"
          rounded="xl"
          color="primary"
          :variant="oItem.bActive ? 'flat' : 'text'"
          class="btn-filter text-none l-spacing-0"
        >
          <span
            class="l-spacing-0 f-s12px"
            :class="oItem.bActive ? 'font-weight-bold' : ''"
            >{{ oItem.sName }}</span
          >
        </v-btn>
      </div>
    </div>

    <v-spacer></v-spacer>
    <div class="content-btns">
      <!-- #region btn add -->
      <div class="content-btn-add-search ml-3">
        <v-btn
          v-if="bBtnAdd"
          class="btn-second-global btn-add"
          color="black"
          variant="outlined"
          @click="setAdd()"
        >
          <v-icon class="ml-1">{{ sIconBtnAdd }} </v-icon>
          <span v-if="!bMobile">{{ sNameBtnAdd }}</span>
        </v-btn>
      </div>
      <!-- #endregion btn add -->
    </div>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    bBtnAdd: {
      type: Boolean,
      default: true,
    },
    sIconBtnAdd: {
      type: String,
      default: "person_add_alt_1",
    },
    sNameBtnAdd: String,
    toAdd: String,
    oParams: Object,
  },
  data: () => ({
    sTypeBenefit: "regular",
    aBtnsfilter: [
      {
        sId: "0",
        sName: "Regulares",
        sValue: "regular",
        bActive: true,
      },
      {
        sId: "1",
        sName: "Relámpago",
        sValue: "relampago",
        bActive: false,
      },
    ],
  }),
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
    },
    bShowFilter() {
      return this.aShowFilter.filter((e) => e === this.$route.name).length > 0;
    },
  },
  emits: ["setSearch", "setTypeBenefit"],
  methods: {
    setAdd() {
      this.$router.push({
        name: this.toAdd,
        params: { type: this.sTypeBenefit },
      });
    },
    setChangeFilter(oItem) {
      oItem.bActive = true;
      this.aBtnsfilter
        .filter((e) => e.sName !== oItem.sName)
        .forEach((objeto) => {
          objeto.bActive = false;
        });
      this.sTypeBenefit = this.aBtnsfilter.find(
        (e) => e.bActive === true
      ).sValue;

      this.$emit("setTypeBenefit", this.sTypeBenefit);
    },
  },
  watch: {
    sSearch() {
      this.$emit("setSearch", this.sSearch);
    },
  },
};
</script>
<style scoped>
.content-global-search {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 0px 21px;
}
.content-filter-all {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}
.content-filter {
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: var(--global-color-white) !important;
  border-radius: 20px;
  padding: 3px 5px;
}
.btn-filter {
  min-width: 100px;
}
.btn-filter:hover {
  border: 1px solid var(--global-color-black);
}

.content-btns {
  width: auto;
  display: flex;
}
.btn-add {
  background-color: var(--global-color-white) !important;
  width: 220px !important;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .btn-add {
    background-color: var(--global-color-white) !important;
    width: 45px !important;
    min-width: 45px !important;
    padding: 0px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
  .demoColorResponsive {
    background-color: rgb(201, 122, 83);
  }
}

/*#endregion MD */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
