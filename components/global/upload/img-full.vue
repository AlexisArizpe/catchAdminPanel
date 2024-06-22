<template>
  <v-dialog
    v-model="bDialogImgFull"
    width="auto"
    persistent
    @keydown.esc="setDialogImgFull"
  >
    <div class="content-image-full-dialog">
      <v-btn @click="setDialogImgFull" icon class="global-btn-close">
        <v-icon> mdi-close </v-icon>
      </v-btn>
      <img :src="sImg" alt="" />
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: {
    bDialogImgFullOrigin: Boolean,
    sImg: String,
  },
  data() {
    return {
      bDialogImgFull: false,
    };
  },
  methods: {
    setDialogImgFull() {
      this.$emit("setDialogImgFull");
    },
  },
  watch: {
    bDialogImgFullOrigin() {
      this.bDialogImgFull = this.bDialogImgFullOrigin;
    },
  },
};
</script>
<style>
.content-image-full-dialog {
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: inherit;
  background-color: var(--global-color-white);
}

.content-image-full-dialog img {
  display: block;
  position: relative;
  border-radius: inherit;
  max-width: 100%;
  max-height: 500px;
}
</style>
