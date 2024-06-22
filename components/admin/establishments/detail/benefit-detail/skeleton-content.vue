<template>
  <v-card class="content-card-dialog-global">
    <div class="content-close-dialog">
      <v-skeleton-loader type="text"></v-skeleton-loader>
      <v-spacer />
      <v-btn
        class="mb-4 btn-close-dialog-global"
        variant="outlined"
        density="compact"
        icon="mdi mdi-close"
      ></v-btn>
    </div>

    <v-card-text class="content-body-detail-dialog-global">
      <div class="content-detail-all">
        <div class="content-img-general">
          <!-- #region content img  -->
          <div class="content-img-all">
            <upload-image-horizontal
              v-if="sTypeBenefit === 'regular'"
              v-model="aImg"
              :aImg="aImg"
              sMod="edit"
              sModImgUpload="Normal"
              :bActiveModify="false"
            />
            <upload-image-vertical
              v-else
              v-model="aImg"
              :aImg="aImg"
              sMod="edit"
              sModImgUpload="Normal"
              :bActiveModify="false"
            />
          </div>
          <!-- #endregion content img  -->

          <!-- #region mod view info -->
          <div class="content-general-info">
            <v-skeleton-loader type="text"></v-skeleton-loader>

            <v-skeleton-loader type="text"></v-skeleton-loader>

            <v-row>
              <!-- #region Cantidad de personas -->
              <v-col class="py-0 mt-3" cols="12" sm="6">
                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-col>
              <!-- #endregion Cantidad de personas -->

              <!-- #region Disponible los días -->
              <v-col class="py-0 mt-3" cols="12" sm="6">
                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-col>
              <!-- #endregion Disponible los días -->

              <!-- #region Periodo de vigencia -->
              <v-col class="py-0" cols="12" v-if="sTypeBenefit === 'regular'">
                <p class="txt-title-content-global font-weight-bold mb-0">
                  Período de vigencia y horario
                </p>
              </v-col>
              <v-col
                class="py-3"
                cols="12"
                sm="12"
                v-if="sTypeBenefit === 'regular'"
              >
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

              <!-- #region stock -->
              <v-col class="py-0" cols="12">
                <v-divider class="mb-4" />

                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-col>
              <!-- #endregion stock -->

              <!-- #region info finalizado o cancelado -->
              <v-col class="pt-0" cols="12" v-if="sTypeBenefit === 'relampago'">
                <v-skeleton-loader type="text"></v-skeleton-loader>
                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-col>
              <!-- #endregion info finalizado o cancelado -->
            </v-row>
          </div>
          <!-- #endregion mod view info -->
        </div>

        <!-- #region info finalizado o cancelado -->
        <div v-if="sTypeBenefit === 'regular'">
          <v-skeleton-loader type="text"></v-skeleton-loader>
          <v-skeleton-loader type="text"></v-skeleton-loader>
          <!-- </div> -->
        </div>
        <!-- #endregion info finalizado o cancelado -->

        <!-- #region dashboard -->
        <div class="content-dashboard-general">
          <div v-for="(oItem, i) in 4" :key="i" class="content-item">
            <div>
              <v-skeleton-loader type="text"></v-skeleton-loader>
            </div>
            <v-skeleton-loader type="text"></v-skeleton-loader>
          </div>
        </div>
        <!-- #endregion dashboard -->
      </div>
    </v-card-text>

    <v-card-actions v-if="false" class="content-actions-detail">
      <!-- #region Cancelar beneficio -->
      <v-skeleton-loader type="button"></v-skeleton-loader>
      <!-- #endregion Cancelar beneficio -->
      <v-spacer />

      <!-- #region btn Duplicar beneficio -->
      <v-skeleton-loader type="button"></v-skeleton-loader>

      <!-- #endregion btn Duplicar beneficio -->

      <!-- #region Editar beneficio -->
      <v-skeleton-loader type="button"></v-skeleton-loader>

      <!-- #endregion Editar beneficio -->
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    sIdBenefit: String,
    sTypeBenefit: {
      type: String,
      default: "regular",
    },
  },
  data: () => ({
    aImg: [
      {
        sId: "0",
        sUrl: null,
        // sUrl: null,
      },
    ],
    sToReturn: "admin-benefits",
  }),
};
</script>
<style scoped>
.content-img-general {
  display: flex;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
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
/* #endregion content imagen */

/* #region content general */
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
