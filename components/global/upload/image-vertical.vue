<template>
  <div class="content-upload-image-all">
    <div class="content-upload-image">
      <div v-if="bLoadingAddImg" class="content-overlay-loading-img">
        <i class="bx bx-loader bx-spin icon-loader-img"></i>
      </div>
      <!-- <v-btn v-if="sImages" icon class="btn-view-img" @click="setVieImg">
        <span class="mdi mdi-eye icon-view-img"></span>
      </v-btn> -->
      <!-- #region image load -->
      <img
        v-if="sImages"
        class="img-upload"
        :class="sModImgUpload === 'Circle' ? 'b-radius-circule' : ''"
        :src="sImages"
      />
      <!-- #endregion image load -->

      <!-- #region image empty and upload -->
      <div v-else class="content-empty-upload-new-image">
        <div v-if="bActiveModify" class="content-btn-empty-upload">
          <v-btn class="btn-primary-global" @click="setOpenImgUpload">
            <span class="mdi mdi-plus icon-plus-add"></span> Añadir imagen
          </v-btn>
        </div>
        <core-img-empty />
      </div>

      <!-- #endregion image empty and upload -->
    </div>

    <!-- #region content btns actions -->
    <div
      v-if="bActiveModify && sImages"
      class="content-btns-actions-upload-img"
    >
      <div>
        <v-btn
          v-if="sImages"
          class="btn-second-global-red"
          @click="setDeleteImg"
          :loading="bLoadingAddImg"
        >
          Eliminar
        </v-btn>
      </div>
      <div>
        <v-btn
          class="btn-primary-global"
          @click="setOpenImgUpload"
          :loading="bLoadingAddImg"
        >
          Subir foto
        </v-btn>
      </div>
    </div>
    <!-- #endregion content btns actions -->

    <input
      ref="fileInput"
      type="file"
      id="fileInput"
      accept="image/*"
      class="d-none"
      @change="setFileSelection"
    />
    <!-- #region dialog to view image full size  -->
    <dialogs-img-full
      :bDialogImgFullOrigin="bDialogImgFullOrigin"
      :sImg="sViewImage"
      @setDialogImgFull="setDialogImgFull"
    />
    <!-- #endregion dialog to view image full size  -->

    <!-- #region dialog to upload image -->
    <dialogs-img-upload
      v-model="bDialogImgUpload"
      :sImages="sImagesNew"
      :sModImgUpload="sModImgUpload"
      :iWidth="iWidth"
      :iHeight="iHeight"
      @setImgUpload="setImgUpload"
      @setCancel="setCancel"
    />
    <!-- #endregion dialog to upload image -->
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    sMod: {
      type: String,
      default: "add",
    },
    aImg: {
      type: Array,
      default: () => [],
    },
    bActiveModify: {
      type: Boolean,
      default: false,
    },
    bAddImg: {
      type: Boolean,
      default: false,
    },
    bDeleteImg: {
      type: Boolean,
      default: false,
    },
    oItem: {
      type: Object,
      default: {},
    },
    aActionsEdit: {
      type: Array,
      default: [
        {
          sName: "Ver imagen",
          sIcon: "mdi-eye",
          sAction: "view",
        },
        {
          sName: "Reemplazar",
          sIcon: "mdi-file-replace",
          sAction: "replace",
        },
        {
          sName: "Eliminar",
          sIcon: "mdi-delete",
          sAction: "delete",
        },
      ],
    },
    bLoadingAddImg: {
      type: Boolean,
      default: false,
    },
    sModImgUpload: {
      type: String,
      default: "Normal",
    },
    iWidth: {
      type: Number,
      default: 450,
    },
    iHeight: {
      type: Number,
      default: 250,
    },
  },
  data: () => ({
    bDialogImgFullOrigin: false,
    aImages: [
      {
        sId: "123",
        sUrl: null,
      },
    ],
    aImagesNew: [
      {
        sId: "123",
        sUrl: null,
      },
    ],
    sImages: null,
    sImagesNew: null,
    sViewImage: "",
    iReplaceIndex: -1, // Newly added property to track the index of the image being replaced
    bDialogImgUpload: false,
  }),
  computed: {
    oStyleImg() {
      return {
        width: this.iWidth,
        height: this.iHeight,
      };
    },
  },
  emits: [
    "update:modelValue",
    "setDeleteImg",
    "setAddImgAPI",
    "setDeleteImgAPI",
  ],
  beforeMount() {
    this.setImg();
  },
  methods: {
    setImg() {
      if (this.sMod === "edit") {
        this.aImages = [];
        this.aImages = [...this.aImg];
        this.sImages = this.aImg[0] ? this.aImg[0].sUrl : "";
        this.sViewImage = this.aImg[0] ? this.aImg[0].sUrl : "";
      }
    },
    setUpdateImages() {
      this.sImagesNew = this.aImagesNew[0].sUrl;
      //   this.$emit("update:modelValue", this.aImages);
    },
    setOpenImgUpload() {
      this.$refs.fileInput.click();
    },
    setFileSelection(event) {
      const files = event.target.files;
      const file = files[0]; // Assuming only one file is selected
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = {
          name: file.name,
          sUrl: event.target.result,
          file: file,
        };
        if (this.iReplaceIndex !== -1) {
          // Replace image at the specified index
          this.aImagesNew.splice(this.iReplaceIndex, 1, image);
          this.iReplaceIndex = -1; // Reset the iReplaceIndex after replacing the image
        } else {
          // Add new image to the array
          this.aImagesNew = [];
          this.aImagesNew.push(image);
        }
        this.setUpdateImages();
        this.bDialogImgUpload = true;
      };
      reader.readAsDataURL(file);
    },
    setImgUpload(File) {
      if (this.aImages.length > 0) {
        this.aImages[0].sUrl = File.sImg;
        this.aImages[0].file = File.File.file;
        this.sImages = File.sImg;
        if (this.bAddImg) {
          this.$emit("setAddImgAPI", this.oItem);
        }
        this.$emit("update:modelValue", this.aImages);
        // this.sImages = null;
        const input = document.getElementById("fileInput");
        input.value = "";
      }
    },
    setDeleteImg() {
      this.$emit("setDeleteImg", true);
      this.sImages = null;
      const input = document.getElementById("fileInput");
      input.value = "";

      if (this.aImages.length > 0) {
        this.aImages[0].sUrl = null;
      }
      if (this.bDeleteImg) {
        this.$emit("setDeleteImgAPI", this.oItem);
      }
    },
    setVieImg() {
      this.setDialogImgFull(this.sImages);
    },
    setCancel() {},
    setDialogImgFull(sImg) {
      this.bDialogImgFullOrigin = !this.bDialogImgFullOrigin;
      if (this.bDialogImgFullOrigin) {
        this.sViewImage = this.aImages.length > 0 ? this.aImages[0].sUrl : null;
      } else {
        this.sViewImage = "";
      }
    },
  },
  watch: {
    aImg: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {
        this.setImg();
      },
    },
  },
};
</script>
<style scoped>
.content-upload-image-all {
  position: relative;
}

/* #region Carga de imagen */
.content-overlay-loading-img {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--global-bg-grey-overlay);
  z-index: 9;
  border-radius: 16px !important;
}
.icon-loader-img {
  font-size: 3rem;
  margin-top: 15px;
  color: var(--global-color-breadcrumbs-green);
}
/* #endregion Carga de imagen */

/* #region imagen  */

.content-upload-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 400px;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 10px;
  border: 2px solid var(--global-color-black);
  border-radius: 19px;
}

.content-empty-upload-new-image {
  position: relative;
  width: 100%;
  height: 100%;
}
.content-btn-empty-upload {
  position: absolute;
  /* min-width: 200px; */
  right: 10px;
  top: 5px;
}

.btn-view-img {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  right: 10px;
  top: 5px;
  color: white !important;
  font-size: 1.2rem !important;
  background-color: rgba(0, 0, 0, 0.233);
}

.img-upload {
  width: 225px;
  height: 396px;
  object-fit: cover;
}

.b-radius-circule {
  border-radius: 100% !important;
  width: 230px !important;
  height: 250px !important;
  object-fit: cover !important;
  padding: 10px 0;
}
/* #endregion imagen  */

.icon-plus-add {
  color: var(--global-color-white) !important;
  font-size: 1.4rem;
}

.content-btns-actions-upload-img {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-upload-image {
    display: flex;
    justify-content: center;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    width: 100%;
    max-width: 100%;
    overflow: auto;
    flex-wrap: wrap;
    gap: 10px;
  }
  .content-upload-image::-webkit-calendar-picker-indicator {
    display: none;
  }
  #image-input {
    border-style: dashed;
    width: 100%;
    height: 100%;
    border-color: var(--global-color-txt-blue);
    border-width: 1px;
  }
  .image-input-icon {
    font-size: 40px;
    color: var(--global-color-txt-blue);
  }
  .image-input-text {
    line-height: 14px;
    color: var(--global-color-txt-blue);
    font-size: 12px;
    text-align: center;
  }
  .image-input-card {
    width: 100%;
    height: 100%;
    border-radius: 16px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .img-upload {
    width: 100%;
    height: 100%;
  }
}

/*#endregion XS */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
