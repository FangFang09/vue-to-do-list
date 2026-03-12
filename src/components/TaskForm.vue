<script setup>
import TaskHeader from './TaskHeader.vue'
import TaskBody from './TaskBody.vue'
import TaskFooter from './TaskFooter.vue'

const props = defineProps({
  todo: Object,
  mode: {
    type: String,
    default: 'add',
  },
  isEditing: Boolean,
})

const emit = defineEmits([
  'update:todo',
  'toggleEditing',
  'changeFile',
  'submit',
  'update',
  'onCancel',
])

function onSubmit() {
  if (props.mode === 'add') {
    emit('submit')
  } else if (props.mode === 'edit') {
    emit('update', props.todo)
  }
}
</script>

<template>
  <form action="##" class="task-form" @submit.prevent="onSubmit">
    <TaskHeader
      :title="todo.title"
      @update:title="emit('update:todo', { ...todo, title: $event })"
      :is_pin="todo.is_pin"
      @update:is_pin="emit('update:todo', { ...todo, is_pin: $event })"
      :isEditing="isEditing"
      @toggleEditing="emit('toggleEditing', todo.id)"
    />
    <TaskBody
      :deadline_at="todo.deadline_at"
      @update:deadline_at="emit('update:todo', { ...todo, deadline_at: $event })"
      :file_name="todo.file_name"
      @update:file_name="emit('update:todo', { ...todo, file_name: $event })"
      @changeFile="emit('changeFile', $event)"
      :comment="todo.comment"
      @update:comment="emit('update:todo', { ...todo, comment: $event })"
    />
    <TaskFooter :mode="mode" @onCancel="emit('onCancel', mode)" />
  </form>
</template>

<style lang="scss" scoped>
.task-form {
  margin: 0 auto 24px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 $grey-3;
}
</style>
