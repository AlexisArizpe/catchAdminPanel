<template>
  <v-dialog
    v-model="bDialogImgUpload"
    width="auto"
    persistent
    @keydown.esc="setDialogImgFull"
  >
    <v-card>
      <v-card-text>
        <!-- #region Cropper Imagen circular -->
        <cropper
          v-if="bImgCircle"
          ref="cropper"
          class="cropper"
          :src="img"
          :stencil-component="$options.components.CircleStencil"
          :stencil-size="{
            width: iWidth,
            height: iHeight,
          }"
          :stencil-props="{
            handlers: {},
            movable: false,
            resizable: false,
          }"
          image-restriction="stencil"
          @change="change"
        />
        <!-- #endregion Cropper Imagen circular -->

        <!-- #region Cropper Imagen banner -->
        <cropper
          v-if="bImgBanner"
          ref="cropper"
          class="cropper"
          :src="img"
          :stencil-props="{
            handlers: {},
            movable: true,
            resizable: false,
          }"
          :stencil-size="{
            width: iWidth,
            height: iHeight,
          }"
          image-restriction="stencil"
          @change="change"
        />
        <!-- #endregion Cropper Imagen banner -->

        <!-- #region Cropper Imagen Normal -->
        <cropper
          v-if="bImgNormal"
          ref="cropper"
          class="cropper"
          :src="img"
          :stencil-props="{
            handlers: {},
            movable: true,
            resizable: false,
          }"
          :stencil-size="{
            width: iWidth,
            height: iHeight,
          }"
          image-restriction="stencil"
          @change="change"
        />
        <!-- #endregion Cropper Imagen Normal -->
      </v-card-text>

      <v-card-actions>
        <v-btn color="red" text @click="setCancel"> Cancelar </v-btn>

        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="crop"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { CircleStencil, Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: {
    Cropper,
    CircleStencil,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    sImages: String,
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
  emits: ["update:modelValue", "setImg", "setCancel"],
  data() {
    return {
      bDialogImgUpload: false,
      //   img: "https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      img: null,
      image: null,
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      bImgCircle: false,
      bImgBanner: false,
      bImgNormal: false,
    };
  },
  beforeMount() {
    switch (this.sModImgUpload) {
      case "Normal":
        this.bImgNormal = true;
        break;
      case "Circle":
        this.bImgCircle = true;
        break;
      case "Banner":
        this.bImgBanner = true;
        break;

      default:
        this.bImgNormal = true;

        break;
    }
  },
  methods: {
    defaultVisibleArea() {
      return {
        width: 800,
        height: 775,
        left: 63,
        top: 668,
      };
    },
    setDialogImgFull() {
      this.bDialogImgUpload = false;
    },
    async crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      this.image = canvas.toDataURL();
      const File = await this.getUrlToBlob(this.image);
      this.$emit("setImgUpload", { sImg: this.image, File: File });
      this.setDialogImgFull();
    },
    change({ coordinates, canvas }) {},
    setCancel() {
      this.bDialogImgUpload = false;
      this.$emit("setCancel");
    },
  },
  watch: {
    modelValue() {
      this.bDialogImgUpload = this.modelValue;
    },
    sImages() {
      this.img = this.sImages;
    },
    bDialogImgUpload() {
      this.$emit("update:modelValue", this.bDialogImgUpload);
    },
  },
};
</script>
<style>
.content-img-upload-cropper {
  height: 100%;
  width: 100%;
}

.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
