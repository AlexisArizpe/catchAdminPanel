<template>
  <div class="content-abacus-filter-menu">
    <!-- open-on-hover -->
    <v-menu
      v-model="bMenu"
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="btn-search-filter"
          variant="outlined"
          color="primary"
          v-bind="props"
        >
          <span class="mdi mdi-tune icon-search-filter"></span>
        </v-btn>
      </template>

      <div class="content-menu-filter-all">
        
        <!-- #region Estatus -->
        <!-- <div class="content-menu-filter">
          <p class="txt-abacus-filter-menu">Estatus</p>
          <div
            v-for="(item, i) in aStatus"
            :key="item.sName"
            class="content-menu-filter-checkbox"
          >
            <v-checkbox
              class="checkbox"
              color="greenprimary"
              v-model="sStatus"
              :value="item.sValue"
              density="comfortable"
              hide-details
            >
              <template v-slot:label>
                <span class="txt-checkbox-abacus-filter-menu">{{
                  item.sName
                }}</span>
              </template>
            </v-checkbox>
          </div>
        </div> -->
        <!-- #endregion Estatus -->

        <!-- #region Alfabeticamente -->
        <div class="content-menu-filter">
          <p class="txt-abacus-filter-menu">Alfabeticamente</p>
          <div
            v-for="(item, i) in aAlphabetically"
            :key="item.sName"
            class="content-menu-filter-checkbox"
          >
            <v-checkbox
              class="checkbox"
              color="greenprimary"
              v-model="sAlphabetically"
              :value="item.sValue"
              density="comfortable"
              hide-details
            >
              <template v-slot:label>
                <span class="txt-checkbox-abacus-filter-menu">{{
                  item.sName
                }}</span>
              </template>
            </v-checkbox>
          </div>
        </div>
        <!-- #endregion Alfabeticamente -->

        <!-- #region Fecha de ingreso -->
        <div class="content-menu-filter">
          <p class="txt-abacus-filter-menu">Fecha de ingreso</p>
          <div
            v-for="(item, i) in aDateAdmission"
            :key="item.sName"
            class="content-menu-filter-checkbox"
          >
            <v-checkbox
              class="checkbox"
              color="greenprimary"
              v-model="sDateAdmission"
              :value="item.sValue"
              density="comfortable"
              hide-details
            >
              <template v-slot:label>
                <span class="txt-checkbox-abacus-filter-menu">{{
                  item.sName
                }}</span>
              </template>
            </v-checkbox>
          </div>
        </div>
        <!-- #endregion Fecha de ingreso -->

      </div>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bMenu:false,

      // #region status //
      sStatus: "",
      aStatus: [
        {
          sName: "Procesado",
          sValue: 1,
        },
        {
          sName: "No procesado",
          sValue: 2,
        },
        {
          sName: "Borrador",
          sValue: 3,
        },
      ],
      // #endregion status //

      // #region Alphabetically //
      sAlphabetically: null,
      aAlphabetically: [
        {
          sName: "A-Z",
          sValue: 1,
        },
        {
          sName: "Z-A",
          sValue: 2,
        },

      ],
      // #endregion Alphabetically //

      // #region Date of Admission //
      sDateAdmission: null,
      aDateAdmission: [
        {
          sName: "Ascendente",
          sValue: 1,
        },
        {
          sName: "Descendente",
          sValue: 2,
        },

      ],
      // #endregion Date of Admission //
    };
  },

  watch: {
    sStatus() {
      this.$emit("setStatusAbacusFilter", this.sStatus);
    },
    sAlphabetically() {
      this.$emit("setAlphabeticallyAbacusFilter", this.sAlphabetically);
    },
    sDateAdmission() {
      this.$emit("setDateAdmissionAbacusFilter", this.sAlphabetically);
      
    }
  },
};
</script>
<style>
.btn-filter-search-global {
  text-transform: none !important;
  background: transparent !important;
  transition: 0.5s all;
  box-shadow: 0px 0px 0px 0px transparent !important;

  margin: 0px 0px 0px 0px !important;
  color: var(--global-color-grey-icon) !important;
  border: solid 1px var(--global-color-border-input-grey);

  min-width: 47px !important;
  width: 47px !important;
  height: 38px !important;
  min-height: 38px !important;
}

.btn-filter-search-global:hover {
  text-transform: none !important;
  transform: scale(1.04) !important;
  border-radius: 10px !important;
  color: var(--global-color-black) !important;
  border: solid 1px var(--global-color-black);
}

.content-menu-filter-checkbox .checkbox .vs-checkbox-con input {
  margin-left: 0px !important;
}
</style>
<style scoped>
.btn-search-filter {
  width: 46px !important;
  min-width: 46px !important;
  max-width: 46px !important;
  height: 46px !important;
  min-height: 46px !important;
  max-height: 46px !important;
}
.icon-search-filter {
  font-size: 1.3rem;
}
.content-abacus-filter-menu {
  display: flex;
  width: auto;
  align-items: center;
}

.content-menu-filter-all {
  display: flex;
  min-width: 140px;
  background-color: var(--global-color-white);
  box-shadow: 0px 3px 15px var(--global-color-box-shadow);
  border-radius: 10px;
}

.content-menu-filter {
  transition: all 0.5s;
  /* display: grid; */
  padding: 10px 15px 10px 15px;
}

.content-menu-filter:hover {
  /* display: grid; */
  padding: 10px 15px 10px 15px;
}

.txt-abacus-filter-menu {
  font-size: 14px;
  font-family: "Ubuntu Medium";
  margin-bottom: 0px;
}

.txt-checkbox-abacus-filter-menu {
  font-size: 14px;
  font-family: "Ubuntu Regular";
  margin-bottom: 0px;
}
.content-menu-filter-checkbox {
  display: flex;
  align-items: center;
  height: 33px;
  max-height: 33px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .content-abacus-filter-menu {
    display: flex;
    width: auto;
    align-items: center;
  }

  .content-menu-filter-all {
    display: grid;
    min-width: 250px;
    background-color: var(--global-color-white);
  }

  .content-menu-filter-checkbox {
    display: flex;
    align-items: center;
    height: 50px;
    max-height: 50px;
  }
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
  .demoColorResponsive {
    background-color: rgb(201, 122, 83);
  }
}

/*#endregion MD */

/*#region LG */
@media (min-width: 1264px) and (max-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(204, 198, 109);
  }
}

/*#endregion LG */

/*#region XL */
@media (min-width: 1904px) {
  .demoColorResponsive {
    background-color: rgb(113, 199, 201);
  }
}

/*#endregion XL */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
