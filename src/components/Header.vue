<script lang="ts" setup>

import { MenuOption } from "naive-ui"
import { RouteRecordRaw, RouterLink, useRouter } from "vue-router"

const router = useRouter()
const menuOptions: MenuOption[] = router.options.routes
  .filter((r: RouteRecordRaw) => r.meta?.headerMenuName)
  .map((r: RouteRecordRaw): MenuOption => ({
    key: r.name?.toString(),
    label: () => h(
      RouterLink,
      {
        to: {
          name: r.name,
        }
      },
      { default: () => r.meta?.headerMenuName }
    )
  }))

let activeKey = ref<string | undefined | null>(null)

onMounted(() => {

  router.beforeEach(to => {
    activeKey.value = to.name?.toString() || to.path.match(/\/[^\/]+/)?.[0].slice(1)
  })
})
</script>

<template>
  <header>
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
  </header>
</template>