<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)

const handleFetchWeather = async () => {
    isLoading.value = true
    const API_KEY = ''
    const URL = `https://api.openweathermap.org/data/2.5/weather` +
        `?q=Seoul` +
        `&appid=${API_KEY}` +
        `&units=metric` +
        `&lang=kr`

    try {
        const response = await axios.get(URL)

        console.log('Axios 전체응답: ', response)
        console.log('날씨 데이터: ', response.data)

        weatherData.value = response.data
    } catch (error) {
        console.error('통신 실패: ', error)
        window.alert('API 키 또는 요청 주소를 확인하세요.')
        } finally {
            isLoading.value = false
        }
    }
</script>

<template>
    <div class="axios-practice">
        <h2>Axios 연습</h2>

        <button: disabled="isLoading" @click="handleFetchWeather">
            {{ isLoading ? '데이터 가져오는 중..' : '실시간 날씨 가져오기' }}
        </button:>

        <div v-if="weatherData" class="result-card">

        </div>

        <p v-else>
            아직 가져온 날씨 데이터가 없습니다.
        </p>
    </div>
</template>