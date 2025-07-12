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
  <form action="##" class="add-form" @submit.prevent="onSubmit">
    <TaskHeader
      :title="todo.title"
      @update:title="emit('update:todo', { ...todo, title: $event })"
      :isPin="todo.isPin"
      @update:isPin="emit('update:todo', { ...todo, isPin: $event })"
      :isEditing="isEditing"
      @toggleEditing="emit('toggleEditing', todo.id)"
    />
    <TaskBody
      :deadlineDate="todo.deadlineDate"
      @update:deadlineDate="emit('update:todo', { ...todo, deadlineDate: $event })"
      :deadlineTime="todo.deadlineTime"
      @update:deadlineTime="emit('update:todo', { ...todo, deadlineTime: $event })"
      :fileName="todo.fileName"
      @update:fileName="emit('update:todo', { ...todo, fileName: $event })"
      @changeFile="emit('changeFile', $event)"
      :comment="todo.comment"
      @update:comment="emit('update:todo', { ...todo, comment: $event })"
    />
    <TaskFooter :mode="mode" @onCancel="emit('onCancel', mode)" />
  </form>
</template>

<style lang="scss" scoped>
.add-form {
  margin: 0 auto 24px;
  width: 80%;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 $grey-3;

  @include deviceScreen($sm-size) {
    width: 100%;
  }
}
</style>
