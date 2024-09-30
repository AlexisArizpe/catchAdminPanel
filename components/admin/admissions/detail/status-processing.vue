<template>
  <v-card class="content-card-dialog-global content-card-dialog-processing">
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
      <v-form ref="form">
        <v-row class="content-restaurant-data-all ma-0">
          <v-col class="py-0" cols="12">
            <v-text-field
              v-model="sNameRestaurant"
              variant="solo"
              flat
              density="comfortable"
              color="primary"
              bg-color="grey"
              placeholder="Nombre público del restaurante"
              rounded="lg"
              :rules="nameSingularRulesGlobal"
            >
              <template #label>
                <span class="txt-labels-form-initial-global"
                  >Nombre público del restaurante
                  <span class="color-red-global">*</span>
                </span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <div class="content-restaurant-manager-all">
          <!-- #region Datos del restaurante -->
          <div class="content-restaurant-all">
            <v-row class="content-restaurant-data-all ma-0">
              <v-col class="py-0" cols="12">
                <p class="txt-title-dialog mb-3">
                  <span class="font-weight-bold">Datos del restaurante</span>
                </p>
              </v-col>
              <!-- #region Teléfono -->
              <v-col class="py-0" cols="12" sm="12">
                <input-phone
                  v-model="sPhoneNumberRestaurant"
                  :sCountryCallingCode="iCountryCallingCodeRestaurant"
                  :sExtPhone="sPhoneExtensionRestaurant"
                  :required="false"
                  @setCountryPhone="
                    setCountryPhone($event, 'iCountryCallingCodeRestaurant')
                  "
                  @setExtPhone="
                    setPhoneExtension($event, 'sPhoneExtensionRestaurant')
                  "
                  @input="getFormatPhoneNumber('sPhoneNumberRestaurant')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->

              <!-- #region Localización Maps -->
              <v-col class="py-0" cols="12" sm="12">
                <input-autocomplete-maps
                  v-model="sTextAddress"
                  :disabled="false"
                />
              </v-col>
              <!-- #endregion Localización Maps -->

              <!-- #region Calle y número -->
              <v-col class="py-0" cols="12" sm="8">
                <v-text-field
                  v-model="sAddressRestaurant"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Calle y número"
                  rounded="lg"
                  :rules="streetRulesGlobal"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Calle y número
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Calle y número -->

              <!-- #region Código postal -->
              <v-col class="py-0" cols="12" sm="4">
                <v-text-field
                  v-model="sZIPRestaurant"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Código postal"
                  rounded="lg"
                  :rules="zipRulesGlobal"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Código postal
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Código postal -->

              <!-- #region Especificaciones -->
              <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="sAddressSpecificRestaurant"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Especificaciones"
                  rounded="lg"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Especificaciones
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Especificaciones -->

              <!-- #region Ciudad -->
              <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                  v-model="sCityRestaurant"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  placeholder="Ciudad"
                  rounded="lg"
                  :rules="cityRulesGlobal"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Ciudad
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-text-field>
              </v-col>
              <!-- #endregion Ciudad -->

              <!-- #region Estado -->
              <v-col class="py-0" cols="12" sm="6">
                <v-select
                  v-model="iStateRestaurant"
                  :menu-props="{ bottom: true, offsetY: true }"
                  class="input-global"
                  variant="solo"
                  flat
                  density="comfortable"
                  color="primary"
                  bg-color="grey"
                  :items="aStates"
                  item-value="iId"
                  item-title="sName"
                  :placeholder="'Seleccionar estado'"
                  no-data-text="No hay información"
                  persistent-placeholder
                  clearable
                  :rules="stateRulesGlobal"
                >
                  <template #label>
                    <span class="txt-labels-form-initial-global"
                      >Estado
                      <span class="color-red-global">*</span>
                    </span>
                  </template>
                </v-select>
              </v-col>
              <!-- #endregion Estado -->

              <!-- #region google map -->
              <v-col class="py-0" cols="12">
                <google-map
                  @setLocation="setLocation"
                  @setLocationSpecific="setLocationSpecific"
                  :oLocaltion="oLocaltion"
                  :bEdit="true"
                />
                <!-- <v-img class="img-maps" src="/img/Google%20maps.png"></v-img> -->
              </v-col>
              <!-- #endregion google map -->
            </v-row>
          </div>
          <!-- #endregion Datos del restaurante -->

          <!-- #region Datos del encargado -->
          <div class="content-manager-all">
            <v-row class="content-restaurant-data-all ma-0">
              <v-col class="py-0" cols="12">
                <p class="txt-title-dialog mb-3">
                  <span class="font-weight-bold">Datos del encargado</span>
                </p>
              </v-col>
              <!-- #region Nombres -->
              <v-col class="py-0" cols="6">
                <v-text-field
                  v-model="sNameManager"
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
                  v-model="sLastNameManager"
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
                  v-model="sPhoneNumberManager"
                  :sCountryCallingCode="iCountryCallingCodeManager"
                  :sExtPhone="sPhoneExtensionManager"
                  @setCountryPhone="
                    setCountryPhone($event, 'iCountryCallingCodeManager')
                  "
                  @setExtPhone="
                    setPhoneExtension($event, 'sPhoneExtensionManager')
                  "
                  @input="getFormatPhoneNumber('sPhoneNumberManager')"
                ></input-phone>
              </v-col>
              <!-- #endregion Teléfono -->

              <!-- #region Correo electrónico -->
              <v-col class="py-0" cols="12">
                <v-text-field
                  v-model="sEmailManager"
                  :rules="emailRulesGlobal"
                  disabled
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

              <!-- #region Documentos del restaurante -->
              <v-col class="py-0" cols="12" sm="12">
                <docs-restaurants-content
                  v-model="aDocs"
                  :aDocs="aDocs"
                  :sId="sAdmissionId"
                  :sStatus="sStatus"
                  sTypeModule="edit"
                />
              </v-col>
              <!-- #endregion Documentos del restaurante -->
            </v-row>
          </div>
          <!-- #endregion Datos del encargado -->
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="content-actions-add">
      <v-btn
        v-if="bManage"
        class="btn-second-red-global"
        color="red"
        width="150px"
        :loading="bLoadingBtnRejected"
        @click="setRejectedStatusConfirm"
      >
        Rechazar restaurante
      </v-btn>
      <v-btn
        v-if="bWrite || bManage"
        class="btn-green-primary"
        variant="flat"
        width="150px"
        :loading="bLoadingBtnAccepted"
        @click="setAcceptedStatusConfirm"
      >
        Aprobar restaurante
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="bWrite || bManage"
        class="btn-green-primary-outlined"
        variant="outlined"
        color="green"
        width="150px"
        :loading="bLoadingBtnResend"
        @click="setResendStatusConfirm"
      >
        Reenviar formulario
      </v-btn>
      <v-btn
        v-if="bManage || $store.user.bSuperAdmin"
        class="btn-primary-global"
        variant="flat"
        color="primary"
        width="150px"
        :loading="bLoadingBtnChange"
        @click="setChange"
      >
        Modificar solicitud
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
    // #region Restaurant
    sNameRestaurant: null,
    iCountryCallingCodeRestaurant: 2,
    sPhoneNumberRestaurant: null,
    sPhoneExtensionRestaurant: null,
    sAddressRestaurant: null,
    sAddressSpecificRestaurant: null,
    sCityRestaurant: null,
    iStateRestaurant: null,
    sZIPRestaurant: null,
    sTextAddress: null,
    oLocaltion: {},
    dLocationLatitude: null,
    dLocationLongitude: null,
    // #endregion Restaurant

    // #region Manager
    sFullNameManager: null,
    sNameManager: null,
    sLastNameManager: null,
    iCountryCallingCodeManager: 2,
    sPhoneNumberManager: null,
    sPhoneExtensionManager: null,
    sEmailManager: null,
    sCreatedAt: null,
    sCreatedName: null,
    bPlatformAccess: null,
    aDocs: [],
    sStatus: null,
    // #endregion Manager

    aCountry: [],
    aStates: [],

    bLoadingBtnAccepted: false,
    bLoadingBtnResend: false,
    bLoadingBtnDelete: false,
    bLoadingBtnRejected: false,
    bLoadingBtnChange: false,
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
    await this.getStates();
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
        console.log(error);
        console.log(error.response.data.message);
      }
    },
    async setFillData(oItem) {
      // #region restaurant
      this.sNameRestaurant = oItem.Establishment.sName;
      this.iCountryCallingCodeRestaurant =
        oItem.Establishment.iCountryCallingCode ?? 2;
      this.sPhoneNumberRestaurant = oItem.Establishment.sPhoneNumber;
      if (this.sPhoneNumberRestaurant) {
        this.getFormatPhoneNumber("sPhoneNumberRestaurant");
      }
      this.sPhoneExtensionRestaurant = oItem.Establishment.sPhoneExtension;
      this.sAddressRestaurant = oItem.Establishment.sLocationAddress;
      this.sZIPRestaurant = oItem.Establishment.sLocationAddressZIPCode;
      this.sAddressSpecificRestaurant =
        oItem.Establishment.sLocationAddressDetail;
      this.sCityRestaurant = oItem.Establishment.sLocationAddressCity;
      this.iStateRestaurant = oItem.Establishment.iLocationAddressState;
      this.oLocaltion = {
        dLat: oItem.Establishment.dLocationLatitude ?? 0,
        dLng: oItem.Establishment.dLocationLongitude ?? 0,
      };
      this.dLocationLatitude = oItem.Establishment.dLocationLatitude;
      this.dLocationLongitude = oItem.Establishment.dLocationLongitude;
      // #endregion restaurant

      // #region Manager
      this.sFullNameManager = `${oItem.User.sName} ${oItem.User.sLastName}`;
      this.sNameManager = oItem.User.sName;
      this.sLastNameManager = oItem.User.sLastName;
      this.iCountryCallingCodeManager = oItem.User.iCountryCallingCode;
      this.sPhoneNumberManager = this.getFormatPhoneNumberGlobal(
        oItem.User.sPhoneNumber
      );
      this.sPhoneExtensionManager = oItem.User.sPhoneExtension;
      this.sEmailManager = oItem.User.sEmail;
      this.sCreatedAt = this.getFormatDDMMYYYY(new Date(oItem.User.tCreatedAt));
      this.bPlatformAccess = oItem.User.bPlatformAccess;
      this.aDocs = oItem.Documents;
      this.sStatus = oItem.eStatus;
      // #endregion Manager
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
    async getStates() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`countries/2/states`, payload);
        this.aStates = oResult.data.states.results.map((e) => {
          return {
            iId: e.iStateId,
            iCountryId: e.iCountryId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    setCountryPhone(iCountryCallingCode, sTextField) {
      this[sTextField] = iCountryCallingCode;
    },
    setPhoneExtension(sPhoneExtension, sTextField) {
      this[sTextField] = sPhoneExtension;
    },
    getFormatPhoneNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
    },
    setCloseDialog() {
      this.$emit("setCloseDialog");
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
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-red-global"> rechazar </span> la solicitud de <span class="font-weight-bold"> ${this.sFullNameManager} </span>?</span>`,
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
        this.bLoadingBtnRejected = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sAdministratorId: this.sAdministratorId,
            eStatus: "rejected", // 'processing', 'rejected', 'accepted'
          };

        const oResult = await this.$api.patch(
          `admissions/${this.sAdmissionId}/status`,
          payload,
          config
        );
        this.$swal.fire({
          title: "¡Rechazada!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$store.table.setRefresh(true);
        this.bLoadingBtnRejected = false;
      } catch (error) {
        this.bLoadingBtnRejected = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
    async setResendStatusConfirm() {
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-green-global"> reenviar </span> el formulario?</span>`,
          icon: "warning",

          showCancelButton: true,
          confirmButtonText: "Reenviar",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const payload = {
              sName: this.sNameManager,
              sLastName: this.sLastNameManager,
              sEmail: this.sEmailManager,
              sPhoneNumber: this.sPhoneExtensionManager,
              sPhoneExtension: this.sPhoneExtensionManager,
              Establishment: {
                sName: this.sNameRestaurant,
              },
            };
            await this.setResendStatus();
          }
        });
    },
    async setResendStatus() {
      try {
        this.bLoadingBtnResend = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sName: this.sNameManager,
            sLastName: this.sLastNameManager,
            sEmail: this.sEmailManager,
            sPhoneNumber: this.sPhoneExtensionManager,
            sPhoneExtension: this.sPhoneExtensionManager,
            Establishment: {
              sName: this.sNameRestaurant,
            },
          };
        const oResult = await this.$api.post(
          `admissions/${this.sAdmissionId}/resend`,
          payload,
          config
        );
        this.$swal.fire({
          title: "¡Reenviado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$store.table.setRefresh(true);
        this.bLoadingBtnResend = false;
      } catch (error) {
        this.bLoadingBtnResend = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
    async setAcceptedStatusConfirm() {
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
            title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-green-global"> aprobar </span>
                esta solicitud?</span>`,
            icon: "warning",

            showCancelButton: true,
            confirmButtonText: "Aceptar solicitud",
            cancelButtonText: "Regresar",
            reverseButtons: true,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.setAcceptedStatus();
            }
          });
      }
    },
    async setAcceptedStatus() {
      try {
        this.bLoadingBtnAccepted = true;

        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            sAdministratorId: this.sAdministratorId,
            eStatus: "accepted", // 'processing', 'rejected', 'accepted'
          };

        const oResult = await this.$api.patch(
          `admissions/${this.sAdmissionId}/status`,
          payload,
          config
        );
        this.$swal.fire({
          title: "¡Aprobado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$store.table.setRefresh(true);
        this.bLoadingBtnAccepted = false;
      } catch (error) {
        this.bLoadingBtnAccepted = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },
    async setChange() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          this.bLoadingBtnChange = true;
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {
              Establishment: {
                sName: this.sNameRestaurant,
                sPhoneNumber: this.sPhoneNumberRestaurant
                  ? this.sPhoneNumberRestaurant.replaceAll("-", "")
                  : null,
                sPhoneExtension: this.sPhoneExtensionRestaurant,
                // México
                iCountryCallingCode: this.iCountryCallingCodeRestaurant,
                sLocationAddress: this.sAddressRestaurant,
                sLocationAddressDetail: this.sAddressSpecificRestaurant,
                sLocationAddressCity: this.sCityRestaurant,
                // Nuevo León
                iLocationAddressState: this.iStateRestaurant,
                sLocationAddressZIPCode: this.sZIPRestaurant,
                dLocationLatitude: this.dLocationLatitude,
                dLocationLongitude: this.dLocationLongitude,
              },
              User: {
                sName: this.sNameManager,
                sLastName: this.sLastNameManager,
                iCountryCallingCode: this.iCountryCallingCodeManager,
                sPhoneNumber: this.sPhoneNumberManager
                  ? this.sPhoneNumberManager.replaceAll("-", "")
                  : null,
                sPhoneExtension: this.sPhoneExtensionManager,
              },
            };
          const oResult = await this.$api.put(
            `admissions/${this.sAdmissionId}`,
            payload,
            config
          );
          this.$swal.fire({
            title: `Actualizado!`,
            text: oResult.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          this.$store.table.setRefresh(true);
          this.bLoadingBtnChange = false;
        } catch (error) {
          console.log(error);

          this.bLoadingBtnChange = false;
          this.$swal.fire({
            title: "¡Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    },
    setLocation(oLocation) {
      this.dLocationLatitude = oLocation.lat;
      this.dLocationLongitude = oLocation.lng;
    },
    setLocationSpecific(oItem) {
      const oState = this.aStates.find((e) => e.sName === oItem.sState);
      this.sAddressRestaurant = `${oItem.sStreet} ${oItem.sNumber}`;
      this.sCityRestaurant = oItem.sCity;
      this.sZIPRestaurant = oItem.sPostalCode;
      // this.sAddressSpecificRestaurant = oItem.sFormattedAddress;
      this.iStateRestaurant = oState.iId ?? null;
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
.content-card-dialog-processing {
  /* max-width: auto; */
}
.txt-title-dialog {
  font-size: 1.1rem;
}
.content-restaurant-manager-all {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
}
.content-restaurant-all {
  width: 397px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
}
.txt-title-section {
  margin-bottom: 20px !important;
}
.content-manager-all {
  width: 397px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-height: 100%;
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
