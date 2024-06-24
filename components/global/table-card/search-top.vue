<template>
  <div class="content-footer-table-global">
    <div class="content-items-per-page-global">
      <span class="txt-items-per-page-footer-global">Mostrar</span>
      <v-select
        v-model="iItemsPerPage"
        :menu-props="{ bottom: true, offsetY: true }"
        color="black"
        :items="aItemsPerPage"
        hide-details
        class="input-item-per-page-footer"
        placeholder="Select"
        density="compact"
        variant="outlined"
        no-data-text="No hay información"
      >
      </v-select>
      <span class="txt-items-per-page-footer-global"
        >de <span class="font-weight-bold">{{ iTotal }}</span> ìtems</span
      >
    </div>
    <div class="content-btns-page-global">
      <v-btn
        icon
        @click="prev()"
        :disabled="!(this.iPage > 1)"
        class="btn-footer-arrow-left-global"
      >
        <span class="mdi mdi-chevron-left"></span>
      </v-btn>
      <div class="content-txt-footer-page-global">
        <span class="txt-footer-page-global">
          Pág. {{ iPage }} de {{ iNumPage }}
        </span>
      </div>
      <v-btn
        icon
        @click="next()"
        :disabled="!(iPage < iNumPage)"
        class="btn-footer-arrow-right-global"
      >
        <span class="mdi mdi-chevron-right"></span>
      </v-btn>
      <div v-if="bShowSearchText" class="content-search-text-field">
        <v-text-field
          v-model="sSearch"
          variant="outlined"
          flat
          density="compact"
          color="primary"
          bg-color="white"
          placeholder="Buscar"
          hide-details
          clearable
          append-inner-icon="mdi-magnify"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global">Buscar </span>
          </template>
        </v-text-field>
      </div>
      <div v-if="bShowSearchAbacus" class="content-search-abacus">
        <v-btn class="btn-second-global" color="black" variant="outlined">
          <span class="mdi mdi-filter-variant icon-filter-variant"></span
          >Filtrar

          <v-menu activator="parent" :close-on-content-click="false">
            <v-list density="compact" nav>
              <!-- #region Tipo de beneficios -->
              <v-list-subheader>
                <span class="l-spacing-0 f-s-p-8rem">Tipo de beneficio</span>
              </v-list-subheader>
              <v-divider />
              <v-list-item
                v-for="(item, i) in aItemsBenefitType"
                :key="i"
                :value="item"
                color="primary"
                @click="setSelectedItem(item)"
                :class="item.selected ? 'selected-item-type' : ''"
              >
                <template v-slot:prepend>
                  <v-icon
                    size="20"
                    :color="item.selected ? 'yellowprimary' : ''"
                    :icon="item.icon"
                  ></v-icon>
                </template>

                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
              <!-- #endregion Tipo de beneficios -->

              <!-- #region Estado de beneficios -->
              <v-list-subheader>
                <span class="l-spacing-0 f-s-p-8rem">Estado de beneficio</span>
              </v-list-subheader>
              <v-divider />
              <v-list-item
                v-for="(item, i) in aItemsBenefitStatus"
                :key="i"
                :value="item"
                :color="item.selected ? 'blue' : 'primary'"
                @click="setSelectedItem(item)"
                :class="item.selected ? 'selected-item-status' : ''"
              >
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item>
              <!-- #endregion Estado de beneficios -->
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iNumPage: Number,
    iTotal: Number,
    aItemsBenefitType: {
      type: Array,
      default: [],
    },
    aItemsBenefitStatus: {
      type: Array,
      default: [],
    },
  },
  data: () => ({
    sSearch: null,
    iItemsPerPage: 30,
    aItemsPerPage: [1, 5, 30, 50, 60],
    iPage: 1,
    aShowSearchText: [
      "admin-admissions",
      "admin-establishments",
      "admin-establishments-id",
      "admin-employees",
    ],
    aShowSearchAbacus: ["admin-benefits"],
  }),
  emits: ["setItemsPerPage", "setPage", "setSearch"],
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
    },
    bShowSearchAbacus() {
      return (
        this.aShowSearchAbacus.filter((e) => e === this.$route.name).length > 0
      );
    },
    bShowSearchText() {
      return (
        this.aShowSearchText.filter((e) => e === this.$route.name).length > 0
      );
    },
  },
  beforeMount() {
    this.setItemsPerPage();
  },
  methods: {
    setItemsPerPage() {
      this.iPage = 1;
      this.$emit("setItemsPerPage", this.iItemsPerPage);
    },
    prev: function () {
      if (this.iPage > 1) {
        this.iPage--;
      }
    },
    next: function () {
      if (this.iPage < this.iNumPage) {
        this.iPage++;
      }
    },
    setPage() {
      this.$emit("setPage", this.iPage);
    },
    setSelectedItem(oItem) {
      oItem.selected = !oItem.selected;
    },
  },
  watch: {
    sSearch() {
      this.$emit("setSearch", this.sSearch);
    },
    iItemsPerPage() {
      this.setItemsPerPage();
    },
    iPage() {
      this.setPage();
    },
  },
};
</script>
<style>
/* #region content-footer-table-global */
.content-footer-table-global {
  display: flex;
  width: 100%;
  align-items: center;
  border-top: 1px solid var(--global-color-grey-divider);
  height: 50px;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.content-items-per-page-global {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-right: 20px;
}

.txt-items-per-page-footer-global {
  font-size: 0.9rem !important;
}
.input-item-per-page-footer {
  width: 90px;
  min-width: 90px;
  max-width: 90px;
  font-size: 14px !important;
  margin-top: 0px !important;
}

.content-btns-page-global {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-footer-arrow-left-global,
.btn-footer-arrow-right-global {
  max-width: 25px !important;
  min-width: 25px !important;
  width: 25px !important;
  max-height: 25px !important;
  min-height: 25px !important;
  height: 25px !important;
  font-size: 16px;
  border-radius: 5px;
  background-color: transparent !important;
  box-shadow: 0px 0px 0px 0px transparent !important;
}

.content-txt-footer-page-global {
  background-color: var(--global-color-hover-gery) !important;
  border-radius: 5px;
}

.txt-footer-page-global {
  font-size: 0.9rem !important;
  margin-left: 5px;
  margin-right: 5px;
}
.content-search-text-field {
  width: 250px;
}

.icon-filter-variant {
  font-size: 1.4rem;
}
.selected-item-type {
  background-color: var(--global-color-grey-selected) !important;
}
.selected-item-status {
  background-color: #dbe2f4 !important;
  color: #265dea !important;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .content-footer-table-global {
    display: flex;
    align-items: center;
    height: auto;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .content-pagination-global {
    display: flex;
    width: 100%;
    align-items: center;
    font-family: "Ubuntu Regular" !important;
  }

  .content-items-per-page-global {
    display: flex;
    align-items: center;
    width: 100px !important;
  }

  .content-btns-page-global {
    display: flex;
  }

  .txt-items-per-page-footer-global {
    width: 220px !important;
    font-size: 12px !important;
  }

  .btn-footer-arrow-left-global,
  .btn-footer-arrow-right-global {
    max-width: 25px !important;
    min-width: 25px !important;
    width: 10px !important;
    max-height: 25px !important;
    min-height: 25px !important;
    height: 25px !important;
    font-size: 16px;
    margin-right: 10px;
    border-radius: 5px;
    background-color: var(--global-color-hover-gery) !important;
    box-shadow: 0px 0px 0px 0px transparent !important;
  }

  .content-txt-footer-page-global {
    background-color: var(--global-color-hover-gery) !important;
    border-radius: 5px;
  }

  .txt-footer-page-global {
    font-size: 12px !important;
    margin-left: 5px;
    margin-right: 5px;
  }
}

/*#endregion XS */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
