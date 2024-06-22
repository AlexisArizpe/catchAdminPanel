<template>
  <div class="content-actions-table-global">
    <div
      class="content-actions"
      v-for="(item, i) in aActionsTableCard"
      :key="i"
    >
      <v-btn
        v-if="item.iAction !== 4"
        v-show="item.iAction === 7 ? bActiveModify : true"
        class="btn-actions-table-global"
        :class="item.sClassBtn + ' ' + item.sClassTxt"
        icon
        density="comfortable"
        variant="text"
        :disabled="item.iAction === 3 && !oItem.bStatus"
        @click="setAction(item.iAction)"
        :loading="
          item.iAction === 2
            ? bLoadingDelete
            : item.iAction === 7
            ? bLoadingEdit
            : false
        "
      >
        <span v-html="item.sIcon" />

        <v-tooltip activator="parent" location="top">
          <span>{{ item.sNameTooltip }}</span>
        </v-tooltip>
      </v-btn>
      <div v-if="item.iAction === 4">
        <v-tooltip v-model="show" location="top">
          <template v-slot:activator="{ props }">
            <v-switch
              v-model="oItem.bPlatformAccess"
              v-bind="props"
              :loading="oItem.bPlatformAccessLoading"
              :disbled="oItem.bPlatformAccessLoading"
              @change="setAction(item.iAction)"
              color="var(--global-color-green)"
              hide-details
            >
            </v-switch>
          </template>
          <span>{{ oItem.bPlatformAccess ? "Restringir" : "Permitir" }}</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //#region iAction Information //
  // iAction:1 --> Show detail item
  // iAction:2 --> Delete item
  // iAction:3 --> Add Component item
  // iAction:4 --> Limit item
  // iAction:5 --> Give out Item
  // iAction:6 --> Generate ticket Item
  //#endregion iAction Information //
  props: {
    aActionsTableCard: Array,
    bLoadingEdit: Boolean,
    bActiveModify: Boolean,
    bLoadingDelete: Boolean,
    oItem: Object,
  },
  data() {
    return {
      show: false,
    };
  },
  emits: [
    "setDetailItem",
    "setDeleteItem",
    "setEditItem",
    "setAccessItem",
    "setAddComponent",
    "setGiveOutItem",
    "setGenerateTicketItem",
  ],
  methods: {
    setAction(iAction) {
      switch (iAction) {
        case 1:
          this.setDetailItem();
          break;
        case 2:
          this.setDeleteItem();
          break;
        case 3:
          this.setAddComponent();
          break;
        case 4:
          this.setAccessItem();
        case 5:
          this.setGiveOutItem();
          break;
        case 6:
          this.setGenerateTicketItem();
          break;
        case 7:
          this.setEditItem();
          break;
        default:
          break;
      }
    },
    setDetailItem() {
      this.$emit("setDetailItem", this.oItem);
    },
    setDeleteItem() {
      this.$emit("setDeleteItem", this.oItem);
    },
    setAddComponent() {
      this.$emit("setAddComponent", this.oItem);
    },
    setAccessItem() {
      this.$emit("setAccessItem", this.oItem);
    },
    setGiveOutItem() {
      this.$emit("setGiveOutItem", this.oItem);
    },
    setGenerateTicketItem() {
      this.$emit("setGenerateTicketItem", this.oItem);
    },
    setEditItem() {
      this.$emit("setEditItem", this.oItem);
    },
  },
};
</script>
<style>
/* #region content action global  */
.content-actions-table-global {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.btn-actions-table-global {
  font-size: 20px !important;
}
.btn-action-global {
  text-transform: none !important;
  background-color: transparent !important;
}
.btn-action-global:hover {
  text-transform: none !important;
  background-color: transparent !important;
  box-shadow: 0px 0px 0px 0px transparent !important;
}
.v-switch__thumb {
  color: var(--global-color-white) !important;
}
/* #endregion content action global  */
</style>
