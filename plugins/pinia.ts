import { useUserStore } from '~/store/user'
import { useMenuStore } from '~/store/menu'
import { usePermissionsStore } from '~/store/permissions'
import { useTableStore } from '~/store/table'
import { useHeaderStore } from '~/store/header'
import { useMessageStore } from '~/store/message'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: {
        user: useUserStore($pinia),
        menu: useMenuStore($pinia),
        permissions: usePermissionsStore($pinia),
        table: useTableStore($pinia),
        header: useHeaderStore($pinia),
        message: useMessageStore($pinia),

      }
    }
  }
})