<script setup>
import { computed } from 'vue'
import TaskDeadline from '@/components/TaskDeadline.vue'
import TaskFile from './TaskFile.vue'
import TaskComment from './TaskComment.vue'

const props = defineProps({
  deadline_at: String,
  file_name: String,
  comment: String,
})

const emit = defineEmits(['update:deadline_at', 'update:file_name', 'changeFile', 'update:comment'])

const comments = computed({
  get: () => props.comment,
  set: (value) => emit('update:comment', value),
})
</script>

<template>
  <div class="task-body">
    <TaskDeadline
      :deadline_at="props.deadline_at"
      @update:deadline_at="emit('update:deadline_at', $event)"
    />
    <TaskFile
      :file_name="props.file_name"
      @update:file_name="emit('update:file_name', $event)"
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
