<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  cityQuery: {
    type: String,
    required: true,
  },
})

const configStore = useConfigStore()

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

const forecastList = ref([])
const firstRainTime = ref('')
const isLoading = ref(false)
const apiError = ref('')

const formatDateTime = (dateTime) => {
  const date = dateTime.slice(5, 10)
  const time = dateTime.slice(11, 16)

  return `${date} ${time}`
}

const displayTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return temp
}

const fetchForecast = async () => {
  isLoading.value = true
  apiError.value = ''

  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: props.cityQuery,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
        cnt: 8,
      },
    })

    const apiList = response.data.list
    const updatedForecastList = []

    for (let i = 0; i < apiList.length; i++) {
      const item = apiList[i]
      const weatherType = item.weather[0].main

      const umbrellaNeeded =
        weatherType === 'Rain' ||
        weatherType === 'Drizzle' ||
        weatherType === 'Thunderstorm' ||
        weatherType === 'Snow'

      if (umbrellaNeeded && firstRainTime.value === '') {
        firstRainTime.value = item.dt_txt
      }

      updatedForecastList.push({
        id: item.dt,
        dateTime: item.dt_txt,
        temp: Math.round(item.main.temp),
        status: item.weather[0].description,
        umbrella: umbrellaNeeded,
      })
    }

    forecastList.value = updatedForecastList

    console.log('24시간 예보 결과:', forecastList.value)
  } catch (error) {
    apiError.value = '24시간 예보를 불러오지 못했습니다.'

    console.error('예보 API 상태 코드:', error.response?.status)
    console.error('예보 API 오류 내용:', error.response?.data)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchForecast()
})
</script>

<template>
  <section class="forecast-container">
    <h3>앞으로 24시간 예보</h3>

    <p v-if="isLoading" class="loading-message">시간별 예보를 불러오는 중입니다.</p>

    <p v-else-if="apiError" class="error-message">
      {{ apiError }}
    </p>

    <div v-else>
      <p v-if="firstRainTime" class="rain-alert">
        ☔ {{ formatDateTime(firstRainTime) }}부터 비 또는 눈이 예상됩니다.
      </p>

      <p v-else class="clear-alert">☀️ 앞으로 24시간 동안 비 또는 눈 예보가 없습니다.</p>

      <div class="forecast-list">
        <div v-for="item in forecastList" :key="item.id" class="forecast-item">
          <strong>{{ formatDateTime(item.dateTime) }}</strong>

          <span>{{ displayTemp(item.temp) }}{{ configStore.unitSymbol }}</span>

          <span>{{ item.status }}</span>

          <span v-if="item.umbrella">☔</span>
          <span v-else>☀️</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.forecast-container {
  margin-bottom: 18px;
  padding: 20px;
  background-color: #f8fafc;
  border: 1px solid #dce8f0;
  border-radius: 10px;
}

.forecast-container h3 {
  margin-top: 0;
  color: #1565c0;
}

.forecast-list {
  display: grid;
  gap: 8px;
}

.forecast-item {
  display: grid;
  grid-template-columns: 110px 70px 1fr 30px;
  gap: 10px;
  align-items: center;
  padding: 10px;
  background-color: white;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
}

.rain-alert {
  padding: 12px;
  color: #0d47a1;
  background-color: #e3f2fd;
  border-radius: 6px;
  font-weight: bold;
}

.clear-alert {
  padding: 12px;
  color: #2e7d32;
  background-color: #e8f5e9;
  border-radius: 6px;
  font-weight: bold;
}

.loading-message {
  color: #1565c0;
  text-align: center;
}

.error-message {
  color: #c62828;
  text-align: center;
}
</style>
