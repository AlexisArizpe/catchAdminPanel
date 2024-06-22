<template>
  <div class="content-progress-linear-all">
    <v-progress-linear
      indeterminate
      color="primary"
    ></v-progress-linear>
    <p class="txt-loading-table">
        Cargando Información...
    </p>
  </div>
</template>
<script>
export default {
};
</script>
<style>
.content-progress-linear-all{
  width: 100%;
}
.txt-loading-table{
    /* margin: 10px 0px !important; */
    font-size: 14px;
    text-align: center;
}
</style>
