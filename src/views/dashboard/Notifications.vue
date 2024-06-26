<script setup>
import VueApexCharts from 'vue3-apexcharts'
import {
  useDisplay,
  useTheme,
} from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import {defineProps, onMounted, ref} from "vue";

const vuetifyTheme = useTheme()
const display = useDisplay()

const props = defineProps({
  notifications: {
    type: Array,
    default: [],
    required: true,
  },
})

const currentNotification = ref({})

const series = [{
  data: [
    30,
    58,
    35,
    53,
    50,
    68,
  ],
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 12,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.12,
        color: currentTheme.warning,
      },
    },
    tooltip: { enabled: false },
    colors: [`rgba(${ hexToRgb(String(currentTheme.warning)) }, 1)`],
    stroke: {
      width: 4,
      curve: 'smooth',
      lineCap: 'round',
    },
    grid: {
      show: false,
      padding: {
        top: -21,
        left: -5,
        bottom: -8,
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
    responsive: [
      {
        breakpoint: display.thresholds.value.lg,
        options: {
          chart: {
            height: 151,
            width: '100%',
          },
        },
      },
      {
        breakpoint: display.thresholds.value.md,
        options: {
          chart: {
            height: 131,
            width: '100%',
          },
        },
      },
    ],
  }
})

</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between h-100">
      <div class="d-flex flex-column justify-space-between gap-y-4">
        <div>
          <h6 class="text-h6 text-no-wrap mb-1">
            Сповіщення
          </h6>
          <VChip color="warning">
            зараз
          </VChip>
        </div>
        <div>
          <div v-for="notification in notifications">
            <v-card class="pa-3 d-flex" style="width: 300px;">{{notification.notification}}
              <div class="ml-3 text-sm">
                <span class="text-info">{{notification.value}}{{notification.measure}}</span>
              </div>
            </v-card>
          </div>
        </div>
      </div>

      <div class="h-100 d-flex align-center">
        <VueApexCharts
          type="line"
          :height="100"
          :width="80"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </VCardText>
  </VCard>
</template>

<style scoped>
 .padding-custom {
padding: 1.3rem;
 }
</style>
