<template>
  <v-card class="content-card-dialog-global">
    <div class="content-close-dialog">
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
      <div class="content-txt-added-by-all">
        <div class="content-img">
          <img v-if="sImg" class="img-customer" />
          <p v-else class="txt-abbreviation">{{ sAbbreviation }}</p>
        </div>
        <p class="txt-added-by">{{ sFullName }}</p>
        <p class="txt-description-added-by">Perfil del consumidor</p>
      </div>

      <div class="content-add-all">
        <div class="content-form-all">
          <p class="txt-title-section">
            <span class="font-weight-bold">Datos del empleado</span>
          </p>
          <v-form ref="form" class="w-100p">
            <v-row>
              <!-- #region Nombres -->
              <v-col cols="6">
                <v-text-field
                  v-model="sName"
                  :readonly="true"
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
                  :readonly="true"
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
                  :readonly="true"
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
            </v-row>
          </v-form>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="content-actions-add">
      <v-btn
        v-if="$store.user.bSuperAdmin"
        class="btn-second-red-global"
        color="red"
        width="220px"
        :loading="bLoadingBtnDelete"
        @click="setDeteleteConfirm"
      >
        Dar de baja
      </v-btn>
      <v-btn
        v-if="$store.user.bSuperAdmin"
        class="btn-second-red-global"
        variant="flat"
        color="red"
        width="220px"
        :loading="bLoadingBtnPlatformAccess"
        @click="setPlatfromAccesConfirm"
      >
        <span
          class="mdi icon-platform-access"
          :class="bPlatformAccess ? 'mdi-block-helper' : ''"
        ></span>
        {{ bPlatformAccess ? "Bloquear" : "Desbloquear" }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    sCustomerId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    sImg: null,
    sFullName: null,
    sName: null,
    sLastName: null,
    sAbbreviation: null,
    aCountry: [],
    iCountryCallingCode: 2,
    sPhoneNumber: null,
    sPhoneExtension: null,
    sEmail: null,
    sRole: null,
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
          `customers/${this.sCustomerId}`,
          payload
        );
        this.setFillData(oResult.data.customer);
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async setFillData(oItem) {
      this.sFullName = `${oItem.User.sName} ${oItem.User.sLastName}`;
      this.sImg = null;
      this.sAbbreviation = `${oItem.User.sName.substr(
        0,
        1
      )}${oItem.User.sLastName.substr(0, 1)}`;
      this.sName = oItem.User.sName;
      this.sLastName = oItem.User.sLastName;
      this.sPhoneNumber = oItem.User.sPhoneNumber;
      this.getFormatPhoneNumber("sPhoneNumber");
      this.sPhoneExtension = oItem.User.sPhoneExtension;
      this.sEmail = oItem.User.sEmail;

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
    async setChange() {
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
          };
        this.$api
          .patch(`customers/${this.sCustomerId}`, payload, config)
          .then(async (response) => {
            this.$swal.fire({
              title: "¡Actualizado!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "Cerrar",
            });
            if (this.$store.user.bSuperAdmin) {
              await this.setChangePermissions();
            }
            this.$store.table.setRefresh(true);
            this.bLoadingBtnAdd = false;
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

    async setPlatfromAccesConfirm() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-red-global"> ${
            this.bPlatformAccess ? "bloquear" : "desbloquear"
          } </span> el <span class="font-weight-bold">usuario ${
            this.sFullName
          } </span>?</span>`,
          icon: "warning",

          showCancelButton: true,
          confirmButtonText: this.bPlatformAccess ? "Bloquear" : "Desbloquear",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setPlatfromAcces();
          }
        });
    },
    async setPlatfromAcces() {
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
          `customers/${this.sCustomerId}/access`,
          payload,
          config
        );
        this.$swal.fire({
          title: `${this.bPlatformAccess ? "Bloqueado" : "Desbloqueado"}!`,
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
          `customers/${this.sCustomerId}`,
          config,
          payload
        );
        this.$swal.fire({
          title: "¡Eliminado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$router.push({ name: "admin-customers" });
        // this.$store.table.setRefresh(true);
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
.content-add-all {
  display: flex;
  gap: 20px;
  align-items: center;
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
  justify-content: flex-end;
  align-items: center;
  padding: 20px 18px;
}
.content-txt-added-by-all {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-img {
  background-color: var(--global-color-white);
  border: 1px solid var(--global-color-black);
  box-shadow: 0px 3px 15px var(--global-color-box-shadow);
  height: 100px;
  width: 100px;
  border-radius: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt-abbreviation {
  font-weight: bold;
  font-size: 1.5rem;
}
.txt-added-by {
  font-weight: bold;
  font-size: 1.1rem;
}
.txt-description-added-by {
  color: var(--global-color-txt-grey);
  font-size: 0.8rem;
}
.icon-platform-access {
  font-size: 1.1rem;
  margin-right: 5px;
}
</style>
