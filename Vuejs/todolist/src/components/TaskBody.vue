<script setup>
import { computed } from 'vue'
import TaskDeadline from '@/components/TaskDeadline.vue'
import TaskFile from './TaskFile.vue'
import TaskComment from './TaskComment.vue'

const props = defineProps({
  deadlineDate: String,
  deadlineTime: String,
  fileName: String,
  comment: String,
})

const emit = defineEmits([
  'update:deadlineDate',
  'update:deadlineTime',
  'update:fileName',
  'changeFile',
  'update:comment',
])

const deadlineDate = computed({
  get: () => props.deadlineDate,
  set: (value) => emit('update:deadlineDate', value),
})

const deadlineTime = computed({
  get: () => props.deadlineTime,
  set: (value) => emit('update:deadlineTime', value),
})

const comments = computed({
  get: () => props.comment,
  set: (value) => emit('update:comment', value),
})
</script>

<template>
  <div class="task-body">
    <TaskDeadline v-model:deadlineDate="deadlineDate" v-model:deadlineTime="deadlineTime" />
    <TaskFile
      :fileName="props.fileName"
      @update:fileName="emit('update:fileName', $event)"
      @changeFile="emit('changeFile', $event)"
    />
    <TaskComment v-model:comment="comments" />
  </div>
</template>

<style lang="scss" scoped>
.task-body {
  padding: 24px 32px;
  background-color: $grey-1;

  @include deviceScreen($sm-size) {
    padding: 23px 32px 24px 72px;
  }
}
</style>
