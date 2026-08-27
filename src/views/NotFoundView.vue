<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push({ name: 'WeatherHome' })
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-container">
      <div class="error-code">404</div>
      <h2>페이지를 찾을수 없습니다.</h2>

      <p>
        요청한 주소가 존재하지 않거나<br />
        아직 만들어지지 않은 페이지입니다.
      </p>

      <button class="home-button" @click="handleGoHome">메인으로 돌아가기</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: unset;
  min-height: 500px;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 12px;
}

.not-found-content {
  width: 100%;
  max-width: 480px;
  padding: 42px;
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.error-code {
  color: #3498db;
  font-size: 64px;
  font-weight: bold;
}

.error-icon {
  margin: 8px 0 20px;
  font-size: 480x;
}

h2 {
  color: #343a40;
}

p {
  margin: 18px 0 30px;
  color: #6c757d;
  line-height: 1.7;
}

.home-button {
  padding: 11px 24px;
  color: white;
  background-color: #3498db;
  border: 0;
  border-radius: 22px;
  font-weight: bold;
  cursor: pointer;
}

.home-button:hover {
  background-color: #2980b9;
}
</style>
