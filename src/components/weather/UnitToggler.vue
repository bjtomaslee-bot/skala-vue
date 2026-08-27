<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>
      온도단위:
      <strong>
        {{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)' }}
      </strong>
    </span>

    <button class="toggle-button" @click="configStore.toggleUnit">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-size: 14px;
}

.unit-toggler strong {
  color: #1565c0;
}

.toggle-button {
  padding: 7px 11px;
  color: white;
  background-color: #4b6584;
  border: 0;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.toggle-button:hover {
  background-color: #34495e;
}
</style>
