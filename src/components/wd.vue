<!-- Отображение на экране полученные данные -->

<template>
  <!-- Вывод данных по городу -->
  <div v-if="weather" class="weather-card">
    <h2>{{ $t('weatherIn', { city: weather.name }) }}</h2>
    <div class="weather-details">
      <p><b>{{ $t('currentTemp') }}</b> {{ formatTemp(weather.temp) }}°{{ unit }}</p>
      <p><b>{{ $t('minTemp') }}</b> {{ formatTemp(weather.temp_min) }}°{{ unit }}</p>
      <p><b>{{ $t('maxTemp') }}</b> {{ formatTemp(weather.temp_max) }}°{{ unit }}</p>
      <p><b>{{ $t('feelsLike') }}</b> {{ formatTemp(weather.feels_like) }}°{{ unit }}</p>
      <p><b>{{ $t('humidity') }}</b> {{ weather.humidity }}%</p>
      <p><b>{{ $t('pressure') }}</b> {{ weather.pressure }} hPa</p>
      <p><b>{{ $t('wind') }}</b> {{ weather.wind_speed }} км/ч, {{ translateWindDir(weather.wind_dir) }}</p>
      <p><b>{{ $t('weather') }}</b> {{ translateCondition(weather.condition) }}</p>
    </div>
  </div>
  <p v-else-if="errorMessage" class="text-negative">{{ $t(errorMessage) }}</p>
  <p v-else>{{ $t('enterCity') }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    weather: {
      type: Object as () => {
        name: string;
        temp: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        condition: string;
        wind_speed: number;
        wind_dir: string;
      } | null,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    unit: {
      type: String as () => 'C' | 'F',
      required: true,
    },
  },
  methods: {
    formatTemp(tempCelsius: number): number {
      if (this.unit === 'C') {
        return Math.round(tempCelsius);
      } else {
        return Math.round((tempCelsius * 9) / 5 + 32);
      }
    },
    translateWindDir(windDir: string): string {
      return this.$t(`windDirections.${windDir}`) || windDir;
    },
    translateCondition(condition: string): string {
      const normalizedCondition = condition.toLowerCase().replace(/\s+/g, '');
      return this.$t(`weatherConditions.${normalizedCondition}`) || condition;
    },
  },
});
</script>
