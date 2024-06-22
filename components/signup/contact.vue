<template>
  <v-form ref="formContacto">
    <p class="txt-title-signup">Datos del contacto</p>
    <v-divider class="mb-8 mt-3" />
    <v-row>
      <!-- #region Nombres -->
      <v-col class="py-0" cols="12" sm="6">
        <v-text-field
          v-model="oItemsField.sName"
          :rules="nameSingularRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Nombres"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Nombres
              <span class="color-red-global">*</span>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Nombres -->

      <!-- #region Apellidos -->
      <v-col class="py-0" cols="12" sm="6">
        <v-text-field
          v-model="oItemsField.sLastName"
          :rules="lastnameSingularRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Apellidos"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Apellidos <span class="color-red-global">*</span>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Apellidos -->

      <!-- #region Teléfono -->
      <v-col class="py-0" cols="12" sm="12">
        <input-phone
          v-model="oItemsField.sPhoneNumber"
          BgColor="white"
          :sExtPhone="oItemsField.sPhoneExtension"
          @setCountryPhone="setCountryPhone"
          @setExtPhone="setExtPhone"
          @input="getFormatPhoneNumber('sPhoneNumber')"
        ></input-phone>
      </v-col>
      <!-- #endregion Teléfono -->

      <!-- #region Correo del encargado -->
      <v-col class="py-0" cols="12">
        <v-text-field
          v-model="oItemsField.sEmail"
          :rules="emailRulesGlobal"
          variant="solo"
          flat
          density="comfortable"
          color="greenprimary"
          placeholder="Correo del encargado"
          rounded="lg"
        >
          <template #label>
            <span class="txt-labels-form-initial-global"
              >Correo del encargado
              <span class="color-red-global">*</span>
            </span>
          </template>
        </v-text-field>
      </v-col>
      <!-- #endregion Correo del encargado -->
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    oItemsField: {
      type: [Object, Boolean],
      default: false,
    },
    sForm: {
      type: String,
      default: "",
    },
    bValidate: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  emits: ["setValidate"],
  methods: {
    setCountryPhone(sValue) {
      this.oItemsField.iCountryCallingCode = sValue;
    },
    setExtPhoneRestaurant(sExtPhone) {
      this.oItemsField.sExt = sExtPhone;
    },
    getFormatPhoneNumber(field) {
      this.oItemsField[field] = this.getFormatPhoneNumberGlobal(
        this.oItemsField[field]
      );
    },
  },
  watch: {
    async bValidate() {
      const { valid } = await this.$refs[this.sForm].validate();
      this.$emit("setValidate", valid);
    },
  },
};
</script>
