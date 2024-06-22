<template>
  <v-navigation-drawer
    app
    v-model="bDrawer"
    :rail="bRailEdit"
    :permanent="bPermanent"
    :temporary="bTemporary"
    :width="200"
  >
    <!-- #region Logo de empresa en sidebar -->
    <div class="content-logo-catch">
      <img
        class="img-logo-catch"
        src="/img/Catch_Logotipo_RGB_Positivo_RGB.svg"
      />
    </div>
    <!-- #endregion Logo de empresa en sidebar -->

    <div class="content-list-sidebar-all">
      <div
        class="item-sidebar-all"
        v-for="(oItem, i) in aMenuGlobal"
        :key="i"
        @click="setRoute(oItem)"
      >
        <div class="content-bg-item-icon">
          <div
            class="content-icon-sidebar-all spin circle"
            :class="
              getSelectedItem(oItem) ? 'content-icon-sidebar-selected' : ''
            "
          >
            <div class="content-icon-sidebar">
              <span :class="oItem.sIcon" class="icon-item-sidebar"> </span>
            </div>
          </div>
        </div>
        <p
          class="txt-item-sidebar"
          :class="getSelectedItem(oItem) ? 'font-weight-bold' : ''"
        >
          {{ oItem.sName }}
        </p>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    bRail: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    aMenu: [],
    bDrawer: true,
    bRailEdit: false,
    bPermanent: true,
    bTemporary: false,
    sOpenListGrop: [],
    mini: false,
  }),
  computed: {

    aMenuGlobal() {
      return this.$store.user.bSuperAdmin
        ? this.$store.menu.aMenuGlobal
        : this.$store.menu.aMenuFilterGlobal;
    },
    bMobile() {
      return this.$vuetify.display.xs;
    },
    bTablet() {
      return this.$vuetify.display.sm;
    },
    // sOpenListGrop() {
    //   return this.setItemGroupSelected();
    // },
  },
  beforeMount() {
    this.setModSidebar();
    this.setItemGroupSelected();
  },
  mounted() {
    document.addEventListener("click", this.setCloseDrawer);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.setCloseDrawer);
  },
  methods: {
    setRoute(oItem) {
      try {
        let sRouteTemp = `/admin/${oItem.sRouteName}`;
        this.$router.push({ name: oItem.sRoute });
        // this.$router.push(sRouteTemp);
      } catch (error) {}
    },
    getSelectedItem(oItem) {
      let bln = false;
      if (oItem.aRouters !== undefined) {
        for (let i = 0; i < oItem.aRouters.length; i++) {
          if (this.$route.name == oItem.aRouters[i]) {
            bln = true;
            break;
          }
        }
      }
      return bln;
    },
    setModSidebar(bDrawer) {
      if (this.bMobile || this.bTablet) {
        this.bRailEdit = false;
        this.bDrawer = bDrawer;
        this.bPermanent = false;
        this.bTemporary = false;
      } else {
        this.bRailEdit = this.bRail;
        this.bDrawer = true;
        this.bPermanent = true;
        this.bTemporary = true;
      }
    },
    setCloseDrawer() {
      if (this.bMobile || this.bTablet) {
        this.$emit("setCloseDrawer");
      }
    },
    setExpandGroup(oItem) {
      oItem.bExpends = !oItem.bExpends;
    },
    setItemGroupSelected(sRoute) {
      // Recorre el menu para verificar si el item es group
      for (const oItem of this.aMenuGlobal) {
        // Si el bGroup es en true, entra y recorre los hijos del item
        if (oItem.bGroup) {
          for (const oItemRoute of oItem.aChildren) {
            // Recorre las rutas que estan ligadas al hijo del item
            for (const oItemRouteChildren of oItemRoute.aRouters) {
              // Si en las rutas de hijo es igual a la ruta en curso, se agrega al la variable
              // sOpenListGrop el id del id del hijo que es igual al id del padre
              if (oItemRouteChildren === this.$route.name) {
                this.sOpenListGrop = [oItemRoute.sId];
                break;
              }
            }
          }
        }
      }
    },
  },
  watch: {
    bRail() {
      this.setModSidebar(this.bRail);
    },
    bMobile() {
      this.setModSidebar();
    },
    bTablet() {
      this.setModSidebar();
    },
  },
};
</script>
<style>
.v-navigation-drawer {
  border-top-right-radius: 30px !important;
  border-bottom-right-radius: 30px !important;
  box-shadow: -3px 0px 21px 0px #00000040 !important;
}
.v-navigation-drawer--left {
  border-right-width: thin;
  border-right-color: var(--global-color-grey-border);
}
.content-logo-catch {
  height: 100px;
  overflow: hidden;
  display: flex;
  text-align: center;
  align-items: center !important;
  justify-content: center !important;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 2rem;
  margin-bottom: 0px;
}
.img-logo-catch {
  object-position: center center;
  width: 100%;
}
.content-list-sidebar-all {
  transition: all 0.5s !important;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
}
.item-sidebar-all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.content-bg-item-icon {
  border-radius: 100%;
  width: 84px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
}
.item-sidebar-all:hover .content-bg-item-icon {
  background-color: var(--global-color-black);
}
.item-sidebar-all:hover .txt-item-sidebar {
  font-weight: bold;
  cursor: pointer;
}

.content-icon-sidebar-all {
  border-radius: 100%;
  width: 80px;
  height: 80px;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  background-color: var(--global-color-grey);
}

.content-icon-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--global-color-black);
  width: 80px;
  height: 80px;
  border-radius: 100%;
}

.content-icon-sidebar-selected {
  background-color: var(--global-color-black) !important;
  color: var(--global-color-white) !important;
}
.content-icon-sidebar-selected .content-icon-sidebar {
  color: var(--global-color-white) !important;
}
.icon-item-sidebar {
  font-size: 2rem;
}
</style>
