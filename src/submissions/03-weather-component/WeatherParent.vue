<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 29,
    status: '맑음',
    outfit: '반팔과 얇은 바지',
    umbrella: false,
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 23,
    status: '흐림',
    outfit: '얇은 긴팔',
    umbrella: false,
  },
  {
    id: 'city_03',
    name: '제주',
    temp: 18,
    status: '비',
    outfit: '가벼운 외투',
    umbrella: true,
  },
  {
    id: 'city_04',
    name: '강릉',
    temp: 26,
    status: '구름',
    outfit: '반팔과 얇은 겉옷',
    umbrella: false,
  },
])

const searchQuery = ref('')
const selectedCityInfo = ref('날씨 카드를 선택해 주세요.')
const showUmbrellaOnly = ref(false)

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

const visibleWeatherList = computed(() => {
  if (showUmbrellaOnly.value) {
    return filteredWeatherList.value.filter((item) => item.umbrella)
  }

  return filteredWeatherList.value
})

const umbrellaCityCount = computed(() => {
  return weatherList.value.filter((item) => item.umbrella).length
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch] 선택 도시 변경: ${oldValue} → ${newValue}`)
})

watch(showUmbrellaOnly, (newValue) => {
  console.log(`[watch] 우산 필요 도시만 보기: ${newValue}`)
})

watchEffect(() => {
  console.log(`[watchEffect] 현재 검색어: ${searchQuery.value}`)
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        :show-umbrella-only="showUmbrellaOnly"
        :umbrella-city-count="umbrellaCityCount"
        @update-query="(val) => (searchQuery = val)"
        @update-umbrella-only="(val) => (showUmbrellaOnly = val)"
      />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="item in visibleWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(msg) => (selectedCityInfo = msg)"
        @click-detail="showDetail"
      />

      <p
        v-if="visibleWeatherList.length === 0"
        style="text-align: center; color: #e74c3c; padding: 10px 0"
      >
        😭 검색 결과와 일치하는 도시가 없습니다.
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
</style>
