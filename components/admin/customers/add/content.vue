<template>
  <v-card class="content-card-dialog-global">
    <div class="content-close-dialog">
      <p class="txt-title-dialog-global">
        <span class="font-weight-bold">Añadir</span>
        un nuevo empleado
      </p>
      <v-spacer />
      <v-btn
        @click="setCloseDialog"
        class="mb-4 btn-close-dialog-global"
        variant="outlined"
        density="compact"
        icon="mdi mdi-close"
      ></v-btn>
    </div>

    <v-card-text class="content-body-detail-dialog-global">
      <div class="content-add-all">
        <div class="content-form-all">
          <p class="txt-title-section">
            <span class="font-weight-bold">Ingresa los datos</span> del nuevo
            empleado.
          </p>
          <v-form ref="form" class="w-100p">
            <v-row>
              <!-- #region Nombres -->
              <v-col cols="6">
                <v-text-field
                  v-model="sName"
                  :readonly="bRead"
                  :rules="nameRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
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
              <v-col cols="6">
                <v-text-field
                  v-model="sLastName"
                  :readonly="bRead"
                  :rules="lastnameRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Apellidos"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Apellidos
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Apellidos -->

              <!-- #region Teléfono -->
              <v-col cols="12">
                <input-phone
                  v-model="sPhoneNumber"
                  :readonly="bRead"
                  :sCountryCallingCode="iCountryCallingCode"
                  :sExtPhone="sPhoneExtension"
                  @setCountryPhone="setCountryPhone"
                  @setExtPhone="setPhoneExtension"
                  @input="getFormatPhoneNumber('sPhoneNumber')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->

              <!-- #region Correo electrónico -->
              <v-col cols="12">
                <v-text-field
                  v-model="sEmail"
                  :readonly="bRead"
                  :rules="emailRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Correo electrónico"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Correo electrónico
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Correo electrónico -->

              <!-- #region Puesto -->
              <v-col cols="12">
                <v-text-field
                  v-model="sRole"
                  :readonly="bRead"
                  :rules="positionRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Puesto"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Puesto
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Puesto -->
            </v-row>
          </v-form>
        </div>
        <div class="content-permissions-all">
          <p class="txt-title-section">
            <span class="font-weight-bold">Habilita los permisos</span> del
            nuevo empleado.
          </p>
          <permissions-table-component
            class="w-100p"
            :bTypePermissions="0"
            v-model="aPermissions"
            :bAddOrEdit="true"
            :bActiveModify="true"
          />
        </div>
      </div>
    </v-card-text>
    <v-card-actions v-if="bWrite || bManage" class="content-actions-add">
      <v-btn
        class="btn-primary-global"
        variant="flat"
        color="primary"
        width="220px"
        :loading="bLoadingBtnAdd"
        @click="setAdd"
      >
        Añadir nuevo empleado
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    sName: null,
    sLastName: null,
    aCountry: [],
    iCountryCallingCode: 2,
    sPhoneNumber: null,
    sPhoneExtension: null,
    sEmail: null,
    sRole: null,
    aPermissions: [],
    bLoadingBtnAdd: false,
  }),
  computed: {
    // #region Variables de permisos
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
  emits: ["setCloseDialog"],
  async beforeMount() {
    await this.getCountries();
  },
  methods: {
    async getCountries() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`countries`, payload);
        this.aCountry = oResult.data.countries.map((e) => {
          return {
            iId: e.iCountryId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    setCountryPhone(iCountryCallingCode) {
      this.iCountryCallingCode = iCountryCallingCode;
    },
    setPhoneExtension(sPhoneExtension) {
      this.sPhoneExtension = sPhoneExtension;
    },
    getFormatPhoneNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
    },
    setCloseDialog() {
      this.$emit("setCloseDialog");
    },
    async setAdd() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.bLoadingBtnAdd = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            iCountryCallingCode: this.iCountryCallingCode,
            sName: this.sName,
            sLastName: this.sLastName,
            sEmail: this.sEmail,
            sPhoneNumber: this.sPhoneNumber.replaceAll("-", ""),
            sPhoneExtension: this.sPhoneExtension,
            sRole: this.sRole,
            aPermissionsSet: this.aPermissions
              .map((e) => {
                return {
                  sModuleId: e.sId,
                  eAction: e.bShow
                    ? "READ"
                    : e.bWrite
                    ? "WRITE"
                    : e.bManage
                    ? "MANAGE"
                    : undefined,
                };
              })
              .filter((eFilter) => eFilter.eAction !== undefined),
          };
        this.$api
          .post(`administrators`, payload, config)
          .then(async (response) => {
            this.$swal.fire({
              title: "¡Creado!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Cerrar",
            });
            this.$store.table.setRefresh(true);

            this.setCloseDialog();
          })
          .catch((error) => {
            this.bLoadingBtnAdd = false;
            this.$swal.fire({
              title: "¡Error!",
              text: error.response.data.message,
              icon: "error",
              confirmButtonText: "Cerrar",
            });
          });
      }
    },
  },
};
</script>
<style scoped>
.content-add-all {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.content-form-all {
  width: 50%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
}
.txt-title-section {
  margin-bottom: 20px !important;
}
.content-permissions-all {
  width: 50%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-height: 396px;
}
.content-actions-add {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 18px;
}
</style>
