import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', {
  state: () => ({
    bAuth: useLocalStorage<Boolean>('bAuth', false),
    sToken: useLocalStorage<string>('sToken', ""),
    sUserId: useLocalStorage<string>('sUserId', ""),
    sUserAcronym: useLocalStorage<string>('sUserAcronym', ""),
    sEstablishmentId: useLocalStorage<string>('sEstablishmentId', ""),
    sEstablishmentName: useLocalStorage<string>('sEstablishmentName', ""),
    bSuperAdmin: useLocalStorage<Boolean>('bSuperAdmin', false),
    // Global alerts
    aAlerts: [],
  }),
  actions: {
    async setLogin(sToken: string) {
      try {
        this.sToken = sToken;
        this.bAuth = true;
        return {
          message: "¡Bienvenido a Agrosyst Empresas!"
        };
      } catch (error) {
        console.error(error);
      }

    },
    async setPasswordRecovery(sEmail: string) {
      try {
        return {
          message: "Enviando correo"
        };
      } catch (error) {
        console.error(error);
      }

    },
    async setResetPassword(oItem: any) {
      try {
        return {
          message: "¡Acción realizada correctamente!"
        };
      } catch (error) {
        console.error(error);
      }

    },
    setLogout() {
      try {
        this.bAuth = false;
        this.sToken = "";
        this.sUserId = "";
        this.sUserAcronym = "";
        this.sEstablishmentId = "";
        this.bSuperAdmin = false;
        return {
          message: "Sesión cerrada"
        };
      } catch (error) {
        console.error(error);
      }
    },
    setToken(sToken: string) {
      this.sToken = sToken;
    },
    setUserId(sUserId: string) {
      this.sUserId = sUserId;
    },
    setUserAcronym(sUserAcronym: string) {
      this.sUserAcronym = sUserAcronym;
    },
    setEstablishmentId(sEstablishmentId: string) {
      this.sEstablishmentId = sEstablishmentId;
    },
    setEstablishmentName(sEstablishmentName: string) {
      this.sEstablishmentName = sEstablishmentName;
    },
    setAuth(bAuth: boolean) {
      this.bAuth = bAuth
    },
    setSuperAdmin(bSuperAdmin: boolean) {
      this.bSuperAdmin = bSuperAdmin
    }
  },
})
