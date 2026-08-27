<script setup>
const emit = defineEmits(['update-query', 'update-umbrella-only'])

defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
  showUmbrellaOnly: {
    type: Boolean,
    default: false,
  },
  umbrellaCityCount: {
    type: Number,
    default: 0,
  },
  umbrellaFilterLabel: {
    type: String,
    default: '전체 도시 표시 중',
  },
})

const handleInput = (value) => {
  emit('update-query', value)
}

const handleKeyDown = (event) => {
  console.log(`[keydown] 누른 키: ${event.key}`)
}

const handleKeyPress = (event) => {
  console.log(`[keypress] 입력 문자: ${event.key}`)
}

const handleKeyUp = (event) => {
  console.log(`[keyup] 현재 입력값: ${event.target.value}`)
}

const handleUmbrellaChange = (value) => {
  emit('update-umbrella-only', value)
}
</script>

<template>
  <div class="search-inner">
    <h3>도시 검색</h3>
    <div class="search-row">
      <el-input
        :model-value="currentQuery"
        placeholder="검색할 도시 이름 입력"
        clearable
        type="text"
        @input="handleInput"
        @clear="emit('update-query', '')"
        @keydown="handleKeyDown"
        @keypress="handleKeyPress"
        @keyup="handleKeyUp"
      />
      <el-button type="primary" @click="emit('update-query', '')">입력 지우기</el-button>
    </div>
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>

    <el-checkbox :model-value="showUmbrellaOnly" @change="handleUmbrellaChange">
      우산이 필요한 도시만 보기
    </el-checkbox>
    <p>우산이 필요한 도시는 총 {{ umbrellaCityCount }}곳입니다.</p>
    <p class="filter-state">현재 설정: {{ umbrellaFilterLabel }}</p>
  </div>
</template>

<style scoped>
.search-inner h3 {
  margin-top: 0;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-row .el-input {
  flex: 1;
}

.filter-state {
  color: #1565c0;
  font-weight: bold;
}
</style>
