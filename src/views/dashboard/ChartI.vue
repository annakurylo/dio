<script setup>
import VueApexCharts from 'vue3-apexcharts'
import {
  useDisplay,
  useTheme,
} from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const humidityData = [2300, 2100, 1800, 3400]

const chartSeriesOfMap = [{
  data: [
    {
      x: 'Кухня',
      y: 2300,
    },
    {
      x: 'Вітальня',
      y: 2100,
    },
    {
      x: 'Ванна кімната',
      y: 1800,
    },
    {
      x: 'Спальня',
      y: 3400,
    },
  ],
}]

// Computed properties for chart options and series
const chartOptions = {
  chart: {
    type: 'pie',
    toolbar: { show: false },
    dropShadow: {
      enabled: true,
      top: 0,
      left: 0,
      blur: 3,
      opacity: 0.5,
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -10,
      }
    }
  },
  labels: ['Вітальня', 'Кухня', 'Спальня', 'Ванна кімната'],
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}

const chartSeries = humidityData

const chartOptionsOfMap = {
  legend: { show: false },
  chart: {
    toolbar: { show: false },
    parentHeightOffset: 0,
    stacked: true,
    offsetY: -15,
  },
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false,
    }
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 230,
        },
      },
    },
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 100,
          offsetX: 10,
        },
      },
    },
  ],
}
</script>

<template>
  <VCard>
    <VRow >
      <VCol
        cols="12"
        sm="7"
        xl="8"
        :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
      >
        <VCardItem class="pb-0">
          <VCardTitle>Розподіл іонізації зараз</VCardTitle>
        </VCardItem>

        <!-- bar chart -->
        <VueApexCharts
          type="pie"
          :height="336"
          :options="chartOptions"
          :series="chartSeries"
        />
      </VCol>
      <VCol
        cols="12"
        sm="5"
        xl="4"
      >
        <VCardItem class="pb-0">
          <VCardTitle>Дерево Діаграма</VCardTitle>
        </VCardItem>
        <VueApexCharts
          type="treemap"
          :height="336"
          :options="chartOptionsOfMap"
          :series="chartSeriesOfMap"
        />
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss">
#bar-chart .apexcharts-series[rel="2"] {
  transform: translateY(-10px);
}
</style>
