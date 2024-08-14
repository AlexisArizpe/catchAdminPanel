<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <headers-header sNameHeader="Dashboard" @setDateRange="setDateRange" />
      <div class="content-general-global pb-0">
        <div class="content-center-all">
          <admin-dashboard-card-second-content
            :aItems="aItemsDash"
            :bLoadingItems="bLoadingItems"
          />
        </div>
        <div class="content-top-all pb-5">
          <admin-dashboard-card-top-10-content
            sTitle="mejor calificados"
            :aItems="aItemsMoreQualified"
            :bLoadingItems="bLoadingItems"
          />
          <admin-dashboard-doughnut-chart-content
            sTitle="activados"
            :oData="oBenefitsActivites"
            :bLoadingItems="bLoadingItems"
          />
          <admin-dashboard-doughnut-chart-content
            sTitle="canjeados"
            :oData="oBenefitsRedeem"
            :bLoadingItems="bLoadingItems"
          />
        </div>
        <div class="content-bottom-all pb-6">
          <admin-dashboard-card-top-10-content
            sTitle="más canjeados"
            :aItems="aItemsMoreRedeem"
            :bLoadingItems="bLoadingItems"
          />
          <admin-dashboard-bar-chart-content
            sTitle="Días"
            :oData="oDataBarChartDays"
            :bLoadingItems="bLoadingItems"
          />
          <admin-dashboard-bar-chart-content
            sTitle="Horarios"
            :oData="oDataBarChartHours"
            :bLoadingItems="bLoadingItems"
          />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data: () => ({
    aItemsDash: [],
    aItemsMoreQualified: [],
    aItemsMoreRedeem: [],
    oBenefitsActivites: {},
    oBenefitsRedeem: {},
    oDataBarChartDays: {
      data: [],
      label: [],
    },
    oDataBarChartHours: {
      data: [],
      label: [],
    },
    tStart: null,
    tEnd: null,
    aDateRange: null,
    bLoadingItems: true,
  }),
  async beforeMount() {
    await this.getItem();
  },
  methods: {
    async getItem() {
      try {
        this.bLoadingItems = true;
        const params = {
          tStart: this.tStart,
          tEnd: this.tEnd,
        };

        const oResult = await this.$apiFetch("dashboard", "GET", params);
        let oDashboard = oResult.dashboard;

        // #region Cards Benefits
        this.aItemsDash = [
          {
            sTitle:
              "<span>Total de <span class='font-weight-bold'>activaciones</span><span>",
            sColor: "bg-color-blue-card-global",
            sValue: Number(oDashboard.totalBenefitActivations).toFixed(2),
          },
          {
            sTitle:
              "<span><span class='font-weight-bold'>Tasas de canje</span><span>",
            sColor: "bg-color-orange-card-global",
            sValue: `${Number(oDashboard.benefitRedemptionPercentage).toFixed(
              2
            )}%`,
          },
          {
            sTitle:
              "<span><span class='font-weight-bold'>Tasa de cancelaciones</span><span>",
            sColor: "bg-color-red-card-global",
            sValue: `${Number(oDashboard.benefitCancelations).toFixed(2)}%`,
          },
          {
            sTitle:
              "<span>Tasa de <span class='font-weight-bold'>registros</span> de usuarios<span>",
            sColor: "bg-color-green-card-global",
            sValue: Number(oDashboard.registeredCustomers).toFixed(2),
          },
          {
            sTitle:
              "<span>Tasa de <span class='font-weight-bold'>abandono</span> de usuarios<span>",
            sColor: "bg-color-red-card-global",
            sValue: Number(oDashboard.deletedAccounts).toFixed(2),
          },
        ];
        // #endregion Cards Benefits

        // #region Top 10 mas calificados
        this.aItemsMoreQualified = oDashboard.bestRankedEstablishments.map(
          (e) => {
            return {
              sName: e.sName,
              sRating: e.dAverageRating ?? 0,
            };
          }
        );
        // #endregion Top 10 mas calificados

        // #region Top 10 más canjes
        this.aItemsMoreRedeem = oDashboard.mostRedemptionsEstablishments.map(
          (e) => {
            return {
              sName: e.sName,
              sRating: e.dAverageRating ?? 0,
            };
          }
        );
        // #endregion Top 10 más canjes

        // #region Promedio de beneficios activados
        this.oBenefitsActivites = {
          labels: ["Sin reserva", "Con reserva"],
          datasets: [
            {
              label: null,
              data: [
                100 -
                  oDashboard.interactionsWithReservationPercentages.activations,
                oDashboard.interactionsWithReservationPercentages.activations,
              ],
              backgroundColor: ["#E8DF00", "#7E7A00"],
              borderColor: ["#E8DF00", "#7E7A00"],
              borderWidth: 1,
            },
          ],
        };
        // #endregion Promedio de beneficios activados

        // #region Promedio de beneficios canjeados
        this.oBenefitsRedeem = {
          labels: ["Sin reserva", "Con reserva"],
          datasets: [
            {
              label: null,
              data: [
                100 -
                  oDashboard.interactionsWithReservationPercentages.redemptions,
                oDashboard.interactionsWithReservationPercentages.redemptions,
              ],
              backgroundColor: ["#E8DF00", "#7E7A00"],
              borderColor: ["#E8DF00", "#7E7A00"],
              borderWidth: 1,
            },
          ],
        };
        // #endregion Promedio de beneficios canjeados

        // #region Dias con mayor activación
        const aBenefitsActivationDailyActivityData = [];
        const aBenefitsActivationDailyActivityLabel = [];
        for (const [key, value] of Object.entries(
          oDashboard.benefitsActivationDailyActivity
        )) {
          if (value > 0) {
            aBenefitsActivationDailyActivityData.push(value);
            aBenefitsActivationDailyActivityLabel.push(
              this.getNameDaysGlobal(key)
            );
          }
        }

        this.oDataBarChartDays.label = aBenefitsActivationDailyActivityLabel;
        this.oDataBarChartDays.data = aBenefitsActivationDailyActivityData.map(
          (e) => {
            return Number(e);
          }
        );
        // #endregion Dias con mayor activación

        // #region Horarios con mayor activación
        const aBenefitsActivationActivityData = [];
        const aBenefitsActivationActivityLabel = [];
        for (const [key, value] of Object.entries(
          oDashboard.benefitsActivationActivity
        )) {
          if (value > 0) {
            aBenefitsActivationActivityData.push(value);
            aBenefitsActivationActivityLabel.push(key.replace("_", " a "));
          }
        }

        this.oDataBarChartHours.label = aBenefitsActivationActivityLabel;
        this.oDataBarChartHours.data = aBenefitsActivationActivityData.map(
          (e) => {
            return Number(e);
          }
        );
        // #endregion Horarios con mayor activación

        this.bLoadingItems = false;
        this.$store.table.setRefresh(false);
      } catch (error) {
        this.bLoadingItems = false;
        console.log(error);
      }
    },
    async setDateRange(aDateRange) {
      if (aDateRange) {
        this.tStart = this.getFormatYYYYMMDD(
          this.getFormatDDMMYYYY(new Date(aDateRange[0]))
        );
        this.tEnd = this.getFormatYYYYMMDD(
          this.getFormatDDMMYYYY(new Date(aDateRange[1]))
        );
      } else {
        this.tStart = null;
        this.tEnd = null;
      }

      await this.getItem();
    },
  },
};
</script>
<style scoped>
.content-top-all {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}
.content-bottom-all {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}
</style>
