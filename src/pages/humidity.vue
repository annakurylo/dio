<script setup>
import AverageValueInTheHome from '@/views/dashboard/AverageValueInTheHome.vue'
import Range from '@/views/dashboard/Range.vue'
import Statistics from '@/views/dashboard/Statistics.vue'
import Notifications from '@/views/dashboard/Notifications.vue'
import Chart from '@/views/dashboard/Chart.vue'
import HumidityToday from '@/views/dashboard/HumidityToday.vue'
import living_room from "@images/cards/living_room.png"
import kitchen from "@images/cards/kitchen.png"
import bedroom from "@images/cards/bed.png"
import bathroom from "@images/cards/bathtub.png"
import HUMIDITY_DATA from './../@layouts/const/humidity.json'

import { onMounted, ref } from "vue"
import CardValueNowRoom from "@/views/dashboard/CardValueNowRoom.vue"
import CardMathAnalytics from "@/views/dashboard/CardMathAnalytics.vue"

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

// Функція перевірки діапазону вологості та push-повідомлень
function checkHumidityRange(value, room) {
  if (value < 40) {
    notifications.value.push({
      room: room,
      notification: `Зволожте ${room}`,
      value: value,
      color: 'text-error',
    })
  } else if (value > 60) {
    notifications.value.push({
      room: room,
      notification: `Висушіть ${room}`,
      value: value,
      color: 'text-blue',
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
      <AverageValueInTheHome v-bind="{averageValue: currentAverageHumidity, indicator: 'Вологість', measurement: '%'}" />
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
          <CardValueNowRoom
            v-bind="{
              title: 'Вітальня',
              image: living_room,
              value: lastValueOfLivingRoom,
              type: 'humidity'
            }"
          />
        </VCol>

        <VCol
          cols="12"
          md="6"
        >
          <CardValueNowRoom
            v-bind="{
              title: 'Кухня',
              image: kitchen,
              value: lastValueOfKitchen,
              type: 'humidity',
              measure: '%'
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <VCol
      cols="12"
      md="8"
    >
      <Chart />
    </VCol>
    <VCol
      cols="12"
      sm="4"
    >
      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <CardValueNowRoom
            v-bind=" {
              title: 'Спальня',
              image: bedroom,
              value: lastValueOfBedroom,
              type: 'humidity'
            }"
          />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardValueNowRoom
            v-bind="{
              title: 'Ванна кімната',
              image: bathroom,
              value: lastValueOfBathroom,
              type: 'humidity'
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
          <Notifications
            :notifications="[{
              room: 'Ванна кімнта',
              notification: `Висушіть ванну кімнату:`,
              value: '71',
              color: 'text-error',
              measure: '%'
            }]"
          />
        </VCol>
      </VRow>
    </VCol>
    
    <VCol
      cols="12"
      md="8"
    >
      <HumidityToday />
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
          <CardMathAnalytics
            v-bind=" {
              title: 'Максимум',
              image: living_room,
              value: '45%',
              norm: '60% >'
            }"
          />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardMathAnalytics
            v-bind="{
              title: 'Мінімум',
              image: living_room,
              value: '35%',
              norm: '40% <'
            }"
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol
          cols="12"
          sm="6"
        >
          <CardMathAnalytics
            v-bind=" {
              title: 'Медіана',
              image: living_room,
              value: '39%',
              norm: '40-60 %'
            }"
          />
        </VCol>

        <VCol
          cols="12"
          sm="6"
        >
          <CardMathAnalytics
            v-bind="{
              title: 'Розмах',
              image: living_room,
              value: '10%',
              norm: '<=20%'

            }"
          />
        </VCol>
      </VRow>
    </VCol>


    <!-- 👉 Statistics -->
    <VCol
      cols="12"
      md="6"
      sm="6"
      order="3"
    >
      <Statistics />
    </VCol>

    <!-- 👉 Tabs chart -->
    <VCol
      cols="12"
      md="6"
      sm="6"
      order="3"
    >
      <Range />
    </VCol>
  </VRow>
</template>
