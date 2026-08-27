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
})

const handleInput = (event) => {
  emit('update-query', event.target.value)
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

const handleUmbrellaChange = (event) => {
  emit('update-umbrella-only', event.target.checked)
}
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <div class="search-row">
      <input
        type="text"
        :value="currentQuery"
        @input="handleInput"
        @keydown="handleKeyDown"
        @keypress="handleKeyPress"
        @keyup="handleKeyUp"
        placeholder="검색할 도시 이름 입력"
      />
      <button @click="emit('update-query', '')">입력 지우기</button>
    </div>
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
    <label class="umbrella-filter">
      <input
        type="checkbox"
        :checked="showUmbrellaOnly"
        @change="handleUmbrellaChange"
      />
      우산이 필요한 도시만 보기
    </label>
    <p>우산이 필요한 도시는 총 {{ umbrellaCityCount }}곳입니다.</p>
  </div>
</template>

<style scoped>
.search-inner h3 {
  margin-top: 0;
}

.search-row {
  display: flex;
  gap: 8px;
}

.search-row input {
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
}

.search-row button {
  padding: 9px 14px;
  color: white;
  background-color: #607d8b;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.umbrella-filter {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
}

.umbrella-filter input {
  width: auto;
  margin: 0;
}
</style>
