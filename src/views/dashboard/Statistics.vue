<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const series = [{
  name: 'Yearly Humidity',
  data: [40, 42, 45, 39, 43]
}]

const chartOptions = computed(() => {
  return {
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },

    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }

    },
    title: {
      text: 'Yearly Humidity, 2024',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  }
})

</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <v-card-title>
        <div class="d-flex align-end">
          <span class="text mb-1 w-25">
            Humidity statistics in the Living Room
          </span>
          <v-spacer />
          <VSelect
            style="width: 100px; max-width:100px"
            label="Rooms"
            height="30"
            hide-details
            :items="['Living Room', 'Kitchen', 'Bedroom', 'Bathroom']"
            variant="underlined"
          />
        </div>
      </v-card-title>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        class="ma-3"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"
      />
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
