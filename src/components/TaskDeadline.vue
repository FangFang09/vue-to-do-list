<script setup>
import { computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  deadline_at: String,
})

const emit = defineEmits(['update:deadline_at'])

const selectedDate = computed({
  get: () => new Date(props.deadline_at),
  set: (value) => emit('update:deadline_at', value.toISOString()),
})
const selectedTime = computed({
  get: () => {
    return { hours: selectedDate.value.getHours(), minutes: selectedDate.value.getMinutes() }
  },
  set: (timeObject) => {
    const updatedDate = new Date(selectedDate.value)
    updatedDate.setHours(timeObject.hours)
    updatedDate.setMinutes(timeObject.minutes)
    emit('update:deadline_at', updatedDate.toISOString())
  },
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
        v-model="selectedDate"
        format="yyyy/MM/dd"
        hide-input-icon
        placeholder="yyyy/mm/dd"
      ></VueDatePicker>
      <VueDatePicker v-model="selectedTime" time-picker hide-input-icon></VueDatePicker>
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
