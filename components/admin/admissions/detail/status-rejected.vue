<template>
  <v-card class="content-card-dialog-global content-card-dialog-rejected">
    <div class="content-close-dialog">
      <p class="txt-title-dialog">
        <span class="font-weight-bold">Datos de la solicitud</span>
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
          <v-form ref="form" class="w-100p">
            <v-row>
              <!-- #region Nombres -->
              <v-col class="py-0" cols="6">
                <v-text-field
                  v-model="sName"
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
              <v-col class="py-0" cols="6">
                <v-text-field
                  v-model="sLastName"
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
              <v-col class="py-0" cols="12">
                <input-phone
                  v-model="sPhoneNumber"
                  :sCountryCallingCode="iCountryCallingCode"
                  :sExtPhone="sPhoneExtension"
                  @setCountryPhone="setCountryPhone"
                  @setExtPhone="setPhoneExtension"
                  @input="getFormatPhoneNumber('sPhoneNumber')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->

              <!-- #region Correo electrónico -->
              <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="sEmail"
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

              <!-- #region Nombre del Restaurante -->
              <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="sEstablishmentName"
                  :rules="nameSingularRulesGlobal"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Nombre del Restaurante"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Nombre del Restaurante
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Nombre del Restaurante -->

              <!-- #region Motivo de cancelación -->
              <v-col v-if="false" class="py-0" cols="12">
                <v-textarea
                  v-model="sEstablishmentName"
                  :readonly="true"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Motivo de cancelación"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Motivo de cancelación
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-textarea>
              </v-col>
              <!-- #endregion Motivo de cancelación -->

              <!-- #region Mensaje cancelado por -->
              <v-col v-if="false" class="py-0" cols="12">
                <p class="txt-rejected-by">
                  Cancelado el
                  <span class="font-weight-bold">{{ sUpdatedAt }}</span> por
                  <span class="font-weight-bold">Falta nombre de bk</span>
                </p>
              </v-col>
              <!-- #endregion Mensaje cancelado por -->
            </v-row>
          </v-form>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="content-actions-add">
      <v-btn
        v-if="bWrite || bManage"
        class="btn-primary-global"
        variant="flat"
        color="primary"
        width="200px"
        @click="setReOpenConfirm"
      >
        Reabrir solicitud
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    sAdmissionId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    sFullName: null,
    sName: null,
    sLastName: null,
    aCountry: [],
    iCountryCallingCode: 2,
    sPhoneNumber: null,
    sPhoneExtension: null,
    sEmail: null,
    sEstablishmentName: null,
    sUpdatedAt: null,
    sCreatedName: null,
    bPlatformAccess: null,
    aPermissions: [],
    bLoadingBtnAdd: false,
    bLoadingBtnDelete: false,
    bLoadingBtnPlatformAccess: false,
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
    sAdministratorId() {
      return this.$store.user.sUserId;
    },
    bRefresh() {
      return this.$store.table.bRefresh;
    },
  },
  emits: ["setCloseDialog"],
  async beforeMount() {
    await this.getCountries();
    await this.getItem();
  },
  methods: {
    async getItem() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        let oResult = await this.$api.get(
          `admissions/${this.sAdmissionId}`,
          payload
        );
        this.setFillData(oResult.data.admissionRequest);
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async setFillData(oItem) {
      this.sFullName = `${oItem.User.sName} ${oItem.User.sLastName}`;
      this.sName = oItem.User.sName;
      this.sLastName = oItem.User.sLastName;
      this.sPhoneNumber = this.getFormatPhoneNumberGlobal(
        oItem.User.sPhoneNumber
      );
      this.sPhoneExtension = oItem.User.sPhoneExtension;
      this.sEmail = oItem.User.sEmail;
      this.sEstablishmentName = oItem.Establishment.sName;
      this.sUpdatedAt = this.getFormatDDMMYYYY(
        new Date(oItem.tUpdatedAt),
        true
      );
      this.bPlatformAccess = oItem.User.bPlatformAccess;
    },
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
    async setReOpenConfirm() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const swalWithBootstrapButtons = this.$swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: true,
        });
        swalWithBootstrapButtons
          .fire({
            title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-black-global"> reabrir </span>
                    la solicitud?</span>`,
            icon: "warning",

            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Regresar",
            reverseButtons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.setReOpen();
            }
          });
      }
    },
    async setReOpen() {
      try {
        this.bLoadingBtnAdd = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sAdministratorId: this.sAdministratorId,
            eStatus: "pending", // 'processing', 'rejected', 'accepted'
          };

        const oResult = await this.$api.patch(
          `admissions/${this.sAdmissionId}/status`,
          payload,
          config
        );
        this.$swal.fire({
          title: "¡Actualizado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$store.table.setRefresh(true);
        this.bLoadingBtnAdd = false;
      } catch (error) {
        this.bLoadingBtnAdd = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
    async setReOpenInitial() {
      try {
        this.bLoadingBtnAdd = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sName: this.sName,
            sLastName: this.sLastName,
            sEmail: this.sEmail,
            sPhoneNumber: this.sPhoneNumber,
            sPhoneExtension: this.sPhoneExtension,
            Establishment: {
              sName: this.sEstablishmentName,
            },
          };

        const oResult = await this.$api.post(`admissions`, payload, config);
        this.$swal.fire({
          title: "Reabierta!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$store.table.setRefresh(true);
        this.bLoadingBtnAdd = false;
      } catch (error) {
        this.bLoadingBtnAdd = false;
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
    bRefresh() {
      this.getItem();
    },
  },
};
</script>
<style scoped>
.content-card-dialog-rejected {
  max-width: 450px;
}
.txt-title-dialog {
  font-size: 1.1rem;
}
.content-add-all {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
}
.content-form-all {
  width: 100%;
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
  width: 100%;
  justify-content: center !important;
  align-items: center;
  padding: 20px 18px;
}
.content-txt-added-by-all {
  padding-bottom: 20px;
}
.txt-rejected-by {
  font-size: 0.8rem;
}
.txt-description-added-by {
  color: var(--global-color-txt-grey);
  font-size: 0.8rem;
}
</style>
