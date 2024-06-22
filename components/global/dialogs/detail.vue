<template>
  <v-dialog v-model="bDialogDetail" width="auto">
    <v-card>
      <keep-alive>
        <component :is="sComponent" />
      </keep-alive>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    sComponent: String,
  },
  data: () => ({ bDialogDetail: false }),
  emits: ["update:modelValue"],
  watch: {
    modelValue() {
    //   this.bDialogDetail = this.modelValue;
    },
    bDialogDetail() {

    //   this.$emit("update:modelValue", this.bDialogDetail);
    },
  },
};
</script>
