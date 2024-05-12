<script setup>
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const { global } = useTheme()
const test = ''
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
  </VApp>
</template>
