import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')
  const umbrellaOnly = ref(false)

  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  const umbrellaFilterLabel = computed(() => {
    return umbrellaOnly.value ? '우산 필요 도시만 표시 중' : '전체 도시 표시 중'
  })

  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  const setUmbrellaOnly = (value) => {
    umbrellaOnly.value = value
  }

  return {
    unit,
    umbrellaOnly,
    unitSymbol,
    umbrellaFilterLabel,
    toggleUnit,
    setUmbrellaOnly,
  }
})
