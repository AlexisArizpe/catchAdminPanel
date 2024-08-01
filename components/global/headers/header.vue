<template>
  <v-app-bar
    :height="120"
    color="backgroundPanel"
    class="content-global-header elevation-0"
  >
    <template v-slot:prepend>
      <div class="content-txt-header">
        <p class="txt-global-header-establishment">
          {{ sTopText ?? "Panel administrativo" }}
        </p>
        <p class="txt-global-header">{{ sNameHeader }}</p>
      </div>
    </template>

    <template v-slot:append>
      <div class="content-append-header-all">
        <div class="content-redeem-benefit-header">
          <div v-if="bShowRangeDate" class="content-date-range-text-field">
            <v-menu>
              <template v-slot:activator="{ props }">
                <div v-bind="props">
                  <v-text-field
                    v-model="sDateRangeFormat"
                    readonly
                    density="compact"
                    variant="outlined"
                    flat
                    color="primary"
                    bg-color="white"
                    label="Rango de fecha"
                    placeholder="Seleccionar rango de fecha"
                    hide-details
                    clearable
                    prepend-inner-icon="mdi mdi-calendar-range"
                    rounded="lg"
                  ></v-text-field>
                </div>
              </template>
              <v-card>
                <vue-date-picker
                  class="date-picker-global"
                  v-model="aDateRange"
                  range
                  disable-time-range-validation
                  inline
                  auto-apply
                  locale="es"
                  :enable-time-picker="false"
                  placeholder="horario"
                />
                <div class="content-btns-date-picker-global">
                  <v-btn class="btn-second-global"> Cerrar </v-btn>
                </div>
              </v-card>
            </v-menu>
          </div>
          <dialogs-redeem-benefit v-model="bDialogRedeemBenefit" />
        </div>
        <navbar-btn-user-profile />
      </div>
    </template>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    sNameHeader: String,
    sTopText: {
      type: String,
      default: null,
    },
    bBtnAdd: {
      type: Boolean,
      default: true,
    },
    sIconBtnAdd: {
      type: String,
      default: "person_add_alt_1",
    },
    sNameBtnAdd: String,
    toAdd: String,
    sTypeAdd: {
      type: String,
      default: "page",
    },
  },
  data: () => ({
    bDialogRedeemBenefit: false,
    aShowRangeDate: ["admin-dashboard"],
    aDateRange: null,
    sDateRangeFormat: null,
  }),
  emits: ["setDateRange"],
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

    sActionRecords() {
      if (this.$store.user.bSuperAdmin) {
        return null;
      } else {
        let sActionRecordsTemp = this.$store.menu.aMenuFilterGlobal.find(
          (e) => e.sId === "1ae531d7-e0e1-45b3-b36d-0dc6dbd43de5"
        );
        return sActionRecordsTemp?.sAction ?? null;
      }
    },
    bRedeemBenefit() {
      return this.$store.user.bSuperAdmin
        ? true
        : this.sActionRecords === "MANAGE" || this.sActionRecords === "WRITE"
        ? true
        : false;
    },
    // #endregion Variables de permisos

    bMobile() {
      return this.$vuetify.display.xs;
    },
    bTablet() {
      return this.$vuetify.display.sm;
    },
    sEstablishmentName() {
      return this.$store.user.sEstablishmentName;
    },
    bShowRangeDate() {
      return (
        this.aShowRangeDate.filter((e) => e === this.$route.name).length > 0
      );
    },
  },
  methods: {
    setAdd() {
      if (this.sTypeAdd === "page") {
        this.$router.push({ name: this.toAdd });
      } else {
        this.$emit("setDialogAdd");
      }
    },
    setDialogRedeemBenefit() {
      // this.$store.message.success("Holaaaa Hola");
      this.bDialogRedeemBenefit = !this.bDialogRedeemBenefit;
    },
  },
  watch: {
    aDateRange() {
      if (this.aDateRange) {
        let sStart = this.getFormatDDMMYYYY(this.aDateRange[0]);
        let sEnd = this.getFormatDDMMYYYY(this.aDateRange[1]);
        this.sDateRangeFormat = `${sStart} - ${sEnd}`;
      } else {
        this.sDateRangeFormat = null;
        this.aDateRange = null;
      }
      console.log(this.aDateRange,"aDateRange")
      this.$emit("setDateRange", this.aDateRange);
    },
    sDateRangeFormat() {
      if (this.sDateRangeFormat === null) {
        this.aDateRange = null;
      }
    },
  },
};
</script>
<style>
.content-global-header .v-toolbar__content {
  justify-content: space-between !important;
}
.content-global-header .v-toolbar__content .v-toolbar__prepend {
  margin-inline: 0px 0px !important;
  width: 100% !important;
}
.content-global-header .v-toolbar__content .v-toolbar__append {
  margin-inline: 0px 0px !important;
}
</style>
<style scoped>
.content-global-header {
  display: flex;
  align-items: center;
  /* margin-top: 15px;
  margin-bottom: 15px; */
  width: 100%;
  padding: 0px 21px;
}
.content-txt-header {
  width: 100%;
}

.txt-global-header-establishment {
  font-family: "Roboto";
  color: var(--global-color-txt-grey);
  line-height: normal;
}
.txt-global-header {
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-weight: bold;
  font-size: 2.5rem;
  width: 100%;
  letter-spacing: 0px;
  opacity: 1;
  line-height: normal;
}

.content-append-header-all {
  display: flex;
  align-items: center;
  gap: 20px;
}

.btn-redeem-benefit {
  width: 230px !important;
}

.content-date-range-text-field{
  min-width: 270px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .txt-global-header {
    display: flex;
    align-items: center;
    font-family: "Roboto";
    font-size: 1.8rem;
    width: 100%;
    line-height: 1;
    letter-spacing: 0px;
    opacity: 1;
  }

  .btn-add-header {
    height: 45px !important;
    max-height: 45px !important;
    min-height: 45px !important;
    width: 50px !important;
    max-width: 50px !important;
    min-width: 50px !important;
  }

  .btn-redeem-benefit {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    width: 50px !important;
    min-width: 50px !important;
    padding: 0px !important;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .txt-global-header {
    display: flex;
    align-items: center;
    font-family: "Roboto";
    font-weight: bold;
    font-size: 1.8rem;
    width: 100%;
    letter-spacing: 0px;
    opacity: 1;
  }
}

/*#endregion SM */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
