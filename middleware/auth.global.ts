import { useUserStore } from '@/store/user'
import { usePermissionsStore } from '@/store/permissions'
import { useMenuStore } from '@/store/menu'

export default defineNuxtRouteMiddleware(async (to, from) => {
  var sRouteName = to.name;
  console.log(sRouteName)
  const bAuth = useUserStore().bAuth;
  const sToken = useUserStore().sToken;
  const bSuperAdmin = useUserStore().bSuperAdmin;
  //Verifica si esta auhtorizado para entrar al panel
  if (bAuth) {
    // Si es super admin, puede entrar a los modulos que sea, menos al login y recovery-pass ya que se encuentra con session activa
    let oResult = await usePermissionsStore().getPermissionsGlobal(sToken);
    let sCreatedBy = oResult.user?.Administrator?.CreatedBy;
    useUserStore().setSuperAdmin(sCreatedBy === null ? true : false);
    if (bSuperAdmin) {
      usePermissionsStore().setActionPermission(undefined);
      if (sRouteName === undefined || sRouteName === 'index' || sRouteName === 'login' || sRouteName === 'password-recovery') {
        return navigateTo('/admin/dashboard')
      }
    } else {
      //Si no es super admin, verifica los modulos que puede navegar e igual no podra navegar en login ni recovery pass
      const aMenuFilter = await useMenuStore().getMenuFilterGlobal(sToken);
      const aMenuGlobal = useMenuStore().aMenuGlobal;
      for (const oItem of aMenuGlobal) {
        for (const oItemRoute of oItem.aRouters) {
          if (oItemRoute === to.name) {
            usePermissionsStore().setActionPermission(oItem.sActions);
          }
        }
      }
      if (sRouteName === undefined || sRouteName === 'index' || sRouteName === 'login' || sRouteName === 'password-recovery') {
        return navigateTo(`/admin/${aMenuFilter[0].sRouteName}`)
      }

      //Verifica si a donde ira tiene acceso y en caso de no tener, te manda a la primera modulo que si tiene acceso 
      let sPath = to.name?.toString().split('-').slice(0, 2).join('-');

      let bHasPermision = aMenuFilter.find(e => e.sRoute === sPath)?.sRouteName
      if (sRouteName != 'establishment-form-token-id' && sRouteName != 'admission-form') {
        if (bHasPermision === undefined) {
          return navigateTo(`/admin/${aMenuFilter[0].sRouteName}`)
        }
      }

    }
  } else {
    if (sRouteName === undefined || sRouteName === 'index' || sRouteName !== 'login' && sRouteName !== 'password-recovery' && sRouteName !== 'reset-password-token-type' && sRouteName !== 'signup' && sRouteName !== 'admission-form' && sRouteName !== 'establishment-form-token-id') {
      return navigateTo('/login')
    }
  }

})