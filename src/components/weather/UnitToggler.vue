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

    <el-button type="primary" @click="configStore.toggleUnit">단위변경</el-button>
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
</style>
