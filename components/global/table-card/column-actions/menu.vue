<template>
  <div class="content-menu-card-global">
    <!-- :close-on-content-click="false" -->
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon variant="text" density="comfortable" v-bind="props">
          <span class="mdi mdi-dots-vertical btn-icon-menu-card-global"></span>
        </v-btn>
      </template>

      <v-list density="comfortable" nav>
        <v-list-item
          v-for="(item, i) in aActionsTableCard"
          :disabled="item.iAction === 3 && !oItem.bStatus"
          :key="i"
          @click="setAction(item.iAction)"
        >
          <template v-if="item.iAction !== 4" v-slot:prepend>
            <span class="icon-menu-card-global" v-html="item.sIcon"> </span>
          </template>
          <v-list-item-title
            v-if="item.iAction !== 4"
            class="icon-txt-card-global"
            v-text="item.sName"
          ></v-list-item-title>

          <div class="content-switch-menu" v-if="item.iAction === 4">
            <v-switch
              v-model="oItem.bPlatformAccess"
              :loading="oItem.bPlatformAccessLoading"
              :disbled="oItem.bPlatformAccessLoading"
              @change="setAction(item.iAction)"
              color="var(--global-color-green)"
              hide-details
            ></v-switch>
          </div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
//#region iAction Information //
// iAction:1 --> Show detail item
// iAction:2 --> Delete item
// iAction:3 --> Add Component item
// iAction:4 --> Limit item
// iAction:5 --> Give out Item
// iAction:6 --> Generate ticket Item
//#endregion iAction Information //

export default {
  props: {
    aActionsTableCard: Array,
    oItem: Object,
  },
  emits: [
    "setDetailItem",
    "setDeleteItem",
    "setAccessItem",
    "setAddComponent",
    "setGiveOutItem",
    "setGenerateTicketItem",
  ],
  data() {
    return {};
  },
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
          break;
        case 5:
          this.setGiveOutItem();
          break;
        case 6:
          this.setGenerateTicketItem();
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
  },
};
</script>
<style>
.content-menu-card-global {
  display: flex;
  width: auto;
  align-items: center;
}
.btn-icon-menu-card-global {
  font-size: 1.2rem;
}
.icon-menu-card-global {
  font-size: 1.3rem;
  margin-right: 13px;
}

.v-list .v-list-item .v-list-item__content .content-switch-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35px;
}
.v-list
  .v-list-item
  .v-list-item__content
  .content-switch-menu
  .v-input
  .v-input__control
  .v-selection-control {
  display: flex;
  justify-content: center;
}
/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
  .demoColorResponsive {
    background-color: rgb(201, 122, 83);
  }
}

/*#endregion MD */

/*#region LG */
@media (min-width: 1264px) and (max-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(204, 198, 109);
  }
}

/*#endregion LG */

/*#region XL */
@media (min-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(113, 199, 201);
  }
}

/*#endregion XL */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
