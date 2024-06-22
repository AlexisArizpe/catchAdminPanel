<template>
  <div class="content-global-table py-0">
    <v-table class="global-table">
      <thead>
        <tr>
          <th
            :class="'text-' + oItem.align + ' ' + oItem.sClass"
            v-for="(oItem, i) in aHeaderAssignedAreas"
            :key="oItem.sText"
          >
            {{ oItem.sText }}
            <span v-if="oItem.bTooltip" class="mdi mdi-information-variant-circle icon-information">
            </span>
            <v-tooltip v-if="oItem.bTooltip" activator="parent" location="top">Ver, Editar y Eliminar</v-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(oItem, i) in aPermissionsEdit" :key="oItem.sName">
          <td
            v-for="(oItemHeader, ii) in aHeaderAssignedAreas"
            :key="oItemHeader.sValue"
            :class="oItemHeader.sCellClass"
          >
            <span
              v-if="
                oItemHeader.sValue !== 'bShow' &&
                oItemHeader.sValue !== 'bWrite' &&
                oItemHeader.sValue !== 'bManage'
              "
            >
              {{ oItem[oItemHeader.sValue] }}
            </span>
            <div
              v-else-if="
                oItemHeader.sValue === 'bShow' ||
                oItemHeader.sValue === 'bWrite' ||
                oItemHeader.sValue === 'bManage'
              "
            >
              <v-switch
                :disabled="!bActiveModify"
                @change="setValidateCheck(oItemHeader, oItem)"
                class="d-flex justify-center"
                v-model="oItem[oItemHeader.sValue]"
                color="primary"
                inset
                hide-details
              ></v-switch>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    bAddOrEdit: Boolean, //True is add - False is edit
    bActiveModify: Boolean,
    aPermissions: Array,
    bTypePermissions: {
      type: Number,
      default: 0,
    },
    bPermissionsAdmin: Boolean,
  },
  data() {
    return {
      aHeaderAssignedAreas: [
        {
          sortable: false,
          sText: "Nombre de módulo",
          sValue: "sName",
          bTooltip: false,
          sClass: "global-header-table",
          sCellClass: "global-body-table",
        },
        {
          sortable: false,
          sText: "Ver",
          sValue: "bShow",
          bTooltip: false,
          align: "center",
          sClass: "global-header-table w-70px",
          sCellClass: "global-body-table w-70px",
        },
        {
          sortable: false,
          sText: "Ver y Editar",
          sValue: "bWrite",
          bTooltip: false,
          align: "center",
          sClass: "global-header-table w-100px w-s-nowrap",
          sCellClass: "global-body-table w-70px",
        },
        {
          sortable: false,
          sText: "Administrar",
          sValue: "bManage",
          bTooltip: true,
          align: "center",
          sClass: "global-header-table w-130px w-s-nowrap",
          sCellClass: "global-body-table w-130px",
        },
      ],
      aPermissionsEdit: [],
    };
  },
  emits: ["update:modelValue"],

  async beforeMount() {
    await this.getModules();
  },
  methods: {
    // #region Permissions Admin and Show
    setValidateCheck(oItemHeader, oItem) {
      switch (oItemHeader.sValue) {
        case "bWrite":
          oItem.bShow = false;
          oItem.bManage = false;
          this.$emit("update:modelValue", this.aPermissionsEdit);
          break;
        case "bShow":
          oItem.bWrite = false;
          oItem.bManage = false;
          this.$emit("update:modelValue", this.aPermissionsEdit);
          break;
        case "bManage":
          oItem.bShow = false;
          oItem.bWrite = false;
          this.$emit("update:modelValue", this.aPermissionsEdit);
          break;

        default:
          break;
      }
    },
    // #endregion Permissions Admin and Show

    //#region Get all modules
    async getModules() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(`administrators/modules`, payload);
        this.aPermissionsEdit = oResult.data.modules.map((e) => {
          return {
            sId: e.sModuleId,
            sName: e.sName,
            bShow: false,
            bWrite: false,
            bManage: false,
          };
        });
        if (this.bAddOrEdit) {
          this.$emit("update:modelValue", this.aPermissionsEdit);
        }
        this.getMatchModules();
      } catch (error) {
        console.log(error);
      }
    },
    getMatchModules() {
      //Si bAddOrEdit es falso entra a condición, para hacer switch
      if (!this.bAddOrEdit) {
        for (const i in this.aPermissionsEdit) {
          if (Object.hasOwnProperty.call(this.aPermissionsEdit, i)) {
            const element = this.aPermissionsEdit[i];
            if (this.aPermissions.find((e) => e.sId === element.sId)) {
              if (this.aPermissions.find((e) => e.sId === element.sId).bShow) {
                element.bShow = true;
              }

              if (this.aPermissions.find((e) => e.sId === element.sId).bWrite) {
                element.bWrite = true;
              }

              if (
                this.aPermissions.find((e) => e.sId === element.sId).bManage
              ) {
                element.bManage = true;
              }
            }
          }
        }
      }
    },
    //#endregion Get all modules
  },
  computed: {
    aPermissionsOrigin() {
      return this.$store.state.permissions.aPermissionsOrigin;
    },
  },
  watch: {
    async bActiveModify() {
      await this.getModules();
    },
    aPermissions: {
      deep: true, // Observar cambios profundos en el arreglo
      async handler(newVal, oldVal) {
        await this.getModules();
      },
    },
  },
};
</script>
<style scoped>
.content-table-permissions-global {
}

.col-name-table-global {
  min-width: 10% !important;
  width: 100% !important;
}

.col-permissions-table-global {
  width: auto !important;
  min-width: 100px;
}

.switch-permission-global {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 50px;
  height: 25px;
}

.icon-check-permission-global {
  font-size: 20px;
  color: var(--global-color-green) !important;
}

.icon-close-permission-global {
  font-size: 20px;
  color: var(--global-color-red) !important;
}
.icon-information{
  font-size: 1rem;
  color: #184eff;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
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
