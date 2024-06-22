<template>
    <v-skeleton-loader class="mx-auto" type="table-tbody" :types="{ 'table-tbody': 'table-row-divider@5' , 'table-row': 'table-cell@2' }" />
</template>
<script>
export default {

    data() {
        return {

        }
    }
}
</script>
<style scoped>
.content-table-permissions-global {}

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