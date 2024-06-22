<template>
  <v-text-field
    v-model="sExt"
    variant="solo"
    flat
    density="comfortable"
    color="primary"
    :bg-color="BgColor"
    class="input-global"
    :placeholder="placeholder"
    :readonly="readonly"
    :label="label"
    required
    inputmode="numeric"
    hide-details
    rounded="lg"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    modelValue: {
      // type: String,
      type: [String, Number],
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    BgColor: {
      type: String,
      default: "grey",
    },
    readonly: Boolean,
  },
  emits: ["update:modelValue"],
  data: () => ({
    sExt: "",
  }),
  computed: {},
  methods: {},
  watch: {
    modelValue: {
      immediate: true, // Opcional, si deseas que se ejecute el watcher de inmediato al montar el componente
      handler(newValue) {
        this.sExt = newValue;
      },
    },
    sExt(newValue) {
      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>
