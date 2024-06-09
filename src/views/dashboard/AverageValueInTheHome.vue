<script setup>
import { useTheme } from 'vuetify'
import { onMounted, ref, defineProps } from "vue"

const props = defineProps({
  averageValue: {
    type: Number,
    default: 0,
    required: false,
  },
  measurement: {
    type: String,
    default: '',
  },
  indicator: {
    type: String,
    default: '',
  }

})

const currentDate = ref('')
const currentTime = ref('')

function updateDateTime (){
  const now = new Date()
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  currentDate.value = now.toLocaleDateString('uk-UA', options)
  currentTime.value = now.toLocaleTimeString('uk-UA')
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
            {{props.indicator}} <br> в будинку зараз
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span class="average-value">
            {{ averageValue }} {{ measurement }}
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
        <VCardText >{{ currentDate }}</VCardText>
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
  font-size: 35px;
}
</style>
