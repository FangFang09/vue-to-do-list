<script setup>
import { computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  deadlineDate: String,
  deadlineTime: String,
})

const emit = defineEmits(['update:deadlineDate', 'update:deadlineTime'])

const deadlineDate = computed({
  get: () => props.deadlineDate,
  set: (value) => emit('update:deadlineDate', value),
})

const deadlineTime = computed({
  get: () => props.deadlineTime,
  set: (value) => emit('update:deadlineTime', value),
})
</script>

<template>
  <div class="deadline">
    <div class="content-title">
      <i class="fa-solid fa-calendar-days fa-fw"></i>
      <span>deadline</span>
    </div>
    <div class="date-time">
      <VueDatePicker
        v-model="deadlineDate"
        format="yyyy/MM/dd"
        hide-input-icon
        placeholder="yyyy/MM/dd"
      >
      </VueDatePicker>
      <VueDatePicker v-model="deadlineTime" time-picker hide-input-icon></VueDatePicker>
    </div>
  </div>
</template>

<style lang="scss" scoped>
//deadline
.deadline {
  margin-bottom: 22px;

  .date-time {
    display: flex;
    gap: 8px;
    padding-left: 25px;

    input[type='date'],
    input[type='time'] {
      padding: 8px 16px;
      border-radius: 2px;

      &:focus {
        outline: 2px solid $primary;
      }
    }
  }
}

.content-title {
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 8px;

  > span {
    @include subtitle;
  }
}
</style>
