import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { usePermissionsStore } from '@/store/permissions'


export const useMenuStore = defineStore('menu', {
    state: () => ({
        aMenuGlobal: [

            // #region Dashboard
            {
                sId: "23848956-f197-4b39-b17a-3bfa46084202",
                sIcon: "radix-icons:dashboard",
                sName: "Dashboard",
                sActions: null,
                sRoute: "admin-dashboard",
                sRouteName: "dashboard",
                aRouters: ["admin-dashboard"],
                bGroup: false,
            },
            // #endregion Dashboard

            // #region Pagos
            {
                sId: "1a4d2c35-a282-486d-b1ef-da34f0573511",
                sIcon: "fluent:payment-32-regular",
                sName: "Pagos",
                sActions: null,
                sRoute: "admin-payments",
                sRouteName: "payments",
                aRouters: ["admin-payments"],
                bGroup: false,
            },
            // #endregion Pagos

            // #region Restaurantes
            {
                sId: "6f558dad-0fdd-43a4-9a13-1c8e04817099",
                sIcon: "ep:dish",
                sName: "Restaurantes",
                sActions: null,
                sRoute: "admin-establishments",
                sRouteName: "establishments",
                aRouters: ["admin-establishments", "admin-establishments-id"],
                bGroup: false,
            },
            // #endregion Restaurantes

            // #region Admisiones
            {
                sId: "49619324-212b-4c0d-a6aa-0d8b54d811d1",
                sIcon: "ph:git-pull-request",
                sName: "Admisiones",
                sActions: null,
                sRoute: "admin-admissions",
                sRouteName: "admissions",
                aRouters: ["admin-admissions"],
                bGroup: false,
            },
            // #endregion Admisiones

            // #region Empleados
            {
                sId: "2dc2e86c-d3ec-49cd-8c59-514bcfeaf5ec",
                sIcon: "fluent:people-team-20-regular",
                sName: "Empleados",
                sActions: null,
                sRoute: "admin-employees",
                sRouteName: "employees",
                aRouters: ["admin-employees"],
                bGroup: false,
            },
            // #endregion Empleados

            // #region Consumidores
            {
                sId: "1749065d-b3eb-4d69-b4a0-bbd3f758daaa",
                sIcon: "solar:user-broken",
                sName: "Consumidores",
                sActions: null,
                sRoute: "admin-customers",
                sRouteName: "customers",
                aRouters: ["admin-customers", "admin-customers-id"],
                bGroup: false,
            },
            // #endregion Consumidores

        ],
        aMenuFilterGlobal: useLocalStorage<Array<any>>('aMenuFilterGlobal', []),
    }),
    actions: {
        async getMenuFilterGlobal(sToken: string = '') {
            // this.aMenuFilterGlobal = []
            const oResponse = await usePermissionsStore().getPermissionsGlobal(sToken);
            const aPermissions = JSON.parse(JSON.stringify(oResponse.user.Administrator.Permissions));
            const aPermissionsFilter = JSON.parse(JSON.stringify(aPermissions)).filter((e: any) => e.eAction !== "FORBIDDEN")
            const aMenuFilter = [];
            for (const oItemMenu of this.aMenuGlobal) {
                for (const oItemPermission of aPermissionsFilter) {
                    if (oItemMenu.sId === oItemPermission.sModuleId) {
                        oItemMenu.sActions = oItemPermission.eAction
                        aMenuFilter.push(oItemMenu);
                        break;
                    }
                }
            }
            const oHome = this.aMenuGlobal.find(e => e.sId === '1');
            this.aMenuFilterGlobal = aMenuFilter;
            // this.aMenuFilterGlobal.unshift(oHome);

            return aMenuFilter
        },
    },
})