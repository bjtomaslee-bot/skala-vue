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
  <el-card class="weather-card" shadow="hover" @click="handleCardClick">
    <div class="card-heading">
      <h3>{{ cityItem.name }}</h3>
      <span>{{ cityItem.status }}</span>
    </div>

    <p class="temperature">{{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <el-tag v-if="cityItem.temp >= 28" type="danger">🔥 더움</el-tag>
    <el-tag v-else-if="cityItem.temp >= 20" type="success">🙂 적당함</el-tag>
    <el-tag v-else type="info">🧥 쌀쌀함</el-tag>

    <p>추천 복장: {{ cityItem.outfit }}</p>
    <p v-if="cityItem.umbrella" class="umbrella-needed">☔ 우산을 챙기세요.</p>
    <p v-else class="umbrella-not-needed">우산은 필요하지 않습니다.</p>

    <div class="card-actions">
      <el-button type="primary" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
        상세보기
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  margin-bottom: 14px;
  cursor: pointer;
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

.umbrella-needed {
  color: #1565c0;
  font-weight: bold;
}

.umbrella-not-needed {
  color: #2e7d32;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
