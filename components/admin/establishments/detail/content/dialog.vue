<template>
  <v-card class="content-card-dialog-global">
    <div class="content-close-dialog">
      <v-spacer />
      <v-btn
        @click="setCloseDialog"
        variant="outlined"
        class="btn-close-dialog-global"
        density="compact"
        icon="mdi mdi-close"
      ></v-btn>
    </div>
    <v-card-text class="content-body-detail-dialog-global pb-0">
      <v-form ref="form">
        <!-- #region Imagen de perfil y nombre publico de restaurant -->
        <div class="content-img-public-name">
          <div class="content-img">
            <upload-image-profile
              v-model="aImg"
              :aImg="aImg"
              sMod="edit"
              sModImgUpload="Circle"
              :bActiveModify="false"
            />
            <!-- <div class="img-profile">
                  <span class="mdi mdi-account icon-profile"></span>
                </div> -->
          </div>
          <!-- #region Nombre público del restaurante -->
          <div class="content-text-filed-public-name">
            <v-text-field
              v-model="sPublicNameRestaurant"
              :rules="nameSingularRulesGlobal"
              readonly
              variant="solo"
              flat
              density="comfortable"
              color="primary"
              bg-color="grey"
              placeholder="Nombre público del restaurante"
              rounded="lg"
            >
              <template #label>
                <span class="txt-labels-form-initial-global"
                  >Nombre público del restaurante
                  <span class="color-red-global">*</span>
                </span>
              </template>
            </v-text-field>
          </div>
          <!-- #endregion Nombre público del restaurante -->
        </div>
        <!-- #endregion Imagen de perfil y nombre publico de restaurant -->

        <v-tabs
          v-model="iTab"
          grow
          class="tabs-global pa-0"
          color="greenPrimary"
          :touchless="true"
          center-active
          background-color="transparent"
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tab
            class="tab-global"
            v-for="(item, i) in aTabs"
            :key="item.sName"
          >
            {{ item.sName }}
          </v-tab>
        </v-tabs>
        <hr />
        <v-window
          class="content-general-tabs-global content-window-lots"
          v-model="iTab"
        >
          <v-window-item v-for="(item, i) in aTabs" :key="item.sName">
            <keep-alive v-if="i === iTab">
              <component
                :is="markRaw(item.sComponent)"
                :iTab="iTab"
                :oItem="oItem"
              />
            </keep-alive>
          </v-window-item>
        </v-window>
      </v-form>
    </v-card-text>

    <v-card-actions class="content-actions-user-profile">
      <!-- <v-btn
          v-if="$store.user.bSuperAdmin"
          class="btn-second-red-global"
          variant="flat"
          color="red"
          width="40px"
          :loading="bLoadingBtnPlatformAccess"
          @click="setPlatfromAccesConfirm"
        >
          <span
            class="mdi icon-platform-access"
            :class="bPlatformAccess ? 'mdi-block-helper' : ''"
          ></span>
        </v-btn> -->
      <v-btn
        v-if="bManage"
        class="btn-second-red-global"
        color="red"
        width="120px"
        :loading="bLoadingBtnDelete"
        @click="setDeteleteConfirm"
      >
        Dar de baja
      </v-btn>
      <v-spacer />
      <v-btn
        class="btn-primary-global"
        color="white"
        width="200px"
        @click="setCloseDialog"
      >
        Regresar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { markRaw } from "vue"; // Importa markRaw

export default {
  props: {
    sEstablishmentId: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    iTab: 0,
    aTabs: [
      {
        sName: "Datos del restaurante",
        sComponent: markRaw(
          resolveComponent("AdminEstablishmentsDetailContentRestaurant")
        ),
      },
      {
        sName: "Datos del encargado",
        sComponent: markRaw(
          resolveComponent("AdminEstablishmentsDetailContentManager")
        ),
      },
      {
        sName: "Datos para reservas",
        sComponent: markRaw(
          resolveComponent("AdminEstablishmentsDetailContentReservation")
        ),
      },
    ],

    aImg: [],
    sPublicNameRestaurant: null,
    oItem: {
      oRestaurant: {
        iCountryCallingCodeRestaurant: null,
        sPhoneRestaurant: null,
        sExtRestaurant: null,
        sAddressRestaurant: null,
        sZIPRestaurant: null,
        sAddressSpecificRestaurant: null,
        sCityRestaurant: null,
        iStateRestaurant: null,
        dLocationLatitude: null,
        dLocationLongitude: null,
        sTextAddress: null,
        oLocaltion: {},
        sNameManager: null,
        sLastNameManager: null,
        iCountryCallingCodeManager: null,
        sPhoneManager: null,
        sExtManager: null,
        sEmailManager: null,
        bPlatformAccess: null,
      },
      oManager: {
        sAdmissionRequestId: null,
        sNameManager: null,
        sLastNameManager: null,
        sPhoneManager: null,
        sExtManager: null,
        sEmailManager: null,
        aDocs: [],
      },
    },

    aCountry: [],
    aStates: [],

    bLoadingBtnEdit: false,

    selectedPlace: null,
    selectedPlaceSearch: null,
    places: [],
    loader: null,
    bLoadingBtnDelete: false,
    bLoadingBtnPlatformAccess: false,
  }),
  computed: {
    sUserId() {
      return this.$store.user.sUserId;
    },
    bSuperAdmin() {
      return this.$store.user.bSuperAdmin;
    },
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
  async beforeMount() {
    await this.getCountries();
    await this.getStates();
    await this.getItem();
  },
  mounted() {
    this.loader = new Loader({
      apiKey: "AIzaSyBRDxB67vNls8sVYKRdLU-8XPFhCRhzX6s",
      libraries: ["places"],
    });
  },
  emits: ["setCloseDialog"],
  methods: {
    setCloseDialog() {
      this.$emit("setCloseDialog");
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
    async getItem() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(
          `establishments/${this.sEstablishmentId}`,
          payload
        );
        this.setFillData(oResult.data);
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    setFillData(oItem) {
      console.log(oItem, "oItem");
      this.aImg = [
        {
          sId: "123",
          sUrl: oItem.establishment.sImageKey
            ? oItem.establishment.oImages.xlg
            : null,
        },
      ];

      this.sPublicNameRestaurant = oItem.establishment.sName;

      this.oItem.oRestaurant.iCountryCallingCodeRestaurant =
        oItem.establishment.iCountryCallingCode;

      this.oItem.oRestaurant.sPhoneRestaurant = this.getFormatPhoneNumberGlobal(
        oItem.establishment.sPhoneNumber
      );

      this.oItem.oRestaurant.sExtRestaurant =
        oItem.establishment.sPhoneExtension;

      this.oItem.oRestaurant.sAddressRestaurant =
        oItem.establishment.sLocationAddress;

      this.oItem.oRestaurant.sZIPRestaurant =
        oItem.establishment.sLocationAddressZIPCode;

      this.oItem.oRestaurant.sAddressSpecificRestaurant =
        oItem.establishment.sLocationAddressDetail;

      this.oItem.oRestaurant.sCityRestaurant =
        oItem.establishment.sLocationAddressCity;

      this.oItem.oRestaurant.iStateRestaurant =
        oItem.establishment.iLocationAddressState;

      this.oItem.oRestaurant.dLocationLatitude =
        oItem.establishment.dLocationLatitude;

      this.oItem.oRestaurant.dLocationLongitude =
        oItem.establishment.dLocationLongitude;

      this.oItem.oRestaurant.oLocaltion = {
        dLat: oItem.establishment.dLocationLatitude ?? 0,
        dLng: oItem.establishment.dLocationLongitude ?? 0,
      };

      this.oItem.oManager.sAdmissionRequestId = oItem.establishment
        .AdmissionRequest
        ? oItem.establishment.AdmissionRequest.sAdmissionRequestId
        : null;
      this.oItem.oManager.eStatusAdmissions = oItem.establishment
        .AdmissionRequest
        ? oItem.establishment.AdmissionRequest.eStatus
        : null;
      this.oItem.oManager.sNameManager =
        oItem.establishment.Administrator.sName;
      this.oItem.oManager.sLastNameManager =
        oItem.establishment.Administrator.sLastName;
      this.oItem.oManager.sPhoneManager = this.getFormatPhoneNumberGlobal(
        oItem.establishment.Administrator.sPhoneNumber
      );
      this.oItem.oManager.sExtManager =
        oItem.establishment.Administrator.sPhoneExtension;
      this.oItem.oManager.sEmailManager =
        oItem.establishment.Administrator.sEmail;
      this.oItem.oManager.aDocs = oItem.establishment.Documents;
    },
    async setChange() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.bLoadingBtnEdit = true;
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {
              sName: this.sPublicNameRestaurant,
              sPhoneNumber: this.sPhoneRestaurant
                ? this.sPhoneRestaurant.replaceAll("-", "")
                : null,
              sPhoneExtension: this.sExtRestaurant,
              iCountryCallingCode: this.iCountryCallingCodeRestaurant,
              sLocationAddress: this.sAddressRestaurant,
              sLocationAddressDetail: this.sAddressSpecificRestaurant,
              sLocationAddressCity: this.sCityRestaurant,
              iLocationAddressState: this.iStateRestaurant,
              sLocationAddressZIPCode: this.sZIPRestaurant,
              dLocationLatitude: this.dLocationLatitude,
              dLocationLongitude: this.dLocationLongitude,
            };

          const oResult = await this.$api.patch(
            `establishments`,
            payload,
            config
          );
          if (this.aImg[0].file) {
            await this.setAddImg();
          }
          this.$store.table.setRefresh(true);
          this.$store.user.setEstablishmentName(
            oResult.data.establishment[0].sName
          );
          this.setCloseDialog();
          this.$swal.fire({
            title: "¡Actualizado!",
            text: oResult.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });

          this.bLoadingBtnEdit = false;
        }
      } catch (error) {
        this.setCloseDialog();
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnEdit = false;
      }
    },
    async setAddImg() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const formData = new FormData();
        if (this.aImg.length > 0) {
          formData.append("aImage", this.aImg[0].file);
        }
        // ?bDeleteImage=${false}
        await this.$api.post(
          `establishments/images/${this.sEstablishmentId}`,
          formData,
          config
        );
      } catch (error) {
        console.log(error);
      }
    },
    setCountryPhoneRestaurant(sValue) {
      this.iCountryCallingCodeRestaurant = sValue;
    },
    setExtPhoneRestaurant(sExtPhone) {
      this.sExtRestaurant = sExtPhone;
    },
    setCountryPhoneManager(sValue) {
      this.iCountryCallingCodeManager = sValue;
    },
    setExtPhoneManager(sExtPhone) {
      this.sExtManager = sExtPhone;
    },
    getFormatPhoneNumber(field) {
      this[field] = this.getFormatPhoneNumberGlobal(this[field]);
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
            this.sPublicNameRestaurant
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
          `customers/${this.sEstablishmentId}/access`,
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
              el <span class="font-weight-bold">usuario ${this.sPublicNameRestaurant} </span>?</span>`,
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
          `establishments/${this.sEstablishmentId}`,
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
    async bRefresh() {
      await this.getCountries();
      await this.getStates();
      await this.getItem();
    },
  },
};
</script>
<style scoped>
.content-card-dialog-global {
  height: 100%;
}
.content-img-public-name {
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}
.content-img {
  width: 120px;
  max-width: 120px;
  min-width: 120px;
  min-height: 120px;
  height: 120px;
  border-radius: 100%;
}
.img-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: var(--global-color-yellow-primary);
}
.icon-profile {
  font-size: 4rem;
  color: var(--global-color-black);
}
.content-text-filed-public-name {
  width: 100%;
}

.content-restaurant-user-data-all {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  padding: 30px 0px 0px 0px;
}
.content-restaurant-data-all,
.content-user-data-all {
  width: 50%;
}

.img-maps {
  border-radius: 20px;
}

.content-actions-user-profile {
  display: flex;
  margin: 10px 0px;
  padding: 5px 29px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-img-public-name {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .content-restaurant-user-data-all {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
    padding: 30px 0px 0px 0px;
  }
  .content-restaurant-data-all,
  .content-user-data-all {
    width: 100%;
  }
  .content-actions-user-profile {
    display: flex;
    padding: 20px 30px;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .content-restaurant-user-data-all {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    width: 100%;
    padding: 30px 0px 0px 0px;
  }
  .content-restaurant-data-all,
  .content-user-data-all {
    width: 100%;
  }
  .content-actions-user-profile {
    display: flex;
    padding: 20px 30px;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
