<template>
  <div class="content-footer-table-global">
    <div class="content-items-per-page-global">
      <span class="txt-items-per-page-footer-global" v-if="!bMobile"
        >Filas por página:</span
      >
      <v-select
        v-model="iItemsPerPage"
        :menu-props="{ bottom: true, offsetY: true }"
        color="black"
        :items="aItemsPerPage"
        hide-details
        class="input-item-per-page-footer"
        placeholder="Select"
        density="comfortable"
        variant="underlined"
        no-data-text="No hay información"
      >
      </v-select>
    </div>
    <div class="content-btns-page-global">
      <div class="content-txt-footer-page-global">
        <span class="txt-footer-page-global">
          {{ iPage }} - {{ iNumPage }} de {{ iTotal }}
        </span>
      </div>

      <v-btn
        icon
        @click="prev()"
        :disabled="!(this.iPage > 1)"
        class="btn-footer-arrow-left-global"
      >
        <span class="mdi mdi-chevron-left"></span>
      </v-btn>
      <v-btn
        icon
        @click="next()"
        :disabled="!(iPage < iNumPage)"
        class="btn-footer-arrow-right-global"
      >
        <span class="mdi mdi-chevron-right"></span>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iNumPage: Number,
    iTotal: Number,
  },
  data: () => ({
    iItemsPerPage: 30,
    aItemsPerPage: [1, 5, 30, 50, 60],
    iPage: 1,
  }),
  emits:["setItemsPerPage","setPage"],
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
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
  },
  watch: {
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
  justify-content: flex-end;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.content-items-per-page-global {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.txt-items-per-page-footer-global {
  margin-right: 20px;
  padding-top: 10px;
  font-size: 12px !important;
}
.input-item-per-page-footer {
  min-width: 60px;
  max-width: 60px;
  font-size: 14px !important;
  margin-top: 0px !important;
}

.content-btns-page-global {
  display: flex;
  align-items: center;
  padding-top: 10px;
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
  margin-right: 10px;
  border-radius: 5px;
  background-color: transparent !important;
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

/*#region LG */
@media (min-width: 1264px) and (max-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(204, 198, 109);
  }
}

/*#endregion LG */

/*#region XL */
@media (min-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(113, 199, 201);
  }
}

/*#endregion XL */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
