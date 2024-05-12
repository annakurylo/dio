<script setup>
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import AnalyticsOrderStatistics from '@/views/dashboard/AnalyticsOrderStatistics.vue'
import AnalyticsProfitReport from '@/views/dashboard/AnalyticsProfitReport.vue'
import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'
import living_room from "@images/cards/living_room.png"
import kitchen from "@images/cards/kitchen.png"
import bedroom from "@images/cards/bed.png"
import bathroom from "@images/cards/bathtub.png"
import HUMIDITY_DATA from './../const/humidity.json'

import { onMounted, ref } from "vue"

const currentAverageHumidity = ref(null)
const lastValuesOfRooms = ref([])
const notifications = ref([])


const kitchenHumidity = computed(() => HUMIDITY_DATA.kitchen_humidity)
const bedroomHumidity = computed(() => HUMIDITY_DATA.bedroom_humidity)
const livingRoomHumidity = computed(() => HUMIDITY_DATA.living_room_humidity)
const bathroomHumidity = computed(() => HUMIDITY_DATA.bathroom_humidity)

const lastValueOfLivingRoom = computed(() => lastValuesOfRooms.value.find(room => room?.room === "living_room")?.value?.value)
const lastValueOfBathroom = computed(() => lastValuesOfRooms.value.find(room => room?.room === "bathroom")?.value?.value)
const lastValueOfKitchen = computed(() => lastValuesOfRooms.value.find(room => room?.room === "kitchen")?.value?.value)
const lastValueOfBedroom = computed(() => lastValuesOfRooms.value.find(room => room?.room === "bedroom")?.value?.value)

watch(lastValueOfLivingRoom, (newValue, oldValue) => {
  checkHumidityRange(newValue, 'Living Room')
})

watch(lastValueOfBathroom, (newValue, oldValue) => {
  checkHumidityRange(newValue, 'Bathroom')
})

watch(lastValueOfKitchen, (newValue, oldValue) => {
  checkHumidityRange(newValue, 'Kitchen')
})

watch(lastValueOfBedroom, (newValue, oldValue) => {
  checkHumidityRange(newValue, 'Bedroom')
})

// Function to check humidity range and push notifications
function checkHumidityRange(value, room) {
  if (value < 30) {
    notifications.value.push({
      room: room,
      notification: `Humidify the ${room}`,
      value: value,
      color: 'text-error'
    })
  } else if (value > 60) {
    notifications.value.push({
      room: room,
      notification: `Dry the ${room}`,
      value: value,
      color: 'text-blue'
    })
  }
}

function compareMeasurements(a, b) {
  const dateA = new Date(`${a.calendar_date}T${a.measurement_time}`)
  const dateB = new Date(`${b.calendar_date}T${b.measurement_time}`)

  return dateA - dateB
}

function getLastValuesOfCertainRoom (room) {
  return room.value.sort(compareMeasurements).at(-1)
}

onMounted(() => {
  lastValuesOfRooms.value.push({ room: 'kitchen', value: getLastValuesOfCertainRoom(kitchenHumidity) })
  lastValuesOfRooms.value.push({ room: 'living_room', value: getLastValuesOfCertainRoom(livingRoomHumidity) })
  lastValuesOfRooms.value.push({ room: 'bedroom', value: getLastValuesOfCertainRoom(bedroomHumidity) })
  lastValuesOfRooms.value.push({ room: 'bathroom', value: getLastValuesOfCertainRoom(bathroomHumidity) })

  currentAverageHumidity.value = lastValuesOfRooms.value.reduce((acc, number) => acc + number.value.value, 0) / lastValuesOfRooms.value.length
})

// 👉 Images
</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsCongratulations v-bind="{averageHumidity: currentAverageHumidity}" />
    </VCol>

    <VCol
      cols="12"
      sm="4"
    >
      <VRow>
        <VCol
          cols="12"
          md="6"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Living room',
              image: living_room,
              humidity: lastValueOfLivingRoom,
            }"
          />
        </VCol>

        <VCol
          cols="12"
          md="6"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Kitchen',
              image: kitchen,
              humidity: lastValueOfKitchen,
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    
    <VCol
      cols="12"
      md="8"
      order="2"
      order-md="1"
    >
      <AnalyticsTotalRevenue />
    </VCol>
    <VCol
      cols="12"
      sm="8"
      md="4"
      order="1"
      order-md="2"
    >
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical
            v-bind=" {
              title: 'Bedroom',
              image: bedroom,
              humidity: lastValueOfBedroom,
            }"
          />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardStatisticsVertical
            v-bind="{
              title: 'Bathroom',
              image: bathroom,
              humidity: lastValueOfBathroom
            }"
          />
        </VCol>
      </VRow>

      <VRow>
        <!-- 👉 Profit Report -->
        <VCol
          cols="12"
          sm="12"
        >
          <AnalyticsProfitReport :notifications="notifications"/>
        </VCol>
      </VRow>
    </VCol>
    
<!--    <VCol-->
<!--      cols="12"-->
<!--      sm="8"-->
<!--      md="4"-->
<!--      order="1"-->
<!--      order-md="2"-->
<!--    >-->
<!--      <VRow>-->
<!--        &lt;!&ndash; 👉 Profit Report &ndash;&gt;-->
<!--        <VCol-->
<!--          cols="12"-->
<!--          sm="12"-->
<!--        >-->
<!--          <AnalyticsProfitReport />-->
<!--        </VCol>-->
<!--      </VRow>-->
<!--    </VCol>-->

    <!-- 👉 Order Statistics -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsOrderStatistics />
    </VCol>

    <!-- 👉 Tabs chart -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsFinanceTabs />
    </VCol>

    <!-- 👉 Transactions -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <AnalyticsTransactions />
    </VCol>
  </VRow>
</template>
