<script setup lang="ts">

import { zhCN, dateZhCN } from 'naive-ui'

import { GlobalThemeOverrides } from 'naive-ui'
// import Header from './components/Header.vue'

const themeOverrides: GlobalThemeOverrides = {
  // common: {
  //   primaryColor: '#FF0054'
  // },
  // Button: {
  //   textColor: '#FF0054'
  // }
}
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-message-provider>
      <Header></Header>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
body{
  font-size: 16px;
}
</style>
