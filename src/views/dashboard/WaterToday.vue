<template>
  <VCard>
    <VRow>
      <VCol
        cols="12"
        :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
      >
        <VCardItem class="pb-0">
          <VCardTitle>
            <div class="d-flex align-end">
              Якість води сьогодні у кухні
              <VSpacer />
              <VSelect

                style="width: 100px; max-width:100px"
                label="Кімнати"
                height="30"
                hide-details
                :items="['Кухня', 'Ванна кімната']"
                variant="underlined"

              />
            </div>
          </VCardTitle>
        </VCardItem>

        <!-- Area Chart -->
        <VueApexCharts
          class="ma-3"
          type="area"
          height="300"
          width="800"
          :options="chartOptions"
          :series="series"
        />
      </VCol>
    </VRow>
  </VCard>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import VueApexCharts from 'vue3-apexcharts'

// Use Vuetify composables
const vuetifyTheme = useTheme()
const display = useDisplay()

const humidityData = [
  { indicator_id: '1', measurement_time: '00:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '3', measurement_time: '01:00', calendar_date: '2024-04-22', value: 6.9 },
  { indicator_id: '5', measurement_time: '02:00', calendar_date: '2024-04-22', value: 7.1 },
  { indicator_id: '7', measurement_time: '03:00', calendar_date: '2024-04-22', value: 7.2 },
  { indicator_id: '9', measurement_time: '04:00', calendar_date: '2024-04-22', value: 7.3 },
  { indicator_id: '11', measurement_time: '05:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '13', measurement_time: '06:00', calendar_date: '2024-04-22', value: 7.4 },
  { indicator_id: '15', measurement_time: '07:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '17', measurement_time: '08:00', calendar_date: '2024-04-22', value: 7.7 },
  { indicator_id: '19', measurement_time: '09:00', calendar_date: '2024-04-22', value: 7.8 },
  { indicator_id: '21', measurement_time: '10:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '23', measurement_time: '11:00', calendar_date: '2024-04-22', value: 7.2 },
  { indicator_id: '25', measurement_time: '12:00', calendar_date: '2024-04-22', value: 7.3 },
  { indicator_id: '27', measurement_time: '13:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '29', measurement_time: '14:00', calendar_date: '2024-04-22', value: 7.4 },
  { indicator_id: '31', measurement_time: '15:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '33', measurement_time: '16:00', calendar_date: '2024-04-22', value: 7.0 },
  { indicator_id: '35', measurement_time: '17:00', calendar_date: '2024-04-22', value: 7.5 },
  { indicator_id: '37', measurement_time: '18:00', calendar_date: '2024-04-22', value: 7.2 },
  { indicator_id: '39', measurement_time: '19:00', calendar_date: '2024-04-22', value: 7.0 }
];

const series = ref([{
  name: "Humidity",
  data: humidityData.map(dataPoint => dataPoint.value),
}])


const chartOptions = ref({
  chart: {
    type: 'area',
    height: 300,
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  labels: humidityData.map(dataPoint => dataPoint.measurement_time),
  xaxis: {
    type: 'category',
  },
  yaxis: {
    min: 0,
    max: 12,
    opposite: true,
  },
  legend: {
    horizontalAlign: 'left',
  },
})
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
