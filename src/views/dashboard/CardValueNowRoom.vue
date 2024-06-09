<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
  },
  measure: {
    type: String,
  },
})

const valueLevel = computed(() => {
  if(props.type === 'temperature'){
    if (props.value < 21) {
      return 'Холодно'
    } else if (props.value > 25) {
      return 'Жарко'
    } else {
      return 'Нормально'
    }
  }
  if(props.type === 'humidity'){
    if (props.value < 40) {
      return 'Сухо'
    } else if (props.value > 60) {
      return 'Волого'
    } else {
      return 'Норма'
    }
  }
  if(props.type === 'ionization'){
    if (props.value < 1500) {
      return 'Недоіонізований'
    } else if (props.value > 3000) {
      return 'Надмірно іонізований'
    } else {
      return 'Норма'
    }
  }
  if(props.type === 'water' && props.value){
    if (props.value < 6.5) {
      return 'Погана якість води'
    } else if (props.value > 8.5) {
      return 'Погана якість води'
    } else {
      return 'Норма'
    }
  }
  if(props.type === 'dust'){
    if (props.value > 12) {
      return 'Небезпека'
    } else {
      return 'Норма'
    }
  }
  if(props.type === 'water' && !props.value){
    return "-"
  }
  if(props.type === 'co2'){
    if (props.value < 400) {
      return 'Мінімально'
    } else if (props.value > 600) {
      return 'Високо'
    } else {
      return 'Норма'
    }
  }

})


const textClass = computed(() => {
  if(props.type === 'temperature'){
    if(valueLevel.value === 'Нормально') return 'text-success'
    else if(valueLevel.value ==='Жарко') return 'text-error'
    else return 'text-blue'
  }
  if(props.type === 'humidity'){
    if(valueLevel.value === 'Норма') return 'text-success'
    else if(valueLevel.value ==='Сухо') return 'text-error'
    else return 'text-blue'
  }
  if(props.type === 'ionization'){
    if(valueLevel.value === 'Норма') return 'text-success'
    else if(valueLevel.value ==='Недоіонізований') return 'text-error'
    else return 'text-blue'
  }
  if(props.type === 'co2'){
    if(valueLevel.value === 'Норма') return 'text-success'
    else if(valueLevel.value ==='Мінімально') return 'text-blue'
    else return 'text-error'
  }
  if(props.type === 'dust'){
    if(valueLevel.value === 'Норма') return 'text-success'
    else return 'text-error'
  }
  if(props.type === 'water' && props.value){
    if(valueLevel.value === 'Норма') return 'text-success'
    else return 'text-error'
  }

})
</script>

<template>
  <VCard class="centered-elements">
    <VCardText class="d-flex align-center justify-center pb-4">
      <img
        width="42"
        :src="props.image"
        alt="image"
      >

      <VSpacer />

      <MoreBtn
        size="x-small"
        class="me-n3 mt-n4"
      />
    </VCardText>

    <VCardText>
      <p class="mb-1">
        {{ props.title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3">
        {{ props.value }} {{ props.measure }}
      </h5>
      <span
        :class="textClass"
        class="d-flex align-center gap-1 text-sm"
      >
        <VIcon 
          v-if="props.type === 'humidity'"
          size="18"
          icon="mdi-cloud-percent"
        />
        <VIcon
          v-if="props.type === 'temperature'"
          size="18"
          icon="mdi-thermometer"
        />
        <VIcon
          v-if="props.type === 'ionization'"
          size="18"
          icon="mdi-air-filter"
        />
        <VIcon
          v-if="props.type === 'co2'"
          size="18"
          icon="mdi-molecule-co2"
        />
        {{ valueLevel }}
      </span>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.text-blue {
  color: #2196F3;
}
</style>
