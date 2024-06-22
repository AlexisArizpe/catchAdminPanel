<template>
    <v-text-field
      v-model="sPhone"
      :disabled="disabled"
      :readonly="readonly"
      :hide-details="hideDetails"
      variant="solo"
      flat
      density="comfortable"
      color="primary"
      :bg-color="BgColor"
      class="input-global"
      required
      :rules="phoneRulesGlobal"
      placeholder="Teléfono"
      maxlength="12"
      rounded="lg"
    >
      <!-- @input="getFormatNumber('sPhone')" -->
      <template #label>
        Teléfono <span class="color-red-global">*</span>
      </template>
      <template #prepend-inner>
        <div class="menu-country-phone-global">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="btn-list-country-phone-global" v-bind="props">
                <div class="content-btn-country-phone-global">
                  <img
                    class="img-flag-country-global"
                    :src="getFlagCountryGlobal(sCountryCallingCodeSelected)"
                  />
                  <span class="mdi mdi-menu-down"></span>
                </div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in aCountrys"
                :key="index"
                link
                @click="setCountryPhone(item.sValue)"
                class="d-flex"
              >
                <template v-slot:prepend>
                  <img
                    class="img-flag-country-global mr-3"
                    :src="getFlagCountryGlobal(item.sValue)"
                  />
                </template>

                <v-list-item-title v-text="item.sCode"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template #append>
        <input-quantity
          v-model="sExt"
          :bg-color="BgColor"
          :readonly="readonly"
          class="input-ext-global"
          placeholder="Ext."
          label="Ext."
        ></input-quantity>
      </template>
    </v-text-field>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    sCountryCallingCode: {
      // type: String,
      type: [String, Number],
      default: "",
    },
    sExtPhone: {
      // type: String,
      type: [String, Number],
      default: "",
    },
    BgColor: {
      type: String,
      default: "grey",
    },
    disabled: Boolean,
    readonly: Boolean,
    hideDetails: Boolean,
  },
  data() {
    return {
      sPhone: null,
      sCountryCallingCodeSelected: 2,
      aCountrys: [
        // {
        //   sId: 1,
        //   iCountryId: 1,
        //   sName: "Estados Unidos de América",
        //   sCodePhone: "+1",
        //   sCode: "US",
        //   sValue: 1,
        //   sFlagIconKey: null,
        // },
        // {
        //   sId: 2,
        //   iCountryId: 2,
        //   sName: "México",
        //   sCodePhone: "+52",
        //   sCode: "MX",
        //   sValue: 52,
        //   sFlagIconKey: null,
        // },
      ],
      sExt: "",
    };
  },
  computed: {
    // aCountrys() {
    //   return this.$store.catalog.aCountry;
    // },
  },
  beforeMount() {
    this.getCountrys();
    if (this.sExtPhone) {
      this.sExt = this.sExtPhone;
    }
  },
  methods: {
    setCountryPhone(sCountryPhone) {
      this.sCountryCallingCodeSelected = sCountryPhone;
      this.$emit("setCountryPhone", sCountryPhone);
    },
    setExtPhone() {
      this.$emit("setExtPhone", this.sExt);
    },
    getCountrys() {
      const payload = {
        headers: {
          Authorization: "Bearer " + this.$store.user.sToken,
        },
        params: {},
      };
      this.$api
        .get(`countries`, payload)
        .then((response) => {
          this.aCountrys = response.data.countries.map((e) => {
            return {
              sId: e.iCountryId,
              iCountryId: e.iCountryId,
              sName: e.sName,
              sCodePhone: "+" + e.sCallingCode,
              sCode: e.sCode,
              sValue: e.iCountryId,
              sFlagIconKey: e.sFlagIconKey,
            };
          });
          // this.$store.catalog.setCountry(
          //   response.data.countries.map((e) => {
          //     return {
          //         sId: 1,
          //         iCountryId: 1,
          //         sName: "Estados Unidos de América",
          //         sCodePhone: "+1",
          //         sCode: "US",
          //         sValue: 1,
          //         sFlagIconKey: null,
          //     };
          //   })
          // );
        })
        .catch((error) => {
          console.log(error);
          this.$store.alert.error(error.response.data.message);
          // this.$toast.error(response.data.message);
        });
    },
    getFormatNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
    },
  },
  emits: ["update:modelValue", "setExtPhone"],
  watch: {
    modelValue: {
      immediate: true, // Opcional, si deseas que se ejecute el watcher de inmediato al montar el componente
      handler(newValue) {
        this.sPhone = newValue;
        // this.getFormatNumber("sPhone");
      },
    },
    sPhone(newValue) {
      this.$emit("update:modelValue", newValue);
    },
    sCountryCallingCode() {
      if (this.sCountryCallingCode) {
        this.sCountryCallingCodeSelected = this.sCountryCallingCode;
      }
    },
    sExtPhone() {
      if (this.sExtPhone) {
        this.sExt = this.sExtPhone;
      }
    },
    sExt() {
      this.setExtPhone();
    },
  },
};
</script>
