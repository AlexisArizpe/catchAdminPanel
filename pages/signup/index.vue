<template>
  <div>
    <NuxtLayout name="initial">
      <div class="content-form-initial-signup">
        <div
          class="content-form-initial-title-global my-0 content-title-signup"
        >
          <span class="txt-initial-global"
            >Formulario de suscripción
            <span class="txt-sub-initial-global">Completa tus datos</span>
          </span>
        </div>

        <div class="content-form-inputs-signup">
          <v-stepper
            v-model="iStepper"
            class="content-stepper-signup"
            bg-color="transparent"
            flat
            hide-actions
          >
            <template v-slot:default="{ prev, next }">
              <v-stepper-header class="stepper-header-signup-global">
                <template v-for="(oItem, i) in aItems" :key="`${i}-step`">
                  <v-stepper-item
                    :complete="iStepper > i + 1"
                    :step="i + 1"
                    :value="i + 1"
                    :title="oItem.sName"
                  ></v-stepper-item>

                  <v-divider v-if="0 >= i" :key="`${i}-divider`"></v-divider>
                </template>
              </v-stepper-header>

              <v-stepper-window>
                <v-stepper-window-item
                  v-for="(oItem, i) in aItems"
                  :key="`${oItem}-content`"
                  :value="i + 1"
                >
                  <keep-alive class="pb-3">
                    <component
                      :is="markRaw(oItem.sComponent)"
                      :sForm="sForm"
                      :bValidate="bValidate"
                      @setValidate="setValidate"
                      :oItemsField="oItem.oItemsField"
                    />
                  </keep-alive>
                </v-stepper-window-item>
              </v-stepper-window>

              <div class="content-actions-signup-global">
                <v-btn @click="setBack()" class="btn-cancel-signup">
                  Cancelar
                </v-btn>
                <v-btn
                  :loading="bLoadingBtnAdd"
                  @click="setNext()"
                  class="btn-primary-signup"
                >
                  {{ sNextText }}
                </v-btn>
              </div>
            </template>
          </v-stepper>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
import { markRaw } from "vue"; // Importa markRaw

export default {
  name: "PageLogin",
  data() {
    return {
      iStepper: 1,
      aImageRestaurant: [],
      aItems: [
        {
          sId: 1,
          sName: "Restaurante",
          sComponent: markRaw(resolveComponent("signupRestaurant")),
          oItemsField: {
            aImage: [],
            sEstablishmentName: null,
            iCountryCallingCode: 2,
            sEstablishmentPhoneNumber: null,
            sEstablishmentPhoneExtension: null,
            sLocationAddress: null,
            sLocationAddressDetail: null,
            sLocationAddressZIPCode: null,
            sLocationAddressCity: null,
            iLocationAddressState: null,
            dLocationLatitude: 0,
            dLocationLongitude: 0,
          },
        },
        {
          sId: 2,
          sName: "Contacto",
          sComponent: markRaw(resolveComponent("signupContact")),
          oItemsField: {
            sName: null,
            sLastName: null,
            sEmail: null,
            // iCountryCallingCodeContact:2,
            sPhoneNumber: null,
            sPhoneExtension: null,
          },
        },
        // {
        //   sName: "Usuario",
        //   sComponent: markRaw(resolveComponent("signupUser")),
        //   oItemsField: {
        //     sEmailLogin: null,
        //     sPassword: null,
        //     sPasswordConfirm: null,
        //   },
        // },
      ],
      bValidate: false,
      sForm: "",
      bLoadingBtnAdd: false,
    };
  },
  computed: {
    sNextText() {
      if (this.iStepper === this.aItems.length) {
        return "Crear establecimiento";
      } else {
        return "Siguiente";
      }
    },
  },
  mounted() {
    let input = document.querySelector("input[type=password]");
    if (input) {
      input.setAttribute("autocomplete", "off");
      input.setAttribute("readonly", "true");
      input.setAttribute("onfocus", 'this.removeAttribute("readonly");');
    }
  },
  methods: {
    setBack() {
      if (this.iStepper > 1) {
        this.iStepper--;
      }
    },
    async setNext() {
      let sName = this.aItems.find((e) => e.sId === this.iStepper).sName;
      this.bValidate = !this.bValidate;
      this.sForm = `form${sName}`;
    },
    setValidate(bValidate) {
      if (bValidate) {
        if (this.iStepper < this.aItems.length) {
          this.iStepper++;
        } else {
          this.setAdd();
        }
      }
    },
    setAdd() {
      this.bLoadingBtnAdd = true;
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = this.getPayload();
      this.$api
        .post(`establishments`, payload, config)
        .then(async (response) => {
          let sEstablishmentId = response.data.establishment.sEstablishmentId;
          // if (this.aImageRestaurant.length > 0) {
          //   await this.setAddImg(sEstablishmentId, response.data.message);
          // }
          this.$toast(response.data.message, {
            type: "success",
            hideProgressBar: true,
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
          }, 1500);
        })
        .catch((error) => {
          this.bLoadingBtnAdd = false;
          this.$toast(error.response.data.message, {
            type: "error",
            hideProgressBar: true,
          });
        });
    },
    async setAddImg(sEstablishmentId) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const formData = new FormData();
        formData.append("aImage", this.aImageRestaurant[0].file);
        await this.$api.post(
          `establishments/images/${sEstablishmentId}`,
          formData,
          config
        );
      } catch (error) {
        this.bLoadingBtnAdd = false;
        console.log(error);
      }
    },
    getPayload() {
      // Combina las propiedades oItemsField en un solo objeto
      const oPayload = this.aItems.reduce((accumulator, currentItem) => {
        return { ...accumulator, ...currentItem.oItemsField };
      }, {});

      this.aImageRestaurant = oPayload.aImage;
      delete oPayload.aImage;

      return oPayload;
    },
  },
  watch: {
    iStepper() {
      if (this.iStepper === this.aItems.length) {
      }
    },
  },
};
</script>
<style scoped>
.content-form-initial-signup {
  height: 100%;
  padding: 40px 0px !important;
}
.content-form-inputs-signup {
  height: 100%;
}
.content-title-signup {
  /* padding: 40px 0px; */
}

.content-stepper-signup {
  height: 100% !important;
  overflow: auto;
}
.content-stepper-signup::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}

.content-stepper-signup::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

.content-stepper-signup::-webkit-scrollbar-thumb {
  background: var(--global-color-scroll) !important;
  border-radius: 10px;
}

.content-stepper-signup::-webkit-scrollbar-thumb:hover {
  background: var(--global-color-scroll) !important;
}
.content-form-inputs {
  width: 100%;
  height: 100%;
}
.content-actions-signup-global {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 0px 25px 40px 25px;
  width: 100%;
}
</style>
<style>
.stepper-header-signup-global {
  box-shadow: none !important;
}
.txt-title-signup {
  font-weight: bold;
}
.txt-subtitle-signup {
  font-size: 0.9rem;
}
.btn-cancel-signup {
  border: 1px solid var(--global-color-black) !important;
  color: var(--global-color-black) !important;
  text-transform: none !important;
  letter-spacing: 0px;
  width: calc(50% - 10px);
}
.btn-primary-signup {
  background-color: var(--global-color-black) !important;
  color: var(--global-color-white) !important;
  text-transform: none !important;
  letter-spacing: 0px;
  width: calc(50% - 10px);
}
</style>
