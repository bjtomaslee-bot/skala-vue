<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/weather/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>도시들 날씨 정보</h1>
    <nav class="navigation-bar">
      <div class="navigation-links">
        <RouterLink to="/" class="nav-item"> 주요 날씨 </RouterLink>

        <span class="divider">|</span>

        <RouterLink to="/about" class="nav-item"> 서비스 소개 </RouterLink>
      </div>
      <UnitToggler />
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import './assets/exercise.css';

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav-item {
  color: #7f8c8d;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
}

.nav-item:hover {
  color: #3498db;
}

.divider {
  margin: 0 15px;
  color: #dcdde1;
}

.navigation-bar .router-link-exact-active {
  padding-bottom: 2px;
  color: #3498db;
  border-bottom: 2px solid #3498db;
}

.main-content {
  min-height: 400px;
}
</style>
