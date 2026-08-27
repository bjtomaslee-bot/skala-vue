<script setup>
import { ref } from 'vue'

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

const handleKeyDown = (event) => {
  console.log(`[keydown] 누른 키: ${event.key}`)
}

const handleKeyPress = (event) => {
  console.log(`[keypress] 입력 문자: ${event.key}`)
}

const handleKeyUp = (event) => {
  console.log(`[keyup] 현재 입력값: ${event.target.value}`)
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <main class="weather-dashboard">
    <header class="dashboard-header">
      <h1>오늘 뭐 입지?</h1>
      <p>도시별 날씨와 추천 복장을 확인해 보세요.</p>
    </header>

    <section class="search-box">
      <label for="city-search">도시 검색</label>
      <div class="search-row">
        <input
          id="city-search"
          type="text"
          :value="searchQuery"
          @input="(event) => (searchQuery = event.target.value)"
          @keydown="handleKeyDown"
          @keypress="handleKeyPress"
          @keyup="handleKeyUp"
          placeholder="도시 이름을 입력하세요"
        />
        <button @click="searchQuery = ''">입력 지우기</button>
      </div>
      <p>
        입력한 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>

    <section class="weather-list">
      <h2>지역별 날씨 현황</h2>

      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}: ${item.temp}°C, ${item.status}`"
      >
        <div class="card-heading">
          <h3>{{ item.name }}</h3>
          <span>{{ item.status }}</span>
        </div>

        <p class="temperature">{{ item.temp }}°C</p>

        <span v-if="item.temp >= 28" class="badge hot">🔥 더움</span>
        <span v-else-if="item.temp >= 20" class="badge mild">🙂 적당함</span>
        <span v-else class="badge cool">🧥 쌀쌀함</span>

        <p>추천 복장: {{ item.outfit }}</p>
        <p v-if="item.umbrella" class="umbrella-needed">☔ 우산을 챙기세요.</p>
        <p v-else class="umbrella-not-needed">☀️ 우산은 필요하지 않습니다.</p>

        <button class="detail-button" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>
    </section>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </main>
</template>

<style scoped>
.weather-dashboard {
  width: 680px;
  margin: 30px auto;
  padding: 24px;
  color: #263238;
  background-color: #f4f8fb;
  border-radius: 16px;
  font-family: Arial, sans-serif;
}

.dashboard-header {
  margin-bottom: 24px;
  text-align: center;
}

.dashboard-header h1 {
  margin-bottom: 8px;
  color: #1565c0;
}

.search-box {
  margin-bottom: 24px;
  padding: 18px;
  background-color: white;
  border: 1px solid #d9e4ec;
  border-radius: 10px;
}

.search-box label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.search-row {
  display: flex;
  gap: 8px;
}

.search-row input {
  flex: 1;
  padding: 10px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
}

button {
  padding: 9px 14px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.search-row button {
  color: white;
  background-color: #607d8b;
}

.weather-list h2 {
  margin-bottom: 14px;
}

.weather-card {
  position: relative;
  margin-bottom: 14px;
  padding: 18px;
  background-color: white;
  border: 1px solid #d9e4ec;
  border-radius: 10px;
  cursor: pointer;
}

.weather-card:hover {
  border-color: #42a5f5;
}

.card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-heading h3 {
  margin: 0;
}

.temperature {
  margin: 12px 0;
  font-size: 28px;
  font-weight: bold;
}

.badge {
  display: inline-block;
  margin-bottom: 8px;
  padding: 5px 9px;
  color: white;
  border-radius: 5px;
  font-size: 13px;
}

.hot {
  background-color: #ef5350;
}

.mild {
  background-color: #43a047;
}

.cool {
  background-color: #42a5f5;
}

.umbrella-needed {
  color: #1565c0;
  font-weight: bold;
}

.umbrella-not-needed {
  color: #2e7d32;
}

.detail-button {
  position: absolute;
  right: 18px;
  bottom: 18px;
  color: white;
  background-color: #1565c0;
}

.status-bar {
  padding: 14px;
  color: #1b5e20;
  background-color: #e8f5e9;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}
</style>
