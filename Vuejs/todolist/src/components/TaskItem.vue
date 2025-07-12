<script setup>
defineProps({
  todo: Object,
})

const emit = defineEmits(['toggleCompleted', 'togglePin', 'toggleEditing'])
</script>
<template>
  <div class="task-item" :class="{ active: todo.isPin }">
    <div class="task-item-header">
      <input type="checkbox" :checked="todo.isCompleted" @change="emit('toggleCompleted', todo)" />
      <input type="text" :value="todo.title" :class="{ active: todo.isCompleted }" disabled />
      <i
        class="fa-star"
        :class="[todo.isPin ? 'fa-solid active' : 'fa-regular']"
        @click="emit('togglePin', todo)"
      ></i>
      <i class="fa-pen fa-regular" @click="emit('toggleEditing', todo.id)"></i>
    </div>
    <div class="task-status">
      <span>
        <i class="fa-solid fa-calendar-days fa-fw"></i>
        {{ todo.deadlineDate }}
      </span>
      <span>
        <i class="fa-regular fa-file fa-fw"></i>
      </span>

      <span v-if="todo.comment">
        <i class="fa-regular fa-comment-dots fa-fw"></i>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-item {
  @include task-status;
  background-color: $grey-1;

  &.active {
    background: $pin-bg;
  }
}

.task-item-header {
  @include task-header;
  border-radius: 0;
  padding: 0;
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  gap: 0;
  flex-grow: 1;

  // type something here
  input[type='text'] {
    border: none;
    background-color: transparent;

    flex: 1 1 0;
    width: 50%;
    padding-left: 16px;

    @include subtitle;

    &:focus {
      outline: none;
    }
    &.active {
      text-decoration: line-through;
    }
  }
  .fa-star {
    font-size: 24px;
    margin-left: 32px;
    color: $grey-5;
    transition: color 0.2s;
    cursor: pointer;

    &.active {
      color: $pin;
    }
  }

  .fa-pen {
    font-size: 24px;
    margin-left: 32px;
    color: $grey-5;
    cursor: pointer;
  }
}
</style>
