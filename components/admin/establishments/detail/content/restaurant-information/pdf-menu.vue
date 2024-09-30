<template>
  <div class="content-pdf-menu-all">
    <v-row>
      <v-col cols="8">
        <!-- #region Campo dinamico de  menu  -->
        <p class="txt-subtitle-form-global mb-2">
          {{
            oItem.sMenuType === "Link" ? "Link al menú digital" : "PDF del menú"
          }}
        </p>

        <v-text-field
          v-if="oItem.sMenuType === 'Link'"
          v-model="oItem.sMenuUrl"
          :readonly="!bSuperAdmin"
          :disabled="!bSuperAdmin"
          variant="outlined"
          flat
          density="comfortable"
          color="primary"
          bg-color="white"
          placeholder="Link al menú digital"
          rounded="lg"
        >
        </v-text-field>
        <v-text-field
          v-else
          v-model="oItem.oFileMenuPDF.sName"
          :readonly="true"
          @click.stop="setPDFMenu"
          clearable
          variant="outlined"
          flat
          density="comfortable"
          color="primary"
          bg-color="white"
          placeholder="PDF del menú"
          rounded="lg"
          class="input-pdf"
          :append-inner-icon="oItem.oFileMenuPDF.sName ? 'mdi-eye' : null"
          @click:append-inner.stop="getShowPDF"
        >
        </v-text-field>
        <!-- #endregion Campo dinamico de  menu  -->
      </v-col>
      <v-col cols="4">
        <!-- #region Campo de tipo de Menu -->
        <p class="txt-subtitle-form-global mb-2">Tipo de menú</p>
        <v-select
          v-model="oItem.sMenuType"
          :menu-props="{ bottom: true, offsetY: true }"
          class="input-global"
          density="comfortable"
          variant="outlined"
          flat
          color="primary"
          bg-color="white"
          :items="aMenuType"
          placeholder="Tipo de menú"
          no-data-text="No hay información"
          rounded="lg"
        >
        </v-select>
        <!-- <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              height="45px"
              class="btn-menu-type"
              block
              color="primary"
              v-bind="props"
            >
              {{ oItem.sMenuType }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in aMenuType"
              :key="index"
              :value="index"
              @click="setMenuType(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
        <!-- #endregion Campo de tipo de Menu -->
      </v-col>
    </v-row>

    <!-- #region Btn de Agregar menú en PDF -->
    <v-file-input
      v-model="aPDFMenu"
      ref="inputFile"
      class="d-none"
      label="File input"
    ></v-file-input>
    <!-- #endregion Btn de Agregar menú en PDF -->
  </div>
</template>
<script>
export default {
  props: {
    oItem: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    sMenuUrl: null,

    sPDFNameMenuEdit: null,
    sPDFLinkMenu: null,
    aPDFMenu: [],
    oPDFFielMenu: {},

    aMenuType: ["Link", "PDF"],
  }),
  computed: {
    bSuperAdmin() {
      return this.$store.user.bSuperAdmin;
    },
  },
  methods: {
    setPDFMenu() {
      if (this.oItem.oFileMenuPDF.sName) {
        this.getShowPDF();
      } else {
        this.$refs.inputFile.click();
      }
    },
    getPDFMenu(oItem) {
      // console.log(oItem, "oItem");
    },
    getShowPDF() {
      if (this.oItem.oFileMenuPDF.sName) {
        window.open(this.oItem.oFileMenuPDF.sUrl, "blank_");
      }
    },
    setMenuType(sMenuType) {
      this.oItem.sMenuType = sMenuType;
    },
    async setDeleteAPI(sId) {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {};
        const oResult = await this.$api.delete(
          `establishments/menus/${sId}`,
          config,
          payload
        );

        this.$toast(oResult.data.message, {
          type: "success",
          hideProgressBar: true,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    aPDFMenu: {
      async handler(newVal) {
        let sPDFLinkMenuTemp = await this.getUrlToBlob(
          this.getMaskedFileGlobal(newVal[0])
        );

        // this.sPDFNameMenuEdit = newVal[0].name;
        this.sPDFNameMenuEdit = "Menú";
        this.sPDFLinkMenu = sPDFLinkMenuTemp.url;
        this.oPDFFielMenu = newVal[0];

        this.oItem.oFileMenuPDF = {
          // sName: newVal[0].name,
          sName: "Menú",
          sUrl: sPDFLinkMenuTemp.url,
          oFile: newVal[0],
        };
      },
      deep: true,
    },
    async "oItem.oFileMenuPDF.sName"() {
      if (this.oItem.oFileMenuPDF.sName === null) {
        if (this.oItem.oFileMenuPDF.sId) {
          this.setDeleteAPI(this.oItem.oFileMenuPDF.sId);
        }
        this.$refs.inputFile.value = null;
      }
    },
    "oItem.sMenuType"() {
      if (this.oItem.sMenuType === "Link") {
        this.sPDFLinkMenu = null;
        this.oPDFFielMenu = null;

        this.oItem.oFileMenuPDF = {
          sName: null,
          sUrl: null,
          oFile: null,
        };
      } else {
        this.oItem.sMenuUrl = null;
      }
    },
  },
};
</script>
<style>
.input-pdf .v-input__control .v-field .v-field__field input {
  cursor: pointer !important;
}
</style>
<style scoped>
.content-pdf-menu {
  padding: 20px 0px;
  display: flex;
  gap: 15px;
}
.content-item-pdf-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% / 2);
  padding: 8px 12px;
  background-color: #f5f5f5;
  color: #ababab;
  font-size: 0.9em;
  border-radius: 10px;
}
.btn-menu-type {
  text-transform: none;
  letter-spacing: normal;
}
</style>
