<template>
  <div class="pb-5">
    <div class="content-add-card-information">
      <span class="txt-add-card-information"
        >Ingresa la información de la tarjeta</span
      >
    </div>

    <v-form ref="form" class="content-form-inputs">
      <v-row class="ma-0">
        <v-col class="pa-0" cols="12">
          <div class="input-card-number" :class="bCardType ? 'gap-10' : ''">
            <div
              class="content-logo-type-card"
              :class="bCardType ? 'content-logo-type-card-fill' : ''"
            >
              <img
                :src="cardTypeIcon"
                class="icon-type-card"
                :class="!bCardType ? 'opacity-0' : ''"
              />
            </div>

            <div id="card-number-element" class="stripe-element"></div>
          </div>
        </v-col>
        <v-col class="pa-0 pr-3" cols="6">
          <div id="card-expiry-element" class="stripe-element"></div>
        </v-col>
        <v-col class="pa-0 pl-3" cols="6">
          <div id="card-cvc-element" class="stripe-element"></div>
        </v-col>
        <v-col class="pa-0" cols="12">
          <input
            v-model="sCardName"
            class="stripe-element"
            placeholder="Nombre en la tarjeta"
          />
        </v-col>
      </v-row>

      <div class="content-label-recover-password">
        <span class="txt-note" v-html="sTxtDescription"></span>
      </div>
    </v-form>

    <div class="content-btns-stripe">
      <v-btn
        @click="setTokenCreation"
        class="btn-primary-global"
        block
        :loading="bLoadingSave"
      >
        Guardar
      </v-btn>
      <v-btn
        v-if="bShowLogout"
        @click="setLogout"
        class="btn-second-red-global mt-4"
        block
        :loading="bLoadingLogout"
      >
        Cerrar sesión
      </v-btn>
    </div>
  </div>
</template>

<script>
import Stripe from "stripe";

export default {
  props: {
    bDefault: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paymentElement: null,
      bLoadingSave: false,
      paymentError: "",
      sCardName: null,
      bLoading: false,
      bLoadingLogout: false,
      customerId: "cus_QNQDmXihMzopXa",
      bCardType: false,
      cardType: null,
      cardTypeIcon: null,
      stripeSecretKey:
        "sk_test_51PJzbDBvJTbcJIdcaqOicLH3eBNTLmLs9wyxqa2hQH3GwsjUCxz8jWubdKhBukRymMlz1nK3DqilwYEKfsyjN3DB003eumbwKv",
    };
  },
  computed: {
    sCustomerIdGlobal() {
      return this.$store.user.sCustomerIdGlobal;
    },
    sTxtDescription() {
      return `Al hacer clic en el botón <span class="font-weight-bold"> (Guardar) </span> aceptas que Catch continue con tu suscripción <span class='font-weight-bold'> de manera automática y que, hasta que decidas cancelarla, te facture el cargo mensual </span> (en este momento de $xxx.xxx) a través de la forma de pago elegida. Puedes cancelarla en cualquier momento para evitar cargos en el futuro. Puedes hacerlo desde <Perfil> en <Suscripción>`;
    },
    bShowLogout() {
      return this.$route.name === "payment-method-required";
    },
  },
  async mounted() {
    if (this.sCustomerIdGlobal) {
      await this.getSetupIntentStripe();
    }
  },
  methods: {
    async getSetupIntentStripe() {
      try {
        const stripe = new Stripe(this.stripeSecretKey, {});
        const setupIntent = await stripe.setupIntents.create({
          customer: this.sCustomerIdGlobal, // ID del cliente en Stripe
          payment_method_types: ["card"],
        });

        await this.setupStripeElementsCard(setupIntent.client_secret);
      } catch (error) {
        console.log(error);
        console.error("Error al obtener el cliente secreto:", error);
      }
    },
    async setupStripeElementsCard(clientSecret) {
      try {
        const elements = this.$stripe.elements();
        const style = {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        };

        this.cardNumberElement = elements.create("cardNumber", { style });
        this.cardNumberElement.mount("#card-number-element");

        this.cardNumberElement.on("change", (event) => {
          this.updateCardType(event.brand);
        });

        this.cardExpiryElement = elements.create("cardExpiry", { style });
        this.cardExpiryElement.mount("#card-expiry-element");

        this.cardCvcElement = elements.create("cardCvc", { style });
        this.cardCvcElement.mount("#card-cvc-element");
      } catch (error) {
        console.error("Error al configurar Stripe Elements:", error);
      }
    },
    updateCardType(cardBrand) {
      switch (cardBrand) {
        case "visa":
          this.bCardType = true;
          this.cardType = "Visa";
          this.cardTypeIcon = "/img/card-type/visa.svg";
          break;
        case "mastercard":
          this.bCardType = true;
          this.cardType = "Mastercard";
          this.cardTypeIcon = "/img/card-type/mastercard.svg";
          break;
        case "amex":
          this.bCardType = true;
          this.cardType = "American Express";
          this.cardTypeIcon = "/img/card-type/amex.svg";
          break;
        default:
          this.bCardType = false;
          this.cardType = null;
          this.cardTypeIcon = null;
          break;
      }
    },

    resetStripeElements() {
      if (this.cardNumberElement) {
        this.cardNumberElement.clear();
      }
      if (this.cardExpiryElement) {
        this.cardExpiryElement.clear();
      }
      if (this.cardCvcElement) {
        this.cardCvcElement.clear();
      }
      this.sCardName = null;
    },
    async setTokenCreation() {
      this.bLoadingSave = true;
      const { token, error } = await this.$stripe.createToken(
        this.cardNumberElement,
        {
          name: this.sCardName ?? "",
        }
      );

      if (error) {
        console.error("Error al crear el token:", error.message);
        error.message;
        this.$toast(error.message, {
          type: "error",
          hideProgressBar: true,
        });
        this.bLoadingSave = false;
      } else {
        await this.sendTokenToServer(token);
        this.resetStripeElements();
        this.bLoadingSave = false;
        if (this.$route.name === "payment-method-required") {
          this.$router.go();
        }
      }
    },
    async sendTokenToServer(token) {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sCardToken: token.id,
          };
        const oResult = await this.$api.post(
          `establishments/paymentMethods`,
          payload,
          config
        );
        this.$toast(oResult.data.message, {
          type: "success",
          hideProgressBar: true,
        });
      } catch (error) {
        this.bLoadingSave = false;
        this.$toast(`Error al enviar el token al servidor: ${error}`, {
          type: "error",
          hideProgressBar: true,
        });
      }
    },
    async setLogout() {
      // this.$store.catalog.setOverlay(true);
      this.bLoadingLogout = true;
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = {};
      this.$api
        .delete(`auth/logout`, config, payload)
        .then((response) => {
          this.$store.user.setUserId("");
          this.$store.user.setEstablishmentId("");
          this.$store.user.setToken("");
          this.$store.user.setAuth(false);
          this.$store.user.setCustomerIdGlobal("");
          this.$swal.fire({
            title: "Sesión finalizada",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
            this.bLoadingLogout = false;
            // this.$store.catalog.setOverlay(false);
          }, 1500);
        })
        .catch((error) => {
          this.$swal.fire({
            title: "Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          this.bLoadingLogout = false;
          // this.$store.catalog.setOverlay(false);
        });
    },
  },
};
</script>

<style scoped>
.content-add-card-information {
  margin-bottom: 30px;
}
.txt-add-card-information {
  font-size: 1.3rem;
  font-family: "Roboto";
  font-weight: bold;
  text-align: center;
}
.content-form-inputs {
  width: 100%;
}
.stripe-element {
  width: 100%;
  min-height: 41px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 8px;
  transition: all 0.5s;
}

.stripe-element::placeholder {
  color: #acb8c5;
}

.stripe-element:focus {
  outline: none;
  box-shadow: none;
}
.txt-note {
  color: #575757;
  font-size: 0.7rem;
  letter-spacing: 0px;
  text-align: left;
}
.content-btns-stripe {
  margin-top: 40px;
}
.input-card-number {
  display: flex;
  align-items: flex-start;
  transition: all 0.5s;
}
.content-logo-type-card {
  height: 40px;
  min-height: 40px;
  max-height: 40px;

  width: 0px;
  min-width: 0px;
  max-width: 0px;

  transition: all 0.5s;
  overflow: hidden;
}
.content-logo-type-card-fill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
}
.gap-10 {
  gap: 10px;
}
.opacity-0 {
  opacity: 0;
}

.icon-type-card {
  height: 50px;
  min-height: 50px;
  max-height: 50px;

  width: 50px;
  min-width: 50px;
  max-width: 50px;
}
</style>
