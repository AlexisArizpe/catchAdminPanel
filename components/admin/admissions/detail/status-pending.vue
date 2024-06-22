<template>
  <v-card class="content-card-dialog-global content-card-dialog-pending">
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
              <v-col cols="6">
                <v-text-field
                  v-model="sName"
                  :readonly="true"
                  :rules="nameRulesGlobal"
                  variant="solo"
                  hide-details
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
                  :readonly="true"
                  :rules="lastnameRulesGlobal"
                  variant="solo"
                  hide-details
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
                  :readonly="true"
                  :hideDetails="true"
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
                  :readonly="true"
                  :rules="emailRulesGlobal"
                  variant="solo"
                  hide-details
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
              <v-col cols="12">
                <v-text-field
                  v-model="sManager"
                  :readonly="true"
                  :rules="nameSingularRulesGlobal"
                  variant="solo"
                  hide-details
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
            </v-row>
          </v-form>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="content-actions-add">
      <v-btn
        v-if="bManage"
        class="btn-second-red-global"
        color="red"
        width="200px"
        :loading="bLoadingBtnPlatformAccess"
        @click="setRejectedStatusConfirm"
      >
        Rechazar solicitud
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="bWrite || bManage"
        class="btn-primary-global"
        variant="flat"
        color="orange"
        width="200px"
        :loading="bLoadingBtnAdd"
        @click="setProcessingConfirm"
      >
        Iniciar trámite
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
    sManager: null,
    sCreatedAt: null,
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
        console.log(oResult.data.admissionRequest, "admissionRequest");
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
      this.sManager = oItem.Establishment.sName;
      this.sCreatedAt = this.getFormatDDMMYYYY(new Date(oItem.User.tCreatedAt));
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
    async setProcessingConfirm() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-orange-global"> iniciar el trámite </span>
              de esta solicitud?</span>`,
          icon: "warning",

          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setProcessing();
          }
        });
    },
    async setProcessing() {
      try {
        this.bLoadingBtnAdd = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sAdministratorId: this.sAdministratorId,
            eStatus: "processing", // 'processing', 'rejected', 'accepted'
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
    async setRejectedStatusConfirm() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-red-global"> rechazar</span> la solicitud de  <span class="font-weight-bold">${this.sFullName} </span>?</span>`,
          icon: "warning",

          showCancelButton: true,
          confirmButtonText: "Rechazar",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setRejectedStatus();
          }
        });
    },
    async setRejectedStatus() {
      try {
        this.bLoadingBtnPlatformAccess = true;
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            bPlatformAccess: !this.bPlatformAccess,
          };
        const oResult = await this.$api.put(
          `administrators/${this.sAdmissionId}/access`,
          payload,
          config
        );
        this.$swal.fire({
          title: `¡${this.bPlatformAccess ? "Bloqueado" : "Desbloqueado"}!`,
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.$store.table.setRefresh(true);
        this.bLoadingBtnPlatformAccess = false;
      } catch (error) {
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnPlatformAccess = false;
      }
    },
    async setDeteleteConfirm() {
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
              el <span class="font-weight-bold">usuario ${this.sFullName} </span>?</span>`,
          icon: "warning",

          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setDelete();
          }
        });
    },
    async setDelete() {
      try {
        this.bLoadingBtnDelete = true;
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {};
        const oResult = await this.$api.delete(
          `administrators/${this.sAdmissionId}`,
          config,
          payload
        );
        this.$swal.fire({
          title: "¡Eliminado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.$store.table.setRefresh(true);
        this.setCloseDialog();
        this.bLoadingBtnDelete = false;
      } catch (error) {
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnDelete = false;
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
.content-card-dialog-pending {
  max-width: 600px;
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
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 18px;
}
.content-txt-added-by-all {
  padding-bottom: 20px;
}
.txt-added-by {
  font-weight: bold;
  font-size: 1.1rem;
}
.txt-description-added-by {
  color: var(--global-color-txt-grey);
  font-size: 0.8rem;
}
</style>
