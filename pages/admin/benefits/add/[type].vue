<template>
  <div class="content-page-all">
    <NuxtLayout name="panel">
      <headers-header :sNameHeader="'Crear nuevo beneficio ' + sNameHeader" />

      <div class="content-general-detail-global">
        <admin-benefits-add-content :bMobile="bMobile" :bTablet="bTablet" />
      </div>
    </NuxtLayout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sToReturn: "admin-benefits",
      sNameItemDetail: "",
      aBreadcrumbsItems: [
        {
          sName: "Administradores",
          bDisabled: true,
          to: { name: "admin-administrators" },
        },
        {
          sName: "Añadir administrador",
          bDisabled: false,
          to: "",
        },
      ],
    };
  },
  computed: {
    bMobile() {
      return this.$vuetify.display.xs;
    },
    bTablet() {
      return this.$vuetify.display.sm;
    },
    sNameHeader() {
      switch (this.$route.params.type) {
        case "regular":
          return "regular";
        case "relampago":
          return "relámpago";
        default:
          return "regular";
      }
    },
  },
  beforeMount() {
    this.$store.header.setNameItemHeader("");
  },
  methods: {
    getBack() {
      this.$router.push({
        name: this.sToReturn,
      });
    },
  },
};
</script>
<style scoped>
.content-breadcrumbs-status {
  display: flex;
  align-items: center;
  padding: 0px 21px 0px 0px;
}

/*Plantilla media query css responsive*/

/*#region MODO RESPONSIVO MAQUETA */

.demoColorResponsive {
  transition: all 0.5s;
  position: absolute;
  left: 50%;
  right: 50%;
  width: 10%;
  height: 1vh;
  z-index: 99;
}

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .content-breadcrumbs-status {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 0px 21px 0px 21px;
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
