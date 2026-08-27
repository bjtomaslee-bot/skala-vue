<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import { weatherData } from '../data/weatherData.js'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const cityData = ref(null)
const isLoading = ref(false)
const apiError = ref('')

const getOutfit = (temp) => {
  if (temp >= 28) {
    return '통풍이 잘되는 반팔과 얇은 바지'
  } else if (temp >= 20) {
    return '얇은 긴팔 또는 가벼운 겉옷'
  } else {
    return '재킷이나 따뜻한 겉옷'
  }
}

onMounted(async () => {
  const cityId = route.params.cityId

  const selectedCity = weatherData.find((city) => {
    return city.id === cityId
  })

  if (!selectedCity) {
    apiError.value = '해당 도시 정보를 찾을 수 없습니다.'
    return
  }

  isLoading.value = true

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: selectedCity.query,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    const apiData = response.data
    const currentTemp = Math.round(apiData.main.temp)
    const weatherType = apiData.weather[0].main

    const umbrellaNeeded =
      weatherType === 'Rain' ||
      weatherType === 'Drizzle' ||
      weatherType === 'Thunderstorm' ||
      weatherType === 'Snow'

    cityData.value = {
      id: selectedCity.id,
      name: selectedCity.name,
      temp: currentTemp,
      status: apiData.weather[0].description,
      humidity: `${apiData.main.humidity}%`,
      wind: `${apiData.wind.speed}m/s`,
      outfit: getOutfit(currentTemp),
      umbrella: umbrellaNeeded,
    }

    console.log('상세 날씨 API 결과:', cityData.value)
  } catch (error) {
    apiError.value = '상세 날씨 정보를 불러오지 못했습니다.'

    console.error('상태 코드:', error.response?.status)
    console.error('오류 내용:', error.response?.data)
  } finally {
    isLoading.value = false
  }
})

const displayTemp = computed(() => {
  if (!cityData.value) {
    return null
  }

  const rawTemp = cityData.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})
</script>

<template>
  <div class="detail-container">
    <h2>지역별 상세 기상 정보</h2>
    <hr />

    <div v-if="cityData" class="info-card">
      <h3>{{ cityData.name }}</h3>

      <p>
        현재 기온:
        <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      </p>

      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
      <p>추천 복장: {{ cityData.outfit }}</p>

      <p v-if="cityData.umbrella" class="umbrella-needed">우산을 챙기세요.</p>
      <p v-else class="umbrella-not-needed">우산은 필요하지 않습니다.</p>
    </div>

    <div v-else class="not-found">
      <p>해당 지역의 데이터가 존재하지 않습니다.</p>
    </div>

    <button class="back-button" @click="router.push('/')">← 메인 대시보드로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(44, 62, 80, 0.08);
}

.detail-container h2 {
  margin-top: 0;
  color: #2c3e50;
}

.detail-container hr {
  margin-bottom: 20px;
  border: 0;
  border-top: 2px solid #e9ecef;
}

.info-card {
  margin-bottom: 18px;
  padding: 20px;
  background-color: #f4f8fb;
  border: 1px solid #dce8f0;
  border-radius: 9px;
}

.info-card h3 {
  margin-top: 0;
  color: #1565c0;
}

.info-card p {
  margin: 10px 0;
  color: #37474f;
}

.umbrella-needed {
  color: #1565c0 !important;
  font-weight: bold;
}

.umbrella-not-needed {
  color: #2e7d32 !important;
}

.not-found {
  margin-bottom: 18px;
  padding: 18px;
  color: #c0392b;
  background-color: #fdecea;
  border-radius: 8px;
}

.back-button {
  padding: 10px 16px;
  color: #ffffff;
  background-color: #2c3e50;
  border: 0;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.back-button:hover {
  background-color: #1f2d3a;
}
</style>
