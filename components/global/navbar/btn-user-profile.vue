<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <div class="w-s-nowrap">
        <v-btn class="btn-user-acronym" icon v-bind="props">
          <v-avatar>
            <v-img v-if="bImageKey" :src="sImg" alt="Agrosyst"></v-img>
            <span v-else class="txt-user-acronym">
              {{ sName }}
            </span>
          </v-avatar>
        </v-btn>
        <v-icon v-bind="props"> mdi mdi-menu-down </v-icon>
      </div>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, i) in aItemMenu"
        :key="item.sName"
        density="comfortable"
        :prepend-icon="item.sIcon"
        :title="item.sName"
        :value="item.sId"
        @click="setAction(item.sAction)"
      ></v-list-item>
    </v-list>
  </v-menu>
  <dialogs-user-profile-content v-model="bDialogUserProfile" />
  <dialogs-restaurant-profile-content v-model="bDialogRestaurantProfile" />
  <dialogs-change-password-content v-model="bDialogChangePassword" />
</template>
<script>
export default {
  data: () => ({
    bDialogUserProfile: false,
    bDialogRestaurantProfile: false,
    bDialogChangePassword: false,
    aItemMenu: [
      {
        sId: "1",
        sIcon: "mdi-account-outline",
        sName: "Perfil de usuario",
        sAction: "user profile",
      },
      // {
      //   sId: "2",
      //   sIcon: "mdi-home-variant-outline",
      //   sName: "Perfil de restaurante",
      //   sAction: "restaurant profile",
      // },
      {
        sId: "3",
        sIcon: "mdi mdi-swap-horizontal",
        sName: "Cambiar contraseña",
        sAction: "change password",
      },
      {
        sId: "4",
        sIcon: "mdi-logout",
        sName: "Cerrar sesión",
        sAction: "logout",
      },
    ],
    bImageKey: null,
    sImg: null,
    sName: null,
  }),
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
    // #endregion Variables de permisos

    sUserAcronym() {
      return this.$store.user.sUserAcronym.toUpperCase();
    },
    bRefresh() {
      return this.$store.table.bRefresh;
    },
  },
  async beforeMount() {
    await this.getItemUser();
  },
  methods: {
    setRoute(sRouteName) {
      this.$router.push({ name: sRouteName });
    },
    setAction(sAction) {
      switch (sAction) {
        case "user profile":
          this.setUserProfile();
          break;
        case "restaurant profile":
          this.setRestaurantProfile();
          break;
        case "change password":
          this.setChangePassword();
          break;
        case "logout":
          this.setLogout();
          break;

        default:
          break;
      }
    },
    async setLogout() {
      // this.$store.catalog.setOverlay(true);
      const config = {
          headers: {
            Authorization: `Bearer ${this.$store.user.sToken}`,
          },
        },
        payload = {};
      this.$api
        .delete(`auth/logout`, config, payload)
        .then((response) => {
          this.$store.user.setUserId("");
          this.$store.user.setEstablishmentId("");
          this.$store.user.setToken("");
          this.$store.user.setAuth(false);
          this.$swal.fire({
            title: "Sesión finalizada",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          setTimeout(() => {
            this.$router.push({ name: "login" });
            // this.$store.catalog.setOverlay(false);
          }, 1500);
        })
        .catch((error) => {
          this.$swal.fire({
            title: "¡Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          this.bLoading = false;
          // this.$store.catalog.setOverlay(false);
        });
    },
    setUserProfile() {
      this.bDialogUserProfile = !this.bDialogUserProfile;
    },
    setRestaurantProfile() {
      this.bDialogRestaurantProfile = !this.bDialogRestaurantProfile;
    },
    setChangePassword() {
      this.bDialogChangePassword = !this.bDialogChangePassword;
    },
    async getItemUser() {
      try {
        const payload = {
          headers: {
            Authorization: "Bearer " + this.$store.user.sToken,
          },
          params: {},
        };
        const oResult = await this.$api.get(
          `auth/me`,
          payload
        );

        this.setFillData(oResult.data.user);
        this.$store.table.setRefresh(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    setFillData(oItem) {
      if (oItem.sImageKey) {
        this.sImg = oItem.oImages.xlg;
        this.bImageKey = true;
      } else {
        this.sName = `${oItem.sName.substr(0, 1)}${oItem.sLastName.substr(0, 1)}`;
        this.bImageKey = false;
      }
    },
  },
  watch: {
    async bRefresh() {
      await this.getItemUser();
    },
  },
};
</script>

<style scoped>
.btn-user-acronym {
  background-color: var(--global-color-yellow-primary);
}
.txt-user-acronym {
  color: var(--global-color-black);
  font-family: "Roboto";
  font-weight: bold;
}
</style>
