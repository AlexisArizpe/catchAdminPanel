<template>
  <div>
    <!-- #region Información general -->
    <v-form ref="form">
      <div class="content-go-back">
        <div class="content-information-back-all">
          <p class="txt-title-content-global">
            Completa todos los datos de tu beneficio en el formulario. Una vez
            guardado, el beneficio pasa a estar vigente.
          </p>
          <v-btn
            @click="getBack"
            variant="outlined"
            class="btn-second-global"
            color="primary"
            prepend-icon="mdi mdi-arrow-left"
          >
            Volver a beneficios
          </v-btn>
        </div>
        <p
          v-if="bLightning"
          class="txt-title-content-global font-weight-bold font-italic"
        >
          ¡Recuerda que los Beneficios Relámpago son para publicar en el día!
        </p>
      </div>
      <div class="content-add-form-all">
        <v-sheet
          class="py-4 px-4"
          :class="!bLightning ? 'd-block' : 'd-flex gap-20'"
          rounded="lg"
          min-height="100"
          width="100%"
        >
          <upload-image-horizontal
            v-if="!bLightning"
            v-model="aImg"
            sMod="add"
            sModImgUpload="Normal"
            :bActiveModify="true"
          />
          <upload-image-vertical
            v-else
            v-model="aImg"
            sMod="add"
            :iWidth="250"
            :iHeight="450"
            sModImgUpload="Normal"
            :bActiveModify="true"
          />

          <div class="content-form-name-description">
            <!-- #region Nombre -->
            <v-textarea
              v-model="sName"
              :rules="nameBenefitRulesGlobal"
              variant="solo"
              flat
              density="comfortable"
              color="primary"
              bg-color="grey"
              counter="70"
              :maxlength="70"
              :persistent-counter="true"
              class="mt-5 mb-3"
              rows="2"
              placeholder="Nombre"
              rounded="lg"
            >
              <template #label>
                <span class="txt-labels-form-initial-global"
                  >Nombre
                  <span class="color-red-global">*</span>
                </span>
              </template>
            </v-textarea>
            <!-- #endregion Nombre -->

            <!-- #region Descripción -->
            <v-textarea
              v-model="sDescription"
              :rules="descriptionBenefitRulesGlobal"
              variant="solo"
              flat
              density="comfortable"
              color="primary"
              bg-color="grey"
              counter="250"
              :maxlength="250"
              class="mb-3"
              rows="3"
              :persistent-counter="true"
              placeholder="Descripción"
              rounded="lg"
            >
              <template #label>
                <span class="txt-labels-form-initial-global"
                  >Descripción
                  <span class="color-red-global">*</span>
                </span>
              </template>
            </v-textarea>
            <!-- #endregion Descripción -->
          </div>
        </v-sheet>

        <v-sheet class="py-4 px-4" rounded="lg" min-height="100" width="100%">
          <v-row>
            <v-col cols="12" sm="6">
              <!-- #region Tipo de beneficio -->
              <v-select
                v-model="eBenefitType"
                :rules="typeBenefitsRules"
                :menu-props="{ bottom: true, offsetY: true }"
                class="input-global"
                density="comfortable"
                variant="solo"
                flat
                color="primary"
                bg-color="grey"
                :items="aBenefitsType"
                item-value="sId"
                item-title="sName"
                label="Tipo"
                placeholder="Tipo de beneficio"
                no-data-text="No hay información"
                rounded="lg"
              >
                <template #label>
                  <span class="txt-labels-form-initial-global"
                    >Tipo de beneficio
                    <span class="color-red-global">*</span>
                  </span>
                </template>
                <template v-slot:item="{ props, item }">
                  <v-list density="compact" class="px-2">
                    <v-list-item
                      v-bind="props"
                      rounded="lg"
                      :class="
                        item.value === eBenefitType
                          ? 'bg-color-grey-selected-item-global'
                          : ''
                      "
                    >
                      <template v-slot:prepend>
                        <v-icon
                          :color="
                            item.value === eBenefitType
                              ? 'yellowprimary'
                              : 'primary'
                          "
                          :icon="item.raw.sIcon"
                        ></v-icon>
                      </template>

                      <v-list-item-title
                        class="f-s12px"
                        v-text="item.text"
                      ></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>
              </v-select>
              <!-- #endregion Tipo de beneficio -->
            </v-col>
            <v-col cols="12" sm="6">
              <!-- #region Stock disponible -->
              <v-text-field
                v-model="iStock"
                :rules="stockRulesGlobal"
                variant="solo"
                flat
                density="comfortable"
                color="primary"
                bg-color="grey"
                placeholder="Stock disponible"
                type="number"
                min="0"
                rounded="lg"
              >
                <template #label>
                  <span class="txt-labels-form-initial-global"
                    >Stock disponible
                    <span class="color-red-global">*</span>
                  </span>
                </template>
              </v-text-field>
              <!-- #endregion Stock disponible -->
            </v-col>
          </v-row>

          <quantity-selected-content
            class="mb-5"
            :sTitle="sTitlePeopleQuantity"
            :aItems="aCommensalQuantities"
          />

          <!-- #region Rango de periodo de vigencia -->
          <v-row>
            <v-col class="pb-0" cols="12">
              <p class="txt-title-content-global font-weight-bold">
                Categoría de los productos
              </p>
            </v-col>

            <v-col cols="12" sm="12">
              <!-- #region Categoría de beneficio  -->
              <v-select
                v-model="sBenefitCategoryId"
                :rules="typeCategoryRules"
                :menu-props="{ bottom: true, offsetY: true }"
                class="input-global"
                density="comfortable"
                variant="solo"
                flat
                color="primary"
                bg-color="grey"
                :items="aBenefitCategory"
                item-value="sId"
                item-title="sName"
                label="Tipo"
                placeholder="Categoría de beneficio "
                no-data-text="No hay información"
                rounded="lg"
              >
                <template #label>
                  <span class="txt-labels-form-initial-global"
                    >Categoría de beneficio
                    <span class="color-red-global">*</span>
                  </span>
                </template>
              </v-select>
              <!-- #endregion Categoría de beneficio  -->
            </v-col>
          </v-row>
          <!-- #endregion Rango de periodo de vigencia -->

          <v-row>
            <v-col class="py-0" :cols="!bLightning ? 12 : 12">
              <quantity-selected-content
                class="mb-8"
                :sTitle="sTitleAvailableDays"
                :aItems="bLightning ? aTodayIds : aWeekDayIds"
              />
            </v-col>
            <!-- #region Campos de inicio y fin de horas -->
            <v-col v-if="bLightning" cols="12" sm="6">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div class="w-100p" v-bind="props">
                    <v-text-field
                      v-model="tStartTimeFormat"
                      :rules="hourRangeRules"
                      class="w-100p"
                      readonly
                      density="comfortable"
                      variant="solo"
                      flat
                      color="primary"
                      bg-color="grey"
                      label="Horario inicial"
                      placeholder="Seleccionar horario inicial"
                      clearable
                      prepend-inner-icon="mdi mdi-clock-time-eight-outline"
                      rounded="lg"
                    ></v-text-field>
                  </div>
                </template>
                <v-card>
                  <vue-date-picker
                    class="date-picker-global"
                    v-model="tStartTime"
                    time-picker
                    disable-time-range-validation
                    inline
                    auto-apply
                    locale="es"
                    placeholder="horario"
                    :min-time="{
                      hours: new Date().getHours,
                      minutes: new Date().getMinutes,
                    }"
                  />
                  <div class="content-btns-date-picker-global">
                    <v-btn class="btn-second-global"> Cerrar </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </v-col>

            <v-col v-if="bLightning" cols="12" sm="6">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div class="w-100p" v-bind="props">
                    <v-text-field
                      v-model="tEndTimeFormat"
                      :rules="hourRangeRules"
                      :disabled="!tStartTimeFormat"
                      class="w-100p"
                      readonly
                      density="comfortable"
                      variant="solo"
                      flat
                      color="primary"
                      bg-color="grey"
                      label="Horario final"
                      placeholder="Seleccionar horario final"
                      clearable
                      prepend-inner-icon="mdi mdi-clock-time-eight-outline"
                      rounded="lg"
                    ></v-text-field>
                  </div>
                </template>
                <v-card>
                  <vue-date-picker
                    class="date-picker-global"
                    v-model="tEndTime"
                    time-picker
                    disable-time-range-validation
                    inline
                    auto-apply
                    locale="es"
                    placeholder="horario"
                    :min-time="tStartTime"
                    :max-time="oMaxTime"
                  />
                  <div class="content-btns-date-picker-global">
                    <v-btn class="btn-second-global"> Cerrar </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </v-col>
            <!-- #endregion Campos de inicio y fin de horas -->
          </v-row>

          <p
            v-if="!bLightning"
            class="txt-title-content-global font-weight-bold mb-3"
          >
            Período de vigencia y Horario
          </p>
          <v-row v-if="!bLightning">
            <!-- #region campos de inicio y fin de fechas -->
            <v-col cols="12" sm="6">
              <div class="content-range-date-all">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <div class="w-100p" v-bind="props">
                      <v-text-field
                        v-model="tStartDateFormat"
                        :rules="dateRules"
                        class="w-100p"
                        readonly
                        density="comfortable"
                        variant="solo"
                        flat
                        color="primary"
                        bg-color="grey"
                        label="Fecha inicio"
                        placeholder="Seleccionar fecha inicio"
                        clearable
                        prepend-inner-icon="mdi-calendar"
                        rounded="lg"
                      ></v-text-field>
                    </div>
                  </template>
                  <v-card>
                    <vue-date-picker
                      class="date-picker-global"
                      v-model="tStartDate"
                      :rules="dateRules"
                      inline
                      auto-apply
                      locale="es"
                      :enable-time-picker="false"
                      :min-date="new Date()"
                    ></vue-date-picker>
                    <div class="content-btns-date-picker-global">
                      <v-btn class="btn-second-global"> Cerrar </v-btn>
                    </div>
                  </v-card>
                </v-menu>
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="content-range-date-all">
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <div class="w-100p" v-bind="props">
                      <v-text-field
                        v-model="tEndDateFormat"
                        :disabled="!tStartDateFormat"
                        :rules="dateRules"
                        class="w-100p"
                        readonly
                        density="comfortable"
                        variant="solo"
                        flat
                        color="primary"
                        bg-color="grey"
                        label="Fecha final"
                        placeholder="Seleccionar fecha final"
                        clearable
                        prepend-inner-icon="mdi-calendar"
                        rounded="lg"
                      ></v-text-field>
                    </div>
                  </template>
                  <v-card>
                    <vue-date-picker
                      class="date-picker-global"
                      v-model="tEndDate"
                      :rules="dateRules"
                      inline
                      auto-apply
                      locale="es"
                      :enable-time-picker="false"
                      :min-date="new Date(tStartDate)"
                    ></vue-date-picker>
                    <div class="content-btns-date-picker-global">
                      <v-btn class="btn-second-global"> Cerrar </v-btn>
                    </div>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <!-- #endregion campos de inicio y fin de fechas -->

            <!-- #region Campos de inicio y fin de horas -->
            <v-col cols="12" sm="6">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div class="w-100p" v-bind="props">
                    <v-text-field
                      v-model="tStartTimeFormat"
                      :rules="hourRangeRules"
                      class="w-100p"
                      readonly
                      density="comfortable"
                      variant="solo"
                      flat
                      color="primary"
                      bg-color="grey"
                      label="Horario inicial"
                      placeholder="Seleccionar horario inicial"
                      clearable
                      prepend-inner-icon="mdi mdi-clock-time-eight-outline"
                      rounded="lg"
                    ></v-text-field>
                  </div>
                </template>
                <v-card>
                  <vue-date-picker
                    class="date-picker-global"
                    v-model="tStartTime"
                    time-picker
                    disable-time-range-validation
                    inline
                    auto-apply
                    locale="es"
                    placeholder="horario"
                  />
                  <div class="content-btns-date-picker-global">
                    <v-btn class="btn-second-global"> Cerrar </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div class="w-100p" v-bind="props">
                    <v-text-field
                      v-model="tEndTimeFormat"
                      :rules="hourRangeRules"
                      :disabled="!tStartTimeFormat"
                      class="w-100p"
                      readonly
                      density="comfortable"
                      variant="solo"
                      flat
                      color="primary"
                      bg-color="grey"
                      label="Horario final"
                      placeholder="Seleccionar horario final"
                      clearable
                      prepend-inner-icon="mdi mdi-clock-time-eight-outline"
                      rounded="lg"
                    ></v-text-field>
                  </div>
                </template>
                <v-card>
                  <vue-date-picker
                    class="date-picker-global"
                    v-model="tEndTime"
                    time-picker
                    disable-time-range-validation
                    inline
                    auto-apply
                    locale="es"
                    placeholder="horario"
                    :min-time="tStartTime"
                  />
                  <div class="content-btns-date-picker-global">
                    <v-btn class="btn-second-global"> Cerrar </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </v-col>
            <!-- #endregion Campos de inicio y fin de horas -->
          </v-row>

          <p
            v-if="bLightning"
            class="txt-title-content-global font-italic color-grey-global"
          >
            Los beneficios relámpago pueden estar disponibles por un
            <span class="font-weight-bold">máximo de 6 horas</span>
          </p>
        </v-sheet>
      </div>
    </v-form>

    <!-- <v-divider class="mt-8 mb-8 content-divider-full-global"></v-divider> -->

    <!-- #region actions btns  -->
    <actions-btns-add
      @setAdd="setAdd"
      @setCancel="setCancel()"
      :bValidationAdd="true"
      :bLoadingBtnAdd="bLoadingBtnAdd"
      sBtnNameAdd="Guardar beneficio"
    />
    <!-- #endregion actions btns  -->

    <!-- #endregion Información general -->
  </div>
</template>
<script>
export default {
  props: {
    bMobile: Boolean,
    bTablet: Boolean,
    oItem: Object,
  },
  data() {
    return {
      sToReturn: "admin-benefits",
      aImg: [],
      sName: null,
      sDescription: null,
      eBenefitType: null,
      aBenefitsType: [
        { sId: "gift", sIcon: "mdi mdi-gift-outline", sName: "Regalo" },
        {
          sId: "discount",
          sIcon: "mdi mdi-percent-outline",
          sName: "Descuento",
        },
        {
          sId: "promotion",
          sIcon: "mdi mdi-tag-multiple-outline",
          sName: "Promoción",
        },
      ],
      sBenefitCategoryId: null,
      aBenefitCategory: [],
      iStock: null,
      sTitlePeopleQuantity: "Cantidad de personas",
      aCommensalQuantities: [
        {
          sId: 1,
          sIcon: null,
          sName: "Para 1",
          bSelected: false,
        },
        {
          sId: 2,
          sIcon: null,
          sName: "Para 2",
          bSelected: false,
        },
        {
          sId: 4,
          sIcon: null,
          sName: "Para 4",
          bSelected: false,
        },
        {
          sId: 6,
          sIcon: null,
          sName: "Para 6",
          bSelected: false,
        },
        {
          sId: 7,
          sIcon: null,
          sName: "Para +6",
          bSelected: false,
        },
      ],
      tStartDateFormat: null,
      tStartDate: null,
      tEndDateFormat: null,
      tEndDate: null,
      aDate: [],
      sDate: null,
      sTitleAvailableDays: "Disponible los días",
      aWeekDayIds: [
        {
          sId: 0,
          sIcon: null,
          sName: "Lunes",
          bSelected: false,
        },
        {
          sId: 1,
          sIcon: null,
          sName: "Martes",
          bSelected: false,
        },
        {
          sId: 2,
          sIcon: null,
          sName: "Miércoles",
          bSelected: false,
        },
        {
          sId: 3,
          sIcon: null,
          sName: "Jueves",
          bSelected: false,
        },
        {
          sId: 4,
          sIcon: null,
          sName: "Viernes",
          bSelected: false,
        },
        {
          sId: 5,
          sIcon: null,
          sName: "Sábado",
          bSelected: false,
        },
        {
          sId: 6,
          sIcon: null,
          sName: "Domingo",
          bSelected: false,
        },
      ],
      aTodayIds: [
        {
          sId: 0,
          sIcon: null,
          sName: "HOY",
          bSelected: true,
        },
      ],
      tStartTimeFormat: `${new Date()
        .getHours()
        .toString()
        .padStart(2, "0")}:${new Date()
        .getMinutes()
        .toString()
        .padStart(2, "0")}`,
      tStartTime: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      },
      tEndTimeFormat: null,
      tEndTime: null,
      sTime: this.getNewDateTimeGlobal(true),
      aTime: [
        {
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: 0,
        },
        {
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: 0,
        },
      ],
      bLoadingBtnAdd: false,
    };
  },
  computed: {
    bLightning() {
      switch (this.$route.params.type) {
        case "regular":
          return false;
        case "relampago":
          return true;
        default:
          return false;
      }
    },
    oMaxTime() {
      const date = new Date();
      date.setHours(this.tStartTime.hours);
      var iHours = date.getHours() + 6;
      return {
        hours: iHours,
        minutes: this.tStartTime.minutes,
      };
    },
  },
  async beforeMount() {
    await this.getCategories();
  },
  methods: {
    getBack() {
      this.$router.push({
        name: this.sToReturn,
      });
    },
    setUploadImg(aImg) {
      this.aImg = aImg;
      this.setValidationForm();
    },
    setCancel() {
      this.$router.push({ name: this.sToReturn });
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
            sName: this.sName,
            sDescription: this.sDescription,
            eBenefitType: this.eBenefitType, // Valores válidos: ["gift", "discount", "promotion"
            tStartDate: this.getDateAndHr(
              this.bLightning ? new Date() : this.tStartDate,
              this.tStartTime
            ), // Tiene que ser mayor que la fecha actual
            tEndDate: this.getDateAndHr(
              this.bLightning ? new Date() : this.tEndDate,
              this.tEndTime
            ), // Tiene que ser mayor que tStartDate
            aWeekDayIds: this.bLightning
              ? undefined
              : this.aWeekDayIds
                  .filter((eF) => eF.bSelected === true)
                  .map((e) => {
                    return e.sId;
                  }),
            sBenefitCategoryId: this.sBenefitCategoryId,
            aCommensalQuantities: this.aCommensalQuantities
              .filter((eF) => eF.bSelected === true)
              .map((e) => {
                return e.sId;
              }), // Valores válidos: [1, 2, 4, 6, 7]
            iStock: Number(this.iStock),
            bLightning: this.bLightning,
          };
        this.$api
          .post(`benefits`, payload, config)
          .then(async (response) => {
            let sBenefitId = response.data.benefit.sBenefitId;
            if (this.aImg.length > 0) {
              await this.setAddImg(sBenefitId, response.data.message);
            } else {
              this.$swal.fire({
                title: "¡Creado!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Cerrar",
              });
              this.$router.push({ name: "admin-benefits" });
            }
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
    async setAddImg(sBenefitId, sMessage) {
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
        const oResult = await this.$api.post(
          `benefits/images/${sBenefitId}?bDeleteImage=${false}`,
          formData,
          config
        );
        this.$swal.fire({
          title: "¡Creado!",
          text: sMessage,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.$router.push({ name: "admin-benefits" });
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

    async getCategories() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        let oResult = await this.$api.get(`benefits/categories`, payload);

        this.aBenefitCategory = oResult.data.benefits.map((e) => {
          return {
            sId: e.sBenefitCategoryId,
            sName: e.sName,
          };
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
  watch: {
    aDate() {
      if (this.aDate.length > 1) {
        this.sDate = `${this.getFormatDDMMYYYY(
          this.aDate[0],
          false
        )} ~ ${this.getFormatDDMMYYYY(this.aDate[1], false)} de ${this.getHours(
          this.aDate[0]
        )} a ${this.getHours(this.aDate[1])}`;
      }
    },
    sDate() {
      if (!this.sDate) {
        this.aDate = [];
      } else {
        const aDate = this.sDate.split("~").map((e) => {
          return this.getFormatYYYYMMDD(e);
        });
      }
    },
    tStartDate() {
      this.tEndDate = null;
      this.tEndDateFormat = null;
      if (this.tStartDate) {
        this.tStartDateFormat = this.getFormatDDMMYYYY(this.tStartDate, false);
      }
    },
    tStartDateFormat() {
      this.tEndDate = null;
      this.tEndDateFormat = null;
      if (!this.tStartDate) {
        this.tStartDate = null;
      }
    },
    tEndDate() {
      if (this.tEndDate) {
        this.tEndDateFormat = this.getFormatDDMMYYYY(this.tEndDate, false);
      }
    },
    tEndDateFormat() {
      if (!this.tEndDate) {
        this.tEndDate = null;
      }
    },
    aTime() {
      if (this.aTime.length > 1) {
        this.sTime = this.getNewDateTimeGlobal(false, this.aTime);
      }
    },
    sTime() {
      if (!this.sDate) {
        // this.aTime = [];
      } else {
      }
    },
    tStartTime(sNew, sOld) {
      if (sNew) {
        this.tStartTimeFormat = `${sNew?.hours
          .toString()
          .padStart(2, "0")}:${sNew.minutes.toString().padStart(2, "0")}`;
        this.tEndTime = sNew;
      } else {
        this.tEndTimeFormat = null;
        this.tEndTime = null;
      }
    },
    tStartTimeFormat(sNew, sOld) {
      if (!sNew) {
        this.tEndTimeFormat = null;
        this.tEndTime = null;
      }
    },
    tEndTime() {
      if (this.tEndTime) {
        this.tEndTimeFormat = `${this.tEndTime?.hours
          .toString()
          .padStart(2, "0")}:${this.tEndTime.minutes
          .toString()
          .padStart(2, "0")}`;
      }
    },
    aImg: {
      deep: true, // Observar cambios profundos en el arreglo
      handler(newVal) {},
    },
  },
};
</script>
<style scoped>
.content-go-back {
  width: 100%;
  padding: 5px 0px 25px 0px;
}
.content-information-back-all {
  display: flex;
  gap: 10px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.content-add-form-all {
  display: flex;
  width: 100%;
  gap: 20px;
}
.content-range-date-all {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
}
.icon-arrow-range-date {
  font-size: 1.3rem;
}
.content-form-name-description {
  width: 100%;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-add-form-all {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }
  .content-information-back-all {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .content-add-form-all {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }
  .content-information-back-all {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
