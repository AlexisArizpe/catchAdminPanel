<template>
  <div class="content-stepper-all">
    <div class="line-bg"></div>
    <div v-for="(oItem, i) in aItems" :key="i" class="items-stepper">
      <div
        class="item-icon-stepper"
        :class="[
          oItem.bInProcessing ? 'item-icon-in-processing' : '',
          oItem.bSuccess ? 'item-icon-complate' : '',
          oItem.sBg ? `border-canceled ${oItem.sBg}` : '',
          oItem.sColor ?? '',
        ]"
      >
        <span
          :class="[
            oItem.sIcon,
            oItem.bInProcessing ? 'icon-in-processing' : '',
            oItem.bSuccess ? 'icon-complate' : '',
          ]"
          class="icon-stepper"
        ></span>
      </div>
      <p
        class="txt-stepper"
        :class="[
          oItem.bSuccess ? 'txt-stepper-complate' : '',
          oItem.bInProcessing ? 'txt-stepper-in-processing' : '',
          oItem.sColor ?? '',
        ]"
      >
        {{ oItem.sName }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sStatus: String,
  },
  data: () => ({}),
  computed: {
    aItems() {
      switch (this.sStatus) {
        case "ACTIVADO":
          return [
            {
              sIcon: "mdi mdi-check",
              sName: "Activación",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-ticket-confirmation-outline",
              sName: "Canjeado",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: false,
              bInProcessing: true,
            },
            {
              sIcon: "mdi mdi-instagram",
              sName: "Completo",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: false,
              bInProcessing: false,
            },
          ];
        case "CANCELADO":
          return [
            {
              sIcon: "mdi mdi-check",
              sName: "Activación",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-ticket-confirmation-outline",
              sName: "CANCELADO",
              sColor: "color-red-canceled-global",
              sBg: "bg-color-red-canceled-global",
              bCancel: false,
              bSuccess: false,
              bInProcessing: true,
            },
            {
              sIcon: "mdi mdi-instagram",
              sName: "Completo",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: false,
              bInProcessing: false,
            },
          ];
        case "CANJEADO":
          return [
            {
              sIcon: "mdi mdi-check",
              sName: "Activación",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-check",
              sName: "Canjeado",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-instagram",
              sName: "Completo",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: false,
              bInProcessing: true,
            },
          ];
        case "COMPLETO":
          return [
            {
              sIcon: "mdi mdi-check",
              sName: "Activación",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-check",
              sName: "Canjeado",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-check",
              sName: "Completo",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
          ];
        case "INCOMPLETO":
          return [];
        case "CADUCADO":
          return [
            {
              sIcon: "mdi mdi-check",
              sName: "Activación",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: true,
              bInProcessing: false,
            },
            {
              sIcon: "mdi mdi-ticket-confirmation-outline",
              sName: "CADUCADO",
              sColor: "color-red-canceled-global",
              sBg: "bg-color-red-canceled-global",
              bCancel: false,
              bSuccess: false,
              bInProcessing: true,
            },
            {
              sIcon: "mdi mdi-instagram",
              sName: "Completo",
              sColor: null,
              sBg: null,
              bCancel: false,
              bSuccess: false,
              bInProcessing: false,
            },
          ];
        default:
          [];
      }
    },
  },
};
</script>
<style scoped>
.content-stepper-all {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 85px;
  max-height: 85px;
}
.line-bg {
  position: absolute;
  height: 2px;
  width: 80%;
  left: 10%;
  top: 31px;
  background-color: var(--global-color-black);
  z-index: -0px;
}
.items-stepper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1px;
}
.item-icon-stepper {
  position: relative;
  z-index: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;
  border: 1px solid var(--global-color-black);
  height: 30px;
  max-height: 30px;
  min-height: 30px;
  width: 30px;
  max-width: 30px;
  min-width: 30px;
  border-radius: 100%;
}
.item-icon-in-processing {
  height: 60px;
  max-height: 60px;
  min-height: 60px;
  width: 60px;
  max-width: 60px;
  min-width: 60px;
}
.item-icon-complate {
  background-color: var(--global-color-black);
}
.icon-stepper {
  font-size: 1rem;
  line-height: normal !important;
}
.icon-in-processing {
  font-size: 1.9rem !important;
}
.icon-complate {
  color: var(--global-color-white);
  font-size: 1.5rem;
}

.txt-stepper {
  font-size: 0.9rem;
}
.txt-stepper-complate {
  font-weight: bold;
}
.txt-stepper-in-processing {
  font-size: 1rem;
  font-weight: bold;
}
.border-canceled {
  border: solid 2px var(--global-color-red-canceled);
}
</style>
