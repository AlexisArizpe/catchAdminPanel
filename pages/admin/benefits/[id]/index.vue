<template>
  <headers-header-detail
    sNameHeaderDetail=""
    :sNameItem="sNameItemDetail"
    :sToReturn="sToReturn"
    @getBack="getBack"
    :bBtnAccess="true"
    :bBreadcrumbs="true"
    :aBreadcrumbs="aBreadcrumbs"
  />
  <div class="content-general-detail-global">
    <!-- <admin-products-detail-content /> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    sToReturn: "admin-benefits",
    sNameItemDetail: "",
    aBreadcrumbs: [
      {
        sName: "Productos",
        bDisabled: true,
        to: { name: "admin-benefits" },
      },
      {
        sName: "Detalle del producto",
        bDisabled: false,
        to: "",
      },
    ],
  }),
  methods: {
    getBack() {
      this.$router.push({
        name: this.sToReturn,
      });
    },
  },
};
</script>
