<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="about-container">
    <h2>서비스 소개</h2>
    <hr />

    <div class="description-box">
      <p>이 앱은 지역별 날씨에 따라 추천 복장을 확인 할 수 있습니다.</p>

      <ul>
        <li>도시 이름을 이용한 실시간 검색</li>
        <li>기온에 따른 날씨 상태 구분</li>
        <li>날씨에 따른 추천 복장 제공</li>
        <li>우산이 필요한 도시만 따로 확인</li>
        <li>지역별 상세 기상정보 페이지 제공</li>
      </ul>
    </div>

    <div class="technology-box">
      <h3>사용한 Vue 기능</h3>
      <ul>
        <li><code>ref</code>를 이용한 반응형 데이터 관리</li>
        <li><code>computed</code>를 이용한 검색 결과 계산</li>
        <li><code>watch</code>를 이용한 데이터 변경 감시</li>
        <li><code>Props</code>와 <code>Emits</code>를 이용한 컴포넌트 통신</li>
        <li><code>Vue Router</code>를 이용한 화면 전환</li>
      </ul>
    </div>

    <el-button type="primary" class="home-button" @click="handleGoHome">
      ← 메인 대시보드로 돌아가기
    </el-button>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(44, 62, 80, 0.08);
}

.about-container h2 {
  margin-top: 0;
  color: #2c3e50;
}

.about-container hr {
  margin-bottom: 20px;
  border: 0;
  border-top: 2px solid #e9ecef;
}

.description-box,
.technology-box {
  margin-bottom: 16px;
  padding: 18px;
  background-color: #f8fafc;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.description-box p,
.technology-box h3 {
  margin-top: 0;
}

.technology-box h3 {
  color: #1565c0;
}

ul {
  margin-bottom: 0;
  padding-left: 22px;
}

li {
  margin-bottom: 8px;
  color: #455a64;
}

code {
  padding: 2px 5px;
  color: #c0392b;
  background-color: #ffeaa7;
  border-radius: 4px;
}

.home-button {
  width: 100%;
}

</style>
