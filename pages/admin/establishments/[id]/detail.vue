<template>
  <div class="content-page-all-global">
    <NuxtLayout>
      <div class="content-page-restaurant-profile">
        <span @click="setBack" class="txt-back">
          <span class="mdi mdi-arrow-left"></span> Regresar al panel
        </span>
        <div class="content-form-restaurant-profile-all mt-4">
          <v-form ref="form" class="content-form-restaurant-profile">
            <!-- #region Imagen, Nombre, Descripción y fotos de restaurante -->
            <div class="content-img-public-name-description-all">
              <!-- #region Imagen de perfil, nombre publico y descripción de restaurant -->
              <div class="content-img-public-name-description">
                <div class="content-img">
                  <upload-image-profile
                    v-model="aImg"
                    :aImg="aImg"
                    sMod="edit"
                    sModImgUpload="Circle"
                    :bActiveModify="bSuperAdmin"
                  />
                </div>
                <!-- #region Nombre público del restaurante y descripción -->
                <div class="content-text-filed-public-name">
                  <!-- #region Nombre -->
                  <p class="txt-subtitle-form-global mb-2">
                    Nombre público del restaurante
                  </p>
                  <v-text-field
                    v-model="oItem.sName"
                    :rules="nameSingularRulesGlobal"
                    :readonly="!bSuperAdmin"
                    :disabled="!bSuperAdmin"
                    variant="outlined"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Nombre público del restaurante"
                    rounded="lg"
                  >
                  </v-text-field>
                  <!-- #endregion Nombre -->

                  <!-- #region descripción -->
                  <p class="txt-subtitle-form-global mb-2">
                    Descripción del restaurante
                  </p>
                  <v-textarea
                    v-model="oItem.sDescription"
                    :readonly="!bSuperAdmin"
                    :disabled="!bSuperAdmin"
                    variant="outlined"
                    flat
                    density="comfortable"
                    color="primary"
                    bg-color="white"
                    placeholder="Descripcióndel restaurante"
                    rounded="lg"
                  >
                  </v-textarea>
                  <!-- #endregion descripción -->
                </div>
                <!-- #endregion Nombre público del restaurante y descripción -->
              </div>
              <!-- #endregion Imagen de perfil, nombre publico y descripción de restaurant -->

              <!-- #region fotos del restaurante -->
              <div class="content-restauant-photos">
                <p class="txt-subtitle-form-global mb-2">
                  Fotos del restaurante
                </p>
                <admin-establishments-detail-content-upload-imgs
                  :oItem="oItem"
                />
              </div>
              <!-- #endregion fotos del restaurante -->
            </div>
            <!-- #endregion Imagen, Nombre, Descripción y fotos de restaurante -->

            <!-- #region Tabs de componentes dinamicos -->
            <v-tabs
              v-model="iTab"
              grow
              class="tabs-global tabs-restaurant-profile pa-0"
              color="primary"
              :touchless="true"
              center-active
              background-color="transparent"
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
            >
              <v-tab
                class="tab-global tab-restaurant-profile"
                v-for="(item, i) in aTabs"
                :key="item.sName"
              >
                {{ item.sName }}
              </v-tab>
            </v-tabs>
            <hr />
            <v-window
              class="content-general-tabs-global content-restaurant-profile"
              v-model="iTab"
            >
              <v-window-item v-for="(item, i) in aTabs" :key="item.sName">
                <keep-alive v-if="i === iTab">
                  <component
                    :is="markRaw(item.sComponent)"
                    :iTab="iTab"
                    :oItem="oItem"
                    @setPaymentMethodDefault="getPaymentMethodDefault"
                    @setPaymentMethodDefaultOrigin="
                      getPaymentMethodDefaultOrigin
                    "
                  />
                </keep-alive>
              </v-window-item>
            </v-window>
            <!-- #endregion Tabs de componentes dinamicos -->
          </v-form>

          <div class="content-actions-restaurant-profile">
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
              v-if="bSuperAdmin"
              class="btn-primary-global"
              color="primary"
              width="200px"
              :loading="bLoadingAction"
              @click="setAction"
            >
              Guardar cambios
            </v-btn>
          </div>
        </div>
      </div>
      <v-overlay
        v-model="bLoading"
        class="align-center justify-center"
        contained
        persistent
      >
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </NuxtLayout>
  </div>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";
import { markRaw } from "vue"; // Importa markRaw

export default {
  data: () => ({
    iTab: 0,
    aTabs: [
      {
        sName: "Información del restaurante",
        sComponent: markRaw(
          resolveComponent(
            "AdminEstablishmentsDetailContentRestaurantInformationContent"
          )
        ),
      },
      {
        sName: "Caracteristicas del restaurante",
        sComponent: markRaw(
          resolveComponent(
            "AdminEstablishmentsDetailContentRestaurantFeaturesContent"
          )
        ),
      },
      {
        sName: "Datos para reservas",
        sComponent: markRaw(
          resolveComponent(
            "AdminEstablishmentsDetailContentReservationInformationContent"
          )
        ),
      },
      {
        sName: "Datos de facturación",
        sComponent: markRaw(
          resolveComponent(
            "AdminEstablishmentsDetailContentBillingInformationContent"
          )
        ),
      },
      {
        sName: "Suscripción",
        sComponent: markRaw(
          resolveComponent("AdminEstablishmentsDetailContentSuscriptionContent")
        ),
      },
    ],

    aImg: [],

    oItem: {
      // #region Nombre y descripción del restaurante
      sName: null,
      sDescription: null,
      // #endregion Nombre y descripción del restaurante

      // #region 8 Fotos del restaurante
      aPhotos: [],
      // #endregion 8 Fotos del restaurante

      // #region Información del restaurante

      //#region Dirección de restaurante
      iCountryCallingCode: 2,
      sLocationAddress: null,
      sLocationAddressZIPCode: null,
      sLocationAddressDetail: null,
      sLocationAddressCity: null,
      iLocationAddressState: null,
      dLocationLatitude: null,
      dLocationLongitude: null,
      //#endregion Dirección de restaurante

      //#region Teléfono de restaurante
      iCountryCallingCode: null,
      sPhoneNumber: null,
      sPhoneExtension: null,
      //#endregion Teléfono de restaurante

      //#region Pagina web y redes sociales
      sWebsiteUrl: null,
      sInstagramUrl: null,
      sFacebookUrl: null,
      //#endregion Pagina web y redes sociales

      // #region Menu Link o PDF
      sMenuUrl: null,
      oFileMenuPDF: {
        sName: null,
        sImg: null,
        oFile: null,
      },
      sMenuType: null,
      // #endregion Menu Link o PDF

      // #region Horarios de apertura
      WeekDays: [
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Domingo",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Lunes",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Martes",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Miércoles",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Jueves",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Viernes",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
        {
          bActive: false,
          iWeekDayId: 0,
          sName: "Sábado",
          sHours: "00:00 - 00:00",
          aHours: [
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
            {
              hours: 0,
              minutes: 0,
              seconds: 0,
            },
          ],
          sOpening: null, // FORMATO HH:MM
          sClosing: null, // FORMATO HH:MM
        },
      ],
      // #endregion Horarios de apertura

      // #endregion Información del restaurante

      // #region Caracteristicas del restaurante

      // #region Categorias de comida
      Categories: [],
      // #endregion Categorias de comida

      // #region Comidas que sirven
      FoodTypes: [],
      // #endregion Comidas que sirven

      // #region Chef
      sChefName: null,
      // #endregion Chef

      // #region Opciones de pago
      PaymentOptions: [],
      // #endregion Opciones de pago

      // #region Rango de precio y Amenidades
      oAmenities: {
        Amenities: [],
        ePriceRange: null, // VALORES: '$' | '$$' | '$$$' | '$$$$'
      },
      // #endregion Rango de precio y Amenidades

      // #endregion Caracteristicas del restaurante

      // #region Datos de reservas
      ReservationData: {
        sCallNumber: null,
        sReservationUrl: null,
        sWhatsappNumber: null,
      },
      // #endregion Datos de reservas

      // #region Datos de facturación
      BillingInformation: {
        sBusinessName: null,
        sTaxId: null,
        sEmail: null,
        sAddress: null,
        sAddressDetail: null,
        sCity: null,
        sZipCode: null,
        iCountryCallingCode: 1,
        iStateId: 1,
        sPhoneNumber: null,
        sPhoneExtension: null,
      },
      // #endregion Datos de facturación

      // #region Suscripción
      oSuscription: null,
      // #endregion Suscripción
    },

    bLoading: false,
    aCategories: [],
    aFoodTypes: [],
    aPaymentOptions: [],
    aWeekDays: [
      {
        bActive: false,
        iWeekDayId: 0,
        sName: "Domingo",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 1,
        sName: "Lunes",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 2,
        sName: "Martes",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 3,
        sName: "Miércoles",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 4,
        sName: "Jueves",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 5,
        sName: "Viernes",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
      {
        bActive: false,
        iWeekDayId: 6,
        sName: "Sábado",
        sHours: "00:00 - 00:00",
        aHours: [
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        ],
        sOpening: null, // FORMATO HH:MM
        sClosing: null, // FORMATO HH:MM
      },
    ],

    places: [],
    loader: null,
    bDialog: false,
    oPaymentMethodDefault: {},
    sPaymentMethodDefaultOrigin: null,
    bLoadingAction: false,
    bLoadingBtnDelete: false,
  }),
  computed: {
    sTypeBack() {
      return this.$store.global.sTypeBack;
    },
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
  emits: ["update:modelValue"],
  async beforeMount() {
    this.bLoading = true;
    await this.getFoodTypes();
    await this.getPaymentOptions();
    await this.getCategories();
    await this.getItem();
  },
  mounted() {
    this.loader = new Loader({
      apiKey: "AIzaSyBRDxB67vNls8sVYKRdLU-8XPFhCRhzX6s",
      libraries: ["places"],
    });
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
        const oResult = await this.$api.get(
          `establishments/${this.$route.params.id}`,
          payload
        );
        await this.setFillData(oResult.data);
        this.bLoading = false;
        this.$store.table.setRefresh(false);
      } catch (error) {
        this.bLoading = false;
        console.log(error);
      }
    },
    async getFoodTypes() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`foodTypes`, payload);
        this.aFoodTypes = oResult.data.foodTypes.map((e) => {
          return {
            bActive: false,
            iId: e.iFoodTypeId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getPaymentOptions() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`paymentOptions`, payload);
        this.aPaymentOptions = oResult.data.paymentOptions.map((e) => {
          return {
            bActive: false,
            iId: e.iPaymentOptionId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async getCategories() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`benefits/categories`, payload);
        this.aCategories = oResult.data.benefits.map((e) => {
          return {
            bActive: false,
            iId: e.sBenefitCategoryId,
            sIcon: e.sIconUrl,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    async setFillData(oItem) {
      this.aImg = [
        {
          sId: "123",
          sUrl: oItem.establishment?.sImageKey
            ? oItem.establishment.oImages.xlg
            : null,
        },
      ];

      // #region Nombre y descripción
      this.oItem.sName = oItem.establishment?.sName;
      this.oItem.sDescription = oItem.establishment?.sDescription;
      // #endregion Nombre y descripción

      // #region 8 Fotos del restaurante
      const photos = oItem.establishment?.Images || [];
      this.oItem.aPhotos = await Promise.all(
        photos.map(async (e) => {
          return {
            sId: e.sImageId,
            sName: e.sName,
            sImg: e.sFileKey ? e.oImages.xlg : null,
            oFile: e.sFileKey ? await this.getUrlToBlob(e.oImages.xlg) : null,
          };
        })
      );
      // #endregion 8 Fotos del restaurante

      // #region Información del restaurante

      //#region Dirección de restaurante
      this.oItem.iCountryCallingCode = oItem.establishment?.iCountryCallingCode;
      this.oItem.sLocationAddress = oItem.establishment?.sLocationAddress;
      this.oItem.sLocationAddressZIPCode =
        oItem.establishment?.sLocationAddressZIPCode;
      this.oItem.sLocationAddressDetail =
        oItem.establishment?.sLocationAddressDetail;
      this.oItem.sLocationAddressCity =
        oItem.establishment?.sLocationAddressCity;
      this.oItem.iLocationAddressState =
        oItem.establishment?.iLocationAddressState;
      this.oItem.dLocationLatitude = oItem.establishment?.dLocationLatitude;
      this.oItem.dLocationLongitude = oItem.establishment?.dLocationLongitude;
      //#endregion Dirección de restaurante

      //#region Teléfono de restaurante
      if (oItem.establishment?.sPhoneNumber) {
        this.oItem.sPhoneNumber = this.getFormatPhoneNumberGlobal(
          oItem.establishment?.sPhoneNumber
        );
      }

      this.oItem.sPhoneExtension = oItem.establishment?.sPhoneExtension;
      //#endregion Teléfono de restaurante

      //#region Pagina web y redes sociales
      this.oItem.sWebsiteUrl = oItem.establishment?.sWebsiteUrl;
      this.oItem.sInstagramUrl = oItem.establishment?.sInstagramUrl;
      this.oItem.sFacebookUrl = oItem.establishment?.sFacebookUrl;
      //#endregion Pagina web y redes sociales

      // #region Menu Link o PDF
      this.oItem.sMenuUrl = oItem.establishment?.sMenuUrl;
      this.oItem.oFileMenuPDF = {
        sName:
          oItem.establishment?.Menus.length > 0
            ? oItem.establishment?.Menus[0].sName
            : null,
        sUrl:
          oItem.establishment?.Menus.length > 0
            ? oItem.establishment?.Menus[0].sFileUrl
            : null,
        oFile: null,
      };
      this.oItem.sMenuType = oItem.establishment?.sMenuUrl ? "Link" : "PDF";
      // #endregion Menu Link o PDF

      // #region Horarios de apertura
      this.oItem.WeekDays = this.aWeekDays.map((item1) => {
        const matchingItem = oItem.establishment?.EstablishmentWeekDays.find(
          (item2) => item2.iWeekDayId === item1.iWeekDayId
        );
        if (matchingItem) {
          return {
            ...item1,
            aHours: [
              this.setHours(matchingItem.sOpening),
              this.setHours(matchingItem.sClosing),
              ,
            ],
            bActive: true,
          };
        }
        return item1;
      });
      // #endregion Horarios de apertura

      // #endregion Información del restaurante

      // #region Caracteristicas del restaurante

      // #region Categorias de comida
      this.oItem.Categories = this.aCategories.map((item1) => {
        const matchingItem = oItem.establishment.Categories.find(
          (item2) => item2.sBenefitCategoryId === item1.iId
        );
        if (matchingItem) {
          return { ...item1, bActive: matchingItem.bActive };
        }
        return item1;
      });
      // #endregion Categorias de comida

      // #region Comidas que sirven
      this.oItem.FoodTypes = this.aFoodTypes.map((item1) => {
        const matchingItem = oItem.establishment.FoodTypes.find(
          (item2) => item2.iFoodTypeId === item1.iId
        );
        if (matchingItem) {
          return { ...item1, bActive: true };
        }
        return item1;
      });
      // #endregion Comidas que sirven

      // #region Chef
      this.oItem.sChefName = oItem.establishment?.sChefName;
      // #endregion Chef

      // #region Opciones de pago
      this.oItem.PaymentOptions = this.aPaymentOptions.map((item1) => {
        const matchingItem = oItem.establishment.PaymentOptions.find(
          (item2) => item2.iPaymentOptionId === item1.iId
        );
        if (matchingItem) {
          return { ...item1, bActive: true };
        }
        return item1;
      });
      // #endregion Opciones de pago

      // #region Rango de precio y Amenidades
      this.oItem.oAmenities.ePriceRange =
        oItem.establishment.Amenities.ePriceRange;

      this.oItem.oAmenities.Amenities = Object.entries(
        oItem.establishment.Amenities
      )
        .map(([key, value]) => {
          return [key, value];
        })
        .filter(
          ([key, value]) =>
            typeof value === "boolean" || typeof value === "object"
        )
        .map(([key, value]) => ({
          sName: key,
          bActive: value ?? false, // Si value es null o undefined, asigna false
        }));

      // #endregion Rango de precio y Amenidades

      // #endregion Caracteristicas del restaurante

      // #region Datos de reservas
      if (oItem.establishment?.ReservationData.sCallNumber) {
        this.oItem.ReservationData.sCallNumber =
          this.getFormatPhoneNumberGlobal(
            oItem.establishment?.ReservationData.sCallNumber
          );
      }

      this.oItem.ReservationData.sReservationUrl =
        oItem.establishment?.ReservationData.sReservationUrl;

      if (oItem.establishment?.ReservationData.sWhatsappNumber) {
        this.oItem.ReservationData.sWhatsappNumber =
          this.getFormatPhoneNumberGlobal(
            oItem.establishment?.ReservationData?.sWhatsappNumber
          );
      }

      // #endregion Datos de reservas

      // #region Datos de facturación
      this.oItem.BillingInformation.sBusinessName =
        oItem.establishment?.BillingInformation.sBusinessName;

      this.oItem.BillingInformation.sTaxId =
        oItem.establishment?.BillingInformation.sTaxId;

      this.oItem.BillingInformation.sEmail =
        oItem.establishment?.BillingInformation.sEmail;

      this.oItem.BillingInformation.sAddress =
        oItem.establishment?.BillingInformation.sAddress;

      this.oItem.BillingInformation.sAddressDetail =
        oItem.establishment?.BillingInformation.sAddressDetail;

      this.oItem.BillingInformation.sCity =
        oItem.establishment?.BillingInformation.sCity;

      this.oItem.BillingInformation.sZipCode =
        oItem.establishment?.BillingInformation.sZipCode;

      this.oItem.BillingInformation.iCountryCallingCode =
        oItem.establishment?.BillingInformation.iCountryCallingCode;

      this.oItem.BillingInformation.iStateId =
        oItem.establishment?.BillingInformation.iStateId;

      if (oItem.establishment?.BillingInformation.sPhoneNumber) {
        this.oItem.BillingInformation.sPhoneNumber =
          this.getFormatPhoneNumberGlobal(
            oItem.establishment?.BillingInformation.sPhoneNumber
          );
      }

      this.oItem.BillingInformation.sPhoneExtension =
        oItem.establishment?.BillingInformation.sPhoneExtension;
      // #endregion Datos de facturación

      // #region Suscripción
      this.oItem.oSuscription = oItem.establishment?.Subscription;
      // #endregion Suscripción
    },
    async setAction() {
      await this.setChangeRestaurant();
      return;
      this.bLoadingAction = true;
      switch (this.iTab) {
        case 0: //Datos del restaurante
          await this.setChangeRestaurant();
          this.bLoadingAction = false;

          break;
        case 1: //Datos para reservas
          await this.setChangeImgNameRestaurant();
          await this.setChangeReservation();
          break;
        case 2: //Suscripción
          await this.setChangeImgNameRestaurant();
          // await this.setPaymentMethodDefault();
          this.bLoadingAction = false;
          break;

        default:
          await this.setChangeRestaurant();
          this.bLoadingAction = false;

          break;
      }
    },
    async setChangeRestaurant() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.bLoadingAction = true;
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = this.getPayloadGlobal();

          const oResult = await this.$api.patch(
            `establishments/${this.$route.params.id}`,
            payload,
            config
          );
          if (this.aImg[0]?.file) {
            await this.setAddImg();
          }
          this.$store.table.setRefresh(true);
          this.$store.user.setEstablishmentName(
            oResult.data.establishment.sName
          );
          this.$swal.fire({
            title: "¡Actualizado!",
            text: oResult.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });

          this.bLoadingAction = false;
        }
      } catch (error) {
        this.bLoadingAction = false;

        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    },

    async setChangeReservation() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.bLoadingAction = true;
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {
              sName: this.oItem.oRestaurant.sPublicNameRestaurant,
              ReservationData: {
                sWhatsappNumber:
                  this.oItem.oReservation.sWhatsappNumber.replaceAll("-", ""),
                sReservationUrl: this.oItem.oReservation.sReservationUrl,
                sCallNumber: this.oItem.oReservation.sCallNumber.replaceAll(
                  "-",
                  ""
                ),
              },
            };

          const oResult = await this.$api.patch(
            `establishments`,
            payload,
            config
          );
          this.$store.table.setRefresh(true);
          this.$swal.fire({
            title: "¡Actualizado!",
            text: oResult.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });

          this.bLoadingAction = false;
        }
      } catch (error) {
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingAction = false;
      }
    },
    async setChangeImgNameRestaurant() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {
              sName: this.oItem.oRestaurant.sPublicNameRestaurant,
            };

          const oResult = await this.$api.patch(
            `establishments`,
            payload,
            config
          );
          if (this.aImg[0]?.file) {
            await this.setAddImg();
          }
          this.$store.table.setRefresh(true);
          this.$store.user.setEstablishmentName(
            oResult.data.establishment.sName
          );
        }
      } catch (error) {
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingAction = false;
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
        formData.append("aImage", this.aImg[0].file);

        await this.$api.post(
          `establishments/images/${this.$route.params.id}`,
          formData,
          config
        );
      } catch (error) {
        console.log(error);
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
          `establishments/${this.$route.params.id}`,
          config,
          payload
        );
        this.$swal.fire({
          title: "¡Eliminado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.$router.push({ name: "admin-establishments" });
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
    setHours(sHours) {
      return {
        hours: Number(sHours.split(":")[0]),
        minutes: Number(sHours.split(":")[1]),
        seconds: 0,
      };
    },

    async setPaymentMethodDefault(sMessage) {
      if (
        this.oPaymentMethodDefault.sId &&
        this.oPaymentMethodDefault.sId !== this.sPaymentMethodDefaultOrigin
      ) {
        try {
          const config = {
              headers: {
                Authorization: `Bearer ${this.$store.user.sToken}`,
              },
            },
            payload = {};
          const oResult = await this.$api.put(
            `establishments/paymentMethods/${this.oPaymentMethodDefault.sId}/default`,
            payload,
            config
          );
          this.bLoadingAction = false;
          this.$swal.fire({
            title: "¡Actualizado!",
            text: "Tarjeta asignada",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
        } catch (error) {
          this.bLoadingAction = false;
          this.$swal.fire({
            title: "¡Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      } else {
        this.$swal.fire({
          title: "¡Actualizado!",
          text: "Restaurante actualizado con éxito.",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      }
      this.bLoadingAction = false;
    },
    async getPaymentMethodDefault(oItemDefault) {
      this.oPaymentMethodDefault = oItemDefault;
    },
    getPaymentMethodDefaultOrigin(sPaymentMethodDefaultOrigin) {
      this.sPaymentMethodDefaultOrigin = sPaymentMethodDefaultOrigin;
    },

    getPayloadGlobal() {
      // #region Convierte el arreglo de amenities en obj
      const aAmenities = this.oItem.oAmenities.Amenities.map((item) => ({
        [`${item.sName}`]: item.bActive,
      })); // Crear un nuevo objeto solo con la propiedad sName

      const oAmenities = aAmenities.reduce((acc, item) => {
        const key = Object.keys(item)[0]; // Obtener la clave del objeto actual
        acc[key] = item[key]; // Añadir la clave y su valor al acumulador
        return acc;
      }, {});
      // #endregion Convierte el arreglo de amenities en obj

      return {
        sName: this.oItem.sName,
        sDescription: this.oItem.sDescription,
        sPhoneNumber: this.oItem.sPhoneNumber.replaceAll("-", ""),
        sPhoneExtension: this.oItem.sPhoneExtension,
        // México
        iCountryCallingCode: this.oItem.iCountryCallingCode,
        sLocationAddress: this.oItem.sLocationAddress,
        sLocationAddressDetail: this.oItem.sLocationAddressDetail,
        sLocationAddressCity: this.oItem.sLocationAddressCity,
        // Nuevo León
        iLocationAddressState: this.oItem.iLocationAddressState,
        sLocationAddressZIPCode: this.oItem.sLocationAddressZIPCode,
        dLocationLatitude: this.oItem.dLocationLatitude,
        dLocationLongitude: this.oItem.dLocationLongitude,
        sMenuUrl: this.oItem.sMenuUrl,
        sWebsiteUrl: this.oItem.sWebsiteUrl,
        sInstagramUrl: this.oItem.sInstagramUrl,
        sFacebookUrl: this.oItem.sFacebookUrl,
        sChefName: this.oItem.sChefName,
        ReservationData: {
          sWhatsappNumber: this.oItem.ReservationData.sWhatsappNumber
            ? this.oItem.ReservationData.sWhatsappNumber.replaceAll("-", "")
            : null,
          sReservationUrl: this.oItem.ReservationData.sReservationUrl,
          sCallNumber: this.oItem.ReservationData.sCallNumber
            ? this.oItem.ReservationData.sCallNumber.replaceAll("-", "")
            : null,
        },
        BillingInformation: {
          sBusinessName: this.oItem.BillingInformation.sBusinessName,
          sTaxId: this.oItem.BillingInformation.sTaxId,
          sEmail: this.oItem.BillingInformation.sEmail,
          sAddress: this.oItem.BillingInformation.sAddress,
          sAddressDetail: this.oItem.BillingInformation.sAddressDetail,
          sCity: this.oItem.BillingInformation.sCity,
          sZipCode: this.oItem.BillingInformation.sZipCode,
          iCountryCallingCode:
            this.oItem.BillingInformation.iCountryCallingCode,
          iStateId: this.oItem.BillingInformation.iStateId,
          sPhoneNumber: this.oItem.BillingInformation.sPhoneNumber
            ? this.oItem.BillingInformation.sPhoneNumber.replaceAll("-", "")
            : null,
          sPhoneExtension: this.oItem.BillingInformation.sPhoneExtension,
        },
        Amenities: {
          ePriceRange: this.oItem.oAmenities.ePriceRange, // VALORES: '$' | '$$' | '$$$' | '$$$$'
          ...oAmenities,
        },
        FoodTypes: this.oItem.FoodTypes.filter(
          (eFilter) => eFilter.bActive === true
        ).map((e) => {
          return e.iId;
        }),
        PaymentOptions: this.oItem.PaymentOptions.filter(
          (eFilter) => eFilter.bActive === true
        ).map((e) => {
          return e.iId;
        }),
        WeekDays: this.oItem.WeekDays.filter(
          (eFilter) => eFilter.bActive === true
        ).map((e) => {
          return {
            iWeekDayId: e.iWeekDayId,
            sOpening: `${this.getHoursFormat(e.aHours[0])}`,
            sClosing: `${this.getHoursFormat(e.aHours[1])}`,
          };
        }),
        Categories: this.oItem.Categories.filter(
          (eFilter) => eFilter.bActive === true
        ).map((e) => {
          return e.iId;
        }),
      };
    },
    getHoursFormat(oHour) {
      return `${oHour.hours.toString().padStart(2, "0")}:${oHour.minutes
        .toString()
        .padStart(2, "0")}`;
    },
    setBack() {
      this.$router.go(-1);
    },
  },
  watch: {
    async iTab() {
      await this.getItem();
    },
    async bRefresh() {
      await this.getItem();
    },
  },
};
</script>
<style scoped>
.txt-back {
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 40px;
}
.content-page-restaurant-profile {
  padding: 20px 20px;
}
/* #region Imagen, Nombre, Descripción y fotos de restaurante */
.content-img-public-name-description-all {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  /* height: 300px; */
}
.content-img-public-name-description {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 45%;
  background-color: var(--global-color-white);
  padding: 20px 20px;
  border-radius: 10px;
}

.content-restauant-photos {
  background-color: var(--global-color-white);
  padding: 20px 20px;
  border-radius: 10px;
  height: 100%;
  min-width: 650px;
  width: 55%;
}

/* #endregion Imagen, Nombre, Descripción y fotos de restaurante */

/* #region Tabs de componentes dinamicos */
.tabs-restaurant-profile {
  background-color: var(--global-color-white);
}
.tab-restaurant-profile {
  background-color: var(--global-color-white);
}
.content-restaurant-profile {
  background-color: var(--global-color-white);
  padding: 40px;
}
.content-restaurant-user-data-all {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
}

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

.content-restaurant-data-all,
.content-user-data-all {
  width: 50%;
}

.img-maps {
  border-radius: 20px;
}

.content-actions-restaurant-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0px;
  padding: 10px 10px 20px 10px;
  background-color: var(--global-color-white);
}
/* #endregion Tabs de componentes dinamicos */

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
  .content-actions-restaurant-profile {
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
  .content-actions-restaurant-profile {
    display: flex;
    padding: 20px 30px;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
