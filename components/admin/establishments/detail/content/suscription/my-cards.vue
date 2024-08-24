<template>
  <div class="content-restaurant-user-data-all">
    <!-- persistent -->
    <v-overlay
      v-model="bLoadingAction"
      class="align-center justify-center"
      contained
      persistent
    >
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <p class="txt-title-my-card">Mis tarjetas</p>
    <v-radio-group
      v-model="sPaymentMethodDefault"
      @change="setChange"
      hide-details
      class="content-items-card-all"
    >
      <table-card-loading-items v-if="bLoadingItems" />
      <table-card-empty-items v-else-if="aItems.length === 0" />
      <div
        v-for="(oItem, i) in aItems"
        :key="i"
        class="content-item-card"
        :class="sPaymentMethodDefault === oItem.sId ? 'item-selected' : ''"
        @click="sPaymentMethodDefault = oItem.sId"
      >
        <div class="content-txt-card">
          <div class="content-type-card">
            <img class="img-type-card" :src="oItem.sTypeCard" />
          </div>
          <div>
            <p class="txt-name-card">{{ oItem.sNameCard }}</p>
            <p class="txt-card">{{ oItem.sNumberCard }}</p>
          </div>
        </div>
        <div class="content-actions-card">
          <p class="txt-exp">{{ oItem.sTxtExp }}</p>
          <v-radio density="compact" hide-details :value="oItem.sId"></v-radio>
          <div
            v-if="sPaymentMethodDefault !== oItem.sId"
            class="content-btn-delete"
          >
            <v-btn
              @click.stop="setDeleteItemConfirm(oItem.sId)"
              icon
              variant="text"
              size="x-small"
            >
              <Icon
                class="icon-delete"
                icon="material-symbols:delete-outline"
              />
            </v-btn>
          </div>
        </div>
        <div
          v-if="sPaymentMethodDefault === oItem.sId"
          class="content-card-default"
        >
          Predeterminado
        </div>
      </div>
    </v-radio-group>
    <div v-if="!bLoadingItems" class="content-add-new-card">
      <v-btn
        @click="setAddNewCard"
        variant="text"
        class="btn-second-text-global"
      >
        <span><Icon icon="material-symbols:add" /> Agregar tarjeta</span>
      </v-btn>
    </div>
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
    bLoadingAction: false,
    aItems: [],
    bLoadingItems: true,
    sPaymentMethodDefault: null,
    sPaymentMethodDefaultOrigin: null,
    customerId: "cus_QNQDmXihMzopXa",
  }),
  computed: {
    bRefresh() {
      return this.$store.table.bRefresh;
    },
  },
  emits: ["setPaymentMethodDefault", "setPaymentMethodDefaultOrigin"],
  async beforeMount() {
    await this.getPaymentMethods();
  },
  methods: {
    setAddNewCard() {
      this.$router.push({
        name: "admin-payments-way-pay",
        // query: { type: "Add" },
      });
    },
    async getPaymentMethods() {
      try {
        this.bLoadingItems = true;
        this.aItems = [];
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(
          `establishments/paymentMethods`,
          payload
        );
        this.aItems = oResult.data.paymentMethods.map((e) => {
          return {
            sId: e.sPaymentMethodId,
            sTypeCard: `/img/card-type/${e.oCard.sBrand}.svg`,
            sNameCard: e.sBillingDetailName,
            sNumberCard: `${
              this.getCardTypeGlobal(e.oCard.sBrand).cardType
            } •••• ${e.oCard.sLast4}`,
            sTxtExp: this.getTxtExp(e.oCard.iExpMonth, e.oCard.iExpYear),
            bDefault: e.bIsDefault,
            customerId: this.customerId,
          };
        });
        if (this.aItems.length > 0) {
          let oItemDefault = this.aItems.find((e) => e.bDefault === true);
          this.sPaymentMethodDefault = oItemDefault.sId;
          this.sPaymentMethodDefaultOrigin = oItemDefault.sId;
        }
        this.bLoadingItems = false;
        this.$store.table.setRefresh(false);
      } catch (error) {
        this.bLoadingItems = false;
        console.error("Error fetching payment methods:", error);
      }
    },
    async setDeleteItemConfirm(sId) {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-red-global"> eliminar </span>
            el <span class="font-weight-bold">método de pago</span>?</span>`,
          icon: "warning",
          inputAttributes: {
            autocapitalize: "off",
          },

          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setDeleteItem(sId);
          }
        });
    },
    async setDeleteItem(sId) {
      try {
        this.bLoadingAction = true;
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {};
        const oResult = await this.$api.delete(
          `establishments/paymentMethods/${sId}`,
          config,
          payload
        );
        this.$swal.fire({
          title: "Eliminado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.$store.table.setRefresh(true);
        this.bLoadingAction = false;
      } catch (error) {
        this.$swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingAction = false;
      }
    },
    getTxtExp(iMonth, iYear) {
      return `Caduca el ${this.getMonthTxtGlobal(iMonth)}. ${iYear}`;
    },
    async setPaymentMethodDefault(sId) {
      try {
        this.bLoadingAction = true;
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {};
        const oResult = await this.$api.put(
          `establishments/paymentMethods/${sId}/default`,
          payload,
          config
        );
        this.$swal.fire({
          title: "¡Actualizado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingAction = false;
      } catch (error) {
        this.bLoadingAction = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
  },
  watch: {
    async bRefresh() {
      setTimeout(async () => {
        await this.getPaymentMethods();
      }, 1000);
    },
    async sPaymentMethodDefault(sNew, sOld) {
      let oItemDefault = this.aItems.find(
        (e) => e.sId === this.sPaymentMethodDefault
      );
      if (this.sPaymentMethodDefault !== this.sPaymentMethodDefaultOrigin) {
        await this.setPaymentMethodDefault(oItemDefault.sId);
      }
    },
  },
};
</script>

<style scoped>
.content-restaurant-user-data-all {
  width: 100%;
}
.txt-title-my-card {
  color: var(--global-color-txt-grey);
  font-weight: bold;
  line-height: normal;
  letter-spacing: normal;
  margin-bottom: 15px;
}

.content-item-card {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid var(--global-color-grey-border);
  padding: 20px 15px;
}
.content-txt-card {
  display: flex;
  gap: 10px;
  align-items: center;
}
.content-type-card {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 30px;
  max-height: 30px;
}
.img-type-card {
  width: 30px;
}
.txt-name-card {
  letter-spacing: normal;
  line-height: normal;
  color: #596171;
  font-size: 0.8rem;
}
.txt-card {
  font-size: .9rem;
  letter-spacing: normal;
  line-height: normal;
  font-weight: bold;
}
.txt-exp {
  color: #596171;
  font-size: 0.8rem;
  letter-spacing: normal;
}
.content-actions-card {
  display: flex;
  gap: 10px;
  align-items: center;
}
.content-btn-delete {
  height: 100%;
}
.icon-delete {
  font-size: 1.5rem;
  color: var(--global-color-red);
}
.content-card-default {
  position: absolute;
  top: 0px;
  letter-spacing: normal;
  line-height: normal;
  color: var(--global-color-white);
  font-size: 0.8rem;
  padding: 2px 5px;
  font-weight: 800;
  background-color: var(--global-color-black);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  right: 0%;
  transform: translate(-50%, 0%);
}
.item-selected {
  border: 2px solid var(--global-color-black);
}

.content-add-new-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
