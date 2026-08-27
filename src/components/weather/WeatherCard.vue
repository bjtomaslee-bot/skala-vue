<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})

const handleCardClick = () => {
  emit(
    'select-card',
    `${props.cityItem.name}: ${displayTemp.value}${configStore.unitSymbol}, ${props.cityItem.status}`,
  )
}
</script>

<template>
  <div class="weather-card" @click="handleCardClick">
    <div class="card-heading">
      <h3>{{ cityItem.name }}</h3>
      <span>{{ cityItem.status }}</span>
    </div>

    <p class="temperature">{{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 28" class="badge hot">🔥 더움</span>
    <span v-else-if="cityItem.temp >= 20" class="badge mild">🙂 적당함</span>
    <span v-else class="badge cool">🧥 쌀쌀함</span>

    <p>추천 복장: {{ cityItem.outfit }}</p>
    <p v-if="cityItem.umbrella" class="umbrella-needed">☔ 우산을 챙기세요.</p>
    <p v-else class="umbrella-not-needed">☀️ 우산은 필요하지 않습니다.</p>

    <button
      class="btn-detail"
      @click.stop="emit('click-detail', cityItem.name, cityItem.status)"
    >
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 18px;
  margin-bottom: 14px;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
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
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
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

.btn-detail {
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 9px 14px;
  color: white;
  background-color: #1565c0;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
</style>
