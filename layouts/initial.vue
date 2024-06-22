<template>
  <v-sheet color="backgroundPanel" class="content-all-login">
    <v-sheet color="primary" class="content-img">
      <initial-imgs />
    </v-sheet>
    <div class="content-form-initial-all">
      <div class="content-form">
        <slot></slot>
      </div>
      <!-- <core-footer-page-global></core-footer-page-global> -->
    </div>
  </v-sheet>
</template>
<script>
export default {};
</script>
<style>
.content-all-login {
  overflow: hidden;
  position: absolute;
  display: flex;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 100%;
}

.content-form-initial-all {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 75px;
  width: 45%;
  height: 100%;
}

.content-form {
  height: 100vh;
  width: 100%;
  position: relative;
}
.content-img {
  width: 55%;
}

.btn-back-initial {
  position: absolute;
  left: 9px;
  top: 50px;
  letter-spacing: 0 !important;
  font-size: 0.9rem;
  z-index: 9;
  text-transform: none !important;
  color: var(--global-color-blue-link);
}

/* #region form */
.content-form-initial-global {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 100vh;
  padding: 20px 0px;
}

.content-form-initial-title-global {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
}
.txt-initial-global {
  font-size: 1.3rem;
  font-family: "Roboto";
  font-weight: bold;
  text-align: center;
}
.txt-sub-initial-global {
  font-size: 1.2rem;
  font-family: "Roboto";
  font-weight: normal !important;
}
.content-form-initial-btns-global {
  margin-top: 30px;
  width: 100%;
}
.content-label-recover-password {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.txt-label-recover-password {
  width: 120px;
  cursor: pointer;
  color: var(--global-color-grey-text);
  font-size: 12px;
  letter-spacing: 0px;
  text-align: end;
  display: flex;
  justify-content: flex-end;
}
/* #endregion form */

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

  .content-all-login {
    display: flex;
    flex-direction: column;
  }

  .content-form-initial-all {
    width: 100%;
  }

  .content-form {
    width: 100%;
    height: calc(100vh - 300px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-img {
    width: 100vw;
    min-height: 250px;
    height: 250px;
    position: relative;
  }

  /* #region form */
  .content-form-initial-global {
    position: relative;
    width: 90%;
  }

  .content-form-initial-title-global {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 50px;
  }
  .txt-initial-global {
    font-size: 1.3rem;
    font-family: "Roboto";
    font-weight: bold;
    text-align: center;
  }
  .txt-sub-initial-global {
    font-size: 1.2rem;
    font-family: "Roboto";
    font-weight: normal !important;
  }
  .content-form-initial-btns-global {
    margin-top: 30px;
  }
  .txt-label-recover-password {
    cursor: pointer;
    color: var(--global-color-grey-text);
    font-size: 12px;
    letter-spacing: 0px;
    text-align: end;
    display: flex;
    justify-content: flex-end;
  }
  /* #endregion form */
}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
  .demoColorResponsive {
    background-color: rgb(136, 226, 151);
  }
  .content-all-login {
    display: flex;
    flex-direction: column;
  }

  .content-form-initial-all {
    width: 100%;
  }

  .content-form {
    width: 100%;
    height: calc(100vh - 300px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-img {
    width: 100vw;
    min-height: 300px;
    height: 300px;
    position: relative;
  }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
  .demoColorResponsive {
    background-color: rgb(201, 122, 83);
  }

  .content-form {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content-img {
    width: 60%;
    position: relative;
  }
}

/*#endregion MD */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>
