<!-- Обработка и получение данных о погоде -->

<template>
  <q-form @submit.prevent="handleSubmit" class="search-form">
    <q-input
      v-model="city"
      :label="$t('enterCity')"
      outlined
      dense
      class="q-mb-sm"
    />
    <q-btn type="submit" :label="$t('getForecast')" color="primary" />
  </q-form>
</template>

<script setup lang="ts">
import { ref, defineEmits  } from 'vue';

const city = ref<string | number | null>(null);

const emit = defineEmits(['fetch-weather']);

const handleSubmit = () => {
  emit('fetch-weather', city.value);
};
</script>
