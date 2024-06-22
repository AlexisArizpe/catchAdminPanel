<template>
  <div class="content-docs-lots-all">
    <div class="content-docs-lots">
      <!-- #region Upload Doc initial  -->
      <div
        v-if="
          aDocsEdit.length === 0 &&
          sStatus === 'processing' &&
          (bWrite || bManage)
        "
        class="content-upload-docs-lots-initial"
      >
        <upload-documents
          @setDocsAddItems="setDocsAddItems"
          sMod="add"
          sTextAdd="Añadir documentos"
          :sTypeModule="sTypeModule"
          :bDocsAddItems="true"
          :sId="sId"
        />
      </div>

      <!-- #endregion Upload Doc initil  -->

      <!-- #region Upload Doc -->
      <div v-else class="content-upload-docs-lots-all">
        <upload-documents
          v-if="sStatus === 'processing' && (bWrite || bManage)"
          @setDocsAddItems="setDocsAddItems"
          sMod="add"
          sTextAdd="Añadir documentos"
          :sTypeModule="sTypeModule"
          :bDocsAddItems="true"
          :sId="sId"
        />
        <upload-documents
          v-for="(oDoc, iDoc) in aDocsEdit"
          :key="iDoc"
          sMod="edit"
          @setDocDeleteItems="setDocDeleteItems"
          :sTypeModule="sTypeModule"
          :oItem="oDoc"
        />
        <table-card-empty-items v-if="aDocsEdit.length === 0" />
      </div>
      <!-- #endregion Upload Doc -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    aDocs: {
      type: Array,
      default: [],
    },
    aActionsEdit: {
      type: Array,
      default: [
        {
          sName: "Ver",
          sIcon: "mdi-eye",
          sAction: "view",
        },
        // {
        //   sName: "Modificar",
        //   sIcon: "mdi-file-replace",
        //   sAction: "modify",
        // },
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
    aActionsEditImg: {
      type: Array,
      default: [
        {
          sName: "Ver",
          sIcon: "mdi-eye",
          sAction: "view",
        },
        {
          sName: "Eliminar",
          sIcon: "mdi-delete",
          sAction: "delete",
        },
      ],
    },
    sTypeModule: {
      type: String,
      default: "add",
    },
    bActiveModify: {
      type: Boolean,
      default: false,
    },
    sId: {
      type: String,
      default: "",
    },
    sStatus: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    sSearch: null,
    bDialogInfoOrigin: false,
    aDocsEdit: [],
    oItemInfo: {},
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

    bRefresh() {
      return this.$store.table.bRefresh;
    },
  },
  beforeMount() {
    this.setFillDoc();
  },
  methods: {
    // #region Upload Doc
    setFillDoc() {
      if (this.sTypeModule === "edit") {
        console.log(this.aDocs, "aDocs");
        this.aDocsEdit = this.aDocs;
      }
    },
    setDocsAddItems(oDocAddItems) {
      // const oDoc = this.aDocuments.find(
      //   (e) => e.sId === oDocAddItems.oItem.sId
      // );
      console.log(oDocAddItems.name, "oDocAddItems");
      this.aDocsEdit.push({
        sId: this.getIdRandomGlobal(),
        sName: oDocAddItems.name,
        oFile: oDocAddItems,
      });
    },
    setDocDeleteItems(oDocDeleteItems) {
      const index = this.aDocsEdit.findIndex(
        (e) => e.sId === oDocDeleteItems.sId
      );
      if (index !== -1) {
        this.aDocsEdit.splice(index, 1); // Elimina 1 elemento en la posición index
      } else {
        console.error("No se encontró el documento para eliminar.");
      }
    },
    // #endregion Upload Doc
  },
  watch: {
    aDocs: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        console.log(newVal, "newVal");
        this.setFillDoc();
      },
    },
  },
};
</script>
<style scoped>
.content-upload-docs-lots-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border: 2px solid var(--global-color-black);
  border-radius: 10px;
  min-height: 150px;
  max-height: 150px;
}

.content-upload-docs-lots-all {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}
</style>
