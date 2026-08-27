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
const regionGroups = [
  '특별시·광역시',
  '경기도',
  '강원특별자치도',
  '제주특별자치도',
  '경상북도',
  '경상남도',
  '전라북도',
  '전라남도',
]

const selectedRegion = ref('특별시·광역시')

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const weatherList = ref([])
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

const fetchRealTimeWeather = async () => {
  isLoading.value = true
  apiError.value = ''

  const updateWeatherList = []

  try {
    for (let i = 0; i < weatherData.length; i++) {
      const city = weatherData[i]

      const response = await axios.get(BASE_URL, {
        params: {
          q: city.query,
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
        group: city.group,
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
    apiError.value = '날씨 정보를 불러오지 못했습니다.'

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

const groupedWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (query) {
    return visibleWeatherList.value
  }

  return visibleWeatherList.value.filter((item) => {
    return item.group === selectedRegion.value
  })
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

      <div class="region-tabs">
        <button
          v-for="region in regionGroups"
          :key="region"
          :class="{ active: selectedRegion === region }"
          @click="selectedRegion = region"
        >
          {{ region }}
        </button>
      </div>

      <p v-if="isLoading" class="loading-message">실시간 날씨를 불러오는 중입니다.</p>

      <p v-if="apiError" class="api-error">{{ apiError }}</p>
      <WeatherCard
        v-for="item in groupedWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(message) => (selectedCityInfo = message)"
        @click-detail="handleDetailJump(item.id)"
      />

      <p v-if="groupedWeatherList.length === 0" class="no-result">
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

.region-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.region-tabs button {
  padding: 8px 12px;
  color: #455a64;
  background-color: #eceff1;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  cursor: pointer;
}

.region-tabs button:hover {
  background-color: #dceaf5;
}

.region-tabs button.active {
  color: white;
  background-color: #1565c0;
  border-color: #1565c0;
}
</style>
