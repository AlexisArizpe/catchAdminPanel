<template>
  <div class="content-documents-all">
    <!-- #region Add doc -->
    <v-file-input
      v-show="false"
      ref="inputDoc"
      v-model="files"
      label="File input"
      placeholder="Upload your documents"
      prepend-icon="mdi-paperclip"
      multiple
    ></v-file-input>
    <div
      v-if="bDocsAddItems"
      @click="setAddDoc()"
      class="content-add-doc item-doc"
    >
      <span class="mdi mdi-plus icon-plus"></span> {{ sTextAdd }}
    </div>

    <!-- #endregion Add doc -->

    <!-- #region Edit doc -->
    <div v-else class="item-documents-doc item-doc">
      <div @click="setDetailItem(oItem)" class="content-icon-item-doc">
        <div class="line-1-icon"></div>
        <div class="line-2-icon"></div>
      </div>
      <div @click="setDetailItem(oItem)" class="content-txt-item-all">
        <div class="content-txt-item-doc">
          {{ oItem.sName }}
        </div>
      </div>
      <div class="content-actions-item-doc">
        <v-btn
          @click="setDeleteItem"
          density="compact"
          icon="mdi-close"
          size="small"
          variant="text"
          color="#ABABAB"
        ></v-btn>
      </div>
      <div v-if="oItem.bLoadingDelete" class="overlay-loading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <!-- #endregion Edit doc -->
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    bDocsAddItems: {
      type: Boolean,
      default: false,
    },
    sTypeModule: {
      type: String,
      default: "add",
    },
    bDocInItems: {
      type: Boolean,
      default: false,
    },
    sMod: {
      type: String,
      default: "add",
    },
    oItem: {
      type: Object,
      default: () => {},
    },
    oItemChildren: {
      type: Object,
      default: () => {},
    },
    sTextAdd: {
      type: String,
      default: "",
    },
    sAPIDoc: {
      type: String,
      default: "",
    },
    sModule: {
      type: String,
      default: "purchaseOrders",
    },
    oItemsOrigin: {
      type: Object,
      default: {},
    },
    aActionsEdit: {
      type: Array,
      default: [
        {
          sName: "Ver",
          sIcon: "mdi-eye",
          sAction: "view",
        },
        {
          sName: "Modificar",
          sIcon: "mdi-file-replace",
          sAction: "modify",
        },
        // {
        //   sName: "Actualizar",
        //   sIcon: "mdi-delete",
        //   sAction: "update",
        // },
        // {
        //   sName: "Información",
        //   sIcon: "mdi-delete",
        //   sAction: "information",
        // },
        // {
        //   sName: "Historial",
        //   sIcon: "mdi-delete",
        //   sAction: "history",
        // },
        {
          sName: "Eliminar",
          sIcon: "mdi-delete",
          sAction: "delete",
        },
      ],
    },
    sId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    files: [],
    aActionsTableCard: [],
    oItems: {},
    bDialogUploadDoc: false,
    sTypeActionDoc: null,
    sLastUpdate: null,
  }),
  computed: {
    // #region Variables de permisos
    sActionPermission() {
      return this.$store.permissions.sActionPermission;
    },
    bRead() {
      return this.sActionPermission === "READ";
    },
    bWrite() {
      return this.sActionPermission === "WRITE";
    },
    bManage() {
      return this.$store.permissions.sActionPermission
        ? this.sActionPermission === "MANAGE"
        : true;
    },

    // #endregion Variables de permisos
    aActionsTableCard() {
      if (this.bRead) {
        return [
          {
            sIcon: `<i class="mdi mdi-eye"></i>`,
            sName: "Detalle",
            sNameTooltip: "Ver archivo",
            iAction: 1,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-primary-global",
          },
        ];
      } else if (this.bWrite) {
        return [
          {
            sIcon: `<i class="mdi mdi-eye"></i>`,
            sName: "Detalle",
            sNameTooltip: "Ver archivo",
            iAction: 1,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-primary-global",
          },
        ];
      } else if (this.bManage) {
        return [
          {
            sIcon: `<i class="mdi mdi-eye"></i>`,
            sName: "Detalle",
            sNameTooltip: "Ver archivo",
            iAction: 1,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-primary-global",
          },
          {
            sIcon: `<i class="mdi mdi-delete"></i>`,
            sName: "Eliminar",
            sNameTooltip: "Eliminar",
            iAction: 2,
            sClassBtn: "btn-action-global",
            sClassTxt: "color-red-global",
          },
        ];
      }
    },
  },
  emits: [
    "setDocsAddItems",
    "setDetailItem",
    "setDeleteItem",
    "setDocDeleteItems",
    "setDocInfoItems",
    "setDocHistItems",
  ],
  beforeMount() {
    if (this.sMod === "edit") {
      this.oItems = this.oItemsOrigin;
    }
  },
  methods: {
    async setAction(oAction) {
      switch (oAction.sAction) {
        case "view":
          if (this.oItem.aImageTypes) {
            window.open(oAction.oItem.sUrl ?? null, "blank_");
          } else {
            window.open(oAction.oItem?.Versions[0]?.sFileUrl ?? null, "blank_");
          }
          break;
        case "modify":
          this.sTypeActionDoc = "modify";
          this.setAddDoc();

          break;
        case "update":
          this.sTypeActionDoc = "update";
          this.setAddDoc();

          break;
        case "information":
          this.$emit("setDocInfoItems", {
            oItem: this.oItem,
            oItemChildren: this.oItemChildren,
          });
          break;
        case "record":
          this.$emit("setDocHistItems", {
            oItem: this.oItem,
            oItemChildren: this.oItemChildren,
          });
          break;
        case "delete":
          if (this.sTypeModule === "add") {
            this.$emit("setDocDeleteItems", {
              oItem: this.oItem,
              oItemChildren: this.oItemChildren,
            });
          } else {
            await this.setDeleteItemAPI();
          }

          break;

        default:
          break;
      }
    },
    setAddDoc() {
      this.$refs.inputDoc.click();
    },
    setDetailItem(oItem) {
      // console.log(oItem,"oItem")
      window.open(oItem.sFileUrl, "_blank");
    },
    async setDeleteItem() {
      if (this.sTypeModule === "add") {
        this.$emit("setDocDeleteItems", this.oItem);
      } else {
        await this.setDeleteItemAPIConfirm();
      }
    },

    async setSelectedItem(oDoc) {
      if (this.sTypeModule === "add") {
        this.$emit("setDocsAddItems", oDoc);
      } else {
        await this.setAddItemAPI(oDoc);
      }
    },

    async setAddItemAPI(oItem) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const formData = new FormData();
        formData.append("oFile", oItem);
        formData.append("aFileNames", oItem.name);

        const oResult = await this.$api.post(
          `/admissions/documents/${this.sId}`,
          formData,
          config
        );
        this.$store.table.setRefresh(true);

        this.$toast(oResult.data.message, {
          type: "success",
          hideProgressBar: true,
        });
      } catch (error) {
        console.log(error, "error");
        this.$toast(error.response.data.message, {
          type: "error",
          hideProgressBar: true,
        });
      }
    },
    async setDeleteItemAPIConfirm() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-red-global"> eliminar el documento </span>
                 del restaurante?</span>`,
          icon: "warning",

          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setDeleteItemAPI();
          }
        });
    },
    async setDeleteItemAPI() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };

        const oResult = await this.$api.delete(
          `/admissions/documents/${this.oItem.sDocumentId}`,
          config
        );

        this.$store.table.setRefresh(true);
        this.$toast(oResult.data.message, {
          type: "success",
          hideProgressBar: true,
        });
      } catch (error) {
        console.log(error);
        this.$toast(error.response.data.message, {
          type: "error",
          hideProgressBar: true,
        });
      }
    },
  },
  watch: {
    oItemsOrigin: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        if (this.sMod == "edit") {
          this.oItems = this.oItemsOrigin;
        }
      },
    },
    files: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        // this.$emit("setDocsAddItems", newVal[0]);
        this.setSelectedItem(newVal[0]);
      },
    },
  },
};
</script>
<style scoped>
.content-documents-all {
  /* width: calc(25% - 15px);  */
  max-width: 176px;
  width: 176px;
  padding: 0px 0px;
}
.item-doc {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 42px;
  box-sizing: border-box; /* Incluye el padding y el borde en el ancho */
  padding: 5px 5px; /* Añade relleno para espaciar los elementos */
}
.content-add-doc {
  background-color: var(--global-color-black);
  color: var(--global-color-white);
  font-size: 0.8rem;
  font-weight: 500;
  height: 42px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.5s;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-add-doc:hover {
  transition: all 0.5s;
  padding-left: 15px;
}
.icon-plus {
  font-size: 1.1rem;
}
.overlay-loading {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.219);
  border-radius: 12px;
  left: 0;
  top: 0;
}
.item-documents-doc {
  position: relative;
  font-size: 0.9rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  cursor: pointer;
}
.content-icon-item-doc {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: 20px;
  min-width: 20px;
  border: 2px solid #ababab;
  min-height: 20px;
  max-height: 20px;
  border-radius: 5px;
  margin-right: 8px;
}
.line-1-icon {
  top: 5px;
  left: 4px;
  position: absolute;
  background-color: #ababab;
  min-width: 9px;
  max-width: 9px;
  min-height: 2px;
  max-height: 2px;
  border-radius: 2px;
  margin-bottom: 2px;
}
.line-2-icon {
  position: absolute;
  top: 10px;
  left: 4px;
  background-color: #ababab;
  min-width: 6px;
  max-width: 6px;
  min-height: 2px;
  max-height: 2px;
  border-radius: 2px;
}
.content-txt-item-all {
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
}
.content-txt-item-doc {
  width: 100%;
  color: #ababab;
  font-weight: 500;
}
.content-txt-last-update-doc {
  font-size: 0.6rem;
  line-height: normal;
  color: #b1b1b1;
}
</style>
