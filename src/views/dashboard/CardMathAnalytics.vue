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
    type: String,
    required: false,
  },
  norm: {
    type: String,
    required: false,
  },
  humidityData: {
    type: String,
    required: false,
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
      <h5 class="text-h5 text-no-wrap mb-3 ">
        {{ props.value }}
      </h5>
      <span class="d-flex align-center gap-1 text-sm text-success">
        <VIcon
          size="18"
          icon="mdi-cloud-percent"
        />
        Норма: {{ props.norm }}
      </span>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.text-blue {
  color: #2196F3;
}
</style>
