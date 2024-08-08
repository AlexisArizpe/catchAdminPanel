<template>
  <div class="content-imgs-login-all">
    <div class="content-txt-img-all">
      <div class="content-txt-welcome-to">
        <p class="txt-welcome-to">Bienvendio a</p>
      </div>
      <div class="content-img-catch-yellow">
        <img
          class="img-catch-yellow"
          src="/img/Catch-Logotipo-Amarillo.svg"
        />
      </div>
    </div>
    <div class="content-points-all">
      <div v-for="(oItem, i) in 6" :key="i" :class="'dots-' + i"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.content-imgs-login-all {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}
.content-txt-welcome-to {
  width: 100%;
}
.txt-welcome-to {
  font-size: 1.7rem;
  font-weight: bold;
}

.content-img-catch-yellow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 370px;
  max-width: 370px;
  min-width: 370px;
  height: 130px;
  max-height: 130px;
  min-height: 130px;
  overflow: hidden;
}
.img-catch-yellow {
  width: 600px;
  min-width: 600px;
  max-width: 600px;
}

.content-points-all {
  width: 80px;
  height: 95px;
  position: relative;
  margin-bottom: 120px;
}
.dots-0 {
  position: absolute;
  border-radius: 100%;
  left: 0px;
  top: 25%;
  width: 15px;
  height: 15px;
  background-color: var(--global-color-white);
}
.dots-1 {
  position: absolute;
  border-radius: 100%;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  background-color: var(--global-color-white);
}
.dots-2 {
  position: absolute;
  border-radius: 100%;
  right: 0px;
  top: 25%;
  width: 15px;
  height: 15px;
  background-color: var(--global-color-white);
}
.dots-3 {
  position: absolute;
  border-radius: 100%;
  top: 65%;
  width: 15px;
  height: 15px;
  background-color: var(--global-color-white);
}
.dots-4 {
  position: absolute;
  border-radius: 100%;
  right: 0px;
  top: 65%;
  width: 15px;
  height: 15px;
  background-color: var(--global-color-white);
}
.dots-5 {
  position: absolute;
  border-radius: 100%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  background-color: var(--global-color-white);
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
  .demoColorResponsive {
    background-color: rgb(190, 136, 226);
  }

  .content-imgs-login-all {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
  }
  .content-txt-welcome-to {
    width: 100%;
  }
  .txt-welcome-to {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .content-img-catch-yellow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    max-width: 250px;
    min-width: 250px;
    height: 130px;
    max-height: 130px;
    min-height: 130px;
    overflow: hidden;
  }
  .img-catch-yellow {
    width: 400px;
    min-width: 400px;
    max-width: 400px;
  }
  .content-points-all {
    width: 60px;
    height: 75px;
    position: relative;
    margin-bottom: 120px;
  }
}

/*#endregion XS */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
