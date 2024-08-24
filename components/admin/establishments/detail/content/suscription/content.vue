<template>
    <v-row>
    <!-- #region Tipo de suscripción, proximo pago, historial de pagos y cancelar suscripcion -->
    <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12">
            <div class="content-suscription-all">
              <!-- #region type-suscription-all  -->
              <div class="type-suscription-all">
                <img class="img-yellow-dots" src="/img/yellow-dots.svg" />

                <div class="content-txt-suscription">
                  <p class="txt-title-type-suscription">Suscripción catch</p>
                  <p class="txt-type-suscription">{{this.getTypeSuscription(oItem.oSuscription?.eType??'Sin suscripción')}}</p>
                </div>
                <v-spacer />
                <div class="content-time-suscription">
                  <p>{{this.getRemainingDays(oItem.oSuscription)}} días restantes</p>
                </div>
              </div>
              <!-- #endregion type-suscription-all -->

              <!-- #region content-general-info-all -->
              <div class="content-general-info-all">
                <div v-if="oItem.oSuscription?.PaymentMethod" class="content-next-payment">
                  <p class="txt-next-payment">Proximo pago</p>
                  <p class="txt-date-payment">{{this.getNextPayment(oItem.oSuscription?.tNextPayment??'')}}</p>
                  <p class="txt-card-payment">
                    <div class="content-img-brand">
                      <img :src="`/img/card-type/${oItem.oSuscription?.PaymentMethod?.sBrand??''}.svg`"/>
                    </div>
                    •••• •••• •••• {{ oItem.oSuscription?.PaymentMethod?.sLast4??'' }}
                  </p>
                </div>
                <div
                v-if="bSuperAdmin"
                  v-for="(oItem, i) in aItems"
                  :key="i"
                  class="content-item-general-info"
                  @click="setAction(oItem.sAction)"
                >
                  <p class="txt-item-generla-info" :class="oItem.sClassTxt">{{ oItem.sName }}</p>
                  <Icon v-if="oItem.sIcon" :icon="oItem.sIcon" />
                </div>
              </div>
              <!-- #endregion content-general-info-all --> 
            </div>
          </v-col>
        </v-row>
    </v-col>
    <!-- #endregion Tipo de suscripción, proximo pago, historial de pagos y cancelar suscripcion -->
    

    </v-row>
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

    bMyCards: false,
  }),
  computed: {
    aItems() {

      let aItemTemp = [
      {
        sName: "Ver historial de pagos",
        sIcon: "fluent:ios-arrow-right-24-filled",
        sClassTxt:"",
        sAction: "payment-history",
      }
      ]


      // if (this.oItem.oSuscription.eStatus !== 'paused') {
      //   aItemTemp.push({
      //   sName: "Cancelar suscripción",
      //   sIcon: null,
      //   sClassTxt:"color-red-global",
      //   sAction: "unsubscribe",
      // })
      // }
      return aItemTemp
    },
    // #region Variables de permisos

    bSuperAdmin() {
      return this.$store.user.bSuperAdmin
    },
    sActionPermission() {
      return this.$store.permissions.sActionPermission;
    },
    bRead() {
      return this.sActionPermission === "READ";
    },
    bWrite() {
      return this.sActionPermission === "WRITE";
    },
    bManage() {
      return this.$store.permissions.sActionPermission
        ? this.sActionPermission === "MANAGE"
        : true;
    },
    // #endregion Variables de permisos

  },
  beforeMount() {

  },
  emits: ["setPaymentMethodDefault", "setPaymentMethodDefaultOrigin"],
  methods: {
    async setAction(sAction) {
      switch (sAction) {
        case "my-cards":
          this.bMyCards = true;
          break;
        case "payment-history":
          this.$router.push({name:'admin-payments-history'})
          break;
          case "unsubscribe":
          await this.setUnsubscribe();
          break;

        default:
          break;
      }
    },
    setPaymentMethodDefault(oItemDefault) {
      this.$emit("setPaymentMethodDefault", oItemDefault);
    },
    setPaymentMethodDefaultOrigin(sPaymentMethodDefaultOrigin) {
      this.$emit("setPaymentMethodDefaultOrigin", sPaymentMethodDefaultOrigin);
    },
    getNextPayment(tNextPayment) {
      return this.getFormatDDMMYYYY(new Date(tNextPayment), true)
    },
    getTypeSuscription(eType) {
      switch (eType) {
        case 'free':
        
          return 'Prueba gratis';
      
        default:
          return eType;
      }
    },
    getRemainingDays(oSuscription) {
      if (oSuscription) {
        // Fecha de inicio
        let sStartDate = null;
  
        // Fecha de finalización (fecha actual)
        let sEndDate = null;
  
        if (oSuscription.eType=== 'free') {
          sStartDate = new Date();
          sEndDate = oSuscription.tTrialEnds ? new Date(oSuscription.tTrialEnds) : new Date();
        } else {
          sStartDate = new Date(oSuscription.tNextPayment);
          sEndDate = new Date();
        }
  
  
        // Diferencia en milisegundos
        const iDiffTime = Math.abs(sEndDate - sStartDate);
        // Diferencia en días
        const iDiffDays = Math.ceil(iDiffTime / (1000 * 60 * 60 * 24));
        return iDiffDays
      } else {
        return 0
      }
    },
    async setUnsubscribe() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const payload = {}
        const oResult = await this.$api.post(
          `establishments/pause`,
          payload,
          config
        );

        this.$store.table.setRefresh(true);
        this.$swal.fire({
          title: "Pausada!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      } catch (error) {
        console.log(error, "error");
        this.$swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  },
};
</script>
<style scoped>
.content-suscription-all {
  width: 100%;
}

/* #region content-my-cards */

.icon-left-arrow {
  cursor: pointer;
  font-size: 1.5rem;
}
.content-my-cards {
  width: 100%;
}
/* #endregion content-my-cards */

/* #region type-suscription-all */
.type-suscription-all {
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  background-color: var(--global-color-black);
  color: var(--global-color-yellow-primary);
  min-height: 80px;
  border-radius: 12px;
}
.content-txt-suscription {
  margin-left: 20px;
}
.txt-title-type-suscription {
  font-size: 0.8rem;
  font-weight: 100;
  line-height: normal;
  margin-bottom: 5px;
}
.txt-type-suscription {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: normal;
}
.content-time-suscription {
  background-color: var(--global-color-yellow-primary);
  color: var(--global-color-black);
  padding: 2px 25px 2px 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
/* #endregion type-suscription-all */

/* #region content-general-info-all */
.content-general-info-all {
  margin-top: 20px;
  border: 1px solid var(--global-color-grey-border);
  border-radius: 10px;
  padding: 15px 25px 5px 25px;
}

/* #region content-next-payment */
.content-next-payment {
  margin-bottom: 20px;
}
.txt-next-payment {
  font-size: 1.2rem;
  font-weight: 900;
}
.txt-date-payment {
  color: #575757;
  letter-spacing: normal;
  font-size: 0.9rem;
  margin-bottom: 5px;
}
.txt-card-payment {
  display: flex;
  gap:10px;
  align-items: center;
  font-size: 0.8rem;
  color: var(--global-color-black);
}
.content-img-brand{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  overflow: hidden;
  min-height: 20px;
  max-height: 20px;
}
/* #endregion content-next-payment */

/* #region content-item-general-info */
.content-item-general-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  border-top: 1px solid var(--global-color-grey-border);
}
.content-item-general-info:hover .txt-item-generla-info {
  text-decoration: underline;
}
.txt-item-generla-info {
  transition: all 0.5s;
  font-size: 0.9rem;
  letter-spacing: normal;
  line-height: normal;
}
/* #endregion content-item-general-info */

/* #endregion content-general-info-all */

.content-cancel-suscription {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
