<template>
  <div class="content-upload-imgs-all">
    <div
      v-for="(oItem, i) in oItem.aPhotos"
      :key="i"
      class="content-img content-restaurant-imgs"
    >
      <v-btn
        @click="setDeleteImg(oItem, i)"
        icon
        size="x-small"
        class="btn-delete-img"
      >
        <span class="mdi mdi-close icon-delete-img"></span>
      </v-btn>
      <img class="restaurant-img" :src="oItem.sImg" />
    </div>

    <v-card
      v-if="oItem.aPhotos.length <= 7"
      @click="setInputImg"
      class="content-img content-upload-img"
    >
      <v-card-text class="content-text-upload-img">
        <i class="mdi mdi-image-area icon-add-img"></i>
        <p>Agregar foto</p>
      </v-card-text>
      <v-file-input
        ref="file-input"
        class="d-none"
        accept="image/*"
        @change="setFileSelection"
      ></v-file-input>
    </v-card>

    <!-- #region dialog to upload image -->
    <dialogs-img-upload
      v-model="bDialogImgUpload"
      :sImages="sImagesNew"
      sModImgUpload="Normal"
      @setImgUpload="setImgUpload"
    />
    <!-- #endregion dialog to upload image -->
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
    bDialogImgUpload: false,
    sImagesNew: null,
  }),
  computed: {
    sEstablishmentId() {
      return this.$store.user.sEstablishmentId;
    },
  },
  methods: {
    setInputImg() {
      this.$refs["file-input"].click();
    },
    async setImgUpload(oFile) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const formData = new FormData();
        formData.append("aImage", oFile.File.file);
        formData.append("aFileNames", "Imagen de restaurante");
        const oResult = await this.$api.post(
          `establishments/images/${this.sEstablishmentId}?bManyImages=${true}`,
          formData,
          config
        );

        this.oItem.aPhotos.push(oFile);
        this.$refs["file-input"].value = null;
      } catch (error) {
        console.log(error, "error");
      }
    },
    setFileSelection(event) {
      const files = event.target.files;
      const file = files[0]; // Assuming only one file is selected
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = {
          sName: file.name,
          sImg: event.target.result,
          oFile: file,
          bAdd: true,
        };
        // this.oItem.aPhotos.push(image);
        this.sImagesNew = event.target.result;
        this.bDialogImgUpload = true;
      };
      reader.readAsDataURL(file);
    },
    async setDeleteImg(oItem, i) {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {};
        const oResult = await this.$api.delete(
          `establishments/images/${oItem.sId}`,
          config,
          payload
        );
        this.oItem.aPhotos.splice(i, 1);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.content-upload-imgs-all {
  height: 100%;
  display: flex;
  /* justify-content: center; */
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 0px;
}
.content-img {
  position: relative;
  box-shadow: none;
  max-width: calc(100% / 4 - 10px);
  min-width: calc(100% / 4 - 10px);
  max-height: 116px;
  min-height: 116px;
  border-radius: 10px;
  overflow: hidden;
}

.restaurant-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--global-color-black);
  border-radius: 10px;
}
.btn-delete-img {
  position: absolute;
  right: 2px;
  top: 2px;
  z-index: 1;
  background-color: var(--global-color-red);
}
.icon-delete-img {
  color: var(--global-color-white);
}
.content-upload-img {
  border: 1px dashed var(--global-color-black);
}
.content-text-upload-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.icon-add-img {
  font-size: 2.5em;
  line-height: normal;
}
</style>
