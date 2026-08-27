<script setup>
import { weatherData } from '../data/weatherData.js'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore.js'
import BaseDashboardCard from '@/components/weather/BaseDashboardCard.vue'
import SearchBar from '@/components/weather/SearchBar.vue'
import WeatherCard from '@/components/weather/WeatherCard.vue'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const configStore = useConfigStore()

const searchQuery = ref('')
const selectedCityInfo = ref('날씨 카드를 선택해 주세요.')

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const weatherList = ref(weatherData)
const isLoading = ref(false)
const apiError = ref('')

const cityQueries = {
  city_01: 'Seoul,KR',
  city_02: 'Suwon,KR',
  city_03: 'Jeju City,KR',
  city_04: 'Gangneung,KR',
  city_05: 'Incheon,KR',
  city_06: 'Daejeon,KR',
  city_07: 'Daegu,KR',
  city_08: 'Gwangju,KR',
  city_09: 'Chuncheon,KR',
  city_10: 'Ulsan,KR',
}

const getOutfit = (temp) => {
  if (temp >= 28) {
    return '통풍이 잘되는 반팔과 얇은 바지'
  } else if (temp >= 20) {
    return '얇은 긴팔 또는 가벼운 겉옷'
  } else {
    return '재킷이나 따뜻한 겉옷'
  }
}

const fetchRealTimeWeather = async () => {
  isLoading.value = true
  apiError.value = ''

  const updateWeatherList = []

  try {
    for (let i = 0; i < weatherData.length; i++) {
      const city = weatherData[i]

      const response = await axios.get(BASE_URL, {
        params: {
          q: cityQueries[city.id],
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

      updateWeatherList.push({
        id: city.id,
        name: city.name,
        temp: currentTemp,
        status: apiData.weather[0].description,
        humidity: `${apiData.main.humidity}%`,
        wind: `${apiData.wind.speed}m/s`,
        outfit: getOutfit(currentTemp),
        umbrella: umbrellaNeeded,
      })
    }

    weatherList.value = updateWeatherList

    console.log('실시간 날씨 적용 완료: ', updateWeatherList)
  } catch (error) {
    apiError.value = '실시간 날씨를 불러오지 못해 기존 데이터를 표시합니다.'

    console.log('상태 코드:', error.response?.status)
    console.log('오류 내용: ', error.response?.data)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }

  fetchRealTimeWeather()
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: {
      search: newQuery || undefined,
    },
  })
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => item.name.includes(query))
})

const visibleWeatherList = computed(() => {
  if (configStore.umbrellaOnly) {
    return filteredWeatherList.value.filter((item) => item.umbrella)
  }

  return filteredWeatherList.value
})

const umbrellaCityCount = computed(() => {
  return weatherList.value.filter((item) => item.umbrella).length
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch] 선택 도시 변경: ${oldValue} -> ${newValue}`)
})

watch(
  () => configStore.umbrellaOnly,
  (newValue) => {
    console.log(`[watch] 우산 필요 도시만 보기: ${newValue}`)
  },
)
watchEffect(() => {
  console.log(`[watchEffect] 현재 검색어: ${searchQuery.value}`)
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        :show-umbrella-only="configStore.umbrellaOnly"
        :umbrella-city-count="umbrellaCityCount"
        :umbrella-filter-label="configStore.umbrellaFilterLabel"
        @update-query="(value) => (searchQuery = value)"
        @update-umbrella-only="configStore.setUmbrellaOnly"
      />
    </BaseDashboardCard>
    <BaseDashboardCard>
      <h3>지역별 날씨 현황</h3>

      <p v-if="isLoading" class="loading-message">실시간 날씨를 불러오는 중입니다.</p>

      <p v-if="apiError" class="api-error">{{ apiError }}</p>
      <WeatherCard
        v-for="item in visibleWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(message) => (selectedCityInfo = message)"
        @click-detail="handleDetailJump(item.id)"
      />

      <p v-if="visibleWeatherList.length === 0" class="no-result">
        검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  width: 680px;
  max-width: 100%;
  margin: 0 auto;
}
.no-result {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}

.status-bar {
  padding: 10px;
  color: #2e7d32;
  background: #e8f5e9;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}
</style>
