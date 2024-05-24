<script setup>
import { useTheme } from 'vuetify'
import { onMounted, ref, defineProps } from "vue"

const props = defineProps({
  averageHumidity: {
    type: Number,
    default: 0,
    required: false,
  },
})

const currentDate = ref('')
const currentTime = ref('')

function updateDateTime (){
  const now = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  currentDate.value = now.toLocaleDateString('en-US', options)
  currentTime.value = now.toLocaleTimeString('en-US')
};


onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
})

</script>

<template>
  <VCard class="text-center text-sm-start humidity">
    <VRow no-gutters class="humidity">
      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="1"
      >
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary card">
            Humidity <br> in the Home
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span class="average-value">
            {{ averageHumidity }} %
          </span>
        </VCardText>
      </VCol>
      <VCol
        cols="12"
        sm="4"
        order="2"
        order-sm="2"
        align-self="center"
        class="text-center"
      >
        <VCardText >{{ currentDate }} <br>{{ currentTime }}</VCardText>
      </VCol>
      <VCol
        cols="12"
        sm="4"
        order="3"
        order-sm="3"
        :class="$vuetify.display.xs ? 'image_xs' : 'image'"
      >
        <img
          src="./../../assets/images/clock.png"
          :height="$vuetify.display.xs ? '130' : '155'"
          class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  //inset-block-end: 0.5rem;
  //inset-inline-end: 1rem;
}

.card {
  overflow: visible;
}
.image{
  display: flex;
  align-items: center;
  justify-content: end;
}
.image-xs{
  display: flex;
  align-items: center;
  justify-content: center;
}
.humidity{
  height: 100%;
}
.average-value {
  font-size: 40px;
}
</style>
