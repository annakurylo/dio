<script setup>
import VueApexCharts from 'vue3-apexcharts'
import {ref, watch} from "vue";

const selectedRoom = ref('Вітальні')


let series = ref([{
  name: 'Yearly Temperature',
  data: [20, 21, 22, 22, 23, 22]
}])




const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


const generateRandomData = (length, min, max) => {
  return Array.from({ length }, () => getRandomNumber(min, max))
}


const handleSelectionChange = () => {
  const randomData = generateRandomData(6, 19, 26)


  series.value = [{
    name: 'Yearly Temperature',
    data: [...randomData] // Создаем копию массива
  }]
}

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
        return val + "°C";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },

    xaxis: {
      categories: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер"],
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
      text: 'Річна температура, 2024',
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
            Температурна статистика у {{selectedRoom}}
          </span>
          <v-spacer />
          <VSelect
            v-model="selectedRoom"
            style="width: 100px; max-width:100px"
            label="Кімнати"
            height="30"
            hide-details
            :items="['Вітальня', 'Кухня', 'Спальня', 'Ванна кімната']"
            variant="underlined"
            @update:modelValue="handleSelectionChange"
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
