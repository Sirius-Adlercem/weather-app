<template>
  <div class="app-container">
    <h1>{{ $t('weatherForecast') }}</h1>

    <div class="toogle-theme">
      <p>{{ $t('chooseTheme') }}</p>
      <q-btn
        @click="toggleTheme"
        :label="$t(isDarkTheme ? 'lightTheme' : 'darkTheme')"
        color="primary"
      />
    </div>

    <div class="lang-switcher">
      <q-btn @click="changeLanguage('ru')" label="Русский" color="primary" />
      <q-btn @click="changeLanguage('en')" label="English" color="primary" />
    </div>

    <wf @fetch-weather="fetchWeather" />

    <div class="toogle-temp">
      <q-radio v-model="unit" val="C" :label="$t('celsius')" />
      <q-radio v-model="unit" val="F" :label="$t('fahrenheit')" />
    </div>

    <div class="weather-container">
      <wd :weather="weatherData" :errorMessage="errorMessage" :unit="unit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import wf from './components/wf.vue';
import wd from './components/wd.vue';

const { locale } = useI18n(); // Для перевода
const $q = useQuasar(); // Для стилей

const weatherData = ref<{
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
} | null>(null);

const errorMessage = ref('');
const unit = ref<'C' | 'F'>('C');
const isDarkTheme = ref(false);

const changeLanguage = (lang: string) => {
  locale.value = lang;
};

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  $q.dark.set(isDarkTheme.value);
};

onMounted(() => {
  $q.dark.set(isDarkTheme.value);
});

const fetchWeather = async (city: string) => { // получение данных о погоде
  const apiKey = '5abe788fca4e457d95f174659252102'; // API ключ
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error?.code === 1006) { // Код "Город не найден"
        errorMessage.value = 'cityNotFound';
      } else {
        throw new Error(errorData.error?.message || 'Ошибка при получении данных');
      }
    } else {
      const data = await response.json();
      weatherData.value = processWeatherData(data);
      errorMessage.value = '';
    }
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    weatherData.value = null;
    errorMessage.value = error instanceof Error ? error.message : 'error';
  }
};

const processWeatherData = (data: any) => {
  const current = data.current;
  const forecast = data.forecast.forecastday[0].day;

  return {
    name: data.location.name,
    temp: current.temp_c,
    temp_min: forecast.mintemp_c,
    temp_max: forecast.maxtemp_c,
    feels_like: current.feelslike_c,
    humidity: current.humidity,
    pressure: current.pressure_mb,
    condition: current.condition.text,
    wind_speed: current.wind_kph,
    wind_dir: current.wind_dir,
  };
};
</script>