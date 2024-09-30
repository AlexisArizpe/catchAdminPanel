<template>
  <!-- bEmptyObjGlobal(oItem) -->
  <admin-benefits-detail-skeleton-content
    v-if="bLoadingItem"
    :sTypeBenefit="sTypeBenefit"
  />
  <v-card v-else class="content-card-dialog-global">
    <div class="content-close-dialog">
      <p class="txt-title-dialog-global">
        Beneficio
        <span class="font-weight-bold">{{ oItem.sFolio }}</span>
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
      <div class="content-detail-all">
        <v-form ref="form">
          <div class="content-img-general">
            <!-- #region content img  -->
            <div
              class="content-img-all"
              :class="
                bLightning && bActiveModify ? 'content-img-lightning-all' : ''
              "
            >
              <div
                v-if="!bDouble"
                class="icon-info-general content-status-all content-icon-all"
              >
                <span :class="sIconBenefitType"></span>
              </div>

              <!-- #region (Regular) Tag de reserva de mesa -->
              <div
                v-if="bReservation && !bDouble"
                class="content-reservation-all"
              >
                <Icon class="icon-reservation" icon="solar:calendar-linear" />
              </div>
              <!-- #endregion (Regular) Tag de reserva de mesa -->

              <div
                v-if="!bLightning && !bDouble"
                :class="sColorStatus"
                class="status-info-general content-status-all text-uppercase font-weight-bold"
              >
                {{ sStatus }}
              </div>
              <upload-image-horizontal
                v-if="!bLightning"
                v-model="aImg"
                :aImg="aImg"
                sMod="edit"
                sModImgUpload="Normal"
                :bActiveModify="bActiveModify"
                class="mb-4"
              />
              <upload-image-vertical
                v-else
                v-model="aImg"
                :aImg="aImg"
                sMod="edit"
                :iWidth="250"
                :iHeight="450"
                sModImgUpload="Normal"
                :bActiveModify="bActiveModify"
              />
              <div
                v-if="bActiveModify"
                class="content-form-name-description-all"
                :class="
                  bLightning && bActiveModify
                    ? 'content-form-name-description-lightning-all'
                    : ''
                "
              >
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
                  class="mb-3"
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
            </div>
            <!-- #endregion content img  -->

            <!-- #region mod view info -->
            <div v-if="!bActiveModify" class="content-general-info">
              <div
                v-if="bLightning"
                :class="sColorStatus"
                class="content-status-all mb-3 text-uppercase font-weight-bold"
              >
                {{ sStatus }}
              </div>
              <result-mod-view-without-icon
                sTitle="Nombre"
                :sIcon="null"
                class="mb-3"
                sTypeResult="Description"
                :sResult="oItem.sName"
              />
              <result-mod-view-without-icon
                sTitle="Descripción"
                :sIcon="null"
                class="mb-4"
                sTypeResult="Description"
                :sResult="oItem.sDescription"
              />

              <v-row>
                <!-- #region Cantidad de personas -->
                <v-col class="py-0 mt-3" cols="12" sm="6">
                  <quantity-selected-result-view
                    sTitle="Cantidad de personas"
                    sIcon="mdi mdi-account-outline"
                    :sResult="sCommensalQuantities"
                  />
                </v-col>
                <!-- #endregion Cantidad de personas -->

                <!-- #region Disponible los días -->
                <v-col class="py-0 mt-2 mb-6" cols="12" sm="6">
                  <quantity-selected-result-view
                    sTitle="Disponible los días"
                    :sIcon="null"
                    :sResult="sWeekDays"
                  />
                </v-col>
                <!-- #endregion Disponible los días -->

                <!-- #region Categoría de beneficio -->
                <v-col class="py-0 mb-2" cols="12" sm="6">
                  <quantity-selected-result-view
                    sTitle="Categoría de beneficio"
                    :sIcon="null"
                    :sResult="sBenefitCategory"
                  />
                </v-col>
                <!-- #endregion Categoría de beneficio -->

                <!-- #region Periodo de vigencia -->
                <v-col class="pt-3 pb-1" cols="12" v-if="!bLightning">
                  <p class="txt-title-content-global font-weight-bold mb-0">
                    Período de vigencia y horario
                  </p>
                </v-col>
                <v-col class="pb-3 pt-0" cols="12" sm="6" v-if="!bLightning">
                  <v-text-field
                    v-model="sDate"
                    :disabled="true"
                    class="text-disabled-benefit"
                    readonly
                    density="comfortable"
                    variant="fat"
                    placeholder="Periodo de vigencia"
                    persistent-placeholder
                    hide-details
                    clearable
                    prepend-inner-icon="mdi-calendar"
                    rounded="lg"
                  ></v-text-field>
                </v-col>

                <!-- #endregion Periodo de vigencia -->

                <!-- #region rango de horario -->
                <v-col cols="12" sm="6" class="pb-3 pt-0" v-if="!bLightning">
                  <v-text-field
                    v-model="sTime"
                    :disabled="true"
                    :rules="hourRangeRules"
                    class="text-disabled-benefit"
                    readonly
                    density="comfortable"
                    variant="solo"
                    flat
                    color="primary"
                    bg-color="grey"
                    placeholder="Seleccionar rango de horario"
                    persistent-placeholder
                    hide-details
                    clearable
                    prepend-inner-icon="mdi mdi-clock-time-eight-outline"
                    rounded="lg"
                  ></v-text-field>
                </v-col>
                <!-- #endregion rango de horario -->

                <!-- #region stock -->
                <v-col
                  class="py-0"
                  cols="12"
                  v-if="iStatus !== 3 && iStatus !== 4"
                >
                  <v-divider class="mb-4" />

                  <p v-if="iStatus === 0" class="text-end">
                    Stock disponible:
                    <span class="font-weight-bold">{{ iStockAvailable }}</span>
                  </p>

                  <div v-else class="content-stock-text-field">
                    <p>Stock disponible:</p>
                    <!-- #region Stock disponible -->
                    <div class="content-field-stock">
                      <v-text-field
                        v-model="iStockAvailable"
                        :readonly="bRead"
                        :rules="stockRulesGlobal"
                        :disabled="iStatus !== 2"
                        hide-details
                        variant="solo"
                        flat
                        density="comfortable"
                        color="primary"
                        bg-color="grey"
                        rounded="lg"
                        type="number"
                        min="0"
                      >
                      </v-text-field>
                    </div>
                    <!-- #endregion Stock disponible -->
                  </div>
                </v-col>
                <!-- #endregion stock -->

                <!-- #region info finalizado o cancelado -->
                <v-col
                  class="pt-0"
                  cols="12"
                  v-if="bLightning && (iStatus === 3 || iStatus === 4)"
                >
                  <div
                    v-for="(oItem, i) in aInfofinalizedOrCancelled"
                    :key="i"
                    v-html="oItem"
                  ></div>
                </v-col>
                <!-- #endregion info finalizado o cancelado -->
              </v-row>
            </div>
            <!-- #endregion mod view info -->

            <!-- #region mod edit info -->
            <div v-else class="content-general-info">
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
                    rounded="lg"
                    type="number"
                    min="0"
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

              <!-- #region quantity persons -->
              <quantity-selected-content
                class="mb-5"
                :sTitle="sTitlePeopleQuantity"
                :aItems="aCommensalQuantities"
              />
              <!-- #endregion quantity persons -->

              <!-- #region Category of people   -->
              <v-row>
                <v-col class="pb-0" cols="12">
                  <p class="txt-title-content-global font-weight-bold">
                    Categoría de beneficio
                  </p>
                </v-col>
                <v-col cols="12" sm="12">
                  <!-- #region Categoría de beneficio -->
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
                    placeholder="Categoría de beneficio"
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
                  <!-- #endregion Categoría de beneficio -->
                </v-col>
              </v-row>
              <!-- #endregion Category of people   -->

              <v-row>
                <v-col class="py-0" :cols="!bLightning ? 12 : 12">
                  <quantity-selected-content
                    class="mb-8"
                    :sTitle="sTitleAvailableDays"
                    :aItems="bLightning ? aTodayIds : aWeekDayIds"
                  />
                </v-col>
                <!-- #region rango de horario -->

                <!-- #region Inicio -->
                <v-col v-if="bLightning" cols="12" sm="6">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <div class="w-100p" v-bind="props">
                        <v-text-field
                          v-model="tStartTimeFormat"
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
                        >
                          <template #label>
                            <span class="txt-labels-form-initial-global"
                              >Horario inicial
                              <span class="color-red-global">*</span>
                            </span>
                          </template>
                        </v-text-field>
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
                <!-- #endregion Inicio -->

                <!-- #region Final -->
                <v-col v-if="bLightning" cols="12" sm="6">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <div class="w-100p" v-bind="props">
                        <v-text-field
                          v-model="tEndTimeFormat"
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
                        >
                          <template #label>
                            <span class="txt-labels-form-initial-global"
                              >Horario final
                              <span class="color-red-global">*</span>
                            </span>
                          </template>
                        </v-text-field>
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
                <!-- #endregion Final -->

                <!-- #endregion rango de horario -->
              </v-row>

              <v-row v-if="!bLightning">
                <v-col class="pb-0" cols="12">
                  <p class="txt-title-content-global font-weight-bold">
                    Período de vigencia y horario
                  </p>
                </v-col>
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

                <!-- #region Inicio -->
                <v-col cols="12" sm="6">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <div class="w-100p" v-bind="props">
                        <v-text-field
                          v-model="tStartTimeFormat"
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
                        >
                          <template #label>
                            <span class="txt-labels-form-initial-global"
                              >Horario inicial
                              <span class="color-red-global">*</span>
                            </span>
                          </template>
                        </v-text-field>
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
                <!-- #endregion Inicio -->

                <!-- #region Final -->
                <v-col cols="12" sm="6">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <div class="w-100p" v-bind="props">
                        <v-text-field
                          v-model="tEndTimeFormat"
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
                        >
                          <template #label>
                            <span class="txt-labels-form-initial-global"
                              >Horario final
                              <span class="color-red-global">*</span>
                            </span>
                          </template>
                        </v-text-field>
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
                <!-- #endregion Final -->
              </v-row>
            </div>
            <!-- #endregion mod edit info -->
          </div>
        </v-form>

        <!-- #region info finalizado o cancelado -->
        <div
          v-if="
            !bLightning && (iStatus === 3 || iStatus === 4) && !bActiveModify
          "
        >
          <p class="text-start text-subtitle-2">
            <span class="font-weight-bold">
              {{ oItem.sLabelCommentRecord }}
            </span>
            {{ oItem.sCommentRecord }}
          </p>
          <p class="text-start text-subtitle-2">
            <span class="font-weight-bold">
              {{ oItem.sLabelCreatedByRecord }}
            </span>
            {{ oItem.sCreatedByRecord }}
          </p>
          <!-- </div> -->
        </div>
        <!-- #endregion info finalizado o cancelado -->

        <!-- #region dashboard -->
        <div
          v-if="iStatus !== 0 && !bActiveModify"
          class="content-dashboard-general"
        >
          <div v-for="(oItem, i) in aDashboard" :key="i" class="content-item">
            <div v-html="oItem.sName"></div>
            <p class="font-weight-bold">{{ oItem.sValue }}</p>
          </div>
        </div>
        <!-- #endregion dashboard -->
      </div>
    </v-card-text>

    <v-card-actions v-if="bWrite || bManage" class="content-actions-detail">
      <!-- #region Cancelar beneficio -->
      <!-- v-if="iStatus === 0" -->
      <v-btn
        v-if="iStatus === 0"
        class="btn-second-red-global"
        variant="outlined"
        width="220px"
        @click="setCancelBenefitConfirm()"
      >
        Cancelar beneficio
      </v-btn>
      <!-- #endregion Cancelar beneficio -->
      <v-spacer />
      <!-- #region Finalizar beneficio -->
      <!-- <v-btn
        v-if="iStatus === 1 || iStatus === 2"
        class="l-spacing-0 text-none btn-green-primary"
        variant="flat"
        color="greenBtn"
        width="220px"
        @click="setFinished()"
      >
        Finalizar beneficio
      </v-btn> -->
      <!-- #endregion Finalizar beneficio -->

      <!-- #region btn Duplicar beneficio -->
      <!-- <v-btn
        v-if="!bActiveModify"
        @click="setDouble"
        class="btn-primary-global"
        :variant="iStatus == 0 || iStatus == 1 ? 'outlined' : 'flat'"
        color="primary"
        width="220px"
      >
        Duplicar beneficio
      </v-btn> -->
      <!-- #endregion btn Duplicar beneficio -->

      <!-- #region Editar beneficio -->
      <!-- <v-btn
        v-if="(iStatus == 0 || bDouble) && bActiveModify"
        @click="setDiscard()"
        class="btn-second-global"
        variant="outlined"
        color="primary"
        width="220px"
      >
        Cancelar
      </v-btn>
      <v-btn
        v-if="iStatus == 0 || bDouble"
        @click="setModify"
        class="btn-primary-global"
        variant="flat"
        color="primary"
        width="220px"
        :loading="bLoadingBtnAdd"
      >
        {{ bActiveModify ? "Guardar beneficio" : "Editar beneficio" }}
      </v-btn> -->
      <!-- #endregion Editar beneficio -->

      <v-btn
        @click="setCloseDialog"
        class="btn-primary-global"
        variant="flat"
        color="primary"
        width="220px"
      >
        Regresar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import moment from "moment-timezone";
export default {
  props: {
    sIdBenefit: String,
    sTypeBenefit: {
      type: String,
      default: "regular",
    },
    oItem: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    sTimezoneId: null,
    sToReturn: "admin-benefits",
    aImg: [
      {
        sId: "0",
        sUrl: null,
        // sUrl: null,
      },
    ],
    bDeleteImg: false,
    // oItem: {},
    bLoadingItem: true,
    sName: null,
    sDescription: null,
    sIconBenefitType: null,
    eBenefitType: null,
    aBenefitsType: [
      { sId: "gift", sIcon: "mdi mdi-gift-outline", sName: "Regalo" },
      { sId: "discount", sIcon: "mdi mdi-percent-outline", sName: "Descuento" },
      {
        sId: "promotion",
        sIcon: "mdi mdi-tag-multiple-outline",
        sName: "Promoción",
      },
    ],
    sBenefitCategoryId: null,
    sBenefitCategory: null,
    aBenefitCategory: [],
    iStock: 0,
    iStockAvailable: 0,

    sTitlePeopleQuantity: "Cantidad de personas",
    sCommensalQuantities: null,
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
    sWeekDays: null,
    aWeekDayIds: [
      {
        sId: 0,
        sIcon: null,
        sName: "Domingo",
        bSelected: false,
      },
      {
        sId: 1,
        sIcon: null,
        sName: "Lunes",
        bSelected: false,
      },
      {
        sId: 2,
        sIcon: null,
        sName: "Martes",
        bSelected: false,
      },
      {
        sId: 3,
        sIcon: null,
        sName: "Miércoles",
        bSelected: false,
      },
      {
        sId: 4,
        sIcon: null,
        sName: "Jueves",
        bSelected: false,
      },
      {
        sId: 5,
        sIcon: null,
        sName: "Viernes",
        bSelected: false,
      },
      {
        sId: 6,
        sIcon: null,
        sName: "Sábado",
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
    bReservation: false,
    sTime: "",
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
    tStartTimeFormat: null,
    tStartTime: null,
    tEndTimeFormat: null,
    tEndTime: null,
    aDashboard: [],
    iStatus: null, // 0-Programado, 1-Publicado, 2-Sin Stock, 3-Finalizado 4-Cancelado
    bActiveModify: false,
    bDouble: false,
    bLoadingBtnAdd: false,
    bDialogConfirmOrigin: false,
    oItemConfirmOrigin: {},
  }),
  computed: {
    sStatus() {
      switch (this.iStatus) {
        case 0:
          return "Programado";
        case 1:
          return "Publicado";
        case 2:
          return "¡Sin Stock!";
        case 3:
          return "Finalizado";
        case 4:
          return "Cancelado";

        default:
          return "";
      }
    },
    sColorStatus() {
      switch (this.iStatus) {
        case 0:
          return "content-status-programmed";
        case 1:
          return "content-status-published";
        case 2:
          return "content-status-without-stock";
        case 3:
          return "content-status-finalized";
        case 4:
          return "content-status-cancelled";

        default:
          return "";
      }
    },
    aInfofinalizedOrCancelled() {
      switch (this.iStatus) {
        case 3: //3-Finalizado
          return [
            `<p class="text-start text-subtitle-2"> <span class="font-weight-bold">Período de vigencia:</span>Completo del 01/01/24 al 29/01/24</p>`,
            `<p class="text-start text-subtitle-2"> <span class="font-weight-bold">Beneficio creado por:</span>Nombre de usuario</p>`,
          ];
        case 4: //4-Cancelado
          return [
            `<p class="text-start text-subtitle-2"> <span class="font-weight-bold">Motivo de cancelación:</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci metus, volutpat ac odio nec, molestie mollis sapien</p>`,
            `<p class="text-start text-subtitle-2"> <span class="font-weight-bold">Cancelado por:</span>Nombre de usuario</p>`,
          ];

        default:
          return [];
      }
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
    bLightning() {
      switch (this.sTypeBenefit) {
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
    // this.sTime = this.getNewDateTimeGlobal(true);
    if (this.oItem) {
      await this.getCategories();
      // this.setFillData(this.oItem);
      await this.getItem();
    }
  },
  emits: ["setStatus", "setActiveModify", "setCloseDialog"],
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
          `benefits/${this.oItem.sBenefitId}/public`,
          payload
        );
        this.setFillData(oResult.data.benefit);
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error.response.data.message);
        // this.$store.alert.error(error.response.data.message);
      }
    },
    async setFillData(oItem) {
      try {
        let sImg = null;
        if (oItem.sImageKey !== null) {
          sImg = oItem.oImages.xlg;
        }
        const oFile = sImg ? await this.getUrlToBlob(sImg) : null;

        this.aImg = [
          {
            sId: "123",
            sUrl: sImg ?? null,
            bEdit: false,
            file: oFile ? oFile.file : null,
          },
        ];
        this.sName = oItem.sName;
        this.sDescription = oItem.sDescription;
        this.eBenefitType = oItem.eBenefitType;
        this.sBenefitCategoryId = oItem.BenefitCategory.sBenefitCategoryId;
        this.bReservation = oItem.bWithReservation;

        this.sBenefitCategory = this.aBenefitCategory.find(
          (e) => e.sId === oItem.BenefitCategory.sBenefitCategoryId
        ).sName;

        this.sIconBenefitType = this.aBenefitsType.find(
          (e) => e.sId === oItem.eBenefitType
        ).sIcon;
        this.iStock = oItem.iStock;
        this.iStockAvailable = Number(oItem.iStock) - Number(oItem.iUsedStock);
        // this.iStatus = this.getStatusBenefits("finished");
        this.iStatus = this.getStatusBenefits(oItem.eStatus);

        this.aDashboard = [
          {
            sName: "<span class='text-subtitle-2'>Stock total</span>",
            sValue: Number(oItem.iStock),
          },
          {
            sName: "<span class='text-subtitle-2'>Beneficios activados</span>",
            sValue: Number(oItem.iTotalActivations),
          },
          {
            sName: "<span class='text-subtitle-2'>Beneficios canjeados</span>",
            sValue: Number(oItem.iTotalRedemptions),
          },
          {
            sName: "<span class='text-subtitle-2'>Ticket promedio</span>",
            sValue: `$ ${Number(oItem.iAverageTicket)}`,
          },
        ];

        // #region Cantidad de personas
        this.aCommensalQuantities.forEach((element) => {
          if (
            oItem.CommensalQuantities.map((e) => {
              return e.iQuantity;
            }).includes(element.sId)
          ) {
            element.bSelected = true;
          }
        });
        this.sCommensalQuantities = `Para ${oItem.CommensalQuantities.map(
          (e) => {
            return e.iQuantity;
          }
        ).join(", ")}`;
        // #endregion Cantidad de personas

        this.sTimezoneId = oItem.Establishment.sTimezoneId;

        // #region disponible los dias
        this.aWeekDayIds.forEach((element) => {
          if (
            oItem.WeekDays.map((e) => {
              return e.iWeekDayId;
            }).includes(element.sId)
          ) {
            element.bSelected = true;
          }
        });
        if (this.bLightning) {
          this.sWeekDays = `<span class="font-weight-bold">HOY <span class="color-black-global">de</span> ${this.getHoursUTC(
            oItem.tStartDate
          )} <span class="color-black-global">a</span> ${this.getHoursUTC(
            oItem.tEndDate
          )}  </span>`;
        } else {
          this.sWeekDays = this.getWeekDays(oItem.WeekDays);
        }
        // #endregion disponible los dias

        this.sDate = `${this.getFormatDDMMYYYYUTC(
          oItem.tStartDate
        )} ~ ${this.getFormatDDMMYYYYUTC(oItem.tEndDate)} `;
        this.aDate = [oItem.tStartDate, oItem.tEndDate];

        this.tStartDate = oItem.tStartDate;
        this.tEndDate = oItem.tEndDate;

        this.sTime = `${this.getHoursUTC(
          oItem.tStartDate
        )} ~ ${this.getHoursUTC(oItem.tEndDate)}`;

        let aStartHourTemp = this.getHoursUTC(oItem.tStartDate).split(":");
        let aEndHourTemp = this.getHoursUTC(oItem.tEndDate).split(":");
        this.tStartTime = {
          hours: Number(aStartHourTemp[0]),
          minutes: Number(aStartHourTemp[1]),
          seconds: 0,
        };
        this.tEndTime = {
          hours: Number(aEndHourTemp[0]),
          minutes: Number(aEndHourTemp[1]),
          seconds: 0,
        };

        this.aTime = [
          {
            hours: Number(aStartHourTemp[0]),
            minutes: Number(aStartHourTemp[1]),
            seconds: 0,
          },
          {
            hours: Number(aEndHourTemp[0]),
            minutes: Number(aEndHourTemp[1]),
            seconds: 0,
          },
        ];

        // this.oItem = {
        //   sId: oItem.sBenefitId,
        //   sFolio: oItem.sFolio,
        //   sBenefitsType: oItem.eBenefitType,
        //   sName: oItem.sName,
        //   sDescription: oItem.sDescription,
        //   sStatus: oItem.BenefitStatusRecords.sStatus,
        //   sNameStatus: this.getStatusNameBenefits(
        //     oItem.BenefitStatusRecords.sStatus
        //   ),
        //   sColorStatus: this.getStatusColorBenefits(
        //     oItem.BenefitStatusRecords.sStatus
        //   ),
        //   iStatus: this.getStatusBenefits(oItem.BenefitStatusRecords.sStatus),
        //   eBenefitType: oItem.eBenefitType,
        //   sStock: `${oItem.iStock} Beneficios`,
        //   iStock: oItem.iStock,
        //   sLabelCommentRecord:
        //     this.getInfofinalizedOrCancelled(oItem).sLabelCommentRecord,
        //   sCommentRecord:
        //     this.getInfofinalizedOrCancelled(oItem).sCommentRecord,
        //   sLabelCreatedByRecord:
        //     this.getInfofinalizedOrCancelled(oItem).sLabelCreatedByRecord,
        //   sCreatedByRecord:
        //     this.getInfofinalizedOrCancelled(oItem).sCreatedByRecord,
        // };
        this.bLoadingItem = false;
      } catch (error) {
        console.log(error);
      }
    },
    getWeekDays(aItems) {
      return this.aWeekDayIds
        .map((e, i) => {
          return `<span class=" font-weight-bold ${
            e.bSelected ? " color-black-global" : ""
          }">${e.sName.substr(0, 1)}</span>`;
        })
        .join(" | ");
    },
    getBack() {
      this.$router.push({
        name: this.sToReturn,
      });
    },
    setUploadImg(aImg) {
      this.aImg = aImg;
    },
    setCancel() {
      this.$router.push({ name: this.sToReturn });
    },
    async setCancelBenefitConfirm() {
      this.setCloseDialog();
      const swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: `<span class="font-weight-regular">¿Seguro que deseas <span class="font-weight-bold color-red-global"> cancelar </span>
            el <span class="font-weight-bold">Beneficio ${this.oItem.sFolio} </span>?</span>`,
          icon: "warning",
          input: "textarea",
          inputPlaceholder: "Motivo de la cancelación...",
          inputAttributes: {
            autocapitalize: "off",
          },
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value !== "") {
                resolve();
              } else {
                resolve("Es necesario agregar un comentario a la cancelación");
              }
            });
          },
          showCancelButton: true,
          confirmButtonText: "Cancelar beneficio",
          cancelButtonText: "Regresar",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.setCancelBenefit(result.value);
          }
        });
    },
    async setCancelBenefit(sValue) {
      try {
        this.bLoadingBtnCancel = true;
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            eStatus: "canceled",
            sComment: sValue,
          };
        const oResult = await this.$api.put(
          `benefits/${this.oItem.sId}/status`,
          payload,
          config
        );
        this.$store.table.setRefresh(true);
        this.setCloseDialog();
        this.$swal.fire({
          title: "¡Cancelado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnCancel = false;
      } catch (error) {
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnCancel = false;
      }
    },
    async setFinished() {
      try {
        this.bLoadingBtnCancel = true;
        const config = {
            headers: {
              Authorization: `Bearer ${this.$store.user.sToken}`,
            },
          },
          payload = {
            eStatus: "finished",
            sComment: "finished",
          };
        const oResult = await this.$api.put(
          `benefits/${this.oItem.sId}/status`,
          payload,
          config
        );

        this.$swal.fire({
          title: "¡Finalizado!",
          text: oResult.data.message,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        this.setCloseDialog();
        this.$store.table.setRefresh(true);
        this.bLoadingBtnCancel = false;
      } catch (error) {
        this.setCloseDialog();
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnCancel = false;
      }
    },
    setDiscard() {
      this.bActiveModify = false;
      if (this.bDouble) {
        this.bDouble = false;
      }
    },
    setModify(bActiveModify) {
      if (this.bActiveModify) {
        if (this.bDouble) {
          this.setAdd();
        } else {
          this.setChange();
        }
      } else {
        this.bActiveModify = true;
      }
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

            if (this.aImg[0].file) {
              await this.setAddImg(
                sBenefitId,
                response.data.message,
                "¡Creado!"
              );
            } else {
              this.$swal.fire({
                title: "¡Creado!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Cerrar",
              });
              this.setCloseDialog();
              this.$store.table.setRefresh(true);
            }
          })
          .catch((error) => {
            console.log(error);
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
    async setChange() {
      try {
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
            };
          const oResult = await this.$api.put(
            `benefits/${this.oItem.sId}`,
            payload,
            config
          );
          let sBenefitId = oResult.data.benefit.sBenefitId;
          let sUrlImg = this.aImg[0]?.sUrl.toString() ?? "";
          let bEditImg = sUrlImg.includes("data:image"); // Si tiene data:image quiere decir que se subio una foto nueva
          if (bEditImg || this.bDeleteImg) {
            await this.setAddImg(
              sBenefitId,
              oResult.data.message,
              "¡Actualizado!"
            );
          } else {
            // this.setCloseDialog();
            this.$swal.fire({
              title: "¡Actualizado!",
              text: oResult.data.message,
              icon: "success",
              confirmButtonText: "Cerrar",
            });
            // this.$router.push({ name: "admin-benefits" });
            // this.$store.table.setRefresh(true);
          }

          this.bLoadingBtnAdd = false;
        }
      } catch (error) {
        console.log(error);
        // this.setCloseDialog();
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        this.bLoadingBtnAdd = false;
      }
    },
    async setAddImg(sBenefitId, sMessage, title) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        };
        const formData = new FormData();

        formData.append("aImage", this.aImg[0]?.file ?? null);
        const oResult = await this.$api.post(
          `benefits/images/${sBenefitId}?bDeleteImage=${this.bDeleteImg}`,
          formData,
          config
        );

        this.$swal.fire({
          title: title,
          text: sMessage,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
        if (this.bDouble) {
          this.setCloseDialog();
        }
        this.$store.table.setRefresh(true);
        return true;
      } catch (error) {
        console.log(error);
        this.bLoadingBtnAction = false;
        this.$swal.fire({
          title: "¡Error!",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return FLIPPED_ALIAS_KEYS;
      }
    },
    setDeleteItem() {
      this.bDialogConfirmOrigin = !this.bDialogConfirmOrigin;
      if (this.bDialogConfirmOrigin) {
        this.oItemConfirmOrigin = {
          sNameHeader: "Eliminar administrador",
          sQuestion: `<span>La eliminación de un registro de un administrador es una acción irreversíble.</span> </br>
           <span> ¿Desea eliminar el registro <span class="font-weight-bold"> ${this.oItem.sFolio} </span> del administrador <span class="font-weight-bold"> ${this.oItem.sName} </span> de forma permanente? </span>`,
          bDoubleConfirm: false,
          sDoubleConfirm: `<span>Acepto la responsabilidad y deseo proseguir con la eliminación de: </span> </br> <span class="font-weight-bold"> ${this.oItem.sName} </span>`,
          sNameActionBtn: "Eliminar",
          sApi: `enterprises/clients/${this.$route.params.id}`,
          iOptionApi: 0, // 0 --> Delete , 1 -> Post , 2 -> Patch Access
          oPayload: {},
          bReturn: true,
          toReturn: this.sToReturn,
          bDialogType: 0, // 0 -> Mod Double Confirm , 1 -> Mod Access Confrim
        };
      }
    },
    setDouble() {
      this.bActiveModify = true;
      this.bDouble = true;
    },
    setCloseDialog() {
      this.$emit("setCloseDialog");
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
    getInfofinalizedOrCancelled(oItem) {
      switch (oItem.BenefitStatusRecords.eStatus) {
        case "canceled":
          return {
            sLabelCommentRecord: "Motivo de cancelación:",
            sCommentRecord: oItem.BenefitStatusRecords.sComment,
            sLabelCreatedByRecord: "Cancelado por:",
            sCreatedByRecord: oItem.BenefitStatusRecords.CreatedBy
              ? `${oItem.BenefitStatusRecords.CreatedBy.sName} ${oItem.BenefitStatusRecords.CreatedBy.sLastName}`
              : "No hay información",
          };
        case "finished":
          return {
            sLabelCommentRecord: "Período de vigencia:",
            sCommentRecord: `Completo del ${this.getFormatDDMMYYYYUTC(
              oItem.tStartDate
            )} al  ${this.getFormatDDMMYYYY(oItem.tEndDate)} `,
            sLabelCreatedByRecord: "Beneficio creado por:",
            sCreatedByRecord: oItem.CreatedBy
              ? `${oItem.CreatedBy.sName} ${oItem.CreatedBy.sLastName}`
              : "No hay información",
          };

        default:
          return {
            sLabel: "5",
            sResult: "6",
          };
      }
    },

    // Metodos de Dates
    getNewDate(tDate) {
      // Crear un objeto Date a partir de la cadena ISO
      const dateStart = new Date(tDate);

      // Especificar la zona horaria desde this.sTimezoneId
      const timeZoneStart = this.sTimezoneId;

      // Comprobar si dateStart es una fecha válida
      if (!isNaN(dateStart.getTime())) {
        try {
          // Convertir la fecha a la zona horaria deseada usando moment-timezone
          const zonedDateStart = moment.tz(dateStart, timeZoneStart);

          // Obtener la hora ajustada en milisegundos
          const tDateFormatTemp = zonedDateStart.format(
            "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
          ); // Esto toma la fecha ajustada a la zona horaria correcta
          const tDateTemp = new Date(zonedDateStart.format()); // Esto toma la fecha ajustada a la zona horaria correcta

          // Formatear la fecha para la zona horaria correcta

          // return tDateFormatTemp; // Objeto Date ajustado correctamente
          return tDateTemp; // Objeto Date ajustado correctamente
        } catch (error) {
          console.error("Error al convertir la fecha:", error);
        }
      } else {
        console.error("Fecha inválida:", tDate);
      }
    },
    getFormatDDMMYYYYUTC(tDate, bHours) {
      try {
        // Crear un objeto Date a partir de la cadena ISO
        const dateStart = new Date(tDate);

        // Especificar la zona horaria desde this.sTimezoneId
        const timeZoneStart = this.sTimezoneId;

        // Comprobar si dateStart es una fecha válida
        if (!isNaN(dateStart.getTime())) {
          try {
            // Convertir la fecha a la zona horaria deseada usando moment-timezone
            const zonedDateStart = moment.tz(dateStart, timeZoneStart);

            // Obtener el día, mes, año, hora y minuto
            let sDay = zonedDateStart.date().toString().padStart(2, "0"); // Día
            let sMonth = (zonedDateStart.month() + 1)
              .toString()
              .padStart(2, "0"); // Mes (agregar 1 porque es 0-indexed)
            let sYear = zonedDateStart.year().toString(); // Año

            let sHours = zonedDateStart.hours().toString().padStart(2, "0"); // Horas
            let sMinutes = zonedDateStart.minutes().toString().padStart(2, "0"); // Minutos

            // Formatear y retornar la fecha
            return (
              `${sDay}-${sMonth}-${sYear}` +
              (bHours ? ` a las ${sHours}:${sMinutes}` : "")
            );
          } catch (error) {
            console.error("Error al convertir la fecha:", error);
          }
        } else {
          console.error("Fecha inválida:", tDate);
        }
      } catch (error) {
        console.log(error);
      }
    },
    getHoursUTC(tDate) {
      try {
        // Crear un objeto Date a partir de la cadena ISO
        const dateStart = new Date(tDate);

        // Especificar la zona horaria desde this.sTimezoneId
        const timeZoneStart = this.sTimezoneId;

        // Comprobar si dateStart es una fecha válida
        if (!isNaN(dateStart.getTime())) {
          try {
            // Convertir la fecha a la zona horaria deseada usando moment-timezone
            const zonedDateStart = moment.tz(dateStart, timeZoneStart);
            const hours = zonedDateStart.hours();
            const minutes = zonedDateStart.minutes();
            return `${hours}:${minutes}`; // Objeto Date ajustado correctamente
          } catch (error) {
            console.error("Error al convertir la fecha:", error);
          }
        } else {
          console.error("Fecha inválida:", tDate);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    bRefresh() {
      // this.getItem();
    },
    aDate() {
      if (this.aDate.length > 1) {
        // Validar el formato y la validez con moment.js
        var fechaMoment = moment(
          this.aDate[0],
          "ddd MMM DD YYYY HH:mm:ss [GMT]Z (hora estándar central)",
          true
        );
        if (fechaMoment.isValid()) {
          this.sDate = `${this.getFormatDDMMYYYY(
            this.aDate[0],
            false
          )} ~ ${this.getFormatDDMMYYYY(
            this.aDate[1],
            false
          )} de ${this.getHours(this.aDate[0])} a ${this.getHours(
            this.aDate[1]
          )}`;
        }
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
    tStartDate(sNew, sOld) {
      if (this.tStartDate) {
        this.tStartDateFormat = this.getFormatDDMMYYYYUTC(
          this.tStartDate,
          false
        );
      } else {
        this.tEndDate = null;
        this.tEndDateFormat = null;
      }
    },
    tStartDateFormat(sNew, sOld) {
      if (!sNew) {
        this.tEndDate = null;
        this.tEndDateFormat = null;
        this.tStartDate = null;
      }
    },
    tEndDate() {
      if (this.tEndDate) {
        this.tEndDateFormat = this.getFormatDDMMYYYYUTC(this.tEndDate, false);
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
        if (sOld) {
          this.tEndTime = sNew;
        }
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
  },
};
</script>
<style scoped>
.content-img-general {
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
}
.content-img-lightning-all {
  display: flex;
  gap: 20px;
  min-width: 600px;
  padding-right: 20px;
}
/* #region content imagen */
.content-img-all {
  height: 100%;
  position: relative;
}
.content-icon-all {
  background-color: var(--global-color-yellow-primary);
  width: 50px;
  height: 30px;
  font-size: 1.2rem;
}

.content-reservation-all {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: var(--global-color-black);
  border: solid 1px var(--global-color-white);
  z-index: 1;
  left: 70px;
  top: 10px;
  width: 50px;
  height: 30px;
  font-size: 1.2rem;
  border-radius: 20px;
  padding: 3px;
}
.icon-reservation {
  color: var(--global-color-white);
  font-size: 1.4rem;
}
.icon-info-general {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 3;
}
.status-info-general {
  position: absolute;
  right: 5px;
  top: 10px;
  z-index: 3;
}
.content-actions-detail {
  padding: 20px 18px;
}
.content-form-name-description-lightning-all {
  width: 100% !important;
}
/* #endregion content imagen */

/* #region content general */
.content-general-info {
  width: 100%;
}
.text-disabled-benefit {
  background-color: var(--global-color-txt-field-diabled-grey) !important;
  border-radius: 10px;
}
.content-stock-text-field {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  height: 80px;
}
.content-field-stock {
  width: 150px;
}
.content-quantity-people-available-days {
  display: flex;
  justify-content: space-between;
}
.content-dashboard-general {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 15px 0px 0px 0px;
  padding: 15px 0px 0px 0px;
  border-top: 1px solid var(--global-color-grey);
}
/* #endregion content general */

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }
  .content-img-general {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  .content-img-all {
    height: 100%;
    width: 450px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  }
  .content-form-name-description-all {
    width: 100%;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .content-img-general {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  .content-img-all {
    height: 100%;
    width: 450px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-self: center;
    flex-direction: column;
  }
  .content-form-name-description-all {
    width: 100%;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
