<template>
  <div class="content-selected-item-checkbox">
    <div v-for="(oItem, i) in aItems" :key="i" class="content-item-checkbox">
      <div class="content-checkbox">
        <v-checkbox
          v-if="eType === 'multiple'"
          v-model="oItem.bActive"
          hide-details
        ></v-checkbox>
        <v-checkbox
          v-else
          v-model="sValueEdit"
          :value="oItem.sId"
          hide-details
        ></v-checkbox>
      </div>
      <div class="content-txt">{{ oItem.sName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    aItems: {
      type: Array,
      default: [],
    },
    eType: {
      type: String,
      default: "multiple",
    },
    sValue: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    sValueEdit: null,
  }),
  emits: ["update:modelValue"],
  beforeMount() {
    if (this.eType === "unitary") {
      this.sValueEdit = this.sValue;
    }
  },
  methods: {
    setActive(oItem) {
      oItem.bActive = !oItem.bActive;
    },
  },
  watch: {
    sValueEdit() {
      // this.sValue = this.sValueEdit;
      this.$emit("update:modelValue", this.sValueEdit);
    },
  },
};
</script>
<style scoped>
.content-selected-item-checkbox {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
}
.content-item-checkbox {
  display: flex;
  gap: 1px;
  align-items: center;
}
.content-txt {
  font-size: 0.9em;
}
</style>
